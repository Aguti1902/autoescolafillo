import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "fillo_admin_session";

function getSecret() {
  return new TextEncoder().encode(
    process.env.ADMIN_SECRET || "autoescola-fillo-secret-change-me"
  );
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "fillo2026";
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthenticated() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
