var actions;

actions = require("./actions");

module.exports = function(target, intervals, key) {
  return Object.defineProperty(target, key, {
    enumerable: true,
    set: function(value) {
      return actions.set(intervals, key, value);
    },
    get: function() {
      return actions.sum(intervals, key);
    }
  });
};
