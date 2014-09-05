var _ = require("underscore");

module.exports.sum = function(collection, field) {
  var total = 0;

  _.each(collection, function(item) { 
    if(_.isFunction(item[field]) ) {
      total = total + item[field]();
    } else {
      total = total + item[field];   
    }
  });

  return total;
};

module.exports.set = function(collection, amount, field, value) {
  for(var i = collection.length - amount, len = collection.length; i < len; i ++) {
    var item = collection[i];
    if(_.isFunction(item[field]) ) {
      item[field](value);
    } else {
      item[field] = value;   
    }
  }  
};