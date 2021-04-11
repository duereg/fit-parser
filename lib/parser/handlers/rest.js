const tokenActions = require('./tokens');
const timeFormatter = require('../../timeFormatter');

module.exports = {
  canHandle(token) {
    return tokenActions.isRest(token);
  },
  act(tokens, token, currentSet) {
    const rest = tokenActions.getRest(token);
    return currentSet.setRest(timeFormatter.toDuration(rest));
  }
};
