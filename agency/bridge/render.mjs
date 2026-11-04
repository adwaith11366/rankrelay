// Fills the Apps Script template from .env into a git-ignored file you paste into the Sheet.
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "../env.mjs";

const here = dirname(fileURLToPath(import.meta.url));
loadEnv();
const { BRIDGE_SECRET, RECIPIENT } = process.env;
if (!BRIDGE_SECRET || !RECIPIENT) throw new Error("Set BRIDGE_SECRET and RECIPIENT in .env first");
const code = readFileSync(join(here, "Code.template.gs"), "utf8")
  .replace("__SECRET__", BRIDGE_SECRET)
  .replace("__RECIPIENT__", RECIPIENT);
writeFileSync(join(here, "Code.local.gs"), code);
console.log("Wrote agency/bridge/Code.local.gs");
