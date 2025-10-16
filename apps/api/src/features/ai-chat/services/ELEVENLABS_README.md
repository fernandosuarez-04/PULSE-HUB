# ElevenLabs Text-to-Speech Integration

This service provides high-quality voice synthesis for the AI Chat using ElevenLabs API.

## Setup

### 1. Get ElevenLabs API Key

1. Go to https://elevenlabs.io/
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Add to `apps/api/.env`:

```bash
# Required
ELEVENLABS_API_KEY=your-elevenlabs-api-key-here

# Optional (defaults provided)
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM  # Rachel voice
ELEVENLABS_MODEL_ID=eleven_multilingual_v2  # Multilingual model
```

### 3. Restart Backend

```bash
npm run dev
```

You should see in the console:
```
✅ ElevenLabs Service initialized
   - Voice ID: 21m00Tcm4TlvDq8ikWAM
   - Model: eleven_multilingual_v2
```

## Voice Selection

### Finding Voice IDs

1. Go to https://elevenlabs.io/app/voice-lab
2. Browse available voices
3. Click on a voice to hear samples
4. Copy the Voice ID from the voice settings

### Recommended Voices for Spanish

| Voice Name | Voice ID | Gender | Tone | Best For |
|-----------|----------|--------|------|----------|
| **Rachel** (default) | `21m00Tcm4TlvDq8ikWAM` | Female | Clear, professional | General use |
| **Bella** | `EXAVITQu4vr4xnSDxMaL` | Female | Warm, friendly | Customer service |
| **Antoni** | `ErXwobaYiN019PkySvjV` | Male | Professional | Business |
| **Domi** | `AZnzlk1XvdvUeBnXmlld` | Female | Confident | Presentations |

### Custom Voice Settings

Edit `apps/api/src/features/ai-chat/services/elevenlabs-service.ts`:

```typescript
this.voiceSettings = {
  stability: 0.5,        // 0-1: Lower = more variable, Higher = more stable
  similarityBoost: 0.75, // 0-1: Higher = more similar to original voice
  style: 0.4,            // 0-1: Higher = more stylistic exaggeration
  useSpeakerBoost: true, // Enhance speaker clarity
};
```

## Usage

The ElevenLabs service is automatically used by the AI Chat Service. No manual invocation needed.

### Automatic Flow

1. User sends message
2. OpenAI generates text response
3. **ElevenLabs converts text to speech** (MP3 format)
4. Audio encoded to Base64
5. Sent to frontend via WebSocket
6. Frontend automatically plays audio

### Fallback Behavior

If `ELEVENLABS_API_KEY` is not configured:
- System logs warning: `⚠️ ElevenLabs not configured, audio generation disabled`
- Chat continues to work in **text-only mode**
- No errors thrown - graceful degradation

## Cost Management

### Free Tier Limits

- **10,000 characters/month**
- ~200-250 agent responses
- Resets monthly

### Monitoring Usage

1. Visit: https://elevenlabs.io/app/usage
2. Check character count and remaining quota
3. Backend logs show: `✅ Audio generated (XXX bytes)` for each request

### Upgrade Options

If you exceed the free tier:
- **Starter Plan**: $5/month for 30,000 characters
- **Creator Plan**: $22/month for 100,000 characters
- **Pro Plan**: $99/month for 500,000 characters

## Troubleshooting

### Audio Not Playing

**Backend Logs Show**:
```
⚠️ ElevenLabs not configured, audio generation disabled
```

**Solution**: Add `ELEVENLABS_API_KEY` to `.env` and restart backend.

---

**Backend Logs Show**:
```
❌ ElevenLabs error: Invalid API key
```

**Solution**: Verify API key is correct at https://elevenlabs.io/app/settings/api-keys

---

**Backend Logs Show**:
```
❌ ElevenLabs error: Quota exceeded
```

**Solution**: Check usage at https://elevenlabs.io/app/usage. Upgrade plan or wait for monthly reset.

---

**Browser Console Shows**:
```
Error al reproducir audio
```

**Solution**: Browser autoplay policy may block audio. User must interact with page first (click anywhere).

### Voice Sounds Strange

**Issue**: Voice doesn't sound natural for Spanish.

**Solution**:
1. Use `eleven_multilingual_v2` model (default)
2. Try different voices from voice lab
3. Adjust voice settings in `elevenlabs-service.ts`

### High Latency

**Issue**: Audio takes too long to generate.

**Causes**:
- Text response is very long (>500 words)
- Slow internet connection
- ElevenLabs API experiencing delays

**Solutions**:
- Reduce `OPENAI_MAX_TOKENS` to get shorter responses
- Check ElevenLabs status: https://status.elevenlabs.io/
- Consider upgrading to paid tier for priority processing

## API Reference

### `ElevenLabsService`

**Constructor**:
```typescript
const service = new ElevenLabsService({
  apiKey: string,        // Required
  voiceId?: string,      // Optional: Voice ID (default: Rachel)
  modelId?: string,      // Optional: Model ID (default: eleven_multilingual_v2)
  stability?: number,    // Optional: 0-1 (default: 0.5)
  similarityBoost?: number, // Optional: 0-1 (default: 0.75)
  style?: number,        // Optional: 0-1 (default: 0.4)
  useSpeakerBoost?: boolean, // Optional: (default: true)
});
```

**Methods**:

- `textToSpeech(text: string): Promise<Buffer>`
  - Converts text to speech
  - Returns MP3 audio buffer

- `textToSpeechBase64(text: string): Promise<string>`
  - Converts text to speech
  - Returns Base64-encoded MP3 audio

- `getVoices(): Promise<any[]>`
  - Fetches available voices from ElevenLabs

- `setVoice(voiceId: string): void`
  - Changes the active voice

- `updateVoiceSettings(settings: Partial<VoiceSettings>): void`
  - Updates voice synthesis parameters

### Singleton Instance

```typescript
import { getElevenLabsService } from './elevenlabs-service';

const service = getElevenLabsService();
const audio = await service.textToSpeech('Hola, ¿cómo estás?');
```

## Best Practices

1. **Keep Responses Concise**: Shorter text = faster audio generation
2. **Monitor Usage**: Check quota regularly to avoid service interruption
3. **Test Voice Quality**: Preview different voices before settling on one
4. **Handle Errors Gracefully**: System falls back to text-only if audio fails
5. **Optimize for Spanish**: Use `eleven_multilingual_v2` model
6. **Cache Audio** (Future): Consider caching common responses

## Support

- **ElevenLabs Docs**: https://docs.elevenlabs.io/
- **API Reference**: https://docs.elevenlabs.io/api-reference
- **Voice Lab**: https://elevenlabs.io/app/voice-lab
- **Support**: support@elevenlabs.io

---

**Last Updated**: January 2025
