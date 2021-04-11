const moment = require('moment');
const _ = require('lodash');
const IntervalSet = require('../lib/intervalSet');
const {expect, intervals, jsonIntervals} = require('./spec-helper');

describe('IntervalSet', function() {
  var set;
  ({set} = {});
  describe('Given a number of intervals', function() {
    beforeEach(function() {
      return set = new IntervalSet(4);
    });
    it('creates a populated array', function() {
      return expect(set.intervals.length).to.eq(4);
    });
    it('::isEmpty returns false', function() {
      return expect(set.isEmpty()).to.be.false;
    });
    return describe('setting distance', function() {
      beforeEach(function() {
        return set.distance = 100;
      });
      return it('sets the distance on the underlying intervals', function() {
        return expect(_.every(set.intervals, (interval) => {
          return interval.distance === 100;
        })).to.be.true;
      });
    });
  });
  describe('given intervals', function() {
    beforeEach(function() {
      return set = new IntervalSet(jsonIntervals);
    });
    it('creates hydrated intervals from given JSON', function() {
      return expect(JSON.stringify(set.intervals)).to.eq(JSON.stringify(intervals));
    });
    describe('::toString', function() {
      return it('displays correct notation for all intervals', function() {
        return expect(set.toString()).to.eq('3x100 huho @ 1:30');
      });
    });
    describe('::toJSON', function() {
      return it('outputs JSON matching original input', function() {
        return expect(set.toJSON()).to.eql({
          intervals: jsonIntervals
        });
      });
    });
    return describe('::time', function() {
      return it('returns summed milliseconds from the intervals', function() {
        return expect(set.time).to.eq(270000);
      });
    });
  });
  return describe('Creating an empty set', function() {
    beforeEach(function() {
      return set = new IntervalSet();
    });
    it('creates an array of empty intervals', function() {
      return expect(set.intervals).to.eql([]);
    });
    it('outputs an empty string', function() {
      return expect(set.toString()).to.eq('');
    });
    it('::isEmpty returns true', function() {
      return expect(set.isEmpty()).to.be.true;
    });
    describe('::current', function() {
      var interval;
      ({interval} = {});
      beforeEach(function() {
        return interval = set.current();
      });
      it('creates a new interval if called when empty', function() {
        return expect(set.intervals.length).to.eq(1);
      });
      return it('creates a valid interval', function() {
        return expect(interval).to.be.ok;
      });
    });
    describe('::add', function() {
      it('calling with null throws', function() {
        return expect(function() {
          return set.add(null);
        }).to.throw('Invalid interval given');
      });
      return it('calling with no params creates an empty interval', function() {
        return expect(set.add()).to.be.ok;
      });
    });
    return describe('with multiple intervals', function() {
      beforeEach(function() {
        return intervals.forEach(function(interval) {
          return set.add(interval);
        });
      });
      describe('::toString', function() {
        return it('displays correct set notation for all intervals', function() {
          return expect(set.toString()).to.eq('3x100 huho @ 1:30');
        });
      });
      describe('distance', function() {
        return it('sums the distances correctly', function() {
          return expect(set.distance).to.eq(300);
        });
      });
      describe('::toJSON', function() {
        return it('outputs correct information', function() {
          return expect(set.toJSON()).to.eql({
            intervals: jsonIntervals
          });
        });
      });
      return describe('time', function() {
        var time;
        ({time} = {});
        beforeEach(function() {
          return time = moment.duration(set.time);
        });
        return it('sums the times correctly', function() {
          expect(time.minutes()).to.eq(4);
          return expect(time.seconds()).to.eq(30);
        });
      });
    });
  });
});
