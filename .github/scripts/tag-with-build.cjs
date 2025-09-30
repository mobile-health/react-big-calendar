'use strict';

const { execSync } = require('child_process');
const fs = require('fs');

function sh(cmd) {
  console.log(`[sh] ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

const version = require('../../package.json').version;
if (!version) {
  console.error('No version found in package.json');
  process.exit(1);
}

try {
  // Ensure clean working tree
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
  if (status) {
    console.error('Working tree is not clean. Aborting.');
    process.exit(1);
  }

  const branchName = `release/v${version}`;

  // Create temp branch for the release commit
  sh(`git checkout -b ${branchName}`);

  // Build artifacts
  sh('yarn install --frozen-lockfile');
  sh('yarn build');

  // Force add ignored build outputs
  sh('git add -f dist lib');

  // If nothing to add (build outputs already present/unchanged), still proceed to tag
  try {
    sh(`git commit -m "chore(release): include build for v${version}"`);
  } catch (e) {
    console.log('No changes to commit (dist/lib unchanged). Proceeding to tag.');
  }

  // Create and push tag for this commit
  sh(`git tag v${version}`);
  sh(`git push origin v${version}`);

  // Switch back and delete the temp branch locally
  sh('git checkout -');
  sh(`git branch -D ${branchName}`);

  console.log(`Tagged v${version} with built artifacts.`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
