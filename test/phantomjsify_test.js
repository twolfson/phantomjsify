var glob = require('glob');
var Tempfile = require('temporary/lib/file');
var testFiles = glob.sync('test-files/**/*.js', {cwd: __dirname});

describe('phantomjsify', function () {
  testFiles.forEach(function (testFile) {
    describe('executing ' + testFile, function () {
      var test = require('./' + testFile);
      test.mocha();
    });
  });
});