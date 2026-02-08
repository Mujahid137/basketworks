import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase admin env vars are missing.");
}

const admin = createClient(supabaseUrl, serviceRoleKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({ message: "Missing auth token." });
  }

  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData?.user) {
    return res.status(401).json({ message: "Invalid token." });
  }

  const { data: adminProfile, error: adminError } = await admin
    .from("profiles")
    .select("is_admin")
    .eq("id", userData.user.id)
    .single();

  if (adminError || !adminProfile?.is_admin) {
    return res.status(403).json({ message: "Admin access required." });
  }

  const { data, error } = await admin
    .from("profiles")
    .select("id, email, full_name, role, company, website, phone, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ message: "Failed to fetch profiles." });
  }

  return res.status(200).json({ profiles: data || [] });
}
