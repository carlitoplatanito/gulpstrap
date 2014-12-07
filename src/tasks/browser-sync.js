var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var browserSync = require('browser-sync');

var reload_delay = 500; // wait a sec before all reloads for all gulp tasks to finish

/* checkout more options at http://www.browsersync.io/docs/options */

// Static server
gulp.task('browser-sync', function() {
    if (config.enable_browser_sync) {
        console.log('* Browser sync enabled *');
        return browserSync({
            server: {
                baseDir: config.build_path,
                index: "index.html",
                directory: false
            }
        });
    }
});

gulp.task('browser-reload', function() {
    if (config.enable_browser_sync) {
    	setTimeout(function() {
    		browserSync.reload();
    	}, reload_delay);
    }
})