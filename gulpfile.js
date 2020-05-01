var gulp = require('gulp'),
    connect = require('gulp-connect'),
    include = require('gulp-html-tag-include'),
    del = require('del')
    runSequence = require('run-sequence');

//# Connect

gulp.task('connect', function () {
    connect.server({
        port: 8080,
        root: 'dist/',
        livereload: true
    });
});


//# Clean

gulp.task('clean', function() {
    return del.sync('dist/');
});


//# Html

gulp.task('html', function () {
    return gulp.src('src/html/compile/*.html')
        .pipe(include())
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});


//# Js

// Main
gulp.task('js', function () {
    return gulp.src('src/js/main.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});


//# Watch

gulp.task('watch', function () {
    gulp.watch('src/html/**/**/**/**', ['html']);
    gulp.watch('src/js/**/**', ['js']);
});

gulp.task('build', [
    'html',
    'js'
], function () {});
gulp.task('default', ['clean'], function () {
    runSequence('connect', 'build', 'build', 'watch');
});
