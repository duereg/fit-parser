var tokenActions;

tokenActions = require('./tokens');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isTime(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.setTime(tokenActions.getDuration(token));
  }
};
