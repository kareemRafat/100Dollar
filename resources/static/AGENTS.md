# Repository Guidelines

## Project Structure & Module Organization
This repository is a static RTL Arabic website built from standalone HTML pages. Root-level pages such as `index.html`, `about.html`, `archive.html`, and `profile.html` represent full screens or flows. Authentication pages live under `auth/` (`login.html`, `register.html`, `reset-password.html`, `new-password.html`). Shared visual direction is documented in `DESIGN.md`.

There is no separate `src/`, build output, or test directory in this checkout. Page-specific Tailwind configuration is embedded directly in each HTML file, so keep repeated theme values aligned across pages.

## Build, Test, and Development Commands
No build step is required.

- `python -m http.server 8000`
  Runs a simple local server for previewing pages at `http://localhost:8000/`.
- `start index.html`
  Opens the main entry page directly in a browser on Windows.
- `rg --files`
  Lists all tracked project files quickly when navigating the repo.

## Coding Style & Naming Conventions
Use 2-space indentation in HTML, consistent with the existing files. Keep documents RTL-aware with `dir="rtl"` and Arabic-first content. Prefer semantic sections and descriptive utility groupings over deeply nested wrappers.

Match the design system in `DESIGN.md`: Cairo/Plus Jakarta Sans typography, warm gold plus deep navy palette, soft surfaces, and minimal borders. Reuse existing Tailwind token names such as `primary`, `secondary`, and `surface-container-lowest` instead of introducing ad hoc colors.

File names currently use spaced lowercase page names like `add idea.html` and `pin modal.html`; preserve existing naming unless a broader cleanup is planned.

## Testing Guidelines
There is no automated test suite configured. Validate changes by serving the site locally and checking:

- desktop and mobile widths
- RTL alignment and Arabic copy rendering
- navigation links between related pages
- visual consistency with `DESIGN.md`

If JavaScript is added later, place smoke-test instructions in the PR until a formal test runner exists.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so no local commit convention can be inferred. Use short imperative commit messages, for example: `Refine archive card spacing`.

Pull requests should include a brief summary, the pages changed, before/after screenshots for UI edits, and any manual verification notes. Link the relevant issue or task when one exists.
