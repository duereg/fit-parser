module.exports = {
  setDividerRegex: /[xX\\*]/,
  isSetRegex: /[0-9][xX\\*][0-9]/,
  isSetDividerRegex: /^[xX\\*]$/,
  isTimeRegex: /^(([0-9])|([0-1][0-9])|([2][0-3]))?:(([0-9])|([0-5][0-9]))$/,
  isSet: function(str) { return this.isSetRegex.test(str); },
  isSetDivider: function(str) { return this.isSetDividerRegex.test(str); },
  isTimeDivider: function(str) { return str === '@'; },
  isTime: function(str) { return this.isTimeRegex.test(str); },
  parseTime: function(str) { return str; } //TODO: fix implementation
};