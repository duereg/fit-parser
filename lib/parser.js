var integer, parseLine, parser, processTokens, tokenActions, workout, _;

_ = require("underscore");

workout = require("./workout");

integer = require("./int");

tokenActions = require("./tokens");

require("./string");

parseLine = function(lines, work) {
  var line, notAllEmpty, tokens;
  while (lines.length > 0) {
    line = lines.shift().trim();
    tokens = line.split(/[ \t]/);
    notAllEmpty = !_.all(tokens, function(item) {
      return item.isEmpty();
    });
    if (notAllEmpty) {
      processTokens(tokens, work);
    }
  }
};

processTokens = function(tokens, work) {
  var currentSet, newTokens, numStartTokens, token;
  numStartTokens = tokens.length;
  currentSet = work.current();
  currentSet.addInterval();
  while (tokens.length > 0) {
    token = tokens.shift();
    if (token.isEmpty()) {
      continue;
    } else if (integer.isNumber(token)) {
      currentSet.setDistance(parseInt(token));
    } else if (tokenActions.isSetDivider(token)) {
      currentSet.changeToMulti();
    } else if (tokenActions.isSet(token)) {
      newTokens = token.split(tokenActions.setDividerRegex);
      if (newTokens.length !== 2) {
        throw new Error("Currently not supported");
      }
      tokens.unshift(newTokens.pop());
      tokens.unshift("x");
      tokens.unshift(newTokens.pop());
    } else if (tokenActions.isTimeDivider(token)) {
      continue;
    } else if (tokenActions.isTime(token)) {
      currentSet.setTime(tokenActions.parseTime(token));
    } else {
      if (numStartTokens === 1) {
        currentSet.intervals.pop();
        if (currentSet.name.isEmpty()) {
          currentSet.name = token;
        } else {
          currentSet = work.addSet(token);
        }
      } else {
        currentSet.setType(token);
      }
    }
  }
  currentSet.reset();
};

parser = function(stringToParse) {
  var lines, workToMake;
  if (stringToParse === undefined) {
    throw new Error("You must provide a valid string to parse to continue.");
  }
  if (stringToParse === null) {
    return stringToParse;
  }
  lines = stringToParse.split("\n");
  workToMake = new workout();
  parseLine(lines, workToMake);
  return workToMake;
};

module.exports = parser;
