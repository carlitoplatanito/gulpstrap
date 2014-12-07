var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');

var handlebars = require(config.nm + 'gulp-handlebars');
var wrap = require(config.nm + 'gulp-wrap');
var declare = require(config.nm + 'gulp-declare');
var concat = require(config.nm + 'gulp-concat');
var uglify = require(config.nm + 'gulp-uglify');

// options
var output_path = config.build_path + "templates/";

var input_path = config.src_path + "templates/";

var grouped = {
	"elements": "elements/*.handlebars",
	"blocks": "blocks/*.handlebars"
}

var singles = {
	"pages": "pages/**/*.handlebars"
};

var watch_files = input_path + "**/*.handlebars";

gulp.task('handlebars', function() {

	for(var dir in singles) {
		gulp.src(input_path + singles[dir])
		    .pipe(handlebars().on('error', gutil.log))
		    .pipe(wrap('Handlebars.template(<%= contents %>)').on('error', gutil.log))
		    .pipe(declare({
				namespace: 'template.' + dir,
				noRedeclare: true, // Avoid duplicate declarations
		    }).on('error', gutil.log))
		    .pipe(uglify().on('error', gutil.log))
		    //.pipe(concat('templates.js'))
		    .pipe(gulp.dest(output_path + dir));
    }

    for(var dir in grouped) {
		gulp.src(input_path + grouped[dir])
		    .pipe(handlebars().on('error', gutil.log))
		    .pipe(wrap('Handlebars.template(<%= contents %>)').on('error', gutil.log))
		    .pipe(declare({
				namespace: 'template.' + dir,
				noRedeclare: true, // Avoid duplicate declarations
		    }).on('error', gutil.log))
		    .pipe(concat(dir + '.js').on('error', gutil.log))
		    .pipe(uglify().on('error', gutil.log))
		    .pipe(gulp.dest(output_path));
    }

});

gulp.task('handlebars-watch', function() {
	gulp.watch(watch_files, ['handlebars', 'browser-reload']);
});