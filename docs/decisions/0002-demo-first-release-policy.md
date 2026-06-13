# Decision 0002: Demo-First Release Policy

## Status

Accepted

## Context

The hackathon needs release records that are clear for judges without pretending the project is production-launched before the product stack is selected.

## Decision

Use demo prereleases first:

- Demo tags use `demo-vX.Y.Z`.
- Preview tags use `preview-vX.Y.Z`.
- Production tags use `vX.Y.Z`.
- Demo and preview releases are GitHub prereleases.
- Releases are created by the `Release` GitHub Actions workflow after validation and audit checks.

## Consequences

The repository can show a credible delivery history immediately. Production release tags remain reserved for a real launch.
