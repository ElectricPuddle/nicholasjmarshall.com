# Requirements and test mapping

Last reviewed: 2026-11-17

This file contains the formal requirements and test mapping formerly kept in the product brief. The brief now points here for the detailed tracking and validation notes.

Note: this site uses dev-only test tooling only; it is not a build step and never ships in the site.

## Functional

| ID | Requirement | Code test | AI test |
|---|---|---|---|
| FR-1 | Home shows name, positioning line, "View Journey" button, and email link in the first viewport | `tests/browser/first-viewport.spec.mjs` | 30-second test |
| FR-2 | Nav to Home, About, Journey on every page | `tests/static/structure.test.mjs`, `tests/static/links.test.mjs`, `tests/browser/navigation.spec.mjs` | none |
| FR-3 | Every Journey entry has org, location, title, years, and 1 to 2 wins | `tests/static/content.test.mjs` | Outcome-focus review of the wins |
| FR-4 | About shows photo with alt text and short bio | `tests/static/content.test.mjs` | Content check vs brief |
| FR-5 | Email and LinkedIn links work | `tests/static/links.test.mjs` | none |
| FR-6 | Resume PDF downloads and contains no phone number | `tests/static/privacy.test.mjs` | none |
| FR-7 | No phone number or street address anywhere on the site | `tests/static/privacy.test.mjs` | Diff review |
| FR-8 | No placeholder text at launch | `tests/static/placeholders.test.mjs` | none |

## Non-functional

| ID | Requirement | Code test | AI test |
|---|---|---|---|
| NFR-1 | Responsive, 320 to 1920px, no horizontal scroll, tap targets at least 44px | `tests/browser/responsive.spec.mjs`, `tests/browser/tap-targets.spec.mjs`, `tests/browser/first-viewport.spec.mjs` | Responsive judgment review |
| NFR-2 | Maintainable: no framework or build step, one stylesheet, documented | `tests/static/structure.test.mjs`; README and CONTENT.md exist | Doc clarity review |
| NFR-3 | Secure and safe: HTTPS, 2FA, no secrets, CSP meta, no unexpected external hosts | `tests/static/external.test.mjs` | Security review of each diff |
| NFR-4 | Traffic visibility private to Nicholas | Phase 7 (later) | none |
| NFR-5 | Lighthouse 95+, WCAG 2.2 AA target, valid HTML, meta and Open Graph | `tests/browser/accessibility.spec.mjs`, `tests/browser/keyboard.spec.mjs`, `.htmlvalidate.json` | Accessibility judgment review |
| NFR-6 | Privacy: no cookies, no stored visitor data | `tests/static/privacy.test.mjs` | none |
| NFR-7 | Content is easy to update daily | `tests/static/content.test.mjs` | Walk-through: can a fresh update prompt add a role correctly? |
| NFR-8 | Supporting docs stay current with every change | Manual review and repo policy check; docs are updated in the same change | Diff review: do the product brief, requirements table and CONTENT.md still match the change? |

## Change log

| Date | Summary |
|---|---|
| 2026-11-13 | Initial requirement split from the product brief into a dedicated requirements file and scaffolded site docs. |
| 2026-11-17 | Added the static and browser test suite, documented the dev-only tooling rule, and mapped the requirement checks to the real test files. |
