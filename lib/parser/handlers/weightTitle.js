const Workout = require('../../workout');
const WeightSet = require('../../weightSet');

module.exports = {
  canHandle: function(token) {
    return token === '**';
  },
  act: function(tokens, token, currentSet, workout) {
    //weight token handler
    tokens.unshift(token); //add token back to tokens
    const name = tokens.join(' '); //generate name from all strings
    tokens.length = 0; //empty tokens - we're done
    if (!(workout.current() instanceof WeightSet)) {
      workout.sets.pop(); //remove created set
    } else {
      workout.current().intervals.pop();
    }
    return currentSet = workout.addSet(name); //recreate as correct type
  }
};
