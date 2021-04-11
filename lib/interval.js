//NUM_INTERVALS X DISTANCE TYPE @ TIME
const timeFormatter = require('./timeFormatter');

class Interval {
  constructor(options) {
    if (options) {
      ({distance: this.distance, type: this.type, time: this.time, rest: this.rest} = options);
    }
    if (this.distance == null) {
      this.distance = 0;
    }
    if (this.type == null) {
      this.type = '';
    }
    this.rest = timeFormatter.toDuration(this.rest);
    this.time = timeFormatter.toDuration(this.time);
  }

  isEmpty() {
    return this.distance === 0 && this.type === '' && timeFormatter.isEmpty(this.time) && timeFormatter.isEmpty(this.rest);
  }

  toJSON() {
    return {
      time: timeFormatter.toJSON(this.time),
      rest: timeFormatter.toJSON(this.rest),
      distance: this.distance,
      type: this.type
    };
  }

  toString() {
    var time;
    if (!timeFormatter.isEmpty(this.time) || !timeFormatter.isEmpty(this.rest)) {
      if (this.distance) {
        time = '';
        if (!timeFormatter.isEmpty(this.time)) {
          time = ` @ ${timeFormatter.toString(this.time)}`;
        } else if (!timeFormatter.isEmpty(this.rest)) {
          time = ` +${timeFormatter.toString(this.rest)}`;
        }
        return `${this.distance} ${this.type}${time}`;
      } else {
        return `${timeFormatter.toString(this.time)} ${this.type}`;
      }
    } else {
      return `${this.distance} ${this.type}`;
    }
  }

};

module.exports = Interval;
