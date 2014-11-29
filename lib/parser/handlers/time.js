var moment, tokenActions;

moment = require('moment');

tokenActions = require('./tokens');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isTime(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.setTime(moment.duration("00:" + token));
  }
};