import express from "express";
import WebSocket from "ws";
import { hivelingMind } from "./hivelings/mind";

const gameUrl = "https://6mc9i.csb.app/";
// Hardcoded because I can't figure out the codesandbox magic
const wssUrl = "wss://neces.sse.codesandbox.io/";
const redirectUrl = gameUrl + "?hive-mind=" + encodeURIComponent(wssUrl);
const port = 8000;

const server = express()
  .get("/", (_, res) => {
    // Codesandbox doesn't seem to like redirects, so I send a link instead
    res.send(
      `<html><body><a href=${redirectUrl} target="_blank">Launch Game</a></body></html>`
    );
  })
  .listen(port, () => console.log(`Listening on port ${port}`));

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("connection");
  ws.on("message", (message) => {
    const input = JSON.parse(message.toString());
    const output = hivelingMind(input);
    ws.send(JSON.stringify(output));
  });
});
