// Install deps:
// npm install -g gulp bower less
// npm install


var gulp = require('gulp');

var plugins = require("gulp-load-plugins")();

var paths = require('./paths.json');

// Download all bower dependencies and 3rd party components
gulp.task('bower', function() {
    return plugins.bower().pipe(gulp.dest('bower_components'));
});

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint({
            eqnull: true,
            sub: true
        }))
        .pipe(plugins.jshint.reporter('default'));
});

gulp.task('scripts', ['bower'], function() {
// Minify and copy all JavaScript (except vendor script)
    return gulp.src(paths.scripts)
        .pipe(plugins.concat('application.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(plugins.uglify())
        .pipe(plugins.concat('application.min.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(plugins.connect.reload());
});

gulp.task('styles', ['bower'], function() {
    // Minify and copy all Styles
    return gulp.src(paths.stylesheets)
        .pipe(plugins.less({
            paths:  ['.', './bower_components/bootstrap/less'],
            sourceMap: true,
            compress: true
        }))
        //.pipe(plugins.minifyCss())
        .pipe(plugins.concat('screen.min.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(plugins.connect.reload());
});

// Copy all static images
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(plugins.imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'))
        .pipe(plugins.connect.reload());
});

// Compile templates
gulp.task('views', function () {
    gulp.src(paths.views)
        .pipe(plugins.nunjucksRender({
            config:{
                'app_name': 'App Name',
                'base_path': './'
            }
        }))
        .pipe(gulp.dest('build'))
        .pipe(plugins.connect.reload());
});

gulp.task('server', plugins.connect.server({
    root: ['build'],
    port: 8080,
    livereload: true,
    open: {
        browser: 'Google Chrome'
    }
}) );

// Rerun the task when a file changes
gulp.task('watch', function () {

    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.stylesheets, ['styles']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.views, ['views']);

});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
    'server',
    'scripts',
    'styles',
    'images',
    'views',
    'watch',
]);



