// Include gulp
var gulp = require('gulp');

// Include plugins
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var less = require('gulp-less');
var runSequence = require('run-sequence');

// Autoprefixing task
gulp.task('prefix', function(){
  return gulp.src('src/assets/styles/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/assets/styles'));
});

// Link task
gulp.task('lint', function(){
  return gulp.src('src/assets/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function(){
  return gulp.src('dist/assets/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/assets/styles'));
});

// Compile LESS
gulp.task('less', function(){
  return gulp.src('dist/assets/styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/assets/styles'));
});

// Concatenate & Minify JS
gulp.task('scripts', function(){
  return gulp.src('src/assets/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/scripts'));
});

// Watch files for changes
gulp.task('watch', function(){
  gulp.watch('src/assets/scripts/*.js', ['lint', 'scripts']);
  gulp.watch('src/assets/styles/*.scss', ['sass']);
  gulp.watch('src/assets/styles/*.less', ['less']);
  gulp.watch('dist/assets/styles/*.css', ['prefix']);
});

//Default task
gulp.task('default', function (callback) {
  runSequence(['watch'],
    callback
  );
});
