var Weight, WeightSet, duration, expect, hydratedWeights, jsonWeights;

duration = require('moment').duration;

WeightSet = require('../lib/weightSet');

Weight = require('../lib/weight');

({expect} = require('./spec-helper'));

jsonWeights = [
  {
    weight: 155,
    reps: 10
  },
  {
    weight: 145,
    reps: 10
  },
  {
    weight: 135,
    reps: 10
  }
];

hydratedWeights = jsonWeights.map(function(weight) {
  return new Weight(weight);
});

describe('WeightSet', function() {
  var weightSet;
  ({weightSet} = {});
  describe('unnamed weightSet', function() {
    beforeEach(function() {
      return weightSet = new WeightSet();
    });
    return describe('::toString', function() {
      return it('outputs nothing without content', function() {
        return expect(weightSet.toString()).to.eq('');
      });
    });
  });
  describe('named weightSet with intervals', function() {
    beforeEach(function() {
      return weightSet = new WeightSet({
        name: 'weightSet 2',
        intervals: jsonWeights
      });
    });
    it('creates hydrated intervals from given JSON', function() {
      return expect(weightSet.intervals).to.eql(hydratedWeights);
    });
    it('sets the name', function() {
      return expect(weightSet.name).to.eq('weightSet 2');
    });
    describe('::toString', function() {
      return it('displays correct notation for all intervals', function() {
        return expect(weightSet.toString()).to.eq('weightSet 2\n- 155 lbs x 10 reps\n- 145 lbs x 10 reps\n- 135 lbs x 10 reps');
      });
    });
    describe('::toJSON', function() {
      return it('outputs JSON matching original input', function() {
        return expect(weightSet.toJSON()).to.eql({
          name: 'weightSet 2',
          intervals: jsonWeights
        });
      });
    });
    return describe('::oneRepMax', function() {
      return it('takes the maximum value from the intervals', function() {
        return expect(Math.round(weightSet.oneRepMax())).to.eq(207);
      });
    });
  });
  return describe('named weightSet', function() {
    beforeEach(function() {
      return weightSet = new WeightSet({
        name: 'weightSet 1'
      });
    });
    it('creates an array of empty intervals', function() {
      return expect(weightSet.intervals).to.eql([]);
    });
    it('sets the name', function() {
      return expect(weightSet.name).to.eq('weightSet 1');
    });
    describe('::current', function() {
      var interval;
      ({interval} = {});
      beforeEach(function() {
        return interval = weightSet.current();
      });
      it('creates a new interval if called when empty', function() {
        return expect(weightSet.intervals.length).to.eq(1);
      });
      it('creates a valid interval', function() {
        return expect(interval).to.be.ok;
      });
      return describe('::setWeight(number)', function() {
        beforeEach(function() {
          return weightSet.setWeight(155);
        });
        return it('sets the weight', function() {
          return expect(weightSet.current().weight).to.eq(155);
        });
      });
    });
    describe('::add', function() {
      it('calling with null throws', function() {
        return expect(function() {
          return weightSet.add(null);
        }).to.throw('Invalid weight given');
      });
      return it('calling with no params creates an empty interval', function() {
        return expect(weightSet.add()).to.be.ok;
      });
    });
    return describe('with added intervals', function() {
      beforeEach(function() {
        return jsonWeights.forEach(function(weight) {
          return weightSet.add(weight);
        });
      });
      describe('::toString', function() {
        return it('displays correct notation for all intervals', function() {
          return expect(weightSet.toString()).to.eq('weightSet 1\n- 155 lbs x 10 reps\n- 145 lbs x 10 reps\n- 135 lbs x 10 reps');
        });
      });
      return describe('::toJSON', function() {
        return it('outputs correct information', function() {
          return expect(weightSet.toJSON()).to.eql({
            name: 'weightSet 1',
            intervals: jsonWeights
          });
        });
      });
    });
  });
});
