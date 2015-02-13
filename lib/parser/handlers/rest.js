var timeFormatter, tokenActions;

tokenActions = require('./tokens');

timeFormatter = require('../../timeFormatter');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isRest(token);
  },
  act: function(tokens, token, currentSet) {
    var rest;
    rest = tokenActions.getRest(token);
    return currentSet.setRest(timeFormatter.toDuration(rest));
  }
};
