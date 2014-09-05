field = (value, label, type) ->
  @id = null
  @label = label
  @value = value
  @message = ""
  @cssClass = ""
  @type = type or "text"
  return

module.exports = field
