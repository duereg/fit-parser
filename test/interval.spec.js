const {expect} = require('./spec-helper');
const Interval = require('../lib/interval');
const timeFormatter = require('../lib/timeFormatter');
const moment = require('moment');
const _ = require('underscore');

describe('interval', function() {
  var int;
  ({int} = {});
  beforeEach(function() {
    return int = new Interval();
  });
  describe('::isEmpty', function() {
    return it('is true for interval with default values', function() {
      return expect(int.isEmpty()).to.be.true;
    });
  });
  describe('w/o distance ::toString', function() {
    beforeEach(function() {
      int.type = 'rest';
      return int.time = moment.duration('00:20:00');
    });
    return it('formats correctly', function() {
      return expect(int.toString()).to.eq('20:00 rest');
    });
  });
  return describe('w/ distance ::toString', function() {
    beforeEach(function() {
      int.type = 'huho';
      return int.distance = 100;
    });
    it('with time not set, formats correctly', function() {
      return expect(int.toString()).to.eq('100 huho');
    });
    describe('w/ rest', function() {
      describe('with second intervals', function() {
        beforeEach(function() {
          return int.rest = moment.duration('00:00:30');
        });
        return it('formats minutes correctly', function() {
          return expect(int.toString()).to.eq('100 huho +0:30');
        });
      });
      describe('with minute intervals', function() {
        beforeEach(function() {
          return int.rest = moment.duration('00:01:30');
        });
        return it('formats minutes correctly', function() {
          return expect(int.toString()).to.eq('100 huho +1:30');
        });
      });
      return describe('with hour intervals', function() {
        beforeEach(function() {
          return int.rest = moment.duration('02:30:15');
        });
        return it('formats hours correctly', function() {
          return expect(int.toString()).to.eq('100 huho +2:30:15');
        });
      });
    });
    return describe('time', function() {
      describe('with second intervals', function() {
        beforeEach(function() {
          return int.time = moment.duration('00:00:30');
        });
        it('formats minutes correctly', function() {
          return expect(int.toString()).to.eq('100 huho @ 0:30');
        });
        return describe('::toJSON', function() {
          var json;
          ({json} = {});
          beforeEach(function() {
            return json = int.toJSON();
          });
          it('outputs correctly', function() {
            return expect(json).to.eql({
              time: _({
                seconds: 30
              }).defaults(timeFormatter.noTime),
              rest: timeFormatter.noTime,
              distance: 100,
              type: 'huho'
            });
          });
          return describe('creating new interval from JSON', function() {
            var newInterval;
            newInterval = null;
            beforeEach(function() {
              return newInterval = new Interval(json);
            });
            return it('outputs the same as the original', function() {
              return expect(newInterval.toString()).to.eq('100 huho @ 0:30');
            });
          });
        });
      });
      describe('with minute intervals', function() {
        beforeEach(function() {
          return int.time = moment.duration('00:01:30');
        });
        return it('formats minutes correctly', function() {
          return expect(int.toString()).to.eq('100 huho @ 1:30');
        });
      });
      return describe('with hour intervals', function() {
        beforeEach(function() {
          return int.time = moment.duration('02:30:15');
        });
        return it('formats hours correctly', function() {
          return expect(int.toString()).to.eq('100 huho @ 2:30:15');
        });
      });
    });
  });
});
