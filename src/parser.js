var set = require("./set.js");
var workout = require("./workout.js");
var integer = require('./int.js');
var tokenActions = require('./tokens.js');
var _ = require("underscore");
require('./string.js');

//NUM_INTERVALS X DISTANCE TYPE @ TIME
var parser = function(stringToParse) {
  if (stringToParse === undefined) throw "umpossible";
  if (stringToParse === null) return stringToParse;

  var lines = stringToParse.split("\n");
  var workToMake = new workout(); 
  parseLine(lines, workToMake); 
  return workToMake;
};

function parseLine(lines, work) {
  //console.log(lines);
  while(lines.length > 0) {
    var line = lines.shift().trim();  
    var tokens = line.split(/[ \t]/); 

    if(!_.all(tokens, function(item){ return item.isEmpty()})) {
      processTokens(tokens, work);
    }
  }
};

function processTokens(tokens, work) { 
  var numStartTokens = tokens.length;
  var currentSet = work.current(); 
  currentSet.addInterval();

  while(tokens.length > 0) {
    var token = tokens.shift(); 
    if(token.isEmpty()) {
      //do nothing - this is the emptyTokenHandler
    } else if(integer.isNumber(token)) {
      //numberTokenHandler 
      currentSet.setDistance( parseInt(token));
    }
    else if(tokenActions.isSetDivider(token)) {
      //set divider token handler  
      currentSet.changeToMulti();
    }
    else if(tokenActions.isSet(token)) { 
      //set token handler 
      var newTokens = token.split(tokenActions.setDividerRegex);

      if(newTokens.length !== 2) throw "Currently not supported";

      tokens.unshift(newTokens.pop());
      tokens.unshift("x");
      tokens.unshift(newTokens.pop());
    }
    else if(tokenActions.isTimeDivider(token)) {
      //time divider token handler 
    }
    else if(tokenActions.isTime(token)) {
      //time token handler 
      currentSet.setTime(tokenActions.parseTime(token));
    } 
    else {  
      //string token handler
      if(numStartTokens === 1 ) { 
        currentSet.intervals.pop(); //Delete created interval - not needed

        if(currentSet.name.isEmpty()) {
          currentSet.name = token;
        } else { 
          currentSet = work.addSet(token);
        }
      } else { 
        currentSet.setType(token)
      } 
    }
  }

  //line is done - now what?
  currentSet.reset();
};

module.exports = parser;