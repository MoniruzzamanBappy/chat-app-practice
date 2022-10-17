const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const port = process.env.PORT || 3001;
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    socket.on("send_message", (data) => {
        socket.broadcast.emit("received_msg", data);
    });
});
server.listen(port, () => {
  console.log("Server is running at-3001");
});
