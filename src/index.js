'use strict';
// require
var _ = require('underscore');
var bluebird = require('bluebird');
var config = require('config');
var client = require('./libs/client');
/**
 * AWS Lambda entry point
 *
 * @param {Object} event lambda event object
 * @param {Object} context lambda context
 */
exports.handler = function(event, context) {
  var token = config['token'];
    if (!token) {
      throw new Error("Error: `token` has not been set in the configuration.");
    }
  client.init({token: token});

  var promises = event.Records.map(function(record) {
    var compiled = _.template(config['template'] || '');
    var messageObj = {};
    if (record.Sns.Message) {
      try {
        messageObj = JSON.parse(record.Sns.Message);
      } catch (err) {
      }
    }

    var roomId = config['roomId'];
    if (!roomId) {
      throw new Error("Error: `roomId` has not been set in the configuration.");
    }
    var message = compiled(_.extend(record.Sns, messageObj));
    
    return client.postAsync('rooms/' + roomId + '/messages', {
      body: message,
    });
  });

  return bluebird.all(promises).then(function() {
    context.succeed();    
  }).catch(function(err) {
    context.fail(err);
  });
};