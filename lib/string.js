if (!String.prototype.isEmpty) {
  String.prototype.isEmpty = function() {
    return (typeof this === "undefined") || (this === null) || (this.length === 0);
  };
}

module.exports = String;
