# Contributing

Thanks for helping with the 8x mobile hackathon build.

## Local Checks

```bash
npm ci
npm run validate
```

## Branches

Use short, descriptive branch names:

```text
feature/onboarding-flow
fix/auth-error-state
docs/judge-case-study
```

## Pull Requests

Each pull request should include:

- What changed.
- Why it matters.
- Screenshots or demo notes for user-facing changes.
- Test or validation evidence.
- Documentation updates when architecture or product behavior changes.

## Releases

Releases are created from `main` through the GitHub Actions `Release` workflow. During the hackathon, use demo prerelease tags such as `demo-v0.1.0`. See `docs/RELEASE_POLICY.md`.

## Security

Never commit secrets, tokens, API keys, exports, private certificates, or `.env` files. Use environment variables and repository secrets.
