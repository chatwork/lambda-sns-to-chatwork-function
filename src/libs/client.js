'use strict';
// require
var ChatWork = require('simple-cw-node');
var bluebird = require('bluebird');
// initialize
var client = new ChatWork();

module.exports = bluebird.promisifyAll(client);