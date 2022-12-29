require("./lib/configure");

const WebSocketClient = require("ws");
const crypto = require("crypto");
const helpers = require("./lib/helpers");

const { WS_URL, WS_PORT } = process.env;

const url = `ws://${WS_URL}:${WS_PORT}/websocket-example`;
const ws = new WebSocketClient(url);

function sendHeartbeat() {
  const data = JSON.stringify([2, crypto.randomUUID(), 'Heartbeat', {}]);

  helpers.log("Sending data to server:", data);
  ws.send(data);
}

let _interval = null;
const heartbeat = {
  start: function () {
    sendHeartbeat();

    _interval = setInterval(function () {
      sendHeartbeat();
    }, 15_000);
  },
  stop: function () {
    clearInterval(_interval);
  },
};

ws.on("open", function open() {
  helpers.log("WebSocket connected");
  heartbeat.start();
});

ws.on("close", function () {
  helpers.log("WebSocket disconnected");
  heartbeat.stop();
});

ws.on("message", function (data) {
  helpers.log("WebSocket data received from server:", data.toString('utf-8'));
});
