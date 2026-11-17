import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const allowlist = JSON.parse(readFileSync(path.join(repoRoot, 'tests', 'allowlist.json'), 'utf8'));

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'playwright-report' || entry.name === 'test-results') continue;
    const fullPath = path.join(dir, entry.name);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (['.html', '.css', '.js', '.mjs'].includes(path.extname(fullPath))) {
      files.push(fullPath);
    }
  }
  return files;
}

function collectUrls(content) {
  return [...content.matchAll(/https?:\/\/[^\s"'<>]+|\/\/[^\s"'<>]+/g)].map((match) => match[0]);
}

test('Allowed external URLs and CSP-safe markup are enforced', () => {
  const files = walk(repoRoot);

  for (const file of files) {
    if (file.includes('/tests/')) continue;
    const content = readFileSync(file, 'utf8');

    assert.doesNotMatch(content, /<script\b[^>]*>/i, `${path.relative(repoRoot, file)} contains an inline script block`);
    assert.doesNotMatch(content, /<style\b[^>]*>/i, `${path.relative(repoRoot, file)} contains a style block`);

    const htmlWithoutComments = content.replace(/<!--([\s\S]*?)-->/g, '');
    const doc = htmlWithoutComments.match(/<[^>]+>/g) || [];
    for (const tag of doc) {
      if (/<\s*style\b/i.test(tag)) {
        assert.fail(`${path.relative(repoRoot, file)} contains a style tag`);
      }
      if (/(?:^|\s)style\s*=\s*['"][^'"]*['"]/i.test(tag)) {
        assert.fail(`${path.relative(repoRoot, file)} contains a style attribute`);
      }
      const eventAttributes = [...tag.matchAll(/\s(on[a-z0-9-]+)\s*=\s*(?:['"][^'"]*['"]|[^\s>]+)/gi)].map((match) => match[1].toLowerCase());
      if (eventAttributes.some((name) => name.startsWith('on'))) {
        assert.fail(`${path.relative(repoRoot, file)} contains an inline event handler`);
      }
    }

    for (const url of collectUrls(content)) {
      if (url.startsWith('//')) {
        const normalized = `https:${url}`;
        assert.ok(allowlist.includes(normalized) || normalized.startsWith('http://127.0.0.1') || normalized.startsWith('http://localhost'), `${path.relative(repoRoot, file)} uses an unapproved protocol-relative URL: ${url}`);
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        assert.ok(allowlist.includes(url) || url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost'), `${path.relative(repoRoot, file)} uses an unapproved external URL: ${url}`);
      }
    }
  }
});
