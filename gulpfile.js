var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');


// File paths
var DIST_PATH = 'public';
var SCRIPTS_PATH = './*.js';
var CSS_PATH = 'public/css/**/*.css';


// Less plugins
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoprefix({
	browsers: ['last 2 versions']
});


// Styles For LESS
gulp.task('styles', function () {
	console.log('starting styles task');
	return gulp.src('less/styles.less')
		.pipe(plumber(function (err) {
			console.log('Styles Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [lessAutoprefix]
		}))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});


// Scripts
gulp.task('scripts', function () {
	console.log('starting scripts task');
	return gulp.src(SCRIPTS_PATH)
		.pipe(plumber(function (err) {
			console.log('Scripts Task Error');
			console.log(err);
			this.emit('end');
		}))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('scripts.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(DIST_PATH))
		.pipe(livereload());
});

gulp.task('default', ['scripts','styles'], function () {
	console.log('Starting default task');
});


gulp.task('watch', ['default'], function () {
	console.log('Starting watch task');
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, ['scripts']);
  gulp.watch('index.html', ['scripts']);
	gulp.watch('./less/*.less', ['styles']);
	// gulp.watch(CSS_PATH, ['styles']);
	// gulp.watch('public/scss/**/*.scss', ['styles']);
});
