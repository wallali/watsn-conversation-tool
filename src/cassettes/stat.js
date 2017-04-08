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
