const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));
const moment = require('moment');
const _ = require('lodash');

const timeFormatter = require('../lib/timeFormatter');
const Interval = require("../lib/interval");

const oneMinuteThirty = _.defaults({
  minutes: 1,
  seconds: 30
}, timeFormatter.noTime);

const jsonIntervals = [
  {
    distance: 100,
    type: 'huho',
    time: oneMinuteThirty,
    rest: timeFormatter.noTime
  },
  {
    distance: 100,
    type: 'huho',
    time: oneMinuteThirty,
    rest: timeFormatter.noTime
  },
  {
    distance: 100,
    type: 'huho',
    time: oneMinuteThirty,
    rest: timeFormatter.noTime
  }
];

const intervals = [
  new Interval({
    distance: 100,
    type: 'huho',
    time: moment.duration(oneMinuteThirty)
  }),
  new Interval({
    distance: 100,
    type: 'huho',
    time: moment.duration(oneMinuteThirty)
  }),
  new Interval({
    distance: 100,
    type: 'huho',
    time: moment.duration(oneMinuteThirty)
  })
];

const weightWorkout = {
  "sets": [
    {
      "name": "** Flat Barbell Bench Press **",
      "intervals": [
        {
          "reps": 10,
          "weight": 95
        },
        {
          "reps": 10,
          "weight": 135
        },
        {
          "reps": 10,
          "weight": 135
        },
        {
          "reps": 10,
          "weight": 145
        },
        {
          "reps": 6,
          "weight": 155
        },
        {
          "reps": 5,
          "weight": 155
        }
      ]
    },
    {
      "name": "** Decline cable flies **",
      "intervals": [
        {
          "reps": 10,
          "weight": 30
        },
        {
          "reps": 10,
          "weight": 35
        },
        {
          "reps": 10,
          "weight": 40
        }
      ]
    },
    {
      "name": "** Dead Bug 3 **",
      "intervals": [
        {
          "reps": 20,
          "weight": 0
        },
        {
          "reps": 20,
          "weight": 0
        }
      ]
    },
    {
      "name": "** Dead Bug 4 **",
      "intervals": [
        {
          "reps": 20,
          "weight": 0
        },
        {
          "reps": 20,
          "weight": 0
        }
      ]
    },
    {
      "name": "** Rope Beaters **",
      "intervals": [
        {
          "time": {
            "milliseconds": 0,
            "seconds": 30,
            "minutes": 0,
            "hours": 0,
            "days": 0,
            "months": 0,
            "years": 0
          },
          "rest": {
            "milliseconds": 0,
            "seconds": 0,
            "minutes": 0,
            "hours": 0,
            "days": 0,
            "months": 0,
            "years": 0
          },
          "distance": 0,
          "type": ""
        },
        {
          "time": {
            "milliseconds": 0,
            "seconds": 30,
            "minutes": 0,
            "hours": 0,
            "days": 0,
            "months": 0,
            "years": 0
          },
          "rest": {
            "milliseconds": 0,
            "seconds": 0,
            "minutes": 0,
            "hours": 0,
            "days": 0,
            "months": 0,
            "years": 0
          },
          "distance": 0,
          "type": ""
        }
      ]
    },
    {
      "name": "** Running (Treadmill) **",
      "intervals": [
        {
          "time": {
            "milliseconds": 0,
            "seconds": 0,
            "minutes": 20,
            "hours": 0,
            "days": 0,
            "months": 0,
            "years": 0
          },
          "rest": {
            "milliseconds": 0,
            "seconds": 0,
            "minutes": 0,
            "hours": 0,
            "days": 0,
            "months": 0,
            "years": 0
          },
          "distance": 2.03,
          "type": ""
        }
      ]
    }
  ]
};

module.exports = {
  expect: chai.expect,
  sinon,
  chai,
  jsonIntervals,
  intervals,
  oneMinuteThirty,
  weightWorkout
};
