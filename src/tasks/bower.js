// config
var config = require('../../gulpconfig.json');

// modules
var gulp = require(config.nm + 'gulp');
var bower = require(config.nm + 'gulp-bower');

/**
 * Run bower update on current directory.
 * Uses bower.json in root directory
 *
 * @param
 * @returns
 */
var bower_ran = false;
gulp.task('bower', function() {
    if (!bower_ran) {
    	bower_ran = true;
        return bower();
    } else {
        return;
    }
});