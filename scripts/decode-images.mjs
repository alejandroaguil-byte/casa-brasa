import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public", "images");
const files = readdirSync(dir);
const names = [
  ...new Set(
    files
      .filter((name) => name.endsWith(".b64") || /\.b64\.\d+$/.test(name))
      .map((name) => name.replace(/\.b64(?:\.\d+)?$/, "")),
  ),
];

for (const name of names) {
  const jpgPath = join(dir, `${name}.jpg`);
  if (existsSync(jpgPath)) {
    continue;
  }
  const parts = files
    .filter((file) => file === `${name}.b64` || file.startsWith(`${name}.b64.`))
    .sort();
  const b64 = parts.map((file) => readFileSync(join(dir, file), "utf8").trim()).join("");
  writeFileSync(jpgPath, Buffer.from(b64, "base64"));
  console.log(`[decode-images] wrote public/images/${name}.jpg`);
}
