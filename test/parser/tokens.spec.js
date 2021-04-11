var expect, tokens;

({expect} = require('../spec-helper'));

tokens = require('../../lib/parser/handlers/tokens');

describe('Working with the token determiner Library', function() {
  describe('::isSet', function() {
    it('the string "4x100" is a Set', function() {
      return expect(tokens.isSet('4x100')).to.eq(true);
    });
    it('the string "4X100" is a Set', function() {
      return expect(tokens.isSet('4X100')).to.eq(true);
    });
    it('the string "4*100" is a Set', function() {
      return expect(tokens.isSet('4*100')).to.eq(true);
    });
    it('the string "4xabc" is not a Set', function() {
      return expect(tokens.isSet('4xabc')).to.eq(false);
    });
    return it('the string "abcX200" is not a Set', function() {
      return expect(tokens.isSet('abcX200')).to.eq(false);
    });
  });
  describe('::isSetDivider', function() {
    it('the string "x" is a Set Divider', function() {
      return expect(tokens.isSetDivider('x')).to.eq(true);
    });
    it('the string "X" is a Set Divider', function() {
      return expect(tokens.isSetDivider('X')).to.eq(true);
    });
    it('the string "*" is a Set Divider', function() {
      return expect(tokens.isSetDivider('*')).to.eq(true);
    });
    it('the string "abc" is not a Set Divider', function() {
      return expect(tokens.isSetDivider('abc')).to.eq(false);
    });
    return it('the string "4x100" is not a Set Divider', function() {
      return expect(tokens.isSetDivider('4x100')).to.eq(false);
    });
  });
  describe('::getRest', function() {
    it('the string "+:20" returns ":20"', function() {
      return expect(tokens.getRest('+:20')).to.eq(':20');
    });
    it('the string "+15" returns ":15"', function() {
      return expect(tokens.getRest('+:15')).to.eq(':15');
    });
    it('the string "abc" returns ""', function() {
      return expect(tokens.getRest('abc')).to.eq('');
    });
    it('the string "+abc" returns ""', function() {
      return expect(tokens.getRest('abc')).to.eq('');
    });
    return it('the string "+20" returns ":20"', function() {
      return expect(tokens.getRest('+20')).to.eq(':20');
    });
  });
  describe('::isRest', function() {
    it('the string "+:20" is a rest period', function() {
      return expect(tokens.isRest('+:20')).to.eq(true);
    });
    it('the string "+20" is a rest period', function() {
      return expect(tokens.isRest('+20')).to.eq(true);
    });
    it('the string "+0:20" is a rest period', function() {
      return expect(tokens.isRest('+0:20')).to.eq(true);
    });
    it('the string "+1:30" is a rest period', function() {
      return expect(tokens.isRest('+1:30')).to.eq(true);
    });
    return it('the string "abc" is not a rest period', function() {
      return expect(tokens.isRest('abc')).to.eq(false);
    });
  });
  describe('::isTimeDivider', function() {
    it('the string "@" is a Time Divider', function() {
      return expect(tokens.isTimeDivider('@')).to.eq(true);
    });
    return it('the string "abc" is not a Time Divider', function() {
      return expect(tokens.isTimeDivider('abc')).to.eq(false);
    });
  });
  return describe('::isTime', function() {
    it('the string "1:00:00" is a Time', function() {
      return expect(tokens.isTime('1:00:00')).to.eq(true);
    });
    it('the string "2:00:00" is a Time', function() {
      return expect(tokens.isTime('2:00:00')).to.eq(true);
    });
    it('the string "1:30" is a Time', function() {
      return expect(tokens.isTime('1:30')).to.eq(true);
    });
    it('the string "90:00" is a Time', function() {
      return expect(tokens.isTime('90:00')).to.eq(true);
    });
    it('the string "0:45" is a Time', function() {
      return expect(tokens.isTime('0:45')).to.eq(true);
    });
    it('the string ":20" is a Time', function() {
      return expect(tokens.isTime(':20')).to.eq(true);
    });
    it('the string "20" is a Time', function() {
      return expect(tokens.isTime('20')).to.eq(true);
    });
    it('the string "a:30" is not a Time', function() {
      return expect(tokens.isTime('a:30')).to.eq(false);
    });
    return it('the string "2:3z" is not a Time', function() {
      return expect(tokens.isTime('2:3z')).to.eq(false);
    });
  });
});

// describe('::parseTime', function() {
//   it('the string '123' parses to a number', function () {
//     expect(tokens.parseTime('123')).to.eq(123);
//   });

//   it('the string 'abc', with default set to 10, to be 10', function () {
//     expect(tokens.parseTime('abc')).to.eq(10);
//   });
// });
