// Fallback exports for node and phantomjs
var exports = exports || {};

// Code to run inside of mocha
exports.mocha = function () {
  before(function (done) {
    var exec = require('child_process').exec;
    var that = this;
    exec('phantomjs ' + this.filepath, function (err, stdout, stderr) {
      that.stdout = stdout;
      if (stderr) {
        console.error(stderr);
      }
      if (err) {
        done(err);
      }
    });
  });

  it('process.exit exits with given code', function () {
    var assert = require('assert');
    assert.strictEqual(this.stdout, 'Hello World');
  });
};

// Executed in the context of PhantomJS after shimming
exports.phantomjs = function () {
  process.stdout.write('Hello World');
  phantom.exit();
};
if (typeof phantom !== 'undefined') {
  exports.phantomjs();
}