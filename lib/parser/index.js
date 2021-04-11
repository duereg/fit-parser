const _ = require('lodash');
const Workout = require('../workout');
const handlers = require('./handlers');

//NUM_INTERVALS X DISTANCE TYPE @ TIME
function parseLine(lines, work) {
  while (lines.length > 0) {
    const line = lines.shift().trim();
    const tokens = line.split(/[ \t]/);
    const notAllEmpty = _.compact(tokens).length > 0;

    if (notAllEmpty) {
      processTokens(tokens, work);
    }
  }
};

function processTokens(tokens, work) {
  const currentSet = work.current();
  currentSet.add();

  while (tokens.length > 0) {
    const token = tokens.shift();

    for (const handler of handlers) {
      if (handler.canHandle(token, currentSet)) {
        handler.act(tokens, token, currentSet, work);
        break;
      }
    }
  }
};

function parser(stringToParse) {
  if (stringToParse == null) {
    throw new Error('You must provide a valid string to parse to continue.');
  }

  const lines = stringToParse.split('\n');
  const workToMake = new Workout();
  parseLine(lines, workToMake);
  return workToMake;
};

module.exports = parser;
