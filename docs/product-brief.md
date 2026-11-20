# NicholasJMarshall.com: Product Brief and Requirements
 
Status: v1 draft, 2026-11-13. Owner: Nicholas. Claude acts as PM/PO and writes prompts for Copilot (VS Code) and Cursor; Claude does not write the site code.
 
## 1. Purpose and success test
A personal professional site for recruiters and hiring managers. **Success test:** a first-time visitor can say who Nicholas is, what he does, and how to reach him within 30 seconds, and can go deeper with one click if interested.
 
## 2. Goals and non-goals
**Goals**
- Make the important things instantly visible; less is more.
- Present a technical product owner who delivers outcomes, with a long-term ambition to own a product at the scale of Outlook.
- Cost $0 to run and be easy to update every day.
**Non-goals (for now)**
- No blog, contact form, comments, or user accounts.
- No phone number or street address on the site.
- No custom analytics dashboard at launch (planned as a later phase).
## 3. Positioning line (working draft, to refine together)
> Technical product owner who turns customer needs into shipped software, backed by a computer science degree and hands-on engineering experience.
 
## 4. Information architecture and content inventory
Navigation on every page: Home, About, Journey.
 
**Home**
- Name, positioning line
- Primary call to action: **View Journey**
- Secondary call to action: **Email me** (existing personal address, obfuscated against scrapers)
- LinkedIn link
- Everything above must be visible without scrolling on a phone.
**About**
- Photo (with alt text), short bio (placeholder text for now)
- Education summary (Notre Dame, B.S. Computer Science, 2022)
- Skills and awards: proposed here as a short list; to confirm
- Link to the web resume PDF
**Journey**
- Short story intro (placeholder text for now)
- Timeline, newest first. Entries drafted from the resume:
  - Ernst & Young, Boston, Senior Technology Consultant, Sept 2022 to present
  - Lydonia Technologies, Needham, Sales Engineering Intern, 2021
  - University of Notre Dame, Notre Dame, IN, B.S. Computer Science, 2022
- Each entry: organization, location, title, years, and 1 to 2 outcome-focused wins ("what value I delivered")
## 5. Content rules
- Wins are written as outcomes (value delivered), not task lists.
- No phone number or address anywhere, including the PDF.
- Client names and figures: check what EY allows before publishing; default to unnamed clients and rounded or relative outcomes.
- Placeholder text is allowed during development, but must be flagged in the file and removed before launch.
- Tone: warm but concise.
## 6. Visual direction
Professional, clean, dark, and understated. The redesigned identity uses deep navy surfaces, cool blue lighting, and a restrained warm gold accent rather than a bright or generic portfolio palette.
- **Navy is the main color** for backgrounds and key surfaces: primary `#080d17`, secondary `#0d1523`, elevated `#111c2d`.
- **Text**: near-white primary text (`#f4f5f7`) and cool-gray secondary text (`#b7c0ce`) for readable contrast.
- **Gold is an accent only**: thin rules, markers, hover emphasis, and occasional serif headline treatment. It is never used as body text.
- **Background effects:** subtle blue radial lighting, thin abstract arcs, and generous whitespace. No stock technology imagery or heavy shadows.
- One readable system font stack with a restrained serif accent for selected headline words (no third-party font services).
- All colors live as design tokens (CSS variables) so the palette can be tuned in one place.
## 7. Content-update design (daily updates)
- Each Journey entry, and each editable section, is a clearly labeled HTML block with start/end comment markers and a copy-paste template.
- `CONTENT.md` documents every editable thing: where it lives, the template, and a worked example.
- A library of ready-made update prompts for Copilot/Cursor (add a role, edit a win, replace the PDF, change the positioning line) lives in `/prompts/update/`.
- After every update, the automated checks run and must pass before deploy.
## 7b. Skills and standing AI instructions
- **Content Coach** (Claude skill): grills Nicholas, one question at a time, to turn his experience into outcome-focused content that recruiters want to click into and contact him about. Works from this brief.
- **Update Site Content** (repo skill for Copilot/Cursor): asks for the latest content, collects every needed field, edits only the labeled blocks, runs the checks, updates the docs, and opens a pull request. Lives in the repo because only the coding tool can edit the site.
- **Docs-currency rules** are not a skill. They are always-on instructions in `AGENTS.md` and `.github/copilot-instructions.md`, backed by the NFR-8 CI check and a PR template checklist. The drafts are in the project docs.
## 8. Requirements and how each is tested
Requirements and test mapping live in `docs/requirements.md`.

## 9. Risks and open items
- **EY confidentiality:** confirm what can be published about client work.
- **Phone number in the current resume:** use a separate web version without it.
- **Email scraping:** personal address on a public page invites spam; obfuscation reduces but doesn't remove this. A custom-domain address is a later option.
- **Public repo:** GitHub Pages on the free plan requires a public repository, so all files and history are public. Never commit a phone number, secrets, or a PDF containing them; deleting later does not remove them from history.
- **Visitor IP logging:** GitHub's docs say it logs visitors' IP addresses for Pages sites for security purposes. Reflect this in the privacy note.
- **GitHub Pages limits:** no custom HTTP headers, so security hardening is meta-tag CSP only.
- **AI checks in CI:** GitHub Models is a preview feature with changing quotas; treat as advisory.
- **Analytics (Phase 7):** verify Cloudflare's current free limits and that a login gate is available on the free plan before building.
- **Open content:** positioning line wording, skills and awards placement, photo, accent shade, short story text.
## 10. Done criteria
No launch date. "Done" means: all functional and non-functional tests above pass, the 30-second test passes with 2 to 3 real people, placeholder text is gone, and the site is live at nicholasjmarshall.com over HTTPS.
 