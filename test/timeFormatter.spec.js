const {expect} = require('./spec-helper');
const timeFormatter = require('../lib/timeFormatter');
const moment = require('moment');
const _ = require('lodash');

describe('timeFormatter', function() {
  var duration, noTime;
  ({duration, noTime} = {});
  beforeEach(function() {
    return moment.duration(timeFormatter.noTime);
  });
  describe('given invalid time', function() {
    return it('throws', function() {
      return expect(timeFormatter).to.throw;
    });
  });
  describe('::isEmpty', function() {
    var fiveMinutes;
    ({fiveMinutes} = {});
    describe('given a duration', function() {
      beforeEach(function() {
        return fiveMinutes = moment.duration({
          minutes: 5
        });
      });
      return it('returns a valid representation', function() {
        return expect(timeFormatter.isEmpty(fiveMinutes)).to.be.false;
      });
    });
    return describe('given a number', function() {
      beforeEach(function() {
        return fiveMinutes = 5 * 60 * 1000;
      });
      return it('returns a valid representation', function() {
        return expect(timeFormatter.isEmpty(fiveMinutes)).to.be.true;
      });
    });
  });
  describe('::toDuration', function() {
    var fiveMinutes;
    ({fiveMinutes} = {});
    describe('given a duration', function() {
      beforeEach(function() {
        return fiveMinutes = moment.duration({
          minutes: 5
        });
      });
      return it('returns a valid representation', function() {
        return expect(timeFormatter.toDuration(fiveMinutes)).to.eql(fiveMinutes);
      });
    });
    describe('given a number', function() {
      beforeEach(function() {
        return fiveMinutes = 5 * 60 * 1000;
      });
      return it('returns a valid representation', function() {
        return expect(timeFormatter.toDuration(fiveMinutes)).to.eql(moment.duration({
          minutes: 5
        }));
      });
    });
    return describe("given a string", function() {
      it("':20' returns a 20 second duration", function() {
        return expect(timeFormatter.toDuration(":20").seconds()).to.eq(20);
      });
      it("'20' returns a 20 second duration", function() {
        return expect(timeFormatter.toDuration("20").seconds()).to.eq(20);
      });
      it("'1:15' returns a 1 minute 15 second duration", function() {
        expect(timeFormatter.toDuration("1:15").minutes()).to.eq(1);
        return expect(timeFormatter.toDuration("1:15").seconds()).to.eq(15);
      });
      return it("'1:25:45' returns a 1 hour, 25 minute, 45 second duration", function() {
        expect(timeFormatter.toDuration("1:25:45").hours()).to.eq(1);
        expect(timeFormatter.toDuration("1:25:45").minutes()).to.eq(25);
        return expect(timeFormatter.toDuration("1:25:45").seconds()).to.eq(45);
      });
    });
  });
  describe('::toJSON', function() {
    var fiveMinutes;
    ({fiveMinutes} = {});
    describe('given a duration', function() {
      beforeEach(function() {
        return fiveMinutes = moment.duration({
          minutes: 5
        });
      });
      return it('returns a valid representation', function() {
        return expect(timeFormatter.toJSON(fiveMinutes)).to.eql(_.defaults({
          minutes: 5
        }, timeFormatter.noTime));
      });
    });
    describe('given crap', function() {
      beforeEach(function() {
        return fiveMinutes = 'abc';
      });
      return it('returns the empty time representation', function() {
        return expect(timeFormatter.toJSON(fiveMinutes)).to.eql(timeFormatter.noTime);
      });
    });
    return describe('given null', function() {
      beforeEach(function() {
        return fiveMinutes = null;
      });
      return it('returns the empty time representation', function() {
        return expect(timeFormatter.toJSON(fiveMinutes)).to.eql(timeFormatter.noTime);
      });
    });
  });
  return describe('::toString', function() {
    var fiveHours, fiveMinutes, oneHourFiveMinutes;
    ({fiveMinutes, fiveHours, oneHourFiveMinutes} = {});
    describe('given a number of milliseconds', function() {
      beforeEach(function() {
        return fiveMinutes = 5 * 60 * 1000;
      });
      return it('returns a valid representation', function() {
        return expect(timeFormatter.toString(fiveMinutes)).to.eq('5:00');
      });
    });
    describe('given a object with time properties', function() {
      describe('in minutes', function() {
        beforeEach(function() {
          return fiveMinutes = {
            minutes: 5
          };
        });
        return it('returns a valid representation', function() {
          return expect(timeFormatter.toString(fiveMinutes)).to.eq('5:00');
        });
      });
      return describe('in hours', function() {
        beforeEach(function() {
          return fiveHours = {
            hours: 5
          };
        });
        return it('returns a valid representation', function() {
          return expect(timeFormatter.toString(fiveHours)).to.eq('5:00:00');
        });
      });
    });
    return describe('given a duration', function() {
      describe('in minutes', function() {
        beforeEach(function() {
          return fiveMinutes = moment.duration({
            minutes: 5
          });
        });
        return it('returns a valid representation', function() {
          return expect(timeFormatter.toString(fiveMinutes)).to.eq('5:00');
        });
      });
      return describe('in hours and minutes', function() {
        beforeEach(function() {
          return oneHourFiveMinutes = moment.duration({
            minutes: 5,
            hours: 1
          });
        });
        return it('returns a valid representation', function() {
          return expect(timeFormatter.toString(oneHourFiveMinutes)).to.eq('1:05:00');
        });
      });
    });
  });
});
