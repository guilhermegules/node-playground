const express = require("express");
const socket = require("socket.io");

const app = express();

const server = app.listen(3030, () => {
  console.log(`Listen to http://localhost:3030`);
});

app.use(express.static("public"));

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    console.log(data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
