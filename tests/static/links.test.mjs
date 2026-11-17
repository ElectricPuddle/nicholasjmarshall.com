import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const allowlist = JSON.parse(readFileSync(path.join(repoRoot, 'tests', 'allowlist.json'), 'utf8'));
const pages = ['index.html', 'about.html', 'journey.html'];

function resolveTarget(currentFile, target) {
  const [urlPart, hashPart] = target.split('#');
  if (!urlPart || urlPart === '') {
    return { file: currentFile, hash: hashPart || null };
  }
  if (urlPart.startsWith('http://') || urlPart.startsWith('https://') || urlPart.startsWith('mailto:')) {
    return null;
  }
  const resolved = path.resolve(path.dirname(currentFile), urlPart);
  const normalized = resolved.replace(/\\/g, '/');
  return { file: normalized, hash: hashPart || null };
}

test('All internal href and src values resolve correctly', () => {
  for (const page of pages) {
    const html = readFileSync(path.join(repoRoot, page), 'utf8');
    const $ = cheerio.load(html);

    $('a, img, script, link').each((index, element) => {
      const attrName = element.tagName === 'img' || element.tagName === 'script' ? 'src' : 'href';
      const value = $(element).attr(attrName);
      if (!value) return;
      if (value.startsWith('mailto:')) return;
      if (value.startsWith('http://') || value.startsWith('https://')) {
        assert.ok(allowlist.includes(value), `${page} includes a non-allowlisted external URL: ${value}`);
        return;
      }
      if (value.startsWith('#')) {
        const targetId = value.slice(1);
        assert.ok($(`#${targetId}`).length > 0, `${page} skip link target not found: ${value}`);
        return;
      }

      const resolved = resolveTarget(path.join(repoRoot, page), value);
      assert.ok(resolved, `${page} has an unresolved target: ${value}`);
      if (resolved && resolved.file) {
        const fileExists = existsSync(resolved.file);
        assert.equal(fileExists, true, `${page} references a missing file: ${value}`);
      }
      if (resolved && resolved.hash && existsSync(resolved.file)) {
        const targetHtml = readFileSync(resolved.file, 'utf8');
        const target$ = cheerio.load(targetHtml);
        assert.ok(target$(`#${resolved.hash}`).length > 0, `${page} references a missing anchor: ${value}`);
      }
    });
  }
});
