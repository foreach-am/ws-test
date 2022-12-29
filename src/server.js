const { Server: WebSocketServer } = require("ws");
const express = require("express");
const crypto = require("crypto");

// init websocket
const wss = new WebSocketServer({
  noServer: true,
});

wss.on("connection", function (ws) {
  ws.on("message", function (data) {
    console.log("WebSocket data received and responded.");
    ws.send(data);
  });

  ws.on("close", function (code, reasonBuffer) {
    const reason = reasonBuffer.toString("utf-8");
    console.log(`Socket disconnected: ${socketId}`, {
      code: code,
      reason: reason,
    });
  });
});

// init routing
const app = express();
app.get("/websocket-example", function (req, res, next) {
  const upgradeHeader = (req.headers.upgrade || "")
    .split(",")
    .map((s) => s.trim());

  if (upgradeHeader.indexOf("websocket") === -1) {
    return next();
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function (websocket) {
    websocket.socketId = crypto.randomUUID().toLowerCase();
    wss.emit("connection", websocket, req);

    console.log("Calling websocket listener function.");
    callback(websocket);
  });
});

const port = 4506;
app.listen(port, function () {
  console.log(`App starting at port ${port} !!!`);
});
