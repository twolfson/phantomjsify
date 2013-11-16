# phantomjsify [![Build status](https://travis-ci.org/twolfson/phantomjssmith.png?branch=master)](https://travis-ci.org/twolfson/phantomjssmith)

[Browserify][] transform to fallback [node.js][] basics in [PhantomJS][]

This was built to be able to run option parsers like [commander][] inside of [PhantomJS][].

[Browserify]:
[node.js]:
[PhantomJS]:
[commander]:

## Getting Started
Install the module with: `npm install phantomjsify`

Use it as a transform with [browserify][]:

```bash
# Currently, we require you to skip over PhantomJS exclusive require's (e.g. `system`)
browserify --standalone commander --entry node_modules/commander/index.js --transform phantomjsify --external system --outfile vendor/commander.js
```

Require

## Documentation
It is an aggressive venture to shim over all of [node][]'s functionality, especially across multiple versions. As a result, we are taking only what we need as we need it.

**Pull requests are encouraged!**

### Shimmed this far
- process.stdout - http://nodejs.org/api/process.html#process_process_stdout
- process.stderr - http://nodejs.org/api/process.html#process_process_stderr
- process.exit - http://nodejs.org/api/process.html#process_process_exit_code
- process.argv - http://nodejs.org/api/process.html#process_process_argv

## Donating
Support this project and [others by twolfson][gittip] via [gittip][].

[![Support via Gittip][gittip-badge]][gittip]

[gittip-badge]: https://rawgithub.com/twolfson/gittip-badge/master/dist/gittip.png
[gittip]: https://www.gittip.com/twolfson/

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## Unlicense
As of Nov 16 2013, Todd Wolfson has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE
