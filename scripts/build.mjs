import fs from "node:fs";
import path from "node:path";
import fse from "fs-extra";
import juice from "juice";

const root = process.cwd();
const srcEmailPath = path.join(root, "src", "email.html");
const outDir = path.join(root, "public");
const outEmailPath = path.join(outDir, "email.html");

fse.ensureDirSync(outDir);

if (!fs.existsSync(srcEmailPath)) {
  console.error(`Missing file: ${srcEmailPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(srcEmailPath, "utf8");

const inlined = juice(raw, {
  preserveMediaQueries: true,
  removeStyleTags: false,
  applyStyleTags: true,
});

fs.writeFileSync(outEmailPath, inlined, "utf8");
console.log("Built:", outEmailPath);
