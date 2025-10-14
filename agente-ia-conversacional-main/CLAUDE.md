# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🤖 Project Overview

**Voice-enabled AI conversational agent** built with Node.js/TypeScript that provides intelligent information about AI adoption strategies through voice interaction, powered by OpenAI GPT-4o-mini. The system uses WebSocket for bidirectional communication between client and server, integrating OpenAI's Chat Completions API with Function Calling to intelligently query a Coda knowledge base about AI implementation strategies, training, and automation.

**Current Status**: Production-ready conversational assistant with OpenAI-powered natural language understanding, automated function calling, and comprehensive tracing infrastructure.

## 🏗️ Architecture

### Core Components

**Server (`server/`)**:
- `main.ts` - Express server with WebSocket handling
- `agent.ts` - Main conversational agent orchestrator (delegates to OpenAI Service)
- `services/openai-service.ts` - **Core AI integration** with:
  - OpenAI Chat Completions API (GPT-4o-mini)
  - Function calling with automatic tool selection
  - Conversation history management (last 10 messages)
  - Specialized system prompt for AI strategy expertise
- `tools/coda.ts` - Coda API integration for querying knowledge base about AI strategies
  - `getTableRows()` - Fetches rows from Coda table
  - `searchInCoda()` - Intelligent keyword-based search (called by OpenAI when needed)
  - `extractRelevantFragment()` - Context extraction for responses
- `types/conversation.ts` - Type definitions for messages, history, and OpenAI config
- `tracing/tracer.ts` - Session tracking and event logging system

**Client (`client/`)**:
- `index.html` - Complete web interface with integrated Web Speech API for voice recognition/synthesis

**Evaluation System (`evals/`)**:
- Automated quality assessment measuring accuracy, tone, and latency
- Target: >75% overall score, currently at 88.1%
- CI/CD integrated with GitHub Actions

### Key Architecture Patterns

**WebSocket Message Flow**:
```typescript
// Client → Server
{ type: "user_message", text: string }

// Server → Client
{ type: "message", text: string }
```

**Agent Processing Pipeline (OpenAI-Powered)**:
1. Input received via WebSocket
2. Agent handles initial greeting (first interaction only)
3. All subsequent messages sent to OpenAI Service with conversation history
4. OpenAI Chat Completions analyzes message with specialized system prompt
5. OpenAI autonomously decides if it needs to call `searchInCoda` function
6. If function call needed:
   - OpenAI reformulates query for optimal search
   - `searchInCoda` executed with Coda API
   - Results returned to OpenAI
   - OpenAI synthesizes final response from Coda context
7. Response returned to client via WebSocket
8. All events logged to tracing system with latency tracking

**Tracing System**:
- Global singleton tracer captures all agent interactions
- Events: input, output, intent, tool_call, error, latency
- Sessions stored as JSON in `traces/` directory
- Includes automatic analysis for performance issues

## 🚀 Development Commands

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start

# Build TypeScript
npm run build
```

### Environment Setup

Required `.env` file:
```bash
# OpenAI Configuration (REQUIRED)
OPENAI_API_KEY=your_openai_api_key_here    # Required: OpenAI API authentication
OPENAI_MODEL=gpt-4o-mini                   # Model to use (default: gpt-4o-mini)
OPENAI_MAX_TOKENS=1000                     # Max tokens per response (default: 1000)

# Coda API Configuration (REQUIRED)
CODA_API_KEY=your_coda_key_here            # Required: Coda API authentication
CODA_DOC_ID=your_doc_id                    # Required: Coda document ID
CODA_TABLE_ID=your_table_id                # Required: Coda table ID containing strategies
```

**Get API Keys**:
- OpenAI: https://platform.openai.com/api-keys
- Coda: https://coda.io/account

### Testing & Quality

```bash
# Run all evaluations (accuracy + tone + latency)
npm run evals

# Individual evaluation suites
npm run evals:accuracy    # Requires OPENWEATHER_API_KEY
npm run evals:tone        # No API key needed
npm run evals:latency     # No API key needed
```

**Evaluation Thresholds**:
- Minimum overall score: 75%
- Focus on tone and latency (accuracy tests may need adaptation for Coda content)
- Reports saved to `evals/reports/`

### Tracing & Analysis

```bash
# Generate sample sessions and analyze
npm run tracing:demo

# Generate sessions only
npm run tracing:generate
```

**Trace Output**:
- Sessions: `traces/session-*.json`
- Analysis: `traces/analysis-report.md`
- Automatically identifies latency issues, errors, and unrecognized intents

## 🔧 Key Implementation Details

### OpenAI Integration Architecture

**OpenAI Service (`services/openai-service.ts`)**:

The system uses OpenAI's Chat Completions API with Function Calling (not the deprecated Assistants API). This provides:
- Direct control over conversation flow
- Lower latency than thread-based approaches
- Cost-effective (~$0.00025 per query with gpt-4o-mini)
- Future-proof architecture (Assistants API deprecating in H1 2026)

**System Prompt Engineering**:
```typescript
const SYSTEM_PROMPT = `Eres un asistente experto en estrategias de adopción de inteligencia artificial para empresas...
INSTRUCCIONES IMPORTANTES:
1. SIEMPRE basa tus respuestas en la información de la base de conocimiento
2. Si necesitas información específica, usa la función searchInCoda para buscarla
3. Sé conciso pero completo (máximo 200-250 palabras por respuesta)
...`
```

The system prompt defines the assistant's expertise, response style, and instructs it to use the `searchInCoda` function when needed.

**Function Calling Schema**:
```typescript
const TOOLS: ChatCompletionTool[] = [{
  type: 'function',
  function: {
    name: 'searchInCoda',
    description: 'Busca información sobre estrategias de adopción de IA...',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'La pregunta o tema a buscar...'
        }
      },
      required: ['query']
    }
  }
}];
```

**Key Configuration**:
- `tool_choice: 'auto'` - OpenAI autonomously decides when to call functions
- `max_tokens: 1000` - Configurable via `OPENAI_MAX_TOKENS`
- `temperature: 0.7` - Balanced between creativity and consistency
- Conversation history: Last 10 messages retained per session

**Conversation Memory**:
```typescript
private conversationHistory: Map<string, ConversationMessage[]>;
private maxHistoryLength: number = 10;
```

Each session maintains its own conversation history, automatically pruned to prevent context window overflow.

### Modifying Search Logic

Search in Coda uses keyword extraction in `coda.ts:searchInCoda()`:
```typescript
// Extracts keywords from query (filters words >3 chars)
const keywords = query.toLowerCase().split(/\s+/).filter(word => word.length > 3);

// Searches in all row values and ranks by keyword matches
// Returns best matching content with truncation for context
```

**Important**: OpenAI reformulates user queries before calling `searchInCoda`, optimizing search terms for better results.

### Intent Classification

**Simplified with OpenAI**: The agent now only handles initial greetings locally in `agent.ts:handleMessage()`:
- `greeting` - First interaction only (handled by agent)
- All other intents - Delegated to OpenAI Service

OpenAI internally classifies intent and decides whether to search Coda, provide conversational response, or ask clarifying questions.

### Tool Integration

Tools follow this pattern:
```typescript
export async function toolName(params): Promise<Result> {
  // 1. Validate environment variables (CODA_API_KEY, CODA_DOC_ID, CODA_TABLE_ID)
  // 2. Call Coda API
  // 3. Process and rank results
  // 4. Return context or empty string
}
```

**Tool Call Tracing**: All tool calls automatically logged with duration via `globalTracer.logToolCall()`.

**Important**: All IDs (doc, table, columns) come from environment variables - NO hardcoding.

### Error Handling Strategy

- **API Failures**: Catch and return graceful error messages to user
- **Background Operations**: Coda storage runs async, non-blocking
- **Tracing**: All errors captured with full context via `globalTracer.logError()`

## 🔌 External Integrations

### OpenAI API (AI Intelligence Layer)

**Purpose**: Provides natural language understanding, conversation management, and intelligent tool orchestration

**API**: Chat Completions API with Function Calling
**Endpoint**: `https://api.openai.com/v1/chat/completions`
**Model**: `gpt-4o-mini` (configurable via `OPENAI_MODEL`)
**Authentication**: Bearer token via `OPENAI_API_KEY`

**Cost Structure (gpt-4o-mini)**:
- Input: $0.15 per 1M tokens
- Output: $0.60 per 1M tokens
- Average query: ~400 tokens total = ~$0.00025 per interaction
- Function calls: No additional cost (included in token usage)

**Key Features Used**:
1. **Chat Completions**: Multi-turn conversations with system prompt
2. **Function Calling**: Automatic tool invocation (searchInCoda)
3. **Tool Choice Auto**: OpenAI decides when to call functions
4. **Conversation History**: Maintains context across messages

**Customization Points**:
- **System Prompt** (`SYSTEM_PROMPT` in `openai-service.ts`): Define expertise, tone, response structure
- **Temperature** (default 0.7): 0.0 = deterministic, 1.0 = creative
- **Max Tokens** (default 1000): Response length limit
- **History Length** (default 10 messages): Memory window per session
- **Tools Schema**: Define available functions and when to call them

**Rate Limits** (Tier 1 - Free):
- 200 requests per minute
- 40,000 tokens per minute
- Check your tier: https://platform.openai.com/settings/organization/limits

**Best Practices**:
- Monitor usage at https://platform.openai.com/usage
- Set usage limits in OpenAI dashboard to prevent unexpected costs
- Use environment variables for all configuration
- Test with lower `max_tokens` first, increase as needed
- Review function descriptions regularly for optimal tool calling

### Coda API (Knowledge Base)

**Purpose**: Query knowledge base containing AI strategy information
**Endpoint**: `https://coda.io/apis/v1/docs/{docId}/tables/{tableId}/rows`
**Rate Limits**: Check Coda API documentation for current limits
**Authentication**: Bearer token via `CODA_API_KEY`

**Table Structure**:
- Contains rows with strategy information about AI adoption
- Current table has column "Estrategia" with long-form content
- System automatically discovers columns via `getTableColumns()`

**Search Algorithm**:
1. Extract keywords from user query (>3 chars)
2. Search all row values for keyword matches
3. Rank by match count (score)
4. Return best match with intelligent truncation

**Setup Requirements**:
1. Coda account with API access
2. Document with table containing strategy content
3. Environment variables: `CODA_API_KEY`, `CODA_DOC_ID`, `CODA_TABLE_ID`
4. NO hardcoding of IDs - all from .env

## 📊 CI/CD Pipeline

**GitHub Actions**: `.github/workflows/evals.yml`

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests targeting these branches
- Only runs when code changes (`server/`, `evals/`, `package.json`, `tsconfig.json`)

**Workflow Steps**:
1. Checkout and setup Node.js 20
2. Install dependencies with `npm ci`
3. Build TypeScript
4. Run tone evaluations (always)
5. Run latency evaluations (always)
6. Run accuracy evaluations (requires `OPENWEATHER_API_KEY` secret)
7. Generate combined report
8. Upload report as artifact
9. Comment results on PR

**Required Secret**: `OPENWEATHER_API_KEY` in repository settings

## 🛠️ Common Development Tasks

### Modifying Agent Responses

**Greeting responses**: `agent.ts:getGreetingResponse()` - Array of initial greetings with random selection

**All other responses**: Controlled by OpenAI via system prompt in `services/openai-service.ts`:
- Modify `SYSTEM_PROMPT` to change response style, tone, and structure
- Adjust `temperature` (0.0-1.0) for more consistent (lower) or creative (higher) responses
- Change `max_tokens` to control response length
- Update function descriptions to guide when OpenAI calls tools

### Adding New Tool Integrations (Function Calling)

To add new tools for OpenAI to call:

1. **Create tool function** in `server/tools/`:
```typescript
export async function myNewTool(params: string): Promise<string> {
  // Implement tool logic
  return result;
}
```

2. **Add function schema** to `TOOLS` array in `services/openai-service.ts`:
```typescript
const TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'myNewTool',
      description: 'Clear description for OpenAI about when to use this tool',
      parameters: {
        type: 'object',
        properties: {
          param1: {
            type: 'string',
            description: 'What this parameter is for'
          }
        },
        required: ['param1']
      }
    }
  },
  // ... existing tools
];
```

3. **Handle tool execution** in `handleToolCalls()` method:
```typescript
if (functionName === 'myNewTool') {
  const result = await myNewTool(functionArgs.param1);
  functionResponse = result || 'No result found.';
}
```

4. **Import the tool** at the top of `openai-service.ts`:
```typescript
import { myNewTool } from '../tools/my-new-tool.js';
```

**OpenAI will automatically decide when to call your tool** based on the description and user queries.

### Debugging Voice Interaction Issues

**Speech Recognition**:
- Check browser console for permissions errors
- Verify `recognition.lang = "es-ES"` in client code
- Test with `recognition.continuous = true` for uninterrupted listening

**Speech Synthesis**:
- Verify `speechSynthesis.cancel()` called before new utterances
- Check `isAgentSpeaking` flag synchronization
- Monitor interruption logic in client code

### Extending Evaluation System

Add new metrics in `evals/metrics/`:
1. Create metric file with `evaluate()` function
2. Return score 0-100 and details object
3. Add to `evals/evaluator.ts` import and execution
4. Update GitHub Actions workflow if needed

## 📁 Project Structure Notes

**TypeScript Configuration**:
- Target: ES2022 with ESNext modules
- Output: `dist/` directory (excluded from git)
- Source maps enabled for debugging

**Module System**: ES Modules (`.js` extensions required in imports)

**Client Assets**: Static files served from `client/` via Express

## 🎯 Quality Standards

**Code Requirements**:
- TypeScript strict mode enabled
- All async operations must handle errors
- External API calls must include timeout handling
- All agent interactions traced for observability

**Performance Targets**:
- Response latency: <2s (currently 100% compliance)
- Weather API timeout: 5s maximum
- Session trace file size: <1MB

**Testing Coverage**:
- Minimum 75% evaluation score required for merge
- Tone evaluations verify conversational quality
- Latency evaluations ensure performance consistency
- Accuracy evaluations validate correct weather responses

## 🔍 Troubleshooting

**"OPENAI_API_KEY no está configurada"**:
- Verify `.env` file exists in project root with `OPENAI_API_KEY`
- Get API key from: https://platform.openai.com/api-keys
- Restart server after adding credentials
- Check console for "✅ OpenAI Service inicializado" message

**"CODA_API_KEY no está configurada"**:
- Verify `.env` file exists in project root
- Check all three Coda variables are set (API_KEY, DOC_ID, TABLE_ID)
- Get API key from: https://coda.io/account
- Restart server after adding credentials

**OpenAI errors ("Invalid API key", "Rate limit exceeded")**:
- **Invalid API key**: Verify key is correct and active in OpenAI dashboard
- **Rate limit exceeded**: Check usage at https://platform.openai.com/usage
- **Model not found**: Ensure `OPENAI_MODEL=gpt-4o-mini` in .env (or another valid model)
- **Max tokens exceeded**: Reduce `OPENAI_MAX_TOKENS` in .env (try 500-1000)

**Function calling not working**:
- Check console logs for "🔧 OpenAI solicitó tool: searchInCoda"
- Verify Coda credentials are correct (OpenAI will call but get no results)
- Review function description in `TOOLS` array - make it more specific
- Increase `temperature` slightly if OpenAI is too conservative about calling tools

**High OpenAI costs**:
- Monitor usage at: https://platform.openai.com/usage
- Expected cost: ~$0.00025 per query with gpt-4o-mini
- Reduce `OPENAI_MAX_TOKENS` to lower costs
- Check `maxHistoryLength` in `openai-service.ts` (default: 10 messages)
- Consider switching to gpt-3.5-turbo for even lower costs

**Responses are too short/long**:
- Adjust `OPENAI_MAX_TOKENS` in .env
- Modify system prompt instructions about response length (currently "200-250 palabras")
- Change `temperature` for more varied responses

**Conversation context lost**:
- Check `maxHistoryLength` in `openai-service.ts` (default: 10 messages)
- Increase for longer memory (but higher costs and latency)
- Clear history manually: `agent.clearHistory()` if needed

**Evaluations fail in CI but pass locally**:
- Verify GitHub secrets for Coda and OpenAI are configured
- Check Actions tab for detailed logs
- Ensure `npm ci` installs correct dependencies
- Note: Accuracy evals may need adaptation for Coda content

**WebSocket connection issues**:
- Verify server running on port 3000
- Check firewall settings
- Browser console shows connection status

**Speech API not working**:
- Only works in Chrome/Edge (WebKit-based browsers)
- Requires HTTPS in production (HTTP ok for localhost)
- Check microphone permissions in browser settings

**Debugging OpenAI Integration**:
```bash
# Check console logs for:
✅ OpenAI Service inicializado con modelo: gpt-4o-mini
🔧 OpenAI solicitó tool: searchInCoda con args: {...}
📊 Resultado de búsqueda en Coda: Encontrado (XXX chars)
```
