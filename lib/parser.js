var integer, moment, parseLine, parser, processTokens, tokenActions, workout, _;

moment = require('moment');

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
  var currentSet, newTokens, numStartTokens, token, _results;
  numStartTokens = tokens.length;
  currentSet = work.current();
  currentSet.addInterval();
  _results = [];
  while (tokens.length > 0) {
    token = tokens.shift();
    if (token.isEmpty()) {
      continue;
    } else if (integer.isNumber(token)) {
      _results.push(currentSet.setDistance(parseInt(token)));
    } else if (tokenActions.isSetDivider(token)) {
      _results.push(currentSet.changeToMulti());
    } else if (tokenActions.isSet(token)) {
      newTokens = token.split(tokenActions.setDividerRegex);
      if (newTokens.length !== 2) {
        throw new Error("Currently not supported");
      }
      tokens.unshift(newTokens.pop());
      tokens.unshift("x");
      _results.push(tokens.unshift(newTokens.pop()));
    } else if (tokenActions.isTimeDivider(token)) {
      continue;
    } else if (tokenActions.isTime(token)) {
      _results.push(currentSet.setTime(moment.duration("00:" + token)));
    } else {
      if (numStartTokens === 1) {
        currentSet.intervals.pop();
        if (currentSet.name.isEmpty()) {
          _results.push(currentSet.name = token);
        } else {
          _results.push(currentSet = work.addSet(token));
        }
      } else {
        _results.push(currentSet.setType(token));
      }
    }
  }
  return _results;
};

parser = function(stringToParse) {
  var lines, workToMake;
  if (stringToParse == null) {
    throw new Error("You must provide a valid string to parse to continue.");
  }
  lines = stringToParse.split("\n");
  workToMake = new workout();
  parseLine(lines, workToMake);
  return workToMake;
};

module.exports = parser;
