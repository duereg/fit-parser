var WeightSet, Workout;

Workout = require('../../workout');

WeightSet = require('../../weightSet');

module.exports = {
  canHandle: function(token) {
    return token === '**';
  },
  act: function(tokens, token, currentSet, workout) {
    var name;
    tokens.unshift(token);
    name = tokens.join(' ');
    tokens.length = 0;
    if (!(workout.current() instanceof WeightSet)) {
      workout.sets.pop();
    } else {
      workout.current().intervals.pop();
    }
    return currentSet = workout.addSet(name);
  }
};