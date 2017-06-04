import test from 'tape';

process.env.NODE_ENV = 'test';

test('A passing test', (assert) => {
  assert.pass('This test will pass.');
  assert.end();
});
