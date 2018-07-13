var mongoose = require('mongoose');
var bluebird = require("bluebird");

mongoose.Promise = bluebird;

module.exports = {
  Channel: require("./channel"),
  Conversation: require("./conversation"),
  User: require("./user"),
};
