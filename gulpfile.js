/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const path = require('path');
const gulp = require('gulp');
const pkg = require('./package.json');
const $ = require('gulp-load-plugins')();
const gulpSequence = require('gulp-sequence');
const importOnce = require('node-sass-import-once');
const stylemod = require('gulp-style-modules');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const combiner = require('stream-combiner2');
const bump = require('gulp-bump');
const argv = require('yargs').argv;
/* Used to transpile JavaScript */
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const flow = require('gulp-flowtype');
const exec = require('child_process').exec;
const through = require('through2');
const { ensureLicense } = require('ensure-px-license');

const sassOptions = {
  importer: importOnce,
  importOnce: {
    index: true,
    bower: true
  }
};

gulp.task('clean', function() {
  return gulp.src(['.tmp', 'css'], {
    read: false
  }).pipe($.clean());
});

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}

function buildCSS(){
  return combiner.obj([
    $.sass(sassOptions),
    $.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      flexbox: false
    }),
    gulpif(!argv.debug, $.cssmin())
  ]).on('error', handleError);
}

gulp.task('sass', function() {
  return gulp.src(['px*/sass/*.scss'])
    .pipe(cache('sassing'))
    .pipe(buildCSS())
    .pipe(stylemod({
      moduleId: function(file) {
        return path.basename(file.path, path.extname(file.path)) + '-styles';
      }
    }))
    .pipe(ensureLicense())
    .pipe(rename(file => {
      file.dirname = file.dirname.replace('sass', 'css');
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream({match: 'css/*.html'}));
});

// Globbing pattern to find ES6 source files that need to be transpiled
const ES6_SRC = ['px*/*.es6.js'];

gulp.task('transpile', function() {
  return gulp.src(ES6_SRC)
    .pipe(cache('transpiling'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .on('error', function(err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(rename(path => {
      path.dirname = `${path.dirname}/dist`;
      path.basename = path.basename.replace('.es6', '');
      console.log(`Transpiling ${path.basename}.es6.js -> dist/${path.basename}.js`);
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});

// Flow tasks
const FLOW_SRC = 'px-app-asset/src/*.flow.js';
const FLOW_DEST = 'px-app-asset';

gulp.task('flow:babel', function(cb) {
  gulp.src(FLOW_SRC, {base:'./'})
    .pipe(babel({ plugins: ['transform-flow-strip-types'], babelrc: false }))
    .on('error', function(err) {
      console.error(err);
    })
    .pipe(rename(path => {
      console.log(path);
      path.dirname = `${FLOW_DEST}/`
      path.basename = path.basename.replace('.flow', '.es6');
      console.log(`Transpiling ${path.basename}.flow.js -> dist/${path.basename}.es6.js`);
    }))
    .pipe(gulp.dest(function(file){
      return '.';
    }))
    .on('end', cb);
});

gulp.task('flow', ['flow:babel'], function() {
  // gulp.src(FLOW_SRC)
  //   .pipe(flow({
  //     all: false,
  //     weak: false,
  //     killFlow: false,
  //     beep: true,
  //     abort: false
  //   }));
});

gulp.task('generate-api', function (cb) {
  exec(`node_modules/.bin/polymer analyze px-*/px-*.html > px-app-helpers-api.json`, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', function() {
  gulp.watch(FLOW_SRC, ['flow']);
  gulp.watch(['sass/*.scss'], ['sass']);
});

gulp.task('serve', function() {
  browserSync.init({
    port: 8080,
    notify: false,
    reloadOnRestart: true,
    logPrefix: `${pkg.name}`,
    https: false,
    server: ['./', 'bower_components'],
  });

  gulp.watch(FLOW_SRC, ['flow']);
  gulp.watch(['px*/sass/*.scss'], ['sass']);
  gulp.watch(['px*/css/*-styles.html', 'px*/*.html', `px*/dist/*.js`, 'demo/*.html']).on('change', browserSync.reload);
});

gulp.task('bump:patch', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'patch'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('bump:major', function(){
  gulp.src(['./bower.json', './package.json'])
  .pipe(bump({type:'major'}))
  .pipe(gulp.dest('./'));
});

gulp.task('license', function() {
  return gulp.src(['./**/*.{html,js,css,scss}', '!./node_modules/**/*', '!./bower_components?(-1.x)/**/*'])
    .pipe(ensureLicense())
    .pipe(gulp.dest('.'));
});

gulp.task('default', function(callback) {
  gulpSequence('clean', 'sass', 'flow', 'license')(callback);
});
