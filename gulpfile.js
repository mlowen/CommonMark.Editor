var gulp = require('gulp');
var header = require('gulp-header');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');
var concat = require('gulp-concat');

var path = require('path');
var pkg = require('./package.json');

var banner = '/*! <%= pkg.name %> <%= pkg.version %> Copyright (c) 2014, 2015 <%= pkg.author.name %> */\n';

gulp.task('build:scripts', function() {
	return gulp.src([
			'./src/prefix.js',
			'./src/header.js',
			'./src/content.js',
			'./src/footer.js',
			'./src/editor.js',
			'./src/binding.js',
			'./src/suffix.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('bootstrap-commonmark-editor.js'))
		.pipe(uglify())
		.pipe(header(banner, { pkg: pkg }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist'));
});

gulp.task('build:styles', function () {
	return gulp.src('./src/styles/*.less')
		.pipe(sourcemaps.init())
		.pipe(less({
			paths: [ path.join(__dirname, 'src') ]
		}))
		.pipe(header(banner, { pkg: pkg }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist'))
});

gulp.task('build:release', [ 'build:scripts', 'build:styles' ], function() {
	return gulp.src([
		'dist/bootstrap-commonmark-editor.js',
		'dist/bootstrap-commonmark-editor.css',
		'README.md',
		'LICENSE',
	])
	.pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
	.pipe(gulp.dest('./'))
});

// Meta tasks

gulp.task('watch', function() {
	gulp.watch('./src/*.js', [ 'build:scripts' ])
	gulp.watch('./src/*.less', [ 'build:styles' ])
});

gulp.task('default', [ 'build:scripts', 'build:styles' ])