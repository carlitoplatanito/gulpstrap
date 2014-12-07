// Install deps:
// sudo npm install -g gulp bower less
// npm install

var gulp = require('gulp');

// var plugins = require("gulp-load-plugins")({lazy: false});
var config = require('./gulpconfig.json');

var requireDir = require('require-dir');

requireDir('./src/tasks/');

/**
 * Watch for file changes
 * But first, process all the files and start the livereload server
 *
 */
gulp.task('watch', [
    'default', 
    'browser-sync',
    'scripts-watch',
    'less-watch',
    'nunjucks-watch',
    // 'handlebars-watch',
    'imagemin-watch'
]);

/**
 * Default: Runs the build process
 */
gulp.task('default', [
    'build'
]);

/*
 * Build the entire project
 */
gulp.task('build', [
    'bower',
    'scripts',
    'less',
    'imagemin',
    'copy',
    // 'handlebars',
    'nunjucks'
]);

/*
 * Publish the project using FTP
 */
gulp.task('publish', [
    'build', 
    'ftp'
]);
