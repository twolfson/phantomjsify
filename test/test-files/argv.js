// Fallback exports for node and phantomjs
var exports = exports || {};

// Code to run inside of mocha
exports.mocha = function () {
  before(function (done) {
    var spawn = require('child_process').spawn;
    var child = spawn('phantomjs', [this.filepath, 'hello'], {stdio: [0, 'pipe', 2]});
    var that = this;
    this.stdout = '';
    child.stdout.on('data', function (buff) {
      that.stdout += buff;
    });
    child.on('exit', function (code, signal) {
      done();
    });
  });

  it('process.exit exits with given code', function () {
    var assert = require('assert');
    var args;
    try {
      args = JSON.parse(this.stdout);
    } catch (e) {
      console.log('stdout was "' + this.stdout + '"');
      throw e;
    }
    assert.deepEqual(args, ['phantomjs', this.filepath, 'hello']);
  });
};

// Executed in the context of PhantomJS after shimming
exports.phantomjs = function () {
  console.log(JSON.stringify(process.argv));
  phantom.exit();
};
if (typeof phantom !== 'undefined') {
  exports.phantomjs();
}