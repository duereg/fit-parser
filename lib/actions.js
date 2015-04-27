var _, actions;

_ = require('underscore');

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
    var i, item, len;
    for (i = 0, len = collection.length; i < len; i++) {
      item = collection[i];
      if (_.isFunction(item[field])) {
        item[field](value);
      } else {
        item[field] = value;
      }
    }
  }
};

module.exports = actions;
