var integer;

integer = require('./int');

module.exports = {
  setDividerRegex: /[xX\\*]/,
  isSetRegex: /[0-9][xX\\*][0-9]/,
  isSetDividerRegex: /^[xX\\*]$/,
  isTimeRegex: /^(([0-9])|([0-9][0-9]))?:?(([0-9])|([0-5][0-9]))$/,
  isSet: function(str) {
    return this.isSetRegex.test(str);
  },
  isSetDivider: function(str) {
    return this.isSetDividerRegex.test(str);
  },
  isTimeDivider: function(str) {
    return str === '@';
  },
  isTime: function(str) {
    return this.isTimeRegex.test(str);
  },
  isRest: function(str) {
    return this.getRest(str).length > 0;
  },
  getRest: function(str) {
    var isRemainderNumber, isRemainderTime, justTime, plusPosition;
    plusPosition = str.indexOf('+');
    justTime = str.slice(plusPosition + 1);
    isRemainderTime = this.isTime(justTime);
    isRemainderNumber = integer.isNumber(justTime);
    if (plusPosition > -1) {
      if (isRemainderTime) {
        return justTime;
      } else if (isRemainderNumber) {
        return ":" + justTime;
      }
    }
    return '';
  }
};
