const path = require('path');
const { registerSharedWorker } = require('ava/plugin');

const { AssertionError } = require('assert');
const { MessageTypes } = require('./_const');

function never(message = 'Unexpected call to never()') {
  throw new AssertionError({ message, stackStartFn: never })
}

const protocol = registerSharedWorker({
  filename: path.resolve(__dirname, './_worker.js'),
  supportedProtocols: ['experimental']
});


class SharedContext {
  static async acquireHttpServer(file) {
    await protocol.available;

    const message = protocol.publish({
      type: MessageTypes.ACQUIRE_HTTP_SERVER,
      file
    });

    for await (const reply of message.replies()) {
      if (reply.data.type === MessageTypes.ACQUIRE_HTTP_SERVER) {
        return reply.data;
      }
    }

    return never();
  }
}

module.exports = {
  SharedContext
}