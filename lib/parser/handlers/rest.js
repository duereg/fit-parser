var tokenActions;

tokenActions = require('./tokens');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isRest(token);
  },
  act: function(tokens, token, currentSet) {
    var rest;
    rest = tokenActions.getRest(token);
    return currentSet.setRest(tokenActions.getDuration(rest));
  }
};
