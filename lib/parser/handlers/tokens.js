const _ = require('./int');

module.exports = {
  setDividerRegex: /[xX\\*]/,
  isSetRegex: /[0-9][xX\\*][0-9]/,
  isSetDividerRegex: /^[xX\\*]$/,
  isTimeRegex: /^(([0-9])|([0-9][0-9]))?:?(([0-9])|([0-9][0-9]))?:?(([0-9])|([0-5][0-9]))$/,
  isSet(str) {
    return this.isSetRegex.test(str);
  },
  isSetDivider(str) {
    return this.isSetDividerRegex.test(str);
  },
  isTimeDivider(str) {
    return str === '@';
  },
  isTime(str) {
    return this.isTimeRegex.test(str);
  },
  isRest(str) {
    return this.getRest(str).length > 0;
  },
  getRest(str) {
    var isRemainderNumber, isRemainderTime, justTime, plusPosition;
    plusPosition = str.indexOf('+');
    justTime = str.slice(plusPosition + 1);
    isRemainderTime = this.isTime(justTime);
    isRemainderNumber = _.isNumber(justTime);
    if (plusPosition > -1) {
      if (isRemainderNumber) {
        return `:${justTime}`;
      } else if (isRemainderTime) {
        return justTime;
      }
    }
    return '';
  }
};
