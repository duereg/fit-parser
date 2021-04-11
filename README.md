# fit-parser

[![Dependency status](https://david-dm.org/duereg/fit-parser.svg)](https://david-dm.org/duereg/fit-parser)
[![devDependency Status](https://david-dm.org/duereg/fit-parser/dev-status.svg)](https://david-dm.org/duereg/fit-parser#info=devDependencies)
[![Build Status](https://secure.travis-ci.org/duereg/fit-parser.svg?branch=master)](https://travis-ci.org/duereg/fit-parser)

## Installation

    npm install fit-parser

## Usage Example

Given a set of workouts either in UWH Swim format:

```
4x100 HUHO @ 1:30
1000 Kick @ 12:00
2:00 Rest
20:00 Swim
```

or [FitNotes](https://play.google.com/store/apps/details?id=com.github.jamesgay.fitnotes&hl=en) format:

```
** Flat Barbell Bench Press **
- 95.0 lbs x 10 reps
- 135.0 lbs x 10 reps
- 135.0 lbs x 10 reps
- 145.0 lbs x 10 reps
- 155.0 lbs x 6 reps
- 155.0 lbs x 5 reps

** Decline cable flies **
- 30.0 lbs x 10 reps
- 35.0 lbs x 10 reps
- 40.0 lbs x 10 reps

** Rope Beaters **
- 00:30
- 00:30
```

parses the text and returns a sets of formatted objects which you can use to further analyze the data.

## Testing

    npm test

## License

The MIT License (MIT)

Copyright 2021 Matt Blair

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
