var factory = require('lambda-handler');
var path = require('path');
var handlerPath = path.resolve('./src/index');
var fixturePath = path.resolve('./test/fixtures/example.json');

factory(handlerPath, fixturePath, function(handler, event, context) {
  handler(event, context);
})();