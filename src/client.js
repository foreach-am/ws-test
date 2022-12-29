const WebSocketClient = require("ws");

const url = "ws://185.193.67.250:4506/websocket-example";
const ws = new WebSocketClient(url);

let _interval = null;
const heartbeat = {
  start: function () {
    _interval = setInterval(function () {
      // ...
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
