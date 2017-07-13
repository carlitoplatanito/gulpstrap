var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var concat = require(config.nm + 'gulp-concat');
var less = require(config.nm + 'gulp-less');

if (config.enable_browser_sync) {
    var browserSync = require('browser-sync');
}

var output_path = config.build_path + "css/";
var output_file = "screen.css";

var input_files = [
    config.src_path + "/less/screen.less"
    ];

var watch_files = [
                config.src_path + "/less/**/*"
            ];

var paths = [
            config.src_path + "/less",
            config.nm + "/bootstrap/less"
        ];
/**
 * Process LESS files and copy into build directory
 *
 * @return
 */
gulp.task('less', function() {
    // Minify and copy all Styles
    return gulp.src(input_files)
    .pipe(less({
        paths: paths,
        compress: true
    }).on('error', gutil.log))
    .pipe(gulp.dest(output_path));
});

gulp.task('less-reload', function() {
    if (config.enable_browser_sync) {
        setTimeout(function() {
            gulp.src(output_path + output_file).pipe(browserSync.reload({stream:true}));
        }, 600);
    }
});

gulp.task('less-watch', function() {
    gulp.watch(watch_files, ['less', 'less-reload']);
});