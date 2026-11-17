import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

function extractCommentBlocks(html) {
  const startPattern = /<!--\s*CONTENT:START\s+id="([^"]+)"\s*-->/g;
  const endPattern = /<!--\s*CONTENT:END\s+id="([^"]+)"\s*-->/g;
  const starts = [...html.matchAll(startPattern)].map((match) => match[1]);
  const ends = [...html.matchAll(endPattern)].map((match) => match[1]);
  return { starts, ends };
}

test('Editable blocks have matching IDs and valid journey metadata', () => {
  for (const page of ['index.html', 'about.html', 'journey.html']) {
    const html = readFileSync(path.join(repoRoot, page), 'utf8');
    const { starts, ends } = extractCommentBlocks(html);

    assert.equal(starts.length, ends.length, `${page} has mismatched CONTENT block counts`);
    const uniqueStarts = new Set(starts);
    assert.equal(starts.length, uniqueStarts.size, `${page} has duplicate CONTENT:START IDs`);
    assert.deepEqual(starts.sort(), ends.sort(), `${page} has mismatched CONTENT IDs`);

    const $ = cheerio.load(html);
    if (page === 'about.html') {
      const images = $('img');
      assert.ok(images.length >= 0, `${page} should be parsed without errors`);
      for (const img of images.toArray()) {
        const alt = $(img).attr('alt');
        assert.ok(alt && alt.trim().length > 0, `${page} contains an image without alt text`);
      }
    }

    if (page === 'journey.html') {
      const entries = $('article.timeline-item');
      assert.ok(entries.length >= 1, `${page} must contain at least one journey entry`);
      for (const entry of entries.toArray()) {
        const $entry = $(entry);
        const heading = $entry.find('h2').text().trim();
        const meta = $entry.find('.meta-line').text().trim();
        const points = $entry.find('.list-block li');

        assert.ok(heading.length > 0, 'A journey entry is missing an organization name');
        assert.match(meta, /\b[A-Za-z]+(?:,\s*[A-Z]{2})?\s•\s.+\s•\s.+/, 'Journey metadata must include location, title and years');
        assert.ok(points.length >= 1 && points.length <= 2, 'Each journey entry must have 1 or 2 outcome lines');
      }
    }
  }
});
