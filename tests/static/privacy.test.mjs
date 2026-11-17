import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'playwright-report' || entry.name === 'test-results' || entry.name === '.next') {
      continue;
    }
    if (dir === repoRoot && entry.name === 'tests') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (
      ['.html', '.css', '.js', '.md', '.mjs'].includes(path.extname(fullPath)) &&
      !fullPath.endsWith('package-lock.json')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

const phonePattern = /(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?){2}\d{4}/;
const storagePattern = /document\.cookie|localStorage|sessionStorage|indexedDB/gi;

test('The repo does not include phone numbers or browser storage APIs', () => {
  const files = walk(repoRoot);

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    assert.doesNotMatch(content, phonePattern, `${path.relative(repoRoot, file)} contains a phone number`);
    if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.mjs')) {
      assert.doesNotMatch(content, storagePattern, `${path.relative(repoRoot, file)} uses browser storage or cookies`);
    }
  }
});
