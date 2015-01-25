{expect} = require '../spec-helper'

tokens = require('../../lib/parser/handlers/tokens')

describe 'Working with the token determiner Library', ->
  describe '::isSet', ->
    it 'the string "4x100" is a Set', ->
      expect(tokens.isSet('4x100')).to.eq true

    it 'the string "4X100" is a Set', ->
      expect(tokens.isSet('4X100')).to.eq true

    it 'the string "4*100" is a Set', ->
      expect(tokens.isSet('4*100')).to.eq true

    it 'the string "4xabc" is not a Set', ->
      expect(tokens.isSet('4xabc')).to.eq false

    it 'the string "abcX200" is not a Set', ->
      expect(tokens.isSet('abcX200')).to.eq false

  describe '::isSetDivider', ->
    it 'the string "x" is a Set Divider', ->
      expect(tokens.isSetDivider('x')).to.eq true

    it 'the string "X" is a Set Divider', ->
      expect(tokens.isSetDivider('X')).to.eq true

    it 'the string "*" is a Set Divider', ->
      expect(tokens.isSetDivider('*')).to.eq true

    it 'the string "abc" is not a Set Divider', ->
      expect(tokens.isSetDivider('abc')).to.eq false

    it 'the string "4x100" is not a Set Divider', ->
      expect(tokens.isSetDivider('4x100')).to.eq false

  describe '::getRest', ->
    it 'the string "+:20" returns ":20"', ->
      expect(tokens.getRest('+:20')).to.eq ':20'

    it 'the string "+15" returns ":15"', ->
      expect(tokens.getRest('+:15')).to.eq ':15'

    it 'the string "abc" returns ""', ->
      expect(tokens.getRest('abc')).to.eq ''

    it 'the string "+abc" returns ""', ->
      expect(tokens.getRest('abc')).to.eq ''

    it 'the string "+20" returns ":20"', ->
      expect(tokens.getRest('+20')).to.eq ':20'

  describe '::isRest', ->
    it 'the string "+:20" is a rest period', ->
      expect(tokens.isRest('+:20')).to.eq true

    it 'the string "+20" is a rest period', ->
      expect(tokens.isRest('+20')).to.eq true

    it 'the string "+0:20" is a rest period', ->
      expect(tokens.isRest('+0:20')).to.eq true

    it 'the string "+1:30" is a rest period', ->
      expect(tokens.isRest('+1:30')).to.eq true

    it 'the string "abc" is not a rest period', ->
      expect(tokens.isRest('abc')).to.eq false

  describe '::isTimeDivider', ->
    it 'the string "@" is a Time Divider', ->
      expect(tokens.isTimeDivider('@')).to.eq true

    it 'the string "abc" is not a Time Divider', ->
      expect(tokens.isTimeDivider('abc')).to.eq false

  describe '::isWeightSet', ->
    it 'the string that is bracketed with "**" is a weight set regex', ->
      expect(tokens.isWeightSet('** Squats **')).to.eq true

    it 'the string that contains a single "*" is not a weight set regex', ->
      expect(tokens.isWeightSet('4*100 @ 1:30')).to.eq false

  describe '::isTime', ->
    it 'the string "1:00:00" is a Time', ->
      expect(tokens.isTime('1:00:00')).to.eq true

    it 'the string "2:00:00" is a Time', ->
      expect(tokens.isTime('2:00:00')).to.eq true

    it 'the string "1:30" is a Time', ->
      expect(tokens.isTime('1:30')).to.eq true

    it 'the string "90:00" is a Time', ->
      expect(tokens.isTime('90:00')).to.eq true

    it 'the string "0:45" is a Time', ->
      expect(tokens.isTime('0:45')).to.eq true

    it 'the string ":20" is a Time', ->
      expect(tokens.isTime(':20')).to.eq true

    it 'the string "20" is a Time', ->
      expect(tokens.isTime('20')).to.eq true

    it 'the string "a:30" is not a Time', ->
      expect(tokens.isTime('a:30')).to.eq false

    it 'the string "2:3z" is not a Time', ->
      expect(tokens.isTime('2:3z')).to.eq false


# describe('::parseTime', function() {
#   it('the string '123' parses to a number', function () {
#     expect(tokens.parseTime('123')).to.eq(123);
#   });

#   it('the string 'abc', with default set to 10, to be 10', function () {
#     expect(tokens.parseTime('abc')).to.eq(10);
#   });
# });
