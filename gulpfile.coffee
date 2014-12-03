# Load all required libraries.
gulp = require 'gulp'
gutil = require 'gulp-util'

clean = require('gulp-clean')
coffee = require 'gulp-coffee'
coffeelint = require('gulp-coffeelint')
istanbul = require 'gulp-istanbul'
mocha = require 'gulp-mocha'

gulp.task 'clean', ->
  gulp.src(['lib/**/*.js'], read: false).pipe(clean())

gulp.task 'coffee', ->
  gulp.src ['src/**/*.coffee']
    .pipe coffee({bare: true}).on('error', gutil.log)
    .pipe gulp.dest 'lib'

gulp.task 'lint', ->
  gulp.src 'src/**/*.coffee'
    .pipe coffeelint()
    .pipe coffeelint.reporter()

gulp.task 'test', ['coffee', 'lint'], ->
  gulp.src ['lib/**/*.js']
    .pipe istanbul({includeUntested: true}) # Covering files
    .on 'finish', ->
      gulp.src ['spec/**/*.spec.coffee']
        .pipe mocha reporter: 'spec', compilers: 'coffee:coffee-script'
        .pipe istanbul.writeReports() # Creating the reports after tests run

gulp.task 'default', ['clean', 'coffee']
gulp.task 'build', ['lint', 'clean', 'coffee', 'test']
