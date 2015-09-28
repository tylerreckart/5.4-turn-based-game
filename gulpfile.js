var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('hello', function() {
  console.log('Hello, Pierre');
});

gulp.task('sass', function(){
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('useref', function(){
  var assets = useref.assets();

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulpIf('.*js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.*(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function(callback) {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('audio', function(callback) {
  return gulp.src('app/audio/**/*')
  .pipe(gulp.dest('dist/audio'));
});

gulp.task('clean', function(callback) {
  del('dist');
  return cache.clearAll(callback);
});

gulp.task('clean:dist', function(callback) {
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback);
});

gulp.task('build', function(callback) {
  runSequence(
    ['sass', 'useref', 'images', 'fonts', 'audio'],
    callback
  );
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
    callback
  );
});
