// SPDX-License-Identifier: MIT
// Fridge Roast — one line, best laugh wins.
// The entry is a single roast line about a smart fridge that rats on its
// owner: it texts about expired milk, advertises milk, then judges the
// takeout ordered instead. The sting lands in the last four words.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The roast line itself. Do not edit: the entry is graded on this exact text.
const ROAST =
  "My smart fridge texts me that the milk expired, then shows me an ad for milk, then judges the takeout I ordered instead — it's a snitch with a touchscreen.";

// Bounty limit: the entry must fit in one line of at most 160 characters.
const MAX_LENGTH = 160;
const OUTPUT_FILE = "entry.txt";
const DEFAULT_OUTPUT_DIR = "/output";

/** Fail fast if the roast line breaks the one-line, <=160-char rule. */
function validateRoast(line: string): void {
  if (line.length === 0) {
    throw new Error("Roast line must not be empty.");
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(
      `Roast line is ${line.length} characters, over the ${MAX_LENGTH}-character limit.`,
    );
  }
  // The entry must be exactly one line: no embedded line breaks, and no
  // control characters that could smuggle extra content into the file.
  if (/[\r\n]/.test(line)) {
    throw new Error("Roast line must be a single line with no line breaks.");
  }
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(line)) {
    throw new Error("Roast line must not contain control characters.");
  }
  // The graded text is the trimmed line; it must still fit after trimming.
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error("Roast line must not be blank after trimming.");
  }
  if (trimmed.length > MAX_LENGTH) {
    throw new Error(
      `Roast line is ${trimmed.length} characters after trimming, over the ${MAX_LENGTH}-character limit.`,
    );
  }
  if (trimmed !== line) {
    throw new Error("Roast line must not have leading or trailing whitespace.");
  }
}

/** Resolve the output directory, honouring the harness-provided env var. */
function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : DEFAULT_OUTPUT_DIR;
}

/** Write the validated roast line to entry.txt in the output directory. */
function writeEntry(line: string): string {
  const outDir = resolveOutputDir();
  const outPath = join(outDir, OUTPUT_FILE);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, line, { encoding: "utf8", flag: "w" });
  return outPath;
}

function main(): void {
  validateRoast(ROAST);
  const outPath = writeEntry(ROAST);
  console.log(`Wrote ${ROAST.length}-character roast to ${outPath}`);
}

main();
