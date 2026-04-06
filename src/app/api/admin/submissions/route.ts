import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "src/data/contact-submissions.json");

export async function GET() {
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    return NextResponse.json({ submissions: [] });
  }
  const data = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
  return NextResponse.json({ submissions: data });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
  submissions = submissions.filter((s: any) => s.id !== id);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const { id } = await request.json();
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
  const sub = submissions.find((s: any) => s.id === id);
  if (sub) sub.read = true;
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

  return NextResponse.json({ success: true });
}
