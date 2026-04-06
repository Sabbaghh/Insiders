import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET || "";
  return new TextEncoder().encode(secret);
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    getSecret(),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Buffer.from(sig).toString("base64");
}

async function verify(payload: string, signature: string): Promise<boolean> {
  const expected = await sign(payload);
  return expected === signature;
}

export async function createSessionToken(username: string): Promise<string> {
  const payload = JSON.stringify({ username, exp: Date.now() + SESSION_DURATION });
  const signature = await sign(payload);
  return Buffer.from(JSON.stringify({ payload, signature })).toString("base64");
}

export async function verifySessionToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload, signature } = JSON.parse(Buffer.from(token, "base64").toString());
    const valid = await verify(payload, signature);
    if (!valid) return null;
    const data = JSON.parse(payload);
    if (Date.now() > data.exp) return null;
    return { username: data.username };
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  const cookieStore = cookies();
  (cookieStore as any).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DURATION / 1000,
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  (cookieStore as any).delete(COOKIE_NAME);
}

export function getSessionCookie(): string | undefined {
  const cookieStore = cookies();
  return (cookieStore as any).get(COOKIE_NAME)?.value;
}

export { COOKIE_NAME };
