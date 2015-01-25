Weight = require('./weight')
Set = require('./set')
actions = require('./actions')

class WeightSet extends Set
  constructor: (options) ->
    #this isn't the right way to do this
    _super.call(this, options)
    @intervals = @intervals.map (interval) -> new Weight(interval)

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

module.exports = WeightSet
