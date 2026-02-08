import { AnimatePresence, motion } from "framer-motion";

type ProfileDrawerProps = {
  open: boolean;
  onClose: () => void;
  email?: string;
  onSignOut: () => void;
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

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl p-4 md:p-5 theme-card theme-card-hover"
                >
                  <h4 className="text-base font-semibold font-display">
                    {section.title}
                  </h4>
                  <p className="mt-2 text-sm theme-muted">{section.desc}</p>
                  <button className="mt-4 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] transition theme-outline-btn">
                    {section.cta}
                  </button>
                </div>
              ))}
            </div>

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
