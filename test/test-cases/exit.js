var exports = exports || {};

// Before handler for mocha
exports.run = function (done) {
  var spawn = require('child_process').spawn;
  var child = spawn('phantomjs', [__dirname]);
  var that = this;
  child.on('exit', function (code, signal) {
    that.code = code;
    done();
  });
};

// Assertion to run inside of mocha
exports.assert = function () {
  var assert = require('assert');
  assert.strictEqual(this.code, 100);
};

// Executed in the context of PhantomJS after shimming
exports.test = function () {
  process.exit(100);
};

if (typeof phantom !== 'undefined') {
  exports.test();
}