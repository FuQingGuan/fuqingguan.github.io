var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var debug = require('gulp-debug');
var cache = require('gulp-cache');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var minifycss = require('gulp-minify-css');

// 压缩css文件
gulp.task('minify-css', function() {
    return gulp.src('./public/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css'));
});

// 压缩js文件，支持将ES6代码转换成ES5代码
gulp.task('minify-js', function() {
    return gulp.src('./public/lib/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/lib'));
});

// 压缩html文件
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'));
});

// gulp3的写法

gulp.task('default', gulp.parallel('minify-css', 'minify-js', 'minify-html'));

