var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();


//--server--//
gulp.task('server', function() {
	gulp.src(' ')
		.pipe(server({
			livereload: true,
			open: true
		}));
});

//--compiler--//
gulp.task('sass', function () {

	return gulp.src('app/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers:['last 6 versions']
		}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', function () {
	gulp.watch('app/sass/*.scss', ['sass']);
});

gulp.task('default', ['server','watch']);

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}});
});