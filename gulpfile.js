const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');

const filesToMove = [
  './src/css/*.css',
  './src/index.html',
  './src/bower_components/*'
];

gulp.task('move', () => {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './src/' })
  .pipe(gulp.dest('dist'));
});

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

gulp.task('build', ['jshint', 'babel', 'uglify', 'move']);

gulp.task('lint', () => {
  gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['build', 'watch']);
