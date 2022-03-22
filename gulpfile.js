/* eslint-disable node/no-unpublished-require*/
const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload();
const nodemon = require('gulp-nodemon');
/* eslint-enable node/no-unpublished-require*/

//CSS
function scss() {
  return src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(cssnano())
    .pipe(dest('public/stylesheets'))
    .pipe(browserSync.stream());
}
//EJS
function ejs() {
  return src('views/**/*.ejs').pipe(browserSync.stream());
}

//BROWSER-SYNC
function browsersync() {
  [nodemon],
    browserSync.init(null, {
      proxy: 'http://localhost:3000',
      files: ['**/*.*'],
      browser: 'opera',
      port: 7000,
    });
}

//NODEMON
function nodmon(cb) {
  let started = false;
  return nodemon({
    script: 'index.js',
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
}

function startWatch() {
  watch('dev/scss/**/*.scss', { usePolling: true }, scss);
  watch('views/**/*.ejs', { usePolling: true }, ejs);
}
exports.default = series(nodmon, scss, ejs, parallel(browsersync, startWatch));
