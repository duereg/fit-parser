var integer;

integer = {
  isNumRegEx: /^\d+$/,
  tryParse: function(str, defaultValue) {
    if (this.isNumber(str)) {
      defaultValue = parseInt(str);
    }
    return defaultValue;
  },
  isNumber: function(num) {
    return this.isNumRegEx.test(num);
  }
};

module.exports = integer;
