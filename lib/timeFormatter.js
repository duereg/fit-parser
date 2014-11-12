var moment, noTime, toJSON, toString, _;

moment = require('moment');

_ = require('underscore');

noTime = {
  milliseconds: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  months: 0,
  years: 0
};

toString = function(time) {
  var format;
  format = '';
  if (time == null) {
    throw new Error('Invalid time given');
  }
  if (!_(time.hours).isFunction() && (_(time).isObject() || _(time).isNumber())) {
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

toJSON = function(time) {
  if (time.humanize != null) {
    return time._data;
  } else {
    return noTime;
  }
};

module.exports = {
  toString: toString,
  toJSON: toJSON,
  noTime: noTime
};
