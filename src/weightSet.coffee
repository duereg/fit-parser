Weight = require('./weight')
Interval = require('./interval')
Set = require('./set')
actions = require('./actions')

class WeightSet extends Set
  constructor: (options) ->
    #this isn't the right way to do this
    super(options)
    @intervals = @intervals.map (interval) ->
      if (interval.reps) #always will have reps
        new Weight(interval)
      else
        new Interval(interval)

  add: (weightToAdd) ->
    throw new Error('Invalid weight given')  if weightToAdd is null
    weightToAdd = new Weight(weightToAdd)
    @intervals.push weightToAdd
    weightToAdd

  setWeight: (weight) ->
    @current().weight = weight

  setReps: (reps) ->
    @current().reps = reps

  totalReps: ->
    actions.sum @intervals, 'reps'

  totalWeight: ->
    actions.sum @intervals, 'weight'

  oneRepMax: ->
    @intervals.reduce (prev, next) ->
      max = if prev?.oneRepMax? then prev?.oneRepMax() else prev
      nextMax = next?.oneRepMax()

      if nextMax > max then nextMax else max



module.exports = WeightSet
