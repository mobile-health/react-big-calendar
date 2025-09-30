'use strict';

const { execSync } = require('child_process');
const version = require('../../package.json').version;

if (!version) {
  console.error('No version found in package.json');
  process.exit(1);
}

try {
  execSync(`git tag v${version}`, { stdio: 'inherit' });
  execSync(`git push origin v${version}`, { stdio: 'inherit' });
  console.log(`Tagged and pushed v${version}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
