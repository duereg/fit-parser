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

  if time.minutes() is 0 and time.hours()
    format += '00:'
  else
    format += time.minutes() + ':'

  if time.seconds() is 0
    format += '00'
  else
    format += time.seconds()

  format

toJSON = (time) ->
  #if time is number, set milliseconds?
  if time?._data? then time._data else _(noTime).clone()


module.exports = {isEmpty, toString, toJSON, toDuration, noTime}
