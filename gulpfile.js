var gulp = require('gulp'),
    pug = require('gulp-pug'),
    del = require('del'),
    coffee = require('gulp-coffee'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('gulp-main-bower-files');

var paths = {
    html: ['./app/**/*.pug', '!./bower_components/**/*'],
    scss: ['./app/**/*.scss', '!./bower_components/**/*'],
    scripts: ['./app/**/*.coffee', '!./bower_components/**/*']
    // scripts: ['./app/**/*.js', '!./bower_components/**/*']
};

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('html', function(){
    return gulp.src(paths.html)
        .pipe(pug())
        .pipe(gulp.dest('build'))
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest('build'));
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(coffee())
        .pipe(gulp.dest('build'));
});

gulp.task('libs', function () {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('build/libs'));
});

gulp.task('watch', function() {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('build', ['html', 'sass', 'scripts', 'libs']);

gulp.task('default', ['watch', 'html', 'sass', 'scripts', 'libs']);
