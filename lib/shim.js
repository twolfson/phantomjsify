// DEV: This is not in a separate file since we may have node based dependencies (e.g. `which` at some point)
var system = require('system');
module.exports = function installShims () {
  // TODO: stdin uses the same API as its streams in fs but this doesn't line up with node
  // https://github.com/ariya/phantomjs/wiki/API-Reference-FileSystem
  // https://github.com/ariya/phantomjs/issues/10270
  // http://wiki.commonjs.org/wiki/System
  // process.stdin = system.stdin;

  // http://nodejs.org/api/process.html#process_process_stdout
  // https://github.com/ariya/phantomjs/blob/1.9.2/src/system.cpp#L176-L204
  process.stdout = system.stdout;
  process.stderr = system.stderr;

  // http://nodejs.org/api/process.html#process_process_exit_code
  // https://github.com/ariya/phantomjs/wiki/API-Reference-phantom#exitreturnvalue-void
  process.exit = phantom.exit;

  // https://github.com/ariya/phantomjs/wiki/API-Reference-system#wiki-system-args
  // http://nodejs.org/api/process.html#process_process_argv
  // TODO: Will this work on Windows?
  process.argv = ['phantomjs'].concat(system.args);

  // Expose process as a global
  global.process = process;
};