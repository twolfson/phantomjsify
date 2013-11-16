var Browserify = require('browserify');
var glob = require('glob');
var Tempfile = require('temporary/lib/file');

var testFiles = glob.sync(__dirname + '/test-files/**/*.js');
var phantomjsify = require('../');

describe('phantomjsify', function () {
  testFiles.forEach(function (testFile) {
    describe('executing ' + testFile, function () {
      before(function bundleFile (done) {
        // Browserify the test file via phantomjsify
        var browserify = Browserify(testFile);
        browserify.transform(phantomjsify);
        // TODO: Make this not necessary
        browserify.external('system');

        // Write out the bundle to a temp file
        var tmp = new Tempfile();
        this.tmp = tmp;
        this.filepath = tmp.path;
        browserify.bundle({
          standalone: 'phantomjsify-test'
        }, function (err, src) {
          if (err) {
            return done(err);
          }
          tmp.writeFile(src, done);
        });
      });
      after(function (done) {
        this.tmp.unlink(done);
      });

      // Execute the testFile
      var test = require(testFile);
      test.mocha();
    });
  });
});