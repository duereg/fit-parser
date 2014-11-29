module.exports = {
  canHandle: function(token) {
    return true;
  },
  act: function(tokens, token, currentSet, workout) {
    var name;
    if (currentSet.current().isEmpty()) {
      currentSet.intervals.pop();
      tokens.unshift(token);
      name = tokens.join(' ');
      tokens.length = 0;
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