const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {

  setInterval(() => {

    ws.send(JSON.stringify({

      id: Date.now(),

      user: "0x8f2a",

      amount: Math.random() * 5,

      token: "PADRE"

    }));

  }, 2000);

});