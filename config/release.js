/*eslint no-console: 0*/
'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

function generateChangelog(project, version) {
  console.log('Generating changelog...');

  let content = `future-release=${version}\n`;
  let generatorPath = path.join(project.root, '.github_changelog_generator');

  return new Promise(function(resolve, reject) {
    fs.writeFile(generatorPath, content, (err) => err ? reject(err) : resolve());
  }).then(() => {
    return _commandPromise('github_changelog_generator');
  })
}

function regeneratePackageLock() {
  console.log('Regenerating package.lock...');

  let removeCommand = `rm -rf tmp dist node_modules package-lock.json`;
  let installCommand = `npm i`;

  return _commandPromise(removeCommand).then(() => _commandPromise(installCommand));
}

function _commandPromise(command) {
  return new Promise(function(resolve, reject) {
    exec(command, (err) => err ? reject(err) : resolve());
  });
}

// For details on each option run `ember help release`
module.exports = {
  // local: true,
  // remote: 'some_remote',
  // annotation: "Release %@",
  message: "%@",
  // manifest: [ 'package.json', 'bower.json', 'someconfig.json' ],
  // publish: true,
  // strategy: 'date',
  // format: 'YYYY-MM-DD',
  // timezone: 'America/Los_Angeles',

  beforeCommit: function(project, versions) {
    return generateChangelog(project, versions.next).then(() => regeneratePackageLock());
  }
};
