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

const _ = require('lodash');
const moment = require('moment');
const shared = require('../lib/shared');
const prettyjson = require('prettyjson');

exports.load = load;
exports.search = search;

//--

function load(program) {
  program.command('search <file> [string]')
    .description('search for matching intents and entities within the conversation file')
    .option('-b, --before [date]', 'limit search to items modified (or created) before selected date', moment)
    .option('-a, --after [date]', 'limit search to items modified (or created) after selected date', moment)
    .option('-c, --created', 'use creation date instead of modification date for all date filters', moment)
    .option('-i, --ignorecase', 'perform case insensitive search with string')
    .option('-n, --intents', 'limit search to intents')
    .option('-e, --entities', 'limit search to entities')
    .option('-m, --node <node>', 'specify the node ID to be searched', null)
    .option('-t, --context [variable]', 'Output only the nodes that change a given variable within the context', null)
    .option('-o, --only', 'use in conjunction with -n or -e to output only intents or entities')
    .option('-p, --pretty', 'make the output look pretty')
    .action(program.play(search));
}

function search(program, file, string, options) {
  var workspace = shared.loadWorkspace(file);
  let re = string ? new RegExp(string, options.ignorecase ? 'gi' : 'g') : null;

  if (options.intents && options.entities) {
    options.intents = options.entities = false;
  }

  if (!options.entities) {
    if (options.before && options.before.isValid()) {
      workspace.intents.forEach(intent =>
        _.remove(intent.examples, ex =>
          options.before.isBefore(options.created ? ex.created : ex.updated)));

      _.remove(workspace.intents, i =>
        !i.examples.length && options.before.isBefore(options.created ? i.created : i.updated));
    }

    if (options.after && options.after.isValid()) {
      workspace.intents.forEach(intent =>
        _.remove(intent.examples, ex =>
          options.after.isAfter(options.created ? ex.created : ex.updated)));

      _.remove(workspace.intents, i =>
        !i.examples.length && options.after.isAfter(options.created ? i.created : i.updated));
    }

    if (string) {
      workspace.intents.forEach(i =>
        _.remove(i.examples, e => !re.test(i.intent) && !re.test(e.text))
      );

      _.remove(workspace.intents, i => !i.examples.length && !re.test(i.intent));
    }
  }

  if (!options.intents) {
    if (options.before && options.before.isValid()) {
      workspace.entities.forEach(entity =>
        _.remove(entity.values, v =>
          options.before.isBefore(options.created ? v.created : v.updated)));

      _.remove(workspace.entities, e =>
        !e.values.length && options.before.isBefore(options.created ? e.created : e.updated));
    }

    if (options.after && options.after.isValid()) {
      workspace.entities.forEach(entity =>
        _.remove(entity.values, v =>
          options.after.isAfter(options.created ? v.created : v.updated)));

      _.remove(workspace.entities, e =>
        !e.values.length && options.after.isAfter(options.created ? e.created : e.updated));
    }

    if (string) {
      workspace.entities.forEach(entity =>
        _.remove(entity.values, v =>
          !re.test(entity.entity) && !re.test(v.value) && !_.filter(v.synonyms, s => re.test(s)).length));

      _.remove(workspace.entities, e => !re.test(e.entity) && !e.values.length);
    }
  }

  if (options.only) {
    workspace.dialog_nodes = [];

    if (options.intents) {
      workspace.entities = [];
    }
    if (options.entities) {
      workspace.intents = [];
    }
  }

  if (options.context) {
    workspace.intents = [];
    workspace.entities = [];

    let contextVar = options.context;

    workspace.dialog_nodes = workspace.dialog_nodes.filter(node => JSON.stringify(node.context || {}).includes(contextVar));
  }

  if (!options.node && !options.context) {
    program.out(JSON.stringify(workspace, null, options.pretty ? 2 : null));
  } else if (options.context) {
    program.out(prettyjson.render(workspace));
  } else {
    var nodeId = options.node;
    var allNodes = workspace.dialog_nodes;

    var yourNode = (_.find(allNodes, { 'dialog_node': nodeId })) || 'Node not found';
    var parentNode = (_.find(allNodes, { 'dialog_node': yourNode.parent })) || 'Node not found';
    var nextStep = yourNode.next_step || yourNode.go_to || 'Node not found';
    if (nextStep !== 'Node not found') {
      nextStep = (_.find(allNodes, { 'dialog_node': nextStep.dialog_node })) || 'Node not found';
    }

    program.out('Parent Node: \n' + prettyjson.render(parentNode) + '\n');
    program.out('Your Node: \n' + prettyjson.render(yourNode) + '\n');
    program.out('Next Step: \n' + prettyjson.render(nextStep) + '\n');
  }
}
