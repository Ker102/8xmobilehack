import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredPaths = [
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "docs/ARCHITECTURE.md",
  "docs/CASE_STUDY.md",
  "docs/DEPLOYMENT.md",
  "docs/RELEASE_POLICY.md",
  "docs/ROADMAP.md",
  "docs/decisions/0001-repository-baseline.md",
  ".github/workflows/ci.yml",
  ".github/workflows/codeql.yml",
  ".github/workflows/release.yml",
  ".github/dependabot.yml"
];

const failures = [];

for (const path of requiredPaths) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required path: ${path}`);
  }
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
if (!packageJson.scripts?.validate) {
  failures.push("package.json must define scripts.validate");
}

const caseStudy = readFileSync(join(root, "docs/CASE_STUDY.md"), "utf8");
if (!caseStudy.includes("Judges")) {
  failures.push("docs/CASE_STUDY.md should include a Judges section");
}

if (failures.length > 0) {
  console.error("Repository validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository validation passed.");
