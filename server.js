// var app = require("express")();
// var http = require("http").createServer(app);
var io = require("socket.io")(2000);
var user = {};
io.on("connection", socket => {
  socket.on("user-connected", name => {
    user[socket.id] = name;
    socket.broadcast.emit("connection-socket", name);
  });
  socket.on("chat message", data => {
    socket.broadcast.emit("reply-message", user[socket.id] + ":" + data);
  });
  socket.on("disconnect", () => {
    const obj = { status: true, name: user[socket.id] };
    socket.broadcast.emit("connection-socket", obj);
  });
});
