import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_BASE = path.join(process.cwd(), "public/assets/imgs");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const sanitizedName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
  const fileName = `${Date.now()}-${sanitizedName}`;

  const cleanFolder = folder.replace(/\.\./g, "").replace(/^\//, "");
  const targetDir = path.join(UPLOAD_BASE, cleanFolder);

  if (!targetDir.startsWith(UPLOAD_BASE)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(targetDir, fileName);
  fs.writeFileSync(filePath, buffer);

  const publicPath = `/assets/imgs/${cleanFolder ? cleanFolder + "/" : ""}${fileName}`;
  return NextResponse.json({ path: publicPath, success: true });
}

export async function GET() {
  // List all images
  const images: { path: string; folder: string; name: string }[] = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (ALLOWED_EXT.includes(path.extname(entry.name).toLowerCase())) {
        const relativePath = fullPath.replace(path.join(process.cwd(), "public"), "");
        const folder = path.dirname(relativePath).replace("/assets/imgs/", "").replace("/assets/imgs", "");
        images.push({ path: relativePath, folder, name: entry.name });
      }
    }
  }

  walk(UPLOAD_BASE);
  return NextResponse.json({ images });
}
