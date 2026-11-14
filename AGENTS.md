# AGENTS.md: standing instructions for AI coding tools

This repo is the personal site for Nicholas J. Marshall (nicholasjmarshall.com): static HTML, CSS and minimal JavaScript, hosted on GitHub Pages, no build step. Nicholas is the product owner. He builds with GitHub Copilot and Cursor and does not write frontend code daily, so explain what you change in plain language.

## Documentation is part of the product
Out-of-date docs count as bugs. Treat these as source of truth and keep them current:
- `docs/product-brief.md` (goals, content inventory, positioning line, visual direction)
- `docs/requirements.md` (requirement IDs, test mapping, "Last reviewed" date, change log)
- `CONTENT.md` (how to update every editable block, with templates)
- `README.md` (setup, test command, deploy)
- `prompts/` and `ai-evals/` (prompt library and AI checks)
- `CHANGELOG.md`

### Rules
1. **Read first.** Before any task, read `docs/product-brief.md` and `docs/requirements.md`.
2. **Update in the same change.** Any change to behavior, content structure, visual direction, requirements, tests or deploy steps must update the affected docs in the same branch and pull request.
3. **Requirements and tests move together.** If a requirement is added, changed or removed, update its ID in `docs/requirements.md` and add, change or remove its test.
4. **Flag contradictions.** If a doc disagrees with the code or with another doc, stop and tell Nicholas which one you believe is right and why. Do not silently pick one.
5. **Docs-impact statement.** End every task with a line: `Docs impact: <files updated>` or `Docs impact: none, because <reason>`. A task is not done without it.
6. **Keep it short.** The product brief stays at one page; move detail into the other docs.
7. **Date it.** Update the "Last reviewed" date in `docs/requirements.md` whenever you confirm or change anything in it.

## Project rules
- Content edits happen only inside `CONTENT:START` / `CONTENT:END` blocks (see `CONTENT.md`).
- No phone number or street address anywhere on the site or in the resume PDF.
- No third-party scripts or fonts except the approved analytics script, once added.
- No secrets in the repo. Work on branches and open pull requests; never push straight to `main`.
- Design: professional, clean, not bright. Navy as the main color; gold only as a small accent (rules, underlines, markers), never as body text. Use the design tokens in the stylesheet rather than hard-coded colors.