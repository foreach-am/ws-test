const { Server: WebSocketServer } = require("ws");
const express = require("express");
const crypto = require("crypto");
const helpers = require("./lib/helpers");

// init websocket
const wss = new WebSocketServer({
  noServer: true,
});

wss.on("connection", function (ws) {
  ws.on("close", function (code, reasonBuffer) {
    const reason = reasonBuffer.toString("utf-8");
    helpers.log(`Socket disconnected: ${ws.socketId}`, {
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

    helpers.log("Registering onmessage listener function.");

    websocket.on("message", function (data) {
      helpers.log("WebSocket data received and responded:", data.toString('utf-8'));
      websocket.send(data);
    });
  });
});

const port = 4506;
app.listen(port, function () {
  helpers.log(`App starting at port ${port} !!!`);
});
