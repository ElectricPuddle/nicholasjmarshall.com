# Content updates

This site is static HTML, CSS, and a few placeholder folders. Every editable content block is wrapped in comment markers so a content change stays isolated and easy to review.

## Content block markers

Use this pattern:

```html
<!-- CONTENT:START id="journey-entry-ey" -->
<section>
  <h2>Example heading</h2>
  <p>Editable copy goes here.</p>
</section>
<!-- CONTENT:END id="journey-entry-ey" -->
```

- The `id` must be unique for the block.
- Only edit the markup inside the start and end markers.
- Keep the surrounding page structure intact.

## Journey entry template

Copy this template into a page and update the text inside the block:

```html
<!-- CONTENT:START id="journey-entry-template" -->
<article class="timeline-item">
  <div class="timeline-marker" aria-hidden="true"></div>
  <div class="timeline-content">
    <h2>Organization Name</h2>
    <p class="meta-line">City, ST • Role • Start Year to End Year</p>
    <ul class="list-block">
      <li>[PLACEHOLDER] Outcome-focused result one.</li>
      <li>[PLACEHOLDER] Outcome-focused result two.</li>
    </ul>
  </div>
</article>
<!-- CONTENT:END id="journey-entry-template" -->
```

## Placeholder rule

Any text that is not confirmed from the project brief starts with the exact string `[PLACEHOLDER]` so it can be found quickly in a search. This applies especially to short bio copy, home callouts, skills, awards, and timeline outcomes.

## Header and footer duplication

The header and footer are duplicated on every page on purpose because this site has no build step. The markup is intentionally repeated to keep the pages simple, static, and easy to preview locally.

## Local preview

Open `index.html` directly in a browser, or from the repo root run `python3 -m http.server` and open the local address shown in the terminal.
