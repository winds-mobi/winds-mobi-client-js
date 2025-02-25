var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var sass = require('gulp-sass');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var cdnizer = require('gulp-cdnizer');


gulp.task('js', function () {
    var b = browserify(
        ['static/web/js/app.js', 'static/web/js/controllers.js', 'static/web/js/services.js'],
        {
            debug: true,
            // => true for discify: './node_modules/disc/bin/discify static/web/js/windmobile.js > discify.html'
            fullPaths: false
        }
    );

    return b.bundle()
        // http://stackoverflow.com/questions/23161387/catching-browserify-parse-error-standalone-option
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(source('windmobile.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gutil.env.production ? uglify() : gutil.noop())
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('static/web/js/'));
});

gulp.task('sass', function () {
    gulp.src('src/scss/*.*')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('static/web/css/'));
});

gulp.task('html', function () {
    gulp.src('src/html/**/*.html')
        .pipe(gutil.env.production ?
            cdnizer({
                defaultCDNBase: '//winds-mobi.b-cdn.net',
                allowRev: true,
                allowMin: true,
                files: [
                    '/static/web/js/windmobile.js',
                    '/static/web/css/windmobile.css',
                    '/static/web/img/*.*'
                ]
            }) :
            gutil.noop())
        .pipe(gulp.dest('static/web/'));
});

gulp.task('watch', function () {
    gulp.watch(['static/web/js/app.js', 'static/web/js/controllers.js', 'static/web/js/services.js',
        'static/web/locale/*.js'], ['js']);
    gulp.watch('src/scss/*.*', ['sass']);
    gulp.watch('src/html/**/*.html', ['html']);
});
gulp.task('default', ['js', 'sass', 'html']);
