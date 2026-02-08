import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OtpRecord = {
  code: string;
  mode: "login" | "register";
  createdAt: number;
};

const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, code } = req.body || {};
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanCode = typeof code === "string" ? code.trim() : "";

  if (!EMAIL_PATTERN.test(cleanEmail) || !cleanCode) {
    return res.status(400).json({ message: "Invalid verification data." });
  }

  const otpKey = `otp:code:${cleanEmail}`;
  const record = (await redis.get(otpKey)) as OtpRecord | null;

  if (!record || record.code !== cleanCode) {
    return res.status(400).json({ message: "Invalid or expired code." });
  }

  await redis.del(otpKey);

  return res.status(200).json({ message: "Verified." });
}
