var config = require('../../gulpconfig.json');
var package = require('../../package.json');


// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var nunjucksRender = require(config.nm + 'gulp-nunjucks-render');

var output_path = config.build_path;

var input_files = [
				config.src_path + 'views/**/*.html'
			];

var watch_dir = config.src_path + "views/";

var watch_files = [
                watch_dir + '*.html',
				watch_dir + '**/*.htm',
                watch_dir + '**/*.html'
			];

var context = {
                "config": {
                    "app_name": package.name,
                    "version": package.version,
                    "base_path": "/"
                }
            };

// configure nunjucks internal watch directory
nunjucksRender.nunjucks.configure([watch_dir]);

/**
 * Compile nunjucks templates
 *
 * @return
 */
gulp.task('nunjucks', function () {
	return gulp.src(input_files)
        .pipe(nunjucksRender(context).on('error', gutil.log))
        .pipe(gulp.dest(output_path));
});

gulp.task('nunjucks-watch', function() {
	gulp.watch(watch_files, ['nunjucks', 'browser-reload']);
});