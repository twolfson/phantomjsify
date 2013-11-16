var system = require('system');
process.stdout = system.stdout;
// TODO: Will this work
// process.stderr = require('system').stderr;
process.exit = phantom.exit;