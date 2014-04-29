// Install deps:
// sudo npm install -g gulp bower less
// npm install

var gulp = require('gulp');

var plugins = require("gulp-load-plugins")({lazy: false});
var gconf = require('./gulpconfig.json');

var bower_ran = false;

/**
 * Run bower update on current directory.
 * Uses bower.json in root directory
 *
 * @param
 * @returns
 */
gulp.task('bower', function() {
    if (!bower_ran) {
        return plugins.bower();
        bower_ran = true;
    } else {
        return;
    }
});

/**
 * Minify and copy all scripts to build path.
 *
 * @return {[type]} [description]
 */
gulp.task('scripts', ['bower'], function() {
    // Minify and copy all JavaScript (except vendor script)
    for (var outputFile in gconf.scripts) {
        console.log('creating '+outputFile+'...');
        gulp.src(gconf.scripts[outputFile].files)
        .pipe(plugins.cached(outputFile))
        .pipe(plugins.concat(outputFile).on('error', plugins.util.log))
        .pipe(plugins.uglify().on('error', plugins.util.log))
        .pipe(gulp.dest(gconf.build_path+gconf.scripts[outputFile].output_path));
    }
    return;
});

/**
 * Process LESS files and copy into build directory
 *
 */
gulp.task('styles', ['bower'], function() {
    // Minify and copy all Styles

    for (var outputFile in gconf.stylesheets) {
        console.log('creating '+outputFile+'...');

        gulp.src(gconf.stylesheets[outputFile].files)
        .pipe(plugins.cached(outputFile))
        .pipe(plugins.less({
            gconf: ".",
            sourceMap: true,
            compress: true
        }).on('error', plugins.util.log))
        .pipe(gulp.dest(gconf.build_path+gconf.stylesheets[outputFile].output_path))
        .pipe(plugins.connect.reload());
    }

    return;
});

/**
 * Copy and compress static images
 *
 */
gulp.task('images', function() {

    for (var outputPath in gconf.images) {
        console.log('compressing images to '+outputPath+'...');

        gulp.src(gconf.images[outputPath].files)
        .pipe(plugins.newer(gconf.build_path+outputPath))
        .pipe(plugins.imagemin(gconf.images[outputPath].options).on('error', plugins.util.log))
        .pipe(gulp.dest(gconf.build_path+outputPath))
        .pipe(plugins.connect.reload());
    }

    return;
});

// Copy files (ussually for fonts or other assets being copied)
// from bower_components into the build directory
gulp.task('copy', function() {
    var i = 0;

    for (var outputPath in gconf.copy) {

        gulp.src(gconf.copy[outputPath].files)
        .pipe(plugins.newer(gconf.build_path+outputPath))
        .pipe(gulp.dest(gconf.build_path+outputPath));

        i++;
    }

    return;
});

/**
 * Compile templates
 *
 */
gulp.task('views', function () {

    for (var outputPath in gconf.views) {
        console.log('creating views in '+outputPath+'...');
        gulp.src(gconf.views[outputPath].files)
        .pipe(plugins.cached(outputPath))
        .pipe(plugins.nunjucksRender(gconf.views[outputPath].context).on('error', plugins.util.log))
        .pipe(gulp.dest(gconf.build_path+outputPath))
        .pipe(plugins.connect.reload());
    }

    return;
});

/**
 * Start LiveReload Server
 *
 */
gulp.task('server', function() {
    return plugins.connect.server({
        root: [gconf.build_path],
        port: 8080,
        livereload: true
    });
});

/**
 * Clear cache
 *
 */
gulp.task('clearCache', function() {
    return plugins.cached.caches = {};
});


/**
 * Watch for file changes
 * But first, process all the files and start the livereload server
 *
 */
gulp.task('watch', ['default', 'server'], function () {

    for (var o in gconf.scripts) {
        if (gconf.scripts[o].watch !== false) {
            gulp.watch(gconf.scripts[o].watch, ['scripts']);
        }
    }
    for (o in gconf.stylesheets) {
        if (gconf.stylesheets[o].watch !== false) {
            gulp.watch(gconf.stylesheets[o].watch, ['clearCache', 'styles']);
        }
    }
    for (o in gconf.views) {
        if (gconf.views[o].watch !== false) {
            gulp.watch(gconf.views[o].watch, ['views']);
        }
    }
    for (o in gconf.images) {
        gulp.watch(gconf.images[o].files, ['images']);
    }

});

/**
 * Runs all the processes except for watch and livereload
 */
gulp.task('default', [
    'clearCache',
    'bower',
    'scripts',
    'styles',
    'images',
    'copy',
    'views'
]);
