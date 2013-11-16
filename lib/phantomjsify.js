var fs = require('fs');
var through = require('through');
var shim = fs.readFileSync(__dirname + '/shim.js', 'utf8');

module.exports = function phantomjsify (file) {
  var src = '';
  function write(buffer) {
    src += buffer;
  }
  function end() {
    // TODO: When shim gets broken out this will become require('shim')();
    this.queue('(function () { var module = {}; ' + shim + ' module.exports(); }());');
    this.queue(src);
    this.queue(null);
  }

  return through(write, end);
};