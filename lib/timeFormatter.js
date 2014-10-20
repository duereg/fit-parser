var moment;

moment = require('moment');

module.exports = function(time) {
  var format;
  format = '';
  if (time == null) {
    throw new Error("Invalid time given");
  }
  if (time.hours == null) {
    time = moment.duration(time);
  }
  if (time.hours()) {
    format += time.hours() + ':';
  }
  if (time.minutes() === 0 && time.hours()) {
    format += '00:';
  } else {
    format += time.minutes() + ':';
  }
  if (time.seconds() === 0) {
    format += '00';
  } else {
    format += time.seconds();
  }
  return format;
};
