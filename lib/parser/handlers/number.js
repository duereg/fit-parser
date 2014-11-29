var integer;

integer = require('../int');

module.exports = {
  canHandle: function(token) {
    return integer.isNumber(token);
  },
  act: function(tokens, token, currentSet) {
    return currentSet.setDistance(parseInt(token, 10));
  }
};
