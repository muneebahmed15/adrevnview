import { execSync } from "node:child_process";

try {
  execSync("npx playwright install chromium", { stdio: "inherit" });
} catch {
  // Optional dev dependency — build still works if browsers are already installed.
}
