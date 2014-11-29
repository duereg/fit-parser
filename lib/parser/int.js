var integer;

integer = {
  isNumRegEx: /^\d+$/,
  isNumber: function(num) {
    return this.isNumRegEx.test(num);
  }
};

module.exports = integer;
