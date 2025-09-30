import fs from "fs";
import path from "path";

const uiDir = path.resolve("src/shared/ui/atoms");

if (!fs.existsSync(uiDir)) {
  console.error(`[rename-shadcn] Directory not found: ${uiDir}`);
  process.exit(0);
}

for (const file of fs.readdirSync(uiDir)) {
  if (!file.endsWith(".tsx")) continue;
  const pascal = file.charAt(0).toUpperCase() + file.slice(1);
  if (pascal !== file) {
    fs.renameSync(path.join(uiDir, file), path.join(uiDir, pascal));
    console.log(`Renamed ${file} → ${pascal}`);
  }
}
