// Fallback exports for node and phantomjs
var exports = exports || {};

// Code to run inside of mocha
exports.mocha = function () {
  before(function (done) {
    var spawn = require('child_process').spawn;
    var child = spawn('phantomjs', [this.filepath], {stdio: [0, 1, 2]});
    var that = this;
    child.on('exit', function (code, signal) {
      that.code = code;
      done();
    });
  });

  it('process.exit exits with given code', function () {
    var assert = require('assert');
    assert.strictEqual(this.code, 100);
  });
};

// Executed in the context of PhantomJS after shimming
exports.phantomjs = function () {
  process.exit(100);
};
if (typeof phantom !== 'undefined') {
  exports.phantomjs();
}