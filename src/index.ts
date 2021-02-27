import express from "express";
import bodyParser from "body-parser";
import socketIO, { Socket, Server } from "socket.io";
import cors from "cors";
import { hivelingMind } from "./hivelings/mind";

const port = 8000;

const server = express()
  .use(cors({ origin: /\.csb\.app$/ }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .listen(port, () => console.log(`Listening on port ${port}`));

enum Signal {
  // Websockets
  _CONNECTION = "connection",
  _DISCONNECT = "disconnect",

  // App specific things
  HIVELING_MIND = "hiveling-mind",
  MIND_VERSION_CHANGED = "hiveling-mind"
}

const logEvent = (id: string, signal: Signal, payload?: any): void => {
  console.log(
    `${id}: ${signal} ${payload ? `(${JSON.stringify(payload)})` : ""}`
  );
};

const maxNumberUsers = 1;
const io = (socketIO as any)(server) as Server;
io.on(Signal._CONNECTION, (socket: Socket) => {
  const { id } = socket;
  const socketIds = [...io.sockets.sockets.values()]
    .map((s) => s.id)
    .filter((i) => i !== id);
  const numberOfSockets = socketIds.length;

  logEvent(id, Signal._CONNECTION, "#" + numberOfSockets);
  if (numberOfSockets === maxNumberUsers) {
    socket.disconnect();
    return;
  }

  socket.on(Signal._DISCONNECT, () => {});

  socket.on(Signal.HIVELING_MIND, ({ input, id }) => {
    const output = hivelingMind(input);

    socket.emit(Signal.HIVELING_MIND, { output, id });
  });
});
