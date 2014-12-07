// config
var config = require('../../gulpconfig.json');

var gulp = require(config.nm + 'gulp');
var gutil = require(config.nm + 'gulp-util');
var ftp = require(config.nm + 'gulp-ftp');

var creds = {
        host: 'ftp.domain.com',
        user: 'username',
        pass: 'password',
        remotePath: 'public_html'
    }

var output_path = config.build_path + "**/*";
var watch_files = output_path;

gulp.task('ftp', function () {
    return gulp.src(output_path)
        .pipe(ftp(creds).on('error', gutil.log))
        .pipe(gutil.noop());
});


gulp.task('ftp-watch', function() {
	if (config.enable_auto_ftp) {
    	gulp.watch(watch_files, ['ftp']);
    }
});