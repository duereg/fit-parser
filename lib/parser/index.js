var Workout, _, handlers, moment, parseLine, parser, processTokens;

moment = require('moment');

_ = require('underscore');

require('./string');

Workout = require('../workout');

handlers = require('./handlers');

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
  var currentSet, handler, numStartTokens, results, token;
  numStartTokens = tokens.length;
  currentSet = work.current();
  currentSet.add();
  results = [];
  while (tokens.length > 0) {
    token = tokens.shift();
    results.push((function() {
      var i, len, results1;
      results1 = [];
      for (i = 0, len = handlers.length; i < len; i++) {
        handler = handlers[i];
        if (handler.canHandle(token, currentSet)) {
          handler.act(tokens, token, currentSet, work);
          break;
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    })());
  }
  return results;
};

parser = function(stringToParse) {
  var lines, workToMake;
  if (stringToParse == null) {
    throw new Error('You must provide a valid string to parse to continue.');
  }
  lines = stringToParse.split('\n');
  workToMake = new Workout();
  parseLine(lines, workToMake);
  return workToMake;
};

module.exports = parser;
