const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');

gulp.task('babel', () => {
  gulp.src('src/js/*.js')
    .pipe(babel({
        presets: ['es2015']
      }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('uglify', () => {
  gulp.src('dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/minjs/'));
});

gulp.task('build', ['jshint', 'babel', 'uglify']);

gulp.task('lint', () => {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint', 'build', 'watch']);
