// The Moon Gets One Star — writes one 1-star review of the Moon (<=120 chars).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "★☆☆☆☆ Moved my entire ocean twice a day without asking. No notice, no permit, and it still expects worship.";

const MAX_CHARS = 120;

function gate(text: string): void {
  if (typeof text !== "string" || text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`gate failed: entry must be 1-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (!/moon/i.test(text) && !/ocean|tides?/i.test(text)) {
    throw new Error("gate failed: entry must be about the Moon");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
gate(ENTRY);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read-back re-gate: what landed on disk must be exactly the gated entry.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== ENTRY) {
  throw new Error("re-gate failed: entry.txt on disk differs from gated entry");
}
gate(onDisk);
console.log(ENTRY);
console.log(`wrote ${outPath} (${ENTRY.length} chars, gate passed, read-back re-gate passed)`);
