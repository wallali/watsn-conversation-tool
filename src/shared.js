'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');

exports.loadWorkspace = loadWorkspace;

//--

function loadWorkspace(file) {
  var normalizedPath = path.join(__dirname, '..', file);
  var stat = fs.statSync(normalizedPath);

  if (!normalizedPath.match(/\.json/i) && stat.isFile()) {
    throw new Error(
      util.format('Unexpected extension, workspace file must be JSON, %s \'%s\'',
        loadWorkspace.name,
        normalizedPath)
    );
  }

  return require(normalizedPath);
}
