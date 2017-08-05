Cassettes
=========

It is straightforward to extend this module to add commands. 
Commands are loaded automatically from cassettes placed in this folder. 

Use the following cassette template to get started:

```
'use strict';

const shared = require('../lib/shared');
const debug = require('debug')('app:watsncv/yourcmd');

// Each cassette must export a load function
exports.load = load;

//--

// Setup your command using commander sub-command syntax 
// see: https://github.com/tj/commander.js
function load(program) {
  program.command('yourcmd <file>')
    .description('A description of what yourcmd will do')
    .option('-o, --opt', 'Any options you need')
    .action(program.play(yourcmd));
}

// Do what needs doing for your command
// program is always the first parameter passed in. The rest depend on your command setup in load.
function yourcmd(program, file, options) {
  var workspace = shared.loadWorkspace(file);
  
  if(options.opt) {
    // The opt flag was set
  }

  if(anError) {
    program.error(new Error(anError)); //use program.error() to exit the program with an error
  }

  program.out(response); // use program.out() to print to console
}
```