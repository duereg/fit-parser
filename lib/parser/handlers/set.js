var tokenActions;

tokenActions = require('./tokens');

module.exports = {
  canHandle: function(token) {
    return tokenActions.isSet(token);
  },
  act: function(tokens, token, currentSet) {
    var newTokens;
    newTokens = token.split(tokenActions.setDividerRegex);
    if (newTokens.length !== 2) {
      throw new Error('Currently not supported');
    }
    tokens.unshift(newTokens.pop());
    tokens.unshift('x');
    return tokens.unshift(newTokens.pop());
  }
};
