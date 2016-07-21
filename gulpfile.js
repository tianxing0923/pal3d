var gulp = require('gulp');
var less = require('gulp-less');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var usemin = require('gulp-usemin');
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');

// 默认监听
gulp.task('default', function () {
  gulp.watch('css/*.less', ['less']);
});

// 编译Less
gulp.task('less', function () {
  return gulp.src('css/*.less')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error);
        this.emit('end');
      }
    }))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: [
        'Explorer >= 9',
        'Firefox >= 30',
        'Chrome >= 36',
        'Safari >= 7',
        'iOS >= 7',
        'Android >= 4'
      ],
      cascade: false
    }))
    .pipe(gulp.dest('css'));
});

// 图片压缩
gulp.task('image', function () {
  return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

// 打包资源文件
gulp.task('res', function () {
  return gulp.src('res/*')
    .pipe(gulp.dest('dist/res'));
});

// 整体打包
gulp.task('dist', ['less', 'image', 'res'], function () {
  return gulp.src('*.html')
    .pipe(usemin({
      css: [csso()],
      js: [uglify()],
      zeptojs: [uglify()]
    }))
    // .pipe(replace(/..\/images/ig, 'images'))
    .pipe(gulp.dest('dist'));
});