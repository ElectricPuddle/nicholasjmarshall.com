# Requirements and test mapping

Last reviewed: 2026-11-13

This file contains the formal requirements and test mapping formerly kept in the product brief. The brief now points here for the detailed tracking and validation notes.

## Functional

| ID | Requirement | Code test | AI test |
|---|---|---|---|
| FR-1 | Home shows name, positioning line, "View Journey" button, and email link in the first viewport | Playwright at 360 and 1280 widths | 30-second test |
| FR-2 | Nav to Home, About, Journey on every page | Playwright link check | none |
| FR-3 | Every Journey entry has org, location, title, years, and 1 to 2 wins | Structure check script on the labeled blocks | Outcome-focus review of the wins |
| FR-4 | About shows photo with alt text and short bio | HTML check for alt text | Content check vs brief |
| FR-5 | Email and LinkedIn links work | Link check; mailto present without plain-text address in source | none |
| FR-6 | Resume PDF downloads and contains no phone number | File exists; extract PDF text and scan for phone pattern | none |
| FR-7 | No phone number or street address anywhere on the site | Regex scan of all files | Diff review |
| FR-8 | No placeholder text at launch | Scan for placeholder markers (warn now, fail at launch) | none |

## Non-functional

| ID | Requirement | Code test | AI test |
|---|---|---|---|
| NFR-1 | Responsive, 320 to 1920px, no horizontal scroll, tap targets at least 44px | Playwright viewports | Responsive judgment review |
| NFR-2 | Maintainable: no framework or build step, one stylesheet, documented | File-structure check; README and CONTENT.md exist | Doc clarity review |
| NFR-3 | Secure and safe: HTTPS, 2FA, no secrets, CSP meta, no unexpected external hosts | gitleaks, CSP presence, external-host scan, post-deploy HTTPS check | Security review of each diff |
| NFR-4 | Traffic visibility private to Nicholas | Phase 7 (later) | none |
| NFR-5 | Lighthouse 95+, WCAG 2.2 AA target, valid HTML, meta and Open Graph | Lighthouse CI, axe-core, HTML validator | Accessibility judgment review |
| NFR-6 | Privacy: no cookies, no stored visitor data | Cookie and storage scan | none |
| NFR-7 | Content is easy to update daily | Content checks pass after every update | Walk-through: can a fresh update prompt add a role correctly? |
| NFR-8 | Supporting docs stay current with every change | CI "docs touched" check: fails when site or test files change without a docs change, unless the PR states `Docs impact: none, because ...` | Diff review: do the product brief, requirements table and CONTENT.md still match the change? |

## Change log

| Date | Summary |
|---|---|
| 2026-11-13 | Initial requirement split from the product brief into a dedicated requirements file and scaffolded site docs. |
