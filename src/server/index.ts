import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import WSEvents from "../constants/WSEvents";
import UserList from "../interface/UserList";
import WSMessage from "../interface/WSMessage";

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = socketio(server);

const userList: UserList = {};

app.use(express.static("public"));

io.use((socket, next) => {
  let username = socket.handshake.query.username;
  if (username) {
    userList[socket.id] = username;
    return next();
  }
  return next(new Error('error'));
});

io.on(WSEvents.CONNECTION, (socket: socketio.Socket) => {
  socket.on(WSEvents.C_MESSAGE, (c_message: WSMessage) => {
    let username = userList[socket.id];
    if(!username) {
      return;
    }

    const s_message: WSMessage = {
      data: `${username}:${c_message.data}`
    }
    io.emit(WSEvents.S_MESSAGE, s_message);
  });
});

server.listen(3000, () => console.log("listening on *:3000"));
