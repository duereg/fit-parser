var Workout, handlers, moment, parseLine, parser, processTokens, _;

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
  var currentSet, handler, numStartTokens, token, _results;
  numStartTokens = tokens.length;
  currentSet = work.current();
  currentSet.add();
  _results = [];
  while (tokens.length > 0) {
    token = tokens.shift();
    _results.push((function() {
      var _i, _len, _results1;
      _results1 = [];
      for (_i = 0, _len = handlers.length; _i < _len; _i++) {
        handler = handlers[_i];
        if (handler.canHandle(token, currentSet)) {
          handler.act(tokens, token, currentSet, work);
          break;
        } else {
          _results1.push(void 0);
        }
      }
      return _results1;
    })());
  }
  return _results;
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
