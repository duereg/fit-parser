# Load all required libraries.
gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
istanbul = require 'gulp-istanbul'
mocha = require 'gulp-mocha'
coffeelint = require('gulp-coffeelint')


gulp.task 'coffee', ->
  gulp.src './src/**/*.coffee'
    .pipe coffee({bare: true}).on('error', gutil.log)
    .pipe gulp.dest './lib/'

gulp.task 'lint', ->
  gulp.src './src/*.coffee'
    .pipe coffeelint()
    .pipe coffeelint.reporter()

gulp.task 'test', ['coffee', 'lint'], ->
  gulp.src ['lib/**/*.js']
    .pipe istanbul() # Covering files
    .on 'finish', ->
      gulp.src ['spec/**/*.spec.coffee']
        .pipe mocha reporter: 'spec', compilers: 'coffee:coffee-script'
        .pipe istanbul.writeReports() # Creating the reports after tests run

gulp.task 'default', ['coffee']
gulp.task 'build', ['lint', 'coffee', 'test']
