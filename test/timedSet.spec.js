var Interval, TimedSet, duration, expect, intervals, jsonIntervals, oneMinuteThirty;

duration = require('moment').duration;

TimedSet = require('../lib/timedSet');

Interval = require('../lib/interval');

({expect, intervals, jsonIntervals, oneMinuteThirty} = require('./spec-helper'));

describe('TimedSet', function() {
  var timedSet;
  ({timedSet} = {});
  describe('unnamed timedSet', function() {
    beforeEach(function() {
      return timedSet = new TimedSet();
    });
    return describe('::toString', function() {
      return it('outputs nothing without content', function() {
        return expect(timedSet.toString()).to.eq('');
      });
    });
  });
  describe('named timedSet with intervals', function() {
    beforeEach(function() {
      return timedSet = new TimedSet({
        name: 'timedSet 2',
        intervals: jsonIntervals
      });
    });
    it('creates hydrated intervals from given JSON', function() {
      return expect(JSON.stringify(timedSet.intervals)).to.eq(JSON.stringify(intervals));
    });
    it('timedSets the name', function() {
      return expect(timedSet.name).to.eq('timedSet 2');
    });
    describe('::toString', function() {
      return it('displays correct notation for all intervals', function() {
        return expect(timedSet.toString()).to.eq('timedSet 2\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30');
      });
    });
    return describe('::toJSON', function() {
      return it('outputs JSON matching original input', function() {
        return expect(timedSet.toJSON()).to.eql({
          name: 'timedSet 2',
          intervals: jsonIntervals
        });
      });
    });
  });
  describe('named timedSet with intervals', function() {
    beforeEach(function() {
      return timedSet = new TimedSet({
        name: 'timedSet 2',
        intervals: [
          {
            intervals: jsonIntervals
          }
        ]
      });
    });
    it('creates one interval', function() {
      return expect(timedSet.intervals.length).to.eq(1);
    });
    it('sets the name', function() {
      return expect(timedSet.name).to.eq('timedSet 2');
    });
    describe('::toString', function() {
      return it('displays correct notation for all intervals', function() {
        return expect(timedSet.toString()).to.eq('timedSet 2\n3x100 huho @ 1:30');
      });
    });
    return describe('::toJSON', function() {
      return it('outputs JSON matching original input', function() {
        return expect(timedSet.toJSON()).to.eql({
          name: 'timedSet 2',
          intervals: [
            {
              intervals: jsonIntervals
            }
          ]
        });
      });
    });
  });
  return describe('named timedSet', function() {
    beforeEach(function() {
      return timedSet = new TimedSet({
        name: 'timedSet 1'
      });
    });
    it('creates an array of empty intervals', function() {
      return expect(timedSet.intervals).to.eql([]);
    });
    it('timedSets the name', function() {
      return expect(timedSet.name).to.eq('timedSet 1');
    });
    describe('::current', function() {
      var interval;
      ({interval} = {});
      beforeEach(function() {
        return interval = timedSet.current();
      });
      it('creates a new interval if called when empty', function() {
        return expect(timedSet.intervals.length).to.eq(1);
      });
      it('creates a valid interval', function() {
        return expect(interval).to.be.ok;
      });
      return describe('::setTime(string)', function() {
        beforeEach(function() {
          return timedSet.setTime('1:30');
        });
        return it('parses time correctly and timedSets a duration', function() {
          return expect(timedSet.current().time).to.eql(duration(oneMinuteThirty));
        });
      });
    });
    describe('::add', function() {
      it('calling with null throws', function() {
        return expect(function() {
          return timedSet.add(null);
        }).to.throw('Invalid interval given');
      });
      return it('calling with no params creates an empty interval', function() {
        return expect(timedSet.add()).to.be.ok;
      });
    });
    describe('::changeToMulti', function() {
      beforeEach(function() {
        timedSet.current().distance = 2;
        return timedSet.changeToMulti();
      });
      it('removes the previous interval', function() {
        return expect(timedSet.current().distance).not.to.eq(2);
      });
      it('creates an timedSet to replace the previous interval', function() {
        return expect(timedSet.current().intervals.length).to.eq(2);
      });
      return describe('::toJSON', function() {
        return it('outputs correct information', function() {
          return expect(timedSet.toJSON()).to.eql({
            name: 'timedSet 1',
            intervals: [
              {
                intervals: [new Interval().toJSON(),
              new Interval().toJSON()]
              }
            ]
          });
        });
      });
    });
    return describe('with added intervals', function() {
      beforeEach(function() {
        return intervals.forEach(function(interval) {
          return timedSet.add(interval);
        });
      });
      describe('::toString', function() {
        return it('displays correct notation for all intervals', function() {
          return expect(timedSet.toString()).to.eq('timedSet 1\n100 huho @ 1:30\n100 huho @ 1:30\n100 huho @ 1:30');
        });
      });
      return describe('::toJSON', function() {
        return it('outputs correct information', function() {
          return expect(timedSet.toJSON()).to.eql({
            name: 'timedSet 1',
            intervals: jsonIntervals
          });
        });
      });
    });
  });
});
