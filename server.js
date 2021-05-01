const express = require("express")();
const server = require("http").createServer(express);
const io = require("socket.io")(server);
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();
const port = 443;

app
  .prepare()
  .then(() => {
    express.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(port, (err) => {
      err ? console.error(err) : console.log(`listening on port *:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

io.on("connection", (socket) => {
  // console.log("a user connected");

  // socket.on("disconnect", () => {
  //   console.log("user disconnected");
  // });

  socket.on("message", (data) => {
    const { username, message } = data;

    console.log(`${username} => ${message}`);

    io.emit("message", data);
  });
});
