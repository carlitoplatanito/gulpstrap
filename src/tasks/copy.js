var config = require('../../gulpconfig.json');

// node modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var newer = require(config.nm + 'gulp-newer');

var copy_config = {
            "fonts": [
                config.src_path + "fonts/*",
                config.src_path + "bower_components/bootstrap/fonts/*"
            ]
        };
/* Copy files (ussually for fonts or other assets being copied)
 * from bower_components into the build directory
 *
 * @return
 */
gulp.task('copy', function() {
    var i = 0;

    for (var outputPath in copy_config) {

        gulp.src(copy_config[outputPath])
        .pipe(newer(config.build_path + outputPath))
        .pipe(gulp.dest(config.build_path + outputPath));

        i++;
    }

    return;
});