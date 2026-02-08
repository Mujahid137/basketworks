import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
  email?: string;
  onSignOut: () => void;
};

type ProfileForm = {
  full_name: string;
  role: string;
  company: string;
  website: string;
  phone: string;
};

type ProfileRecord = ProfileForm & {
  id: string;
  email: string | null;
  is_admin?: boolean | null;
};

const emptyProfile: ProfileForm = {
  full_name: "",
  role: "",
  company: "",
  website: "",
  phone: "",
};

const sections = [
  {
    title: "Profile info",
    desc: "Name, role, company, and public details.",
    cta: "Edit profile",
  },
  {
    title: "Account settings",
    desc: "Email, password, and security preferences.",
    cta: "Manage account",
  },
  {
    title: "Projects & requests",
    desc: "Track active work, briefs, and approvals.",
    cta: "View projects",
  },
  {
    title: "Billing & invoices",
    desc: "Invoices, payment methods, and receipts.",
    cta: "Open billing",
  },
  {
    title: "Saved resources",
    desc: "Checklists, reports, and shared assets.",
    cta: "See resources",
  },
  {
    title: "Support & tickets",
    desc: "Open a ticket or review past support.",
    cta: "Get support",
  },
];

export default function ProfileDrawer({
  open,
  onClose,
  email,
  onSignOut,
}: ProfileDrawerProps) {
  const [profile, setProfile] = useState<ProfileForm>(emptyProfile);
  const [profiles, setProfiles] = useState<ProfileRecord[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!open) return;
    let active = true;
    const loadProfile = async () => {
      setLoading(true);
      setNotice(null);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user?.id;
        if (!userId) {
          setNotice({ type: "error", text: "Please sign in to view your profile." });
          return;
        }
        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, full_name, role, company, website, phone, is_admin")
          .eq("id", userId)
          .single();
        if (error) throw error;
        if (active && data) {
          setIsAdmin(Boolean(data.is_admin));
          setSelectedProfileId(data.id);
          setProfile({
            full_name: data.full_name ?? "",
            role: data.role ?? "",
            company: data.company ?? "",
            website: data.website ?? "",
            phone: data.phone ?? "",
          });
          if (data.is_admin) {
            const { data: allRows, error: allError } = await supabase
              .from("profiles")
              .select("id, email, full_name, role, company, website, phone, is_admin")
              .order("created_at", { ascending: false });
            if (allError) throw allError;
            if (active && allRows) {
              setProfiles(allRows);
            }
          } else {
            setProfiles([]);
          }
        }
      } catch (err: any) {
        if (active) {
          setNotice({
            type: "error",
            text: err?.message || "Unable to load profile.",
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    loadProfile();
    return () => {
      active = false;
    };
  }, [open]);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setNotice(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        setNotice({ type: "error", text: "Please sign in to save changes." });
        return;
      }
      const targetId = selectedProfileId ?? userId;
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name || null,
          role: profile.role || null,
          company: profile.company || null,
          website: profile.website || null,
          phone: profile.phone || null,
        })
        .eq("id", targetId);
      if (error) throw error;
      setNotice({ type: "success", text: "Profile updated." });
    } catch (err: any) {
      setNotice({ type: "error", text: err?.message || "Save failed." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div className="absolute inset-0 theme-overlay" onClick={onClose} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto theme-card p-6 md:p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Client portal
                </p>
                <h3 className="mt-2 text-2xl font-semibold font-display">
                  Your profile & workspace
                </h3>
                <p className="mt-2 theme-muted text-sm">
                  {email || "Signed in"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition theme-outline-btn"
                aria-label="Close profile"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                >
                  <path d="M6 6l12 12M18 6l-12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-8 rounded-2xl px-4 py-4 md:px-5 theme-card">
              <div className="flex flex-col gap-4">
                {isAdmin && (
                  <div>
                    <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                      Admin: Select profile
                    </label>
                    <select
                      value={selectedProfileId ?? ""}
                      onChange={(event) => {
                        const nextId = event.target.value;
                        setSelectedProfileId(nextId);
                        const match = profiles.find((row) => row.id === nextId);
                        if (match) {
                          setProfile({
                            full_name: match.full_name ?? "",
                            role: match.role ?? "",
                            company: match.company ?? "",
                            website: match.website ?? "",
                            phone: match.phone ?? "",
                          });
                        }
                      }}
                      className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                    >
                      {profiles.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.email || row.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                    Full name
                  </label>
                  <input
                    value={profile.full_name}
                    onChange={(event) => handleChange("full_name", event.target.value)}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                    Role / Title
                  </label>
                  <input
                    value={profile.role}
                    onChange={(event) => handleChange("role", event.target.value)}
                    placeholder="Founder, CMO, etc."
                    className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                    Company
                  </label>
                  <input
                    value={profile.company}
                    onChange={(event) => handleChange("company", event.target.value)}
                    placeholder="Company name"
                    className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                      Website
                    </label>
                    <input
                      value={profile.website}
                      onChange={(event) => handleChange("website", event.target.value)}
                      placeholder="https://"
                      className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                      Phone
                    </label>
                    <input
                      value={profile.phone}
                      onChange={(event) => handleChange("phone", event.target.value)}
                      placeholder="+1 000 000 0000"
                      className="mt-2 w-full rounded-full px-4 py-3 theme-input-pill"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm theme-muted">
                    {loading
                      ? "Loading profile..."
                      : isAdmin
                        ? "Admin access: you can edit any profile."
                        : "Only you can access and update this information."}
                  </p>
                  <button
                    onClick={handleSave}
                    disabled={saving || loading}
                    className="rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
              {notice && (
                <p
                  className={`mt-4 text-sm ${
                    notice.type === "error" ? "text-red-300" : "text-emerald-200"
                  }`}
                >
                  {notice.text}
                </p>
              )}
            </div>

            <div className="mt-8 space-y-0">
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  className={`flex flex-col gap-3 px-4 py-4 md:px-5 ${
                    index === 0 ? "pt-0" : "border-t border-white/10"
                  }`}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="text-base font-semibold font-display">
                        {section.title}
                      </h4>
                      <p className="mt-1 text-sm theme-muted">{section.desc}</p>
                    </div>
                    <button className="mt-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition theme-outline-btn md:mt-0">
                      {section.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && profiles.length > 0 && (
              <div className="mt-10">
                <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  All profiles
                </p>
                <div className="mt-4 space-y-3">
                  {profiles.map((row) => (
                    <div
                      key={row.id}
                      className="rounded-2xl px-4 py-3 theme-card theme-card-hover"
                    >
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm font-semibold font-display">
                          {row.full_name || row.email || "Unnamed"}
                        </p>
                        <p className="text-xs theme-subtle">
                          {row.company || "No company"}
                        </p>
                      </div>
                      <p className="mt-1 text-xs theme-muted">
                        {row.role || "No role"} • {row.phone || "No phone"} •{" "}
                        {row.website || "No website"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm theme-muted">
                Need help? Our team responds within 1 business day.
              </p>
              <button
                onClick={onSignOut}
                className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
              >
                Sign out
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
