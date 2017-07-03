'use strict';

var CONFIG = require('./gulp/config');

// Plugins
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')(CONFIG.plugins);
var bsync = require('browser-sync');



/**
 * General
 */
gulp.task('default', ['watch']);



/**
 * Build
 */
gulp.task('build', ['icons', 'less'], function() {
    console.log('BUILD DONE');
});


/**
 * HTML
 */
gulp.task('html', function() {
    bsync.reload();
});


/**
 * LESS
 */
gulp.task('less', function() {
    return gulp.src(CONFIG.less.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(CONFIG.autoprefixer))
        .pipe(gulp.dest(CONFIG.less.dest))
        .pipe(bsync.stream());
});



/**
 * Icons
 */
gulp.task('icons', function() {
    return gulp.src(CONFIG.icons.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.uri({
            template: {
                file: CONFIG.icons.template
            }
        }))
        .pipe(plugins.concat(CONFIG.icons.concat))
        .pipe(gulp.dest(CONFIG.icons.dest));
});


/**
 * JS
 */
gulp.task('js:compile', () => {
    return gulp.src(CONFIG.js.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.add.prepend(CONFIG.js.add))
        .pipe(plugins.concat(CONFIG.js.concat))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest(CONFIG.js.dest))
});

gulp.task('js', ['js:compile'], function() {
    bsync.reload();
});



/**
 * Browser sync
 */
gulp.task('bsync', function() {
    bsync.init({
        server: {
            baseDir: CONFIG.bsync.base,
            directory: true
        },
        startPath: CONFIG.bsync.start
    });
});



/**
 * Watch
 */
// General watch task
gulp.task('watch', ['bsync'], function() {
    gulp.watch(CONFIG.watch.html, ['html']);
    gulp.watch(CONFIG.watch.less, ['less']);
    gulp.watch(CONFIG.watch.icons, ['icons']);
    gulp.watch(CONFIG.watch.js, ['js']);
});



/**
 * Helpers
 */
process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    //process.exit(255);
});

gulp.on('err', function(gulpErr) {
    if (gulpErr.err) {
        console.error('Gulp error details', [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
    }
});

function onPlumberError(error) {
    console.log(error, ' plumber Error');
    this.emit('end');
}
