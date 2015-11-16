'use strict';

var gulp = require('gulp');
var factory = require('lambda-handler');
var path = require('path');
var zip  = require('gulp-zip');
var packageJson = require('./package.json');

gulp.task('run', function() {
  var handlerPath = path.resolve('./src/index');
  var fixturePath = path.resolve('./test/fixtures/example.json');

  factory(handlerPath, fixturePath, function(handler, event, context) {
    handler(event, context);
  })();
});

gulp.task('archive', function () {
  var nodeModulePaths = Object.keys(packageJson['dependencies']).map(function(name) {
    return 'node_modules/' + name + '/**';
  });

  return gulp.src(['src/**'].concat(nodeModulePaths), {base: "."})
             .pipe(zip('archive.zip'))
             .pipe(gulp.dest('dist'));
});