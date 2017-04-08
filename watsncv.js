#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const program = require('commander');
const log = require('debug')('app:watsncv');
const pkg = require('./package.json');

main();

//--

function main() {
  program.version(pkg.version);

  var normalizedPath = path.join(__dirname, 'src', 'cassettes');

  log('Loading cassettes from %s', normalizedPath);

  fs.readdirSync(normalizedPath).forEach(function (file) {
    var fp = path.join(normalizedPath, file);
    var stat = fs.statSync(fp);
    if (fp.match(/\.js$/i) && stat.isFile()) {

      log('Loading %s', fp);

      var cassette = require(fp);
      cassette.load(program);
    } else {
      log('Skipped %s, not a file or .js', fp);
    }
  });

  try {
    program.parse(process.argv);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  if (!process.argv.slice(2).length) {
    program.help();
  }

  return 0;
}
