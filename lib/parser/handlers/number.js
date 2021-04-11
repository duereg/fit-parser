const _ = require('./int');

module.exports = {
  canHandle: function(token, currentSet) {
    return !currentSet.current().distance && _.isNumber(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.setDistance(parseInt(token, 10));
  }
};
