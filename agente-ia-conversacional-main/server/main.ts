// server/main.ts
import "dotenv/config";
import express from "express";
import { WebSocketServer } from "ws";
import { RealtimeAgent } from "./agent.js";
import path from "path";
import { fileURLToPath } from "url";

// Verificar que las variables de entorno se cargan correctamente
console.log("Coda API Key:", process.env.CODA_API_KEY ? "✅ Sí" : "❌ No");
console.log("Coda Doc ID:", process.env.CODA_DOC_ID ? "✅ Sí" : "❌ No");
console.log("Coda Table ID:", process.env.CODA_TABLE_ID ? "✅ Sí" : "❌ No");

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../client")));

const server = app.listen(3000, () => {
  console.log("Servidor listo en http://localhost:3000");
});

const wss = new WebSocketServer({ server });
const agent = new RealtimeAgent();

wss.on("connection", (ws) => {
  console.log("Cliente conectado");

  ws.send(JSON.stringify({ type: "message", text: "Hello there Obiwan" }));

  ws.on("message", async (msg) => {
    const data = JSON.parse(msg.toString());
    if (data.type === "user_message") {
      const reply = await agent.handleMessage(data.text);
      ws.send(JSON.stringify({ type: "message", text: reply }));
    }
  });
});
