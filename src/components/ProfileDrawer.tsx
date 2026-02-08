import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
  email?: string;
  onSignOut: () => void;
};

type AdminProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string | null;
  company: string | null;
  website: string | null;
  phone: string | null;
  created_at: string | null;
};

const sections = [
  {
    title: "Profile info",
    desc: "Name, role, company, and public details.",
    cta: "Edit profile",
    href: "/profile",
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminNotice, setAdminNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let active = true;
    const checkAdmin = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        const user = session.session?.user;
        if (!user) {
          if (active) setIsAdmin(false);
          return;
        }
        // Optimistic UI: show admin tools for the known admin email.
        if (user.email === "mdjx137@gmail.com") {
          if (active) setIsAdmin(true);
        } else {
          if (active) setIsAdmin(false);
        }
      } catch (err) {
        if (active) setIsAdmin(false);
      }
    };
    checkAdmin();
    return () => {
      active = false;
    };
  }, [open]);

  const fetchAdminProfiles = async () => {
    setAdminLoading(true);
    setAdminNotice(null);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) {
        setAdminNotice("Please log in again.");
        return;
      }
      const response = await fetch("/api/admin/profiles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message || "Failed to fetch profiles.");
      }
      const payload = await response.json();
      setAdminProfiles(payload.profiles || []);
    } catch (err: any) {
      setAdminNotice(err?.message || "Unable to load profiles.");
    } finally {
      setAdminLoading(false);
    }
  };

  const exportProfiles = async () => {
    if (!adminProfiles.length) {
      await fetchAdminProfiles();
    }
    const rows = (adminProfiles.length ? adminProfiles : []).map((row) => {
      return [
        `Email: ${row.email ?? "-"}`,
        `Name: ${row.full_name ?? "-"}`,
        `Role: ${row.role ?? "-"}`,
        `Company: ${row.company ?? "-"}`,
        `Website: ${row.website ?? "-"}`,
        `Phone: ${row.phone ?? "-"}`,
        `Created: ${row.created_at ?? "-"}`,
      ].join("\n");
    });
    const blob = new Blob([rows.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "basketworks-profiles.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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
                    {section.href ? (
                      <a
                        href={section.href}
                        className="mt-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition theme-outline-btn md:mt-0 inline-flex items-center justify-center"
                      >
                        {section.cta}
                      </a>
                    ) : (
                      <button className="mt-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition theme-outline-btn md:mt-0">
                        {section.cta}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {isAdmin && (
              <div className="mt-10 rounded-2xl px-4 py-4 md:px-5 theme-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                    Admin tools
                  </p>
                  <span className="text-[11px] uppercase tracking-[0.3em] theme-subtle">
                    Private
                  </span>
                </div>
                <p className="mt-2 text-sm theme-muted">
                  Download all profile information as a plain text file.
                </p>
                <div className="mt-4 flex flex-col gap-3 md:flex-row">
                  <button
                    onClick={fetchAdminProfiles}
                    className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                    disabled={adminLoading}
                  >
                    {adminLoading ? "Loading..." : "Load profiles"}
                  </button>
                  <button
                    onClick={exportProfiles}
                    className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                    disabled={adminLoading}
                  >
                    Export as text
                  </button>
                </div>
                {adminNotice && (
                  <p className="mt-3 text-sm text-amber-200">{adminNotice}</p>
                )}
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
