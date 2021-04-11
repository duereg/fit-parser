var Weight;

module.exports = Weight = class Weight {
  constructor(options) {
    if (options) {
      ({reps: this.reps, weight: this.weight} = options);
    }
    if (this.reps == null) {
      this.reps = 0;
    }
    if (this.weight == null) {
      this.weight = 0;
    }
  }

  isEmpty() {
    return this.reps === 0 && this.weight === 0;
  }

  toJSON() {
    return {reps: this.reps, weight: this.weight};
  }

  oneRepMax() {
    return this.weight / (1.0278 - (0.0278 * this.reps));
  }

  toString() {
    if (this.weight) {
      return `- ${this.weight} lbs x ${this.reps} reps`;
    } else {
      return `- ${this.reps} reps`;
    }
  }

};
