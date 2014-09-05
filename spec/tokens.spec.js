var tokens = require('../lib/app/tokens.js');

describe('Working with the token determiner Library', function () {

  describe("Testing isSet", function() {
    it('the string "4x100" is a Set', function () { 
      expect(tokens.isSet("4x100")).toBe(true);
    });  

    it('the string "4X100" is a Set', function () { 
      expect(tokens.isSet("4X100")).toBe(true);
    }); 

    it('the string "4*100" is a Set', function () { 
      expect(tokens.isSet("4*100")).toBe(true);
    }); 

    it('the string "4xabc" is not a Set', function () { 
      expect(tokens.isSet("4xabc")).toBe(false);
    }); 

    it('the string "abcX200" is not a Set', function () { 
      expect(tokens.isSet("abcX200")).toBe(false);
    }); 
  });

  describe("Testing isSetDivider", function() {
    it('the string "x" is a Set Divider', function () { 
      expect(tokens.isSetDivider("x")).toBe(true);
    });  

    it('the string "X" is a Set Divider', function () { 
      expect(tokens.isSetDivider("X")).toBe(true);
    });  

    it('the string "*" is a Set Divider', function () { 
      expect(tokens.isSetDivider("*")).toBe(true);
    });  

    it('the string "abc" is not a Set Divider', function () { 
      expect(tokens.isSetDivider("abc")).toBe(false);
    }); 

    it('the string "4x100" is not a Set Divider', function () { 
      expect(tokens.isSetDivider("4x100")).toBe(false);
    });
  });

  describe("Testing isTimeDivider", function() {
    it('the string "@" is a Time Divider', function () { 
      expect(tokens.isTimeDivider("@")).toBe(true);
    });  

    it('the string "abc" is not a Time Divider', function () { 
      expect(tokens.isTimeDivider("abc")).toBe(false);
    }); 
  });

  describe("Testing isTime", function() {
    it('the string "1:30" is a Time', function () { 
      expect(tokens.isTime("1:30")).toBe(true);
    });  

    it('the string "0:45" is a Time', function () { 
      expect(tokens.isTime("0:45")).toBe(true);
    });  
    
    it('the string ":20" is a Time', function () { 
      expect(tokens.isTime(":20")).toBe(true);
    }); 

    it('the string "a:30" is not a Time', function () { 
      expect(tokens.isTime("a:30")).toBe(false);
    });  

    it('the string "2:3z" is not a Time', function () { 
      expect(tokens.isTime("2:3z")).toBe(false);
    }); 
  });

  // describe("Testing parseTime", function() {
  //   it('the string "123" parses to a number', function () { 
  //     expect(tokens.parseTime("123")).toBe(123);
  //   });  

  //   it('the string "abc", with default set to 10, to be 10', function () { 
  //     expect(tokens.parseTime("abc")).toBe(10);
  //   }); 
  // });
});