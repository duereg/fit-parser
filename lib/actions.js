var actions, _;

_ = require("underscore");

actions = {
  sum: function(collection, field) {
    var total;
    total = 0;
    _.each(collection, function(item) {
      if (_.isFunction(item[field])) {
        total = total + item[field]();
      } else if (_.isString(item[field])) {
        total = item[field];
      } else {
        total = total + item[field];
      }
    });
    return total;
  },
  set: function(collection, field, value) {
    var item, _i, _len;
    for (_i = 0, _len = collection.length; _i < _len; _i++) {
      item = collection[_i];
      if (_.isFunction(item[field])) {
        item[field](value);
      } else {
        item[field] = value;
      }
    }
  }
};

module.exports = actions;
