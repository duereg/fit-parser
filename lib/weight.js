var Weight;

module.exports = Weight = (function() {
  function Weight(options) {
    if (options) {
      this.reps = options.reps, this.weight = options.weight;
    }
    if (this.reps == null) {
      this.reps = 0;
    }
    if (this.weight == null) {
      this.weight = 0;
    }
  }

  Weight.prototype.isEmpty = function() {
    return this.reps === 0 && this.weight === 0;
  };

  Weight.prototype.toJSON = function() {
    return {
      reps: this.reps,
      weight: this.weight
    };
  };

  Weight.prototype.oneRepMax = function() {
    return this.weight / (1.0278 - (0.0278 * this.reps));
  };

  Weight.prototype.toString = function() {
    if (this.weight) {
      return "- " + this.weight + " lbs x " + this.reps + " reps";
    } else {
      return "- " + this.reps + " reps";
    }
  };

  return Weight;

})();
