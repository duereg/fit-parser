var getDurationFromString, isEmpty, moment, noTime, toDuration, toJSON, toString, _;

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

getDurationFromString = function(str) {
  var duration, timeTokens, timeTypes, token, type;
  timeTokens = str.split(':');
  timeTypes = ['hours', 'minutes', 'seconds'];
  duration = {};
  while (timeTokens.length) {
    token = timeTokens.pop();
    type = timeTypes.pop();
    duration[type] = parseInt(token, 10);
  }
  return moment.duration(duration);
};

toDuration = function(time) {
  if (_(time).isString()) {
    time = getDurationFromString(time);
  }
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
  if (time.minutes() < 10 && time.hours()) {
    format += '0';
  }
  format += "" + (time.minutes()) + ":";
  if (time.seconds() < 10) {
    format += '0';
  }
  format += time.seconds();
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
