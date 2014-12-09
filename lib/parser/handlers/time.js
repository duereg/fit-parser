var timeFormatter, tokenActions;

tokenActions = require('./tokens');

timeFormatter = require('../../timeFormatter');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isTime(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.setTime(timeFormatter.toDuration(token));
  }
};
