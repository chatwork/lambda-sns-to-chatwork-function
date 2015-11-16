'use strict';

var Promise = require('bluebird');

var assert  = require('power-assert');
var config  = require('config');
var sinon   = require('sinon');
var path    = require('path');
var factory = require('lambda-handler');
var handlerPath = path.resolve('./src/index');
var fixturePath = path.resolve('./test/fixtures/example');

describe('Lambda entry point:', function() {
  it('should successful call', function() {
    config.util.extendDeep(config, {
      token: 'xxxx',
      roomId: 1234,
      template: '<%- MessageId %>'
    });

    return handler(event, context).then(function() {
      assert(client.token === 'xxxx');
      assert(client.postAsync.callCount === 1);
      assert(client.postAsync.args[0][0] === 'rooms/1234/messages');
      assert.deepEqual(client.postAsync.args[0][1], {
        body: '95df01b4-ee98-5cb9-9903-4c221d41eb5e'
      });
    });
  });
  it('should successful call in multiple records', function() {
    var event = {
      Records: [
        {
          Sns: {
            MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e'
          }
        },
        {
          Sns: {
            MessageId: '982fb1b4-ee98-5cb9-9903-4c221d41eb5e'
          }
        }
      ]
    };
    config.util.extendDeep(config, {
      token: 'xxxx',
      roomId: 1234,
      template: '<%- MessageId %>'
    });

    return handler(event, context).then(function() {
      assert(client.token === 'xxxx');
      assert(client.postAsync.callCount === 2);
      assert(client.postAsync.args[0][0] === 'rooms/1234/messages');
      assert.deepEqual(client.postAsync.args[0][1], {
        body: '95df01b4-ee98-5cb9-9903-4c221d41eb5e'
      });
      assert(client.postAsync.args[1][0] === 'rooms/1234/messages');
      assert.deepEqual(client.postAsync.args[1][1], {
        body: '982fb1b4-ee98-5cb9-9903-4c221d41eb5e'
      });
    });
  });
  it('should successful call in json message', function() {
    var event = {
      Records: [
        {
          Sns: {
            MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
            Message: '{"hoge": 1}'
          }
        }
      ]
    };
    config.util.extendDeep(config, {
      token: 'xxxx',
      roomId: 1234,
      template: '<%- hoge %>'
    });

    return handler(event, context).then(function() {
      assert(client.token === 'xxxx');
      assert(client.postAsync.callCount === 1);
      assert(client.postAsync.args[0][0] === 'rooms/1234/messages');
      assert.deepEqual(client.postAsync.args[0][1], {
        body: '1'
      });
    });
  });
  it('should successful call in text message', function() {
    var event = {
      Records: [
        {
          Sns: {
            MessageId: '95df01b4-ee98-5cb9-9903-4c221d41eb5e',
            Message: 'Hello World'
          }
        }
      ]
    };
    config.util.extendDeep(config, {
      token: 'xxxx',
      roomId: 1234,
      template: '<%- Message %>'
    });

    return handler(event, context).then(function() {
      assert(client.token === 'xxxx');
      assert(client.postAsync.callCount === 1);
      assert(client.postAsync.args[0][0] === 'rooms/1234/messages');
      assert.deepEqual(client.postAsync.args[0][1], {
        body: 'Hello World'
      });
    });
  });
  it('should fail to call when you have not set the room', function() {
    config.util.extendDeep(config, {
      token: 'xxxx',
      roomId: undefined,
      template: '<%- Message %>'
    });

    assert.throws(function() {
      handler(event, context);
    });
  });
  it('should fail to call when you have not set the room', function() {
    config.util.extendDeep(config, {
      token: '',
      roomId: 1234,
      template: '<%- Message %>'
    });

    assert.throws(function() {
      handler(event, context);
    });
  });

  // disable console
  var log, warn;
  beforeEach(function() {
    log = console.log;
    warn = console.warn;
    console.log = console.warn = function(t) {
      if (t && ~t.indexOf('%')) {
        var util = require('util');
        process.stdout.write(util.format.apply(util, arguments) + '\n');
      }
    };
  });
  afterEach(function() {
    console.log = log;
    console.warn = warn;
  });
  // create stub client
  var client  = require('../src/libs/client');
  client.postAsync = function() {
    return Promise.resolve();
  };
  client.postAsync = sinon.spy(client, 'postAsync');
  beforeEach(function() {
    client.postAsync.reset();
  });
  // create handler
  var stub = {
    'config': config,
    './libs/client': client
  };
  var handler, event, context;
  beforeEach(factory(handlerPath, fixturePath, stub, function(_handler, _event, _context) {
    handler = _handler;
    event   = _event;
    context = _context;
  }));

});
