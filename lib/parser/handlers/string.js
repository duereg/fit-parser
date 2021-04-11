module.exports = {
  canHandle: function(token) {
    return true;
  },
  act: function(tokens, token, currentSet, workout) {
    var name;
    //string token handler
    if (currentSet.current().isEmpty()) {
      currentSet.intervals.pop(); //Delete created interval - not needed
      tokens.unshift(token); //add token back to tokens
      name = tokens.join(' '); //generate name from all strings
      tokens.length = 0; //empty tokens - we're done
      if (currentSet.name.isEmpty()) {
        return currentSet.name = name;
      } else {
        return currentSet = workout.addSet(name);
      }
    } else {
      return currentSet.setType(token);
    }
  }
};
