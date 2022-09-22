const test = require('ava');
const { SharedContext } = require('./_plugin');

test('Get shared http server - 1', async t => {
  const { sharedContext } = t.context;
  const uri = await SharedContext.acquireHttpServer('test-file-1');
  // console.log('URI', uri)
  t.is(true, true);
});