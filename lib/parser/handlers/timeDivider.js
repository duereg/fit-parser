var tokenActions;

tokenActions = require('./tokens');

module.exports = {
  canHandle: function(token) {
    return token === '@';
  },
  act: function(tokens, token, currentSet) {}
};
