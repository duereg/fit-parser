var Interval;

module.exports = Interval = (function() {
  function Interval() {
    this.distance = 0;
    this.type = '';
    this.time = 0;
  }

  Interval.prototype.timeFormatted = function() {
    var format;
    format = '';
    if (this.time.hours()) {
      format += this.time.hours() + ":";
    }
    format += this.time.minutes() + ":" + this.time.seconds();
    return format;
  };

  Interval.prototype.toString = function() {
    if (this.time.humanize != null) {
      return "" + this.distance + " " + this.type + " @ " + (this.timeFormatted());
    } else {
      return "" + this.distance + " " + this.type;
    }
  };

  return Interval;

})();
