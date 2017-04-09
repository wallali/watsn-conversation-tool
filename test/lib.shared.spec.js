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
const shared = require('../src/lib/shared');


describe('shared lib', function () {

  describe('loadWorkspace', function () {

    it('loads workspace from path', function () {
      var workspace = shared.loadWorkspace('./test/sample/car_workspace.json');
      var expected = require('./sample/car_workspace.json');

      assert(workspace);
      assert.deepStrictEqual(workspace, expected);
    });

    it('errors loading non-json file', function () {
      assert.throws(() => shared.loadWorkspace('./index.js'),
        /Unexpected extension, workspace file must be JSON/i);
    });

    it('errors loading non-file', function () {
      assert.throws(() => shared.loadWorkspace('./test'),
        /Unexpected extension, workspace file must be JSON/i);
    });

    it('errors loading non-existing file', function () {
      assert.throws(() => shared.loadWorkspace('./test/sample/doesnotexist.json'),
        /no such file or directory/i);
    });
  });

});
