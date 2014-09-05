//code snippets stolen from http://usefulscripts.wordpress.com/2008/10/02/integer-parsing-in-javascript/
var integer = {

  isNumRegEx: /^\d+$/,

  tryParse: function(str,defaultValue) {
    var retValue = defaultValue;
    if(this.isNumber(str)) {
      retValue = parseInt(str);
    }
    return retValue;
  }, 
 
  isNumber: function(num) {
    return this.isNumRegEx.test(num);
  }
};

module.exports = integer;