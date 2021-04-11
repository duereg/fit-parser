const _ = require('lodash');

const actions = {
  sum(collection, field) {
    let total = 0;
    _.forEach(collection, function(item) {
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
  set(collection, field, value) {
    let i, item, len;
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
