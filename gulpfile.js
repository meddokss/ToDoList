const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
    .pipe(gulp.dest('css'));
});


gulp.task('default', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});