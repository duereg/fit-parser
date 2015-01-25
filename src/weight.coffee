module.exports =
  class Weight
    constructor: (options) ->
      {@reps, @weight} = options if options

      @reps ?= 0
      @weight ?= 0

    isEmpty: -> @reps is 0 and @weight is 0
    toJSON: -> {@reps, @weight}
    toString: ->
      if @weight
        "#{@weight} lbs x #{@reps} reps"
      else
        "#{@reps} reps"
