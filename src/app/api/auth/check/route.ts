import { NextResponse } from "next/server";
import { getSessionCookie, verifySessionToken } from "@/lib/auth";

export async function GET() {
  const token = getSessionCookie();
  if (!token) return NextResponse.json({ authenticated: false });
  const user = await verifySessionToken(token);
  return NextResponse.json({ authenticated: !!user, user });
}
