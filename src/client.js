const WebSocketClient = require("ws");
const crypto = require("crypto");

const url = "ws://185.193.67.250:4506/websocket-example";
const ws = new WebSocketClient(url);

function sendHeartbeat() {
  ws.send([2, crypto.randomUUID(), 'Heartbeat', {}]);
}

let _interval = null;
const heartbeat = {
  start: function () {
    _interval = setInterval(function () {
      sendHeartbeat();
    }, 15_000);
  },
  stop: function () {
    clearInterval(_interval);
  },
};

ws.on("open", function open() {
  console.log("WebSocket connected");
  heartbeat.start();
});

ws.on("close", function () {
  console.log("WebSocket disconnected");
  heartbeat.stop();
});

ws.on("message", function (data) {
  console.log("WebSocket data received from server.");
});
