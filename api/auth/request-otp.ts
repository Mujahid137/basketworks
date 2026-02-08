import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { kv } from "@vercel/kv";

const OTP_TTL_SECONDS = 10 * 60;
const COOLDOWN_SECONDS = 60;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, mode } = req.body || {};
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(cleanEmail)) {
    return res.status(400).json({ message: "Enter a valid email address." });
  }

  const cooldownKey = `otp:cooldown:${cleanEmail}`;
  const activeCooldown = await kv.get(cooldownKey);

  if (activeCooldown) {
    return res.status(429).json({ message: "Wait a minute before retrying." });
  }

  const code = buildOtp();
  const otpKey = `otp:code:${cleanEmail}`;

  await kv.set(
    otpKey,
    {
      code,
      mode: mode === "register" ? "register" : "login",
      createdAt: Date.now(),
    },
    { ex: OTP_TTL_SECONDS }
  );
  await kv.set(cooldownKey, true, { ex: COOLDOWN_SECONDS });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Basketworks OTP" <${process.env.GMAIL_USER}>`,
      to: cleanEmail,
      subject: "Your Basketworks login code",
      text: `Your OTP is ${code}. It expires in 10 minutes.`,
    });

    return res.status(200).json({ message: "OTP sent." });
  } catch (err) {
    return res.status(500).json({ message: "Failed to send OTP." });
  }
}
