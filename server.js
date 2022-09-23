const Hapi = require('hapi');

let server;

async function bootstrap({ start = true, port = 4901 } = {}) {
  server = Hapi.Server({ port });
  await server.initialize();

  if (start) {
    await server.start()
  }
  return server;
}

module.exports = bootstrap;