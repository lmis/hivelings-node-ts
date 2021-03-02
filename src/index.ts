import express from "express";
import cors from "cors";
import WebSocket from "ws";
import { hivelingMind } from "./hivelings/mind";

const port = 8000;
const server = express()
  .use(cors({ origin: /\.csb\.app$/ }))
  .listen(port, () => console.log(`Listening on port ${port}`));

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("connection");
  ws.on("message", (message) => {
    const inputs = JSON.parse(message.toString());
    const outputs = inputs.map(hivelingMind);
    console.log(outputs)
    ws.send(JSON.stringify(outputs));
  });
});

