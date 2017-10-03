/**
 * Copyright (c) 2017 Ali Lokhandwala <ali@huestones.co.uk>. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const assert = require('assert');
const _ = require('lodash');
const sinon = require('sinon');
const moment = require('moment');
const cassette = require('../src/cassettes/search');

describe('search cassette', function () {
  var program;

  beforeEach(function () {
    program = {
      out: sinon.spy()
    };
  });

  afterEach(function () {
    program.out.reset();

  });

  it('Outputs full JSON if no options defined', function (done) {
    cassette.search(program, './test/sample/car_workspace.json', {}, {});

    assert(program.out.calledOnce);
    done();
  });

  it('--context finds specified context variable', function (done) {
    let workspace = cassette.search(program, './test/sample/car_workspace.json', 'reprompt', { 'context': true });

    assert(program.out.calledOnce);
    assert.strictEqual(workspace.entities.length, 0);
    assert.strictEqual(workspace.intents.length, 0);
    _.forEach(workspace.intents.dialog_nodes, function(node) {
      assert(_.includes(node.context, 'reprompt'));
    });
    done();
  });

  it('finds entities modified after given date', function (done) {
    let afterDate = moment('2017-03-14');
    let options = { 'pretty': true, 'only': true, 'entities': true, 'after': afterDate };

    cassette.search(program, './test/sample/car_workspace.json', null, options);

    assert(program.out.calledOnce);
    assert(program.out.args[0][0].match(/"intents":.\[\],/g));
    assert(!program.out.args[0][0].match(/"updated": "2017-03-1[^4]/g));
    done();
  });

  it('finds anything modified before given date', function (done) {
    let beforeDate = moment('2017-03-14');
    let options = { 'pretty': true, 'only': true, 'before': beforeDate };

    cassette.search(program, './test/sample/car_workspace.json', null, options);

    assert(program.out.calledOnce);
    assert(program.out.args[0][0].match(/"intents".*\n.*\n.*\n.*\n.*"updated": "2017-03-12/g));
    assert(program.out.args[0][0].match(/"entities":.\[\],/g));
    done();
  });

  it('finds intents modified after given date', function (done) {
    let afterDate = moment('2017-03-13');
    let options = { 'pretty': true, 'only': true, 'intents': true, 'after': afterDate };

    let workspace = cassette.search(program, './test/sample/car_workspace.json', null, options);

    assert(program.out.calledOnce);
    assert.strictEqual(workspace.entities.length, 0);
    assert(!program.out.args[0][0].match(/"updated": "2017-03-1[^4]/g));
    done();
  });

  it('--node finds specified node', function (done) {
    cassette.search(program, './test/sample/car_workspace.json', '', { 'node': 'node_12_1467233032148' });

    assert(program.out.calledThrice);
    assert.strictEqual(program.out.args.length, 3);
    assert(program.out.args[1][0].match(/dialog_node:.*node_12_1467233032148/g));
    done();
  });
})
;
