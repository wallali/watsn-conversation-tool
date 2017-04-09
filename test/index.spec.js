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
const main = require('..');


describe('main', function () {

  it('setupServices loads program with common services', function () {
    var prog = {};
    main.setupServices(prog);

    assert(prog.out);
    assert(prog.error);
    assert(prog.debug);
    assert(prog.play);
  });

  it('play calls callback with program as first argument', function () {
    var prog = {};
    main.setupServices(prog);

    var operation = sinon.stub();

    prog.play(operation)('param');

    assert(operation.calledWithExactly(prog, 'param'));
  });

});
