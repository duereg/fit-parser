require 'coffee-errors'

chai = require 'chai'
sinon = require 'sinon'
chai.use require 'sinon-chai'
moment = require 'moment'
_ = require 'underscore'

timeFormatter = require '../lib/timeFormatter'
Interval = require "../lib/interval"

oneMinuteThirty = _({minutes: 1, seconds: 30}).defaults(timeFormatter.noTime)

jsonIntervals = [
  {distance: 100, type: 'huho', time: oneMinuteThirty, rest: timeFormatter.noTime}
  {distance: 100, type: 'huho', time: oneMinuteThirty, rest: timeFormatter.noTime}
  {distance: 100, type: 'huho', time: oneMinuteThirty, rest: timeFormatter.noTime}
]

intervals = [
  new Interval {distance: 100, type: 'huho', time: moment.duration(oneMinuteThirty)}
  new Interval {distance: 100, type: 'huho', time: moment.duration(oneMinuteThirty)}
  new Interval {distance: 100, type: 'huho', time: moment.duration(oneMinuteThirty)}
]


module.exports = {expect: chai.expect, sinon, chai, jsonIntervals, intervals}
