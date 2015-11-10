gulp = require 'gulp'
header = require 'gulp-header'
less = require 'gulp-less'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'
zip = require 'gulp-zip'

path = require 'path'

pkg = require './package.json'

gulp.task 'build:scripts', () ->
	gulp.src('./src/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest './dist')

gulp.task 'build:styles', () ->
	gulp.src('./src/*.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			paths: [ path.join(__dirname, 'src') ]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest './dist')

gulp.task 'build:release', [ 'build:scripts', 'build:styles' ], () ->
	gulp.src([
		'dist/bootstrap-commonmark-editor.js'
		'dist/bootstrap-commonmark-editor.css'
		'dist/bootstrap-commonmark-editor-knockout.js'
		'README.md'
		'LICENSE'
	])
	.pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
	.pipe(gulp.dest './')

# Meta tasks

gulp.task 'default', [ 'build:scripts', 'build:styles' ]