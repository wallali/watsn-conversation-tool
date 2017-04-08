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

const util = require('util');
const shared = require('../shared');

exports.play = play;
exports.load = load;

//--

function load(program) {
  program.command('stats <file>')
    .description('Print stats for the conversation file')
    .option('-s, --single', 'Print on a single line')
    .action(play);
}

function play(file, options) {
  var workspace;
  workspace = shared.loadWorkspace(file);

  var format = '%s: %s\n%d intents, %d entities, %d nodes';

  if (options.single) {
    format = format.replace(/\n/gi, ', ');
  }

  var response = util.format(format,
    workspace.name,
    workspace.description,
    workspace.intents.length,
    workspace.entities.length,
    workspace.dialog_nodes.length
  );

  console.log(response);

  return response;
}
