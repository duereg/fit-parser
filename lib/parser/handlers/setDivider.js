const tokenActions = require('./tokens');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isSetDivider(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.changeToMulti();
  }
};
