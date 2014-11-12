moment = require('moment')
_ = require('underscore')

noTime = { milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, months: 0, years: 0 }

toString = (time) ->
  format = ''

  throw new Error('Invalid time given') unless time?

  if not _(time.hours).isFunction() and (_(time).isObject() or _(time).isNumber())
    time = moment.duration(time)

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
  if time.humanize? then time._data else noTime

module.exports = {toString, toJSON, noTime}
