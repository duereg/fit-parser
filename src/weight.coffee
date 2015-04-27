module.exports =
  class Weight
    constructor: (options) ->
      {@reps, @weight} = options if options

      @reps ?= 0
      @weight ?= 0

    isEmpty: -> @reps is 0 and @weight is 0
    toJSON: -> {@reps, @weight}
    oneRepMax: -> @weight / (1.0278 - (0.0278 * @reps))
    toString: ->
      if @weight
        "- #{@weight} lbs x #{@reps} reps"
      else
        "- #{@reps} reps"
