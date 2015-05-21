var gulp = require('gulp');
var sequence = require('run-sequence');
var plugins = require('gulp-load-plugins')();

var paths = {
	source: 'src/zance.js',
	test: 'test/test.js',
	destination: 'dist'
};

var read = {
	read: false
};

gulp.task('test', function() {
	return gulp.src(paths.test, read)
		.pipe(plugins.mocha({
			reporter: 'spec'
		}));
});

gulp.task('clean', function() {
	return gulp.src(paths.destination, read)
		.pipe(plugins.clean())
		.on('error', plugins.util.log);
});

gulp.task('build', function() {
	return gulp.src(paths.source)
		.pipe(gulp.dest(paths.destination))
		.pipe(plugins.filesize())
		.pipe(plugins.uglify())
		.pipe(plugins.rename('zance.min.js'))
		.pipe(gulp.dest(paths.destination))
		.pipe(plugins.filesize())
		.on('error', plugins.util.log);
});

gulp.task('make', function() {
	return sequence('test', 'clean', 'build', function() {});
});
