// Fallback exports for node and phantomjs
var exports = exports || {};

// Code to run inside of mocha
exports.mocha = function () {
  before(function (done) {
    var spawn = require('child_process').spawn;
    var child = spawn('phantomjs', [this.filepath], {stdio: [0, 1, 'pipe']});
    var that = this;
    this.stderr = '';
    child.stderr.on('data', function (buff) {
      that.stderr += buff;
    });
    child.on('exit', function (code, signal) {
      done();
    });
  });

  it('process.exit exits with given code', function () {
    var assert = require('assert');
    assert.strictEqual(this.stderr, 'Hello World');
  });
};

// Executed in the context of PhantomJS after shimming
exports.phantomjs = function () {
  process.stderr.write('Hello World');
  phantom.exit();
};
if (typeof phantom !== 'undefined') {
  exports.phantomjs();
}