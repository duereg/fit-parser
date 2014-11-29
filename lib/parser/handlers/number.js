var int;

int = require('./int');

module.exports = {
  canHandle: function(token) {
    return int.isNumber(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.setDistance(parseInt(token, 10));
  }
};
