const bootstrap = require('../server');
const { Symbols, MessageTypes } = require('./_const');

module.exports = async ({ negotiateProtocol }) => {
  const protocol = negotiateProtocol(['experimental']).ready();

  for await (const message of protocol.subscribe()) {
    const { data } = message;
    switch (data.type) {
      case MessageTypes.ACQUIRE_HTTP_SERVER: {
        return await acquireServer(message);
      }
      default:
        continue;
    }
  }

};

const sharedContexts = new Map();

async function acquireServer(message) {
  if (!sharedContexts.has(Symbols.HttpServer)) {
    const server = await bootstrap();
    sharedContexts.set(Symbols.HttpServer, server);
  }
  return message.reply({
    type: MessageTypes.ACQUIRE_HTTP_SERVER,
    uri: sharedContexts.get(Symbols.HttpServer).info.uri
  });
}