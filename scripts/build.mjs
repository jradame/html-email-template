import fs from "node:fs";
import path from "node:path";
import fse from "fs-extra";
import juice from "juice";

const root = process.cwd();
const srcEmailPath = path.join(root, "src", "email.html");
const publicDir = path.join(root, "public");
const distDir = path.join(root, "dist");

fse.ensureDirSync(publicDir);
fse.ensureDirSync(distDir);

const raw = fs.readFileSync(srcEmailPath, "utf8");

const inlined = juice(raw, {
  preserveMediaQueries: true,
  removeStyleTags: false
});

fs.writeFileSync(path.join(distDir, "email.html"), inlined, "utf8");
fs.writeFileSync(path.join(publicDir, "email.html"), inlined, "utf8");

console.log("Built: dist/email.html and public/email.html");