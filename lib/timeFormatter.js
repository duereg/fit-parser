var isEmpty, moment, noTime, toDuration, toJSON, toString, _;

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

isEmpty = function(time) {
  return !time._milliseconds > 0;
};

toDuration = function(time) {
  if ((_(time).isObject() || _(time).isNumber()) && !_(time.hours).isFunction()) {
    time = moment.duration(time);
  }
  if (_(time).isNull() || _(time).isUndefined()) {
    time = moment.duration(_(noTime).clone());
  }
  return time;
};

toString = function(time) {
  var format;
  format = '';
  if (time == null) {
    throw new Error('Invalid time given');
  }
  time = toDuration(time);
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
  var retValue;
  retValue = _(noTime).clone();
  if ((time != null ? time._data : void 0) != null) {
    retValue = time._data;
  }
  return retValue;
};

module.exports = {
  isEmpty: isEmpty,
  toString: toString,
  toJSON: toJSON,
  toDuration: toDuration,
  noTime: noTime
};
