# Agent Instructions

This repository is for a hackathon build that must stay presentation-ready.

## Operating Principles

- Keep the architecture understandable to non-technical judges.
- Prefer small, well-named modules with clear boundaries.
- Update docs in the same pull request as behavior changes.
- Keep release and deployment policy aligned with `docs/RELEASE_POLICY.md`.
- Keep secrets out of source control and use environment variables.
- Run `npm run validate` before committing.

## Expected Workflow

1. Read `README.md`, `docs/ARCHITECTURE.md`, and the relevant docs for the task.
2. Make focused changes.
3. Add or update tests and validation scripts for the changed behavior.
4. Update the case study or architecture docs if the user-facing story changes.
5. Run local verification and report what passed.

## Repository Boundaries

- `.github/` owns CI, security scanning, and repository automation.
- `docs/` owns architecture, product story, security, and decisions.
- `scripts/` owns lightweight repository automation.
