// server/tracing/tracer.ts
import fs from 'fs/promises';
import path from 'path';

export interface TraceEvent {
  timestamp: string;
  type: 'input' | 'output' | 'intent' | 'tool_call' | 'error' | 'latency';
  data: any;
}

export interface Session {
  sessionId: string;
  startTime: string;
  endTime?: string;
  events: TraceEvent[];
  metadata: {
    totalMessages: number;
    totalErrors: number;
    averageLatency: number;
    intents: string[];
    toolsCalled: string[];
  };
}

export class Tracer {
  private sessions: Map<string, Session> = new Map();
  private currentSessionId: string | null = null;
  private tracesDir: string;

  constructor() {
    this.tracesDir = path.join(process.cwd(), 'traces');
  }

  async initialize(): Promise<void> {
    await fs.mkdir(this.tracesDir, { recursive: true });
  }

  startSession(sessionId?: string): string {
    const id = sessionId || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const session: Session = {
      sessionId: id,
      startTime: new Date().toISOString(),
      events: [],
      metadata: {
        totalMessages: 0,
        totalErrors: 0,
        averageLatency: 0,
        intents: [],
        toolsCalled: []
      }
    };

    this.sessions.set(id, session);
    this.currentSessionId = id;

    return id;
  }

  logInput(input: string): void {
    this.addEvent({
      timestamp: new Date().toISOString(),
      type: 'input',
      data: { message: input }
    });
  }

  logOutput(output: string, latency: number): void {
    this.addEvent({
      timestamp: new Date().toISOString(),
      type: 'output',
      data: { message: output, latency }
    });

    // Actualizar latencia promedio
    const session = this.getCurrentSession();
    if (session) {
      const totalLatency = session.metadata.averageLatency * session.metadata.totalMessages;
      session.metadata.totalMessages++;
      session.metadata.averageLatency = (totalLatency + latency) / session.metadata.totalMessages;
    }
  }

  logIntent(intent: string, confidence?: number): void {
    this.addEvent({
      timestamp: new Date().toISOString(),
      type: 'intent',
      data: { intent, confidence }
    });

    const session = this.getCurrentSession();
    if (session && !session.metadata.intents.includes(intent)) {
      session.metadata.intents.push(intent);
    }
  }

  logToolCall(toolName: string, params: any, result: any, duration: number): void {
    this.addEvent({
      timestamp: new Date().toISOString(),
      type: 'tool_call',
      data: { toolName, params, result, duration }
    });

    const session = this.getCurrentSession();
    if (session && !session.metadata.toolsCalled.includes(toolName)) {
      session.metadata.toolsCalled.push(toolName);
    }
  }

  logError(error: Error | string, context?: any): void {
    this.addEvent({
      timestamp: new Date().toISOString(),
      type: 'error',
      data: {
        error: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        context
      }
    });

    const session = this.getCurrentSession();
    if (session) {
      session.metadata.totalErrors++;
    }
  }

  private addEvent(event: TraceEvent): void {
    const session = this.getCurrentSession();
    if (session) {
      session.events.push(event);
    }
  }

  private getCurrentSession(): Session | undefined {
    if (!this.currentSessionId) return undefined;
    return this.sessions.get(this.currentSessionId);
  }

  async endSession(): Promise<void> {
    const session = this.getCurrentSession();
    if (!session) return;

    session.endTime = new Date().toISOString();

    // Guardar sesión en archivo
    await this.saveSession(session);

    this.currentSessionId = null;
  }

  private async saveSession(session: Session): Promise<void> {
    const filename = `${session.sessionId}.json`;
    const filepath = path.join(this.tracesDir, filename);

    await fs.writeFile(filepath, JSON.stringify(session, null, 2));
    console.log(`📝 Sesión guardada: ${filename}`);
  }

  async loadSession(sessionId: string): Promise<Session | null> {
    try {
      const filepath = path.join(this.tracesDir, `${sessionId}.json`);
      const data = await fs.readFile(filepath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  async listSessions(): Promise<string[]> {
    try {
      const files = await fs.readdir(this.tracesDir);
      return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
    } catch (error) {
      return [];
    }
  }

  getSessionSummary(sessionId?: string): any {
    const id = sessionId || this.currentSessionId;
    if (!id) return null;

    const session = this.sessions.get(id);
    if (!session) return null;

    return {
      sessionId: session.sessionId,
      duration: session.endTime
        ? new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
        : Date.now() - new Date(session.startTime).getTime(),
      ...session.metadata
    };
  }
}

// Singleton global
export const globalTracer = new Tracer();
