// SPDX-License-Identifier: MIT
// Fridge Roast — one line, best laugh wins.
// The roast below is the whole entry: a smart fridge that rats on its owner.
// Beat one: it texts me that the milk expired (helpful, fine).
// Beat two: it then shows me an ad for milk (the help was a sales pitch).
// Beat three: it judges the takeout I ordered instead (it picked a side).
// The sting: it is not an appliance, it is a snitch with a touchscreen.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My smart fridge texts me that the milk expired, then shows me an ad for milk, then judges the takeout I ordered instead — it's a snitch with a touchscreen.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ROAST, "utf8");
