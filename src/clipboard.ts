import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const WIN = process.platform === "win32";
const STORE = path.join(os.homedir(), ".sprout", "clipboard.json");
const MAX = 25;
const MAX_LEN = 10000;

export interface Clip { text: string; at: number; }

let items: Clip[] = load();

function load(): Clip[] {
  try { return JSON.parse(fs.readFileSync(STORE, "utf8")); } catch { return []; }
}
function save(): void {
  try { fs.mkdirSync(path.dirname(STORE), { recursive: true }); fs.writeFileSync(STORE, JSON.stringify(items, null, 2)); } catch {}
}

export function readClipboard(): string {
  try {
    return WIN
      ? execSync(`powershell -NoProfile -Command Get-Clipboard`, { encoding: "utf8", windowsHide: true }).replace(/\r\n/g, "\n")
      : execSync(`pbpaste`, { encoding: "utf8" });
  } catch { return ""; }
}

export function writeClipboard(text: string): void {
  try {
    if (WIN) execSync(`clip`, { input: text, windowsHide: true });
    else execSync(`pbcopy`, { input: text });
  } catch {}
}

// Called on a timer while Sprøut is open: if the clipboard changed, record it.
export function capture(): void {
  const t = readClipboard().trim();
  if (!t) return;
  if (items[0]?.text === t) return;
  items.unshift({ text: t.slice(0, MAX_LEN), at: Date.now() });
  if (items.length > MAX) items.length = MAX;
  save();
}

export function list(): Clip[] { return items; }

export function recopy(i: number): Clip | null {
  const h = items[i];
  if (!h) return null;
  writeClipboard(h.text);
  return h;
}
