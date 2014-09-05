var actions, _;

_ = require("underscore");

actions = {
  sum: function(collection, field) {
    var total;
    total = 0;
    _.each(collection, function(item) {
      if (_.isFunction(item[field])) {
        total = total + item[field]();
      } else {
        total = total + item[field];
      }
    });
    return total;
  },
  set: function(collection, amount, field, value) {
    var i, item, len;
    i = collection.length - amount;
    len = collection.length;
    while (i < len) {
      item = collection[i];
      if (_.isFunction(item[field])) {
        item[field](value);
      } else {
        item[field] = value;
      }
      i++;
    }
  }
};

module.exports = actions;
