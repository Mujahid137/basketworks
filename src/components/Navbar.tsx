import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";
import ProfileDrawer from "./ProfileDrawer";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      if (userEmail) {
        setProfileOpen(true);
      } else {
        setAuthOpen(true);
      }
    };
    window.addEventListener("basketworks:profile", handler);
    return () => window.removeEventListener("basketworks:profile", handler);
  }, [userEmail]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur theme-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="logo-holo text-sm">
            <span className="logo-mark-wrap" aria-hidden="true">
              <svg className="logo-live" viewBox="0 0 64 64" fill="none">
                <defs>
                  <linearGradient id="bw-live" x1="0" y1="0" x2="64" y2="64">
                    <stop offset="0" stopColor="#60A5FA" />
                    <stop offset="0.5" stopColor="#A78BFA" />
                    <stop offset="1" stopColor="#34D399" />
                  </linearGradient>
                </defs>
                <circle
                  className="logo-live-ring"
                  cx="32"
                  cy="32"
                  r="20"
                  stroke="url(#bw-live)"
                  strokeWidth="3"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="10"
                  stroke="url(#bw-live)"
                  strokeWidth="2"
                  className="logo-live-core"
                />
                <path
                  d="M20 32h24"
                  stroke="url(#bw-live)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="flex flex-col leading-none">
              <span className="logo-holo__text text-base">BASKETWORKS</span>
              <span className="logo-holo__subtitle">Ecommerce Studio</span>
            </div>
          </a>

          <div className="hidden md:flex gap-10 text-sm theme-nav-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            {userEmail ? (
              <button
                onClick={() => setProfileOpen(true)}
                className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                >
                  Register
                </button>
              </>
            )}
            <button className="hidden md:inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition theme-outline-btn">
              Book a Call
            </button>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full p-2 transition theme-outline-btn"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                >
                  <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-xl"
              aria-label="Open menu"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div
              className="absolute inset-0 theme-overlay"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute right-0 top-0 h-full w-full max-w-sm p-6 theme-card"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 transition theme-outline-btn"
                  aria-label="Close menu"
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
              <div className="mt-8 flex flex-col gap-5 text-lg">
                <a onClick={() => setOpen(false)} href="#services">
                  Services
                </a>
                <a onClick={() => setOpen(false)} href="#work">
                  Work
                </a>
                <a onClick={() => setOpen(false)} href="#contact">
                  Contact
                </a>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                {userEmail ? (
                  <button
                    onClick={() => {
                      setOpen(false);
                      setProfileOpen(true);
                    }}
                    className="rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setAuthOpen(true);
                      }}
                      className="rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setAuthOpen(true);
                      }}
                      className="rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
              <div className="mt-10 flex items-center gap-3">
                <button className="flex-1 rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn">
                  Book a Call
                </button>
                <button
                  onClick={() => setDarkMode((prev) => !prev)}
                  className="rounded-full p-3 transition theme-outline-btn"
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="h-5 w-5"
                    >
                      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <ProfileDrawer
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        email={userEmail ?? undefined}
        onSignOut={() => supabase.auth.signOut().then(() => setProfileOpen(false))}
      />
    </>
  );
}
