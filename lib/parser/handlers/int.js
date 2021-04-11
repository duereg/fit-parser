// code snippets stolen from
// http://usefulscripts.wordpress.com/2008/10/02/integer-parsing-in-javascript/
var integer;

integer = {
  isNumRegEx: /^\d+$/,
  isNumber: function(num) {
    return this.isNumRegEx.test(num);
  }
};

module.exports = integer;
