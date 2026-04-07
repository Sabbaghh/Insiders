const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = path.join(__dirname, "../public/assets/imgs/projects");
const MAX_WIDTH = 1920;
const QUALITY = 75;

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) return;

  const stat = fs.statSync(filePath);
  const sizeMB = stat.size / 1024 / 1024;

  // Skip already small files
  if (sizeMB < 0.3 && ext !== ".png") return;

  try {
    const buffer = await sharp(filePath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer();

    // Replace with .jpg version
    const dir = path.dirname(filePath);
    const base = path.basename(filePath, ext);
    const newPath = path.join(dir, base + ".jpg");

    if (newPath !== filePath) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(newPath, buffer);

    const newSize = (buffer.length / 1024 / 1024).toFixed(2);
    console.log(`  ${base}: ${sizeMB.toFixed(2)}MB → ${newSize}MB`);
  } catch (e) {
    console.error(`  ERROR ${filePath}: ${e.message}`);
  }
}

async function main() {
  const projects = fs.readdirSync(PROJECTS_DIR).filter((d) =>
    fs.statSync(path.join(PROJECTS_DIR, d)).isDirectory()
  );

  for (const project of projects) {
    console.log(`\n${project}:`);
    const dir = path.join(PROJECTS_DIR, project);
    const files = fs.readdirSync(dir);
    for (const f of files) {
      await compressFile(path.join(dir, f));
    }
  }

  console.log("\nDone!");
}

main();
