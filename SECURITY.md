# Security

## Supported Branch

Security fixes target the default branch.

## Reporting

For hackathon work, report vulnerabilities directly to the repository owner or maintainer team. Do not open public issues containing exploit details, credentials, or private user data.

## Baseline Controls

- GitHub Actions runs repository validation on every push and pull request.
- CodeQL is configured for JavaScript and TypeScript analysis.
- Dependency Review checks pull requests for risky dependency changes.
- Dependabot proposes updates for npm packages and GitHub Actions.
- Gitleaks scans for committed secrets.
- Local IDE and agent configuration must remain outside the repository.

## Secret Handling

Use environment variables locally and GitHub Actions secrets in CI. Rotate any credential that may have been exposed, even if it was only committed briefly.
