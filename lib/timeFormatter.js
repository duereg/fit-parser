const moment = require('moment');

const _ = require('lodash');

const noTime = {
  milliseconds: 0,
  seconds: 0,
  minutes: 0,
  hours: 0,
  days: 0,
  months: 0,
  years: 0
};



function isEmpty(time) {
  return !time._milliseconds > 0;
};

function getDurationFromString(str) {
  let token, type;

  const timeTypes = ['hours', 'minutes', 'seconds'];
  const timeTokens = _.compact(str.split(':'));
  const duration = {};

  while (timeTokens.length) {
    token = timeTokens.pop();
    type = timeTypes.pop();
    duration[type] = parseInt(token, 10);
  }

  return moment.duration(duration);
};

function toDuration(time) {
  if (_.isString(time)) {
    time = getDurationFromString(time);
  }
  if ((_.isObject(time) || _.isNumber(time)) && !_(time.hours).isFunction()) {
    time = moment.duration(time);
  }
  if (_.isNull(time) || _.isUndefined(time)) {
    time = moment.duration(_(noTime).clone());
  }
  return time;
};

function toString(time) {
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
  format += `${time.minutes()}:`;
  if (time.seconds() < 10) {
    format += '0';
  }
  format += time.seconds();
  return format;
};

function toJSON(time) {
  var retValue;
  retValue = _.cloneDeep(noTime);
  //if time is number, set milliseconds?
  if ((time != null ? time._data : void 0) != null) {
    retValue = time._data;
  }
  return retValue;
};

module.exports = {isEmpty, toString, toJSON, toDuration, noTime};
