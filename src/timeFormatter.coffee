moment = require('moment')
_ = require('underscore')

noTime = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 }

isEmpty = (time) ->
  not time._milliseconds > 0

toDuration = (time) ->
  if (_(time).isObject() or _(time).isNumber()) and not _(time.hours).isFunction()
    time = moment.duration(time)
  if _(time).isNull() or _(time).isUndefined()
    time = moment.duration(_(noTime).clone())
  time

toString = (time) ->
  format = ''

  throw new Error('Invalid time given') unless time?

  time = toDuration(time)

  if time.hours()
    format += time.hours() + ':'

  if time.minutes() < 10 and time.hours()
    format += '0'
  format += "#{time.minutes()}:"

  if time.seconds() < 10
    format += '0'
  format += time.seconds()

  format

toJSON = (time) ->
  retValue = _(noTime).clone()

  #if time is number, set milliseconds?
  if time?._data?
    retValue = time._data

  retValue



module.exports = {isEmpty, toString, toJSON, toDuration, noTime}
