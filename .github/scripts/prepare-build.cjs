'use strict';

const fs = require('fs');
const { execSync } = require('child_process');

function exists(dir) {
  try { return fs.existsSync(dir); } catch { return false; }
}

function inGitRepo() {
  return exists('.git');
}

try {
  // Install husky only when developing in the repo (has .git) and not in CI
  if (inGitRepo() && !process.env.CI) {
    try {
      execSync('husky install', { stdio: 'inherit' });
    } catch (e) {
      // ignore husky errors during prepare
    }
  }

  const hasLib = exists('lib');
  const hasDist = exists('dist');

  if (hasLib && hasDist) {
    console.log('[prepare] lib/ and dist/ exist; skipping build');
    process.exit(0);
  }

  console.log('[prepare] Building because lib/ or dist/ missing');
  execSync('yarn build', { stdio: 'inherit' });
} catch (e) {
  console.error(e);
  process.exit(1);
}
