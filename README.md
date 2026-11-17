# Nicholas J. Marshall personal site

This repo contains the static personal website for Nicholas J. Marshall. It is a simple, lightweight GitHub Pages site with HTML, CSS, and no JavaScript framework or build step.

## Folder structure

```text
.
├── about.html
├── index.html
├── journey.html
├── css/
│   └── styles.css
├── js/
│   └── .gitkeep
├── assets/
│   └── .gitkeep
├── docs/
│   ├── product-brief.md
│   └── requirements.md
├── .github/
│   └── copilot-instructions.md
├── .gitignore
├── .nojekyll
├── CHANGELOG.md
├── CONTENT.md
├── README.md
├── AGENTS.md
└── .github/skills/ (existing repo tooling, not edited by this task)
```

## Local preview

Open `index.html` in a browser, or serve the repo locally with the Python built-in server from the project root and open the localhost address shown in the terminal.

## Tests and deployment

Install the dev tooling and browser runtime once:

```bash
npm install
npx playwright install chromium
```

Run the suite locally:

```bash
npm test
```

For launch checks, run the static checks in placeholder-fail mode:

```bash
LAUNCH=1 npm run test:static
```

Deployment is planned for GitHub Pages once the site content and docs are finalized.
