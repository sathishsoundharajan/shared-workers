const Hapi = require('hapi');

async function bootstrap({ start = true, port = 4901 } = {}) {
  const server = Hapi.Server({ port });
  await server.initialize();

  if (start) {
    await server.start()
  }
  return server;
}

module.exports = bootstrap;