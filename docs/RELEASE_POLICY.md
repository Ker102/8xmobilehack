# Release Policy

This repository uses a demo-first release policy during the hackathon. Releases should make the demo story easy to follow and give judges a clear history of progress.

## Release Channels

| Channel | Tag Format | GitHub Release Type | Use |
| --- | --- | --- | --- |
| Demo | `demo-v0.1.0` | Prerelease | Hackathon demos, judging checkpoints, rehearsal builds. |
| Preview | `preview-v0.1.0` | Prerelease | Internal stakeholder previews after the hackathon baseline is stable. |
| Production | `v1.0.0` | Full release | Public or production-ready launches. |

The repository should use the demo channel first. The first tagged release should be `demo-v0.1.0` unless the team intentionally chooses a different starting number.

## Versioning Rules

Use semantic versions after the channel prefix:

- Patch: small fixes, doc corrections, demo polish.
- Minor: new user-visible capability or meaningful workflow addition.
- Major: production launch or breaking architecture change.

Examples:

- `demo-v0.1.0`: first judge-ready demo baseline.
- `demo-v0.2.0`: demo adds a complete user journey.
- `preview-v0.3.0`: post-hackathon preview for collaborators.
- `v1.0.0`: production launch.

## Release Requirements

Before creating a release:

1. `main` must be green for CI, Security, CodeQL, and Scorecard.
2. `docs/CASE_STUDY.md` must describe the demo narrative accurately.
3. `docs/ARCHITECTURE.md` must match the shipped architecture.
4. No secrets or private data may be included in release notes or artifacts.
5. Demo releases must be marked as GitHub prereleases.

## Release Workflow

Use the `Release` GitHub Actions workflow:

1. Open GitHub Actions.
2. Select `Release`.
3. Click `Run workflow`.
4. Choose a channel.
5. Enter a version such as `0.1.0`.
6. Add short release notes.

The workflow validates the repository, checks npm audit, creates the tag, and publishes a GitHub Release.

## Release Notes

Release notes should be short and judge-friendly:

- What changed.
- Why it matters for the demo.
- What evidence proves it works.
- Known limitations.

## Deployment Policy

Until the mobile stack and hosting target are chosen, GitHub Releases are the official deployment record. When real deployment is added, the release workflow should call the deployment workflow after validation and before publishing the final release notes.
