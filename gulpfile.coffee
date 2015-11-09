gulp = require 'gulp'
header = require 'gulp-header'
less = require 'gulp-less'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'

pkg = require './package.json'

gulp.task 'build:scripts', () ->
	gulp.src('./src/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest './dist')
		
gulp.task 'default', [ 'build:scripts' ]