import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_BASE = path.join(process.cwd(), "src/content");
const CONFIG_BASE = path.join(process.cwd(), "src/config");

function resolveSafePath(filePath: string): { full: string; type: "mdx" | "json" } | null {
  const clean = filePath.replace(/\.\./g, "");

  if (clean.endsWith(".json")) {
    const full = path.resolve(CONFIG_BASE, clean.replace(/^\//, ""));
    if (!full.startsWith(CONFIG_BASE)) return null;
    return { full, type: "json" };
  }

  const full = path.resolve(CONTENT_BASE, clean.replace(/^\//, ""));
  if (!full.startsWith(CONTENT_BASE)) return null;
  return { full, type: "mdx" };
}

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get("file");

  if (!file) {
    // List all editable files
    const mdxFiles: string[] = [];
    function walk(dir: string, base: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name), base);
        } else if (entry.name.endsWith(".mdx")) {
          mdxFiles.push(path.join(dir, entry.name).replace(base, ""));
        }
      }
    }
    walk(CONTENT_BASE, CONTENT_BASE);

    const jsonFiles = fs.readdirSync(CONFIG_BASE).filter((f) => f.endsWith(".json"));

    return NextResponse.json({
      mdx: mdxFiles,
      json: jsonFiles.map((f) => `/${f}`),
    });
  }

  const resolved = resolveSafePath(file);
  if (!resolved || !fs.existsSync(resolved.full)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(resolved.full, "utf-8");

  if (resolved.type === "json") {
    return NextResponse.json({ data: JSON.parse(raw), type: "json" });
  }

  const { data, content } = matter(raw);
  return NextResponse.json({ data, content, type: "mdx" });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { file, data, content } = body;

  if (!file || !data) {
    return NextResponse.json({ error: "Missing file or data" }, { status: 400 });
  }

  const resolved = resolveSafePath(file);
  if (!resolved) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  if (resolved.type === "json") {
    fs.writeFileSync(resolved.full, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  }

  const mdxContent = matter.stringify(content || "", data);
  fs.writeFileSync(resolved.full, mdxContent);
  return NextResponse.json({ success: true });
}
