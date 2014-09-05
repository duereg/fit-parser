var integer = require('../lib/app/int.js');

describe('Working with the Integer Library', function () {

  describe("Testing tryParse", function() {
    it('the string "123" parses to a number', function () { 
      expect(integer.tryParse("123", 0)).toBe(123);
    });  

    it('the string "abc", with default set to 10, to be 10', function () { 
      expect(integer.tryParse("abc", 10)).toBe(10);
    }); 
  });

  describe("Testing isNumber", function() {
    it('the string "123" returns true', function () { 
      expect(integer.isNumber("123")).toBe(true);
    });  

    it('the string "abc" returns false', function () { 
      expect(integer.isNumber("abc")).toBe(false);
    }); 
  });

});
