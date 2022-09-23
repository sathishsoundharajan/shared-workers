const test = require('ava');
const { SharedContext } = require('./_plugin');

test('Get shared http server - 2', async t => {
  const uri = await SharedContext.acquireHttpServer('test-file-2');
  console.log('URI', uri)
  t.is(true, true);
});