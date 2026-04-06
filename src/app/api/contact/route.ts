import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "src/data/contact-submissions.json");

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const submission = {
    id: `sub_${Date.now()}`,
    name,
    email,
    phone: phone || "",
    subject,
    message,
    submittedAt: new Date().toISOString(),
    read: false,
  };

  let submissions = [];
  if (fs.existsSync(SUBMISSIONS_FILE)) {
    submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
  }

  submissions.unshift(submission);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

  return NextResponse.json({ success: true });
}
