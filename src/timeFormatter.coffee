moment = require('moment')
_ = require('underscore')

module.exports = (time) ->
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
