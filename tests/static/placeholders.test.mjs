import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'playwright-report' || entry.name === 'test-results') continue;
    const fullPath = path.join(dir, entry.name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      results.push(...walk(fullPath));
    } else if (['.html', '.css', '.js', '.md', '.mjs'].includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = walk(repoRoot);
const placeholderCounts = new Map();

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  const count = (content.match(/\[PLACEHOLDER\]/g) || []).length;
  if (count > 0) placeholderCounts.set(path.relative(repoRoot, file), count);
}

test('Placeholder markers are tracked and fail only at launch', () => {
  if (placeholderCounts.size > 0) {
    for (const [file, count] of placeholderCounts) {
      console.warn(`${file}: ${count} placeholder marker(s)`);
    }
  }

  if (process.env.LAUNCH === '1') {
    assert.equal(placeholderCounts.size, 0, 'Launch mode fails when placeholder markers remain');
  }
});
