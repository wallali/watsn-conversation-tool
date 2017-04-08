#!/usr/bin/env node

/**
 * Copyright (c) 2017 Ali Lokhandwala <ali@huestones.co.uk>. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
