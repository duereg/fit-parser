const WeightSet = require('../../weightSet');
const Interval = require('../../interval');
const timeFormatter = require('../../timeFormatter');

function convertToTimedInterval(currentSet, time, distance) {
  currentSet.intervals.pop();
  return currentSet.intervals.push(new Interval({time, distance}));
};

module.exports = {
  canHandle: function(token, currentSet) {
    return token === '-' && currentSet instanceof WeightSet;
  },
  act: function(tokens, token, currentSet) {
    //weight token handler
    if (tokens.length === 5) {
      currentSet.current().weight = parseFloat(tokens[0]);
      currentSet.current().reps = parseInt(tokens[3], 10);
    }
    if (tokens.length === 4) {
      convertToTimedInterval(currentSet, timeFormatter.toDuration(tokens[3]), parseFloat(tokens[0]));
    }
    if (tokens.length === 2) {
      currentSet.current().reps = parseInt(tokens[0], 10);
    }
    if (tokens.length === 1) {
      convertToTimedInterval(currentSet, timeFormatter.toDuration(tokens[0]));
    }
    return tokens.length = 0; //empty tokens - we're done
  }
};
