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
const _ = require('lodash');
const debug = require('debug')('app:watsncv');
const pkg = require('./package.json');

exports = module.exports = main;
main.setupServices = setupServices;

//--

function main() {
  program.version(pkg.version);
  setupServices(program);

  var normalizedPath = path.join(__dirname, 'src', 'cassettes');

  program.debug('Loading cassettes from %s', normalizedPath);

  fs.readdirSync(normalizedPath)
    .filter(filename => /\.js$/i.test(filename))
    .forEach((file) => {
      var fp = path.join(normalizedPath, file);
      var stat = fs.statSync(fp);
      if (stat.isFile()) {

        program.debug('Loading \'%s\'', fp);

        var cassette = require(fp);
        cassette.load(program);
      } else {
        program.debug('Skipped \'%s\', not a file', fp);
      }
    });

  try {
    program.parse(process.argv);
  } catch (e) {
    program.error(e);
  }

  if (!process.argv.slice(2).length) {
    program.help();
  }

  return program;
}

function setupServices(program) {
  program.debug = debug;

  program.error = (e => {
    console.error(e.message);
    process.exit(1);
  });

  program.out = console.log;

  program.play = (f => _.wrap(program, f));
}
