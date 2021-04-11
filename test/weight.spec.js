const {expect} = require('./spec-helper');
const Weight = require('../lib/weight');

describe('Weight', function() {
  var tenReps;
  ({tenReps} = {});
  beforeEach(function() {
    return tenReps = new Weight();
  });
  describe('::isEmpty', function() {
    return it('is true for weight with default values', function() {
      return expect(tenReps.isEmpty()).to.be.true;
    });
  });
  describe('w/o weight ::toString', function() {
    beforeEach(function() {
      return tenReps.reps = 20;
    });
    return it('formats correctly', function() {
      return expect(tenReps.toString()).to.eq('- 20 reps');
    });
  });
  return describe('w/ weight ::toString', function() {
    beforeEach(function() {
      tenReps.weight = 135;
      return tenReps.reps = 10;
    });
    it('with time not set, formats correctly', function() {
      return expect(tenReps.toString()).to.eq('- 135 lbs x 10 reps');
    });
    describe('::oneRepMax', function() {
      return it('outputs the correct value', function() {
        return expect(Math.round(tenReps.oneRepMax())).to.eq(180);
      });
    });
    return describe('::toJSON', function() {
      var json;
      ({json} = {});
      beforeEach(function() {
        return json = tenReps.toJSON();
      });
      it('outputs correctly', function() {
        return expect(json).to.eql({
          weight: 135,
          reps: 10
        });
      });
      return describe('creating new weight from JSON', function() {
        var newWeight;
        newWeight = null;
        beforeEach(function() {
          return newWeight = new Weight(json);
        });
        return it('outputs the same as the original', function() {
          return expect(newWeight.toString()).to.eq('- 135 lbs x 10 reps');
        });
      });
    });
  });
});
