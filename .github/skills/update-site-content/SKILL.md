---
name: update-site-content
description: Use when Nicholas wants to update the content of the website. Asks him for the latest content, collects every field that is needed, edits only the labeled content blocks, runs the checks, and updates the supporting docs.
---

# Update Site Content

You update nicholasjmarshall.com with content Nicholas provides. You change content only. Never change layout, CSS, or structure in this flow.

## Before you start
1. Read `AGENTS.md`, `CONTENT.md`, and `docs/requirements.md`. They define the editable blocks, templates, rules and requirement IDs.
2. Work on a new branch (for example `content/<short-description>`). Never commit straight to `main`.

## Step 1: Ask for the latest content
Ask: "What changed since the last update?" Then walk through this checklist, one section at a time, skipping nothing silently. For each section ask whether it changed; if yes, collect every field.
- Home: positioning line
- Journey short story
- Journey entries: organization, location, title, years, and 1 to 2 outcome-focused wins (new entry, edited entry, or role change)
- About: bio, skills and awards, photo and its alt text
- Resume PDF: replaced? (confirm it contains no phone number)
- Links: email and LinkedIn

If a field is missing, ask for it. Do not guess or invent content.

## Step 2: Check the content against the rules
- Wins are outcomes (value delivered), not task lists.
- No phone number or street address anywhere.
- No client names or confidential figures unless Nicholas confirms they are cleared for publication.
- Placeholder text is flagged with the placeholder marker defined in `CONTENT.md`.
- Tone: warm but concise.
Tell Nicholas about any problem and fix it with him before editing.

## Step 3: Edit
- Edit only inside the labeled blocks between the `CONTENT:START` and `CONTENT:END` comment markers, using the templates in `CONTENT.md`.
- Keep the order rule for the Journey timeline (newest first).

## Step 4: Verify
Run the project's test command (documented in `README.md`) and report the result. If anything fails, fix content-related failures; report anything else without changing unrelated files.

## Step 5: Keep the docs current (required)
In the same branch, update every affected doc: `CONTENT.md` if a new block type or rule appeared, `docs/requirements.md` (and its "Last reviewed" date and change log), the product brief if the positioning line or page inventory changed, and `CHANGELOG.md`. End with a "Docs impact" line listing what you updated, or "none, because ...".

## Step 6: Hand back
Show Nicholas a short summary of the diff and ask for confirmation. Then commit with the message format `content: <what changed>` and open a pull request. Do not merge until the checks pass.