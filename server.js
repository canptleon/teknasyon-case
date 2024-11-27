#!/usr/bin/env node
const next = require("next");
const { createServer } = require("http");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

const args = {
  host: process.env.MY_ENV,
  port: 3001,
};

process.argv.forEach(function (val, index, array) {
  switch (val) {
    case "host":
    case "port":
      args[val] = array[index + 1];
      break;
  }
});

app.prepare().then(() => {
  const server = createServer(handler);

  server.listen(args.port, args.host, err => {
    if (err) {
      console.error(`> Error on ${args.host}:${args.port} ❌ ⚠️`);
      throw err;
    }
    console.log(`> Listening on ${args.host}:${args.port} 🌍 🚀`);
  });
});
