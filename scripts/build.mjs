import fs from "node:fs";
import path from "node:path";
import fse from "fs-extra";
import juice from "juice";

const root = process.cwd();
const srcEmailPath = path.join(root, "src", "email.html");
const publicDir = path.join(root, "public");

fse.ensureDirSync(publicDir);

const raw = fs.readFileSync(srcEmailPath, "utf8");

const inlined = juice(raw, {
  preserveMediaQueries: true,
  removeStyleTags: false,
});

fs.writeFileSync(path.join(publicDir, "email.html"), inlined, "utf8");

console.log("Built: public/email.html");