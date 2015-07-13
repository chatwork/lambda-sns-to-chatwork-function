var JSZip = require('jszip');
var fs = require('fs');
var glob = require('glob');
var packages = require('../package.json');
var path = require('path');

var nodeModules = Object.keys(packages['dependencies']);
var nodeModulePaths = nodeModules.map(function(name) {
  return glob.sync('node_modules/' + name + '/**')
});
var files = nodeModulePaths
                .concat(glob.sync('config/*.json'))
                .concat(glob.sync('src/**/*.js'))
                .reduce(function(a, b) {
                  return a.concat(b);
                }, []);
var zip = new JSZip();
files.forEach(function(filePath) {
  if (fs.statSync(filePath).isDirectory()) {
    return;
  }
  zip.file(filePath, fs.readFileSync(path.resolve(filePath)));
});

fs.writeFileSync('archive.zip', zip.generate({type:"nodebuffer"}));

