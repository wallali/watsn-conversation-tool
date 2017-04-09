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

const assert = require('assert');
const sinon = require('sinon');
const cassette = require('../src/cassettes/stat');

describe('stat cassette', function () {
  var program;

  beforeEach(function () {
    program = {
      out: sinon.spy()
    };
  });

  afterEach(function () {
    program.out.reset();
  });

  it('prints stats for loaded json', function () {
    cassette.stat(program, './test/sample/car_workspace.json', {});

    assert(program.out.calledOnce);
    assert(program.out.args[0][0].match(/25 intents, 13 entities, 142 nodes/i));
    assert(program.out.args[0][0].match(/\n/));
  });

  it('prints stats for loaded json on single line', function () {
    cassette.stat(program, './test/sample/car_workspace.json', {single: true});

    assert(program.out.calledOnce);
    assert(!program.out.args[0][0].match(/\n/));
  });

});
