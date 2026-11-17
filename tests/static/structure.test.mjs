import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const pages = ['index.html', 'about.html', 'journey.html'];

function normalizeBlock($, selector) {
  return $(selector)
    .first()
    .clone()
    .find('[aria-current]').removeAttr('aria-current')
    .end()
    .toString()
    .replace(/\s+/g, ' ')
    .trim();
}

test('Every page follows the shared site structure', () => {
  const headers = [];
  const footers = [];

  for (const page of pages) {
    const html = readFileSync(path.join(repoRoot, page), 'utf8');
    const $ = cheerio.load(html);

    assert.match($('html').attr('lang') || '', /[a-z-]+/i, `${page} is missing a language attribute`);
    assert.ok($('meta[charset]').length > 0, `${page} is missing a charset meta tag`);
    assert.ok($('meta[name="viewport"]').attr('content')?.includes('width=device-width'), `${page} is missing the viewport meta tag`);
    assert.ok($('title').text().trim().length > 0, `${page} is missing a non-empty title`);
    assert.ok($('meta[name="description"]').length === 1, `${page} is missing a description`);
    assert.ok($('meta[http-equiv="Content-Security-Policy"]').attr('content')?.includes("default-src 'self'"), `${page} is missing the CSP meta tag`);

    const focusable = $('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])').toArray();
    assert.ok(focusable.length > 0, `${page} has no focusable elements`);
    assert.equal($(focusable[0]).hasClass('skip-link'), true, `${page} skip link is not the first focusable element`);

    const header = $('header');
    const nav = $('nav[aria-label="Primary navigation"]');
    assert.equal(header.length, 1, `${page} must have one header`);
    assert.equal(nav.length, 1, `${page} must have one primary nav`);
    assert.ok(nav.find('a[href="index.html"]').length === 1, `${page} is missing the Home link`);
    assert.ok(nav.find('a[href="about.html"]').length === 1, `${page} is missing the About link`);
    assert.ok(nav.find('a[href="journey.html"]').length === 1, `${page} is missing the Journey link`);

    assert.equal($('main#main').length, 1, `${page} must have a single main element with id="main"`);
    assert.equal($('footer').length, 1, `${page} must have a single footer`);

    const current = $('*[aria-current="page"]');
    assert.equal(current.length, 1, `${page} must have exactly one aria-current="page" link`);
    const expected = page === 'index.html' ? 'Home' : page === 'about.html' ? 'About' : 'Journey';
    assert.equal(current.text().trim(), expected, `${page} aria-current is not on the expected page link`);

    headers.push(normalizeBlock($, 'header'));
    footers.push(normalizeBlock($, 'footer'));
  }

  for (let i = 1; i < headers.length; i += 1) {
    assert.equal(headers[i], headers[0], 'Header markup is not identical across pages');
    assert.equal(footers[i], footers[0], 'Footer markup is not identical across pages');
  }
});
