// Install deps:
// npm install -g gulp bower less
// npm install


var gulp = require('gulp');

var plugins = require("gulp-load-plugins")({'lazy': false});
var gconf = require('./gulpconfig.json');

var default_browser = 'Google Chrome';
if (process.platform === 'win32') {
    default_browser = 'chrome';
}

// Download all bower dependencies and 3rd party components
gulp.task('bower', function() {
    return plugins.bower();
});

gulp.task('lint', function() {
    return gulp.src(gconf.scripts)
        .pipe(plugins.jshint({
            eqnull: true,
            sub: true
        }))
        .pipe(plugins.jshint.reporter('default'));
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
        .pipe(plugins.concat(outputFile))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(gconf.build_path+gconf.scripts[outputFile].output_path));
    }
    return;
});

gulp.task('styles', ['bower'], function() {
    // Minify and copy all Styles
    for (var outputFile in gconf.stylesheets) {
        console.log('creating '+outputFile+'...');
        gulp.src(gconf.stylesheets[outputFile].files)
        .pipe(plugins.less({
            gconf: ".",
            sourceMap: true,
            compress: true
        }))
        //.pipe(plugins.minifyCss())
        .pipe(plugins.concat(outputFile))
        .pipe(gulp.dest(gconf.build_path+gconf.stylesheets[outputFile].output_path))
        .pipe(plugins.connect.reload());
    }

    return;
});

// Copy all static images
gulp.task('images', function() {

    for (var outputPath in gconf.images) {
        console.log('compressing images to '+outputPath+'...');
        gulp.src(gconf.images[outputPath].files)
        .pipe(plugins.imagemin(gconf.images[outputPath].options))
        .pipe(gulp.dest(gconf.build_path+outputPath))
        .pipe(plugins.connect.reload());
    }

    return;
});

// Compile templates
gulp.task('views', function () {
    for (var outputPath in gconf.views) {
        console.log('creating views in '+outputPath+'...');
        gulp.src(gconf.views[outputPath].files)
        .pipe(plugins.nunjucksRender(gconf.views[outputPath].context))
        .pipe(gulp.dest(gconf.build_path+outputPath))
        .pipe(plugins.connect.reload());
    }

    return;
});

gulp.task('server', plugins.connect.server({
    root: [gconf.build_path],
    port: 8080,
    livereload: true,
    open: {
        browser: default_browser
    }
}) );


// Rerun the task when a file changes
gulp.task('watch', function () {

    for (var o in gconf.scripts) {
        gulp.watch(gconf.scripts[o].files, ['scripts']);
    }
    for (o in gconf.stylesheets) {
        gulp.watch(gconf.stylesheets[o].files, ['styles']);
    }
    for (o in gconf.images) {
        gulp.watch(gconf.images[o].files, ['images']);
    }
    for (o in gconf.views) {
        gulp.watch(gconf.views[o].files, ['views']);
    }

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
    'scripts',
    'styles',
    'images',
    'views',
    'server',
    'watch',
]);
