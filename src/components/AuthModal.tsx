import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

type AuthMode = "login" | "register";
type Step = "request" | "verify" | "success";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({
  open,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!open) {
      setStep("request");
      setNotice(null);
      setPassword("");
    } else {
      setMode(initialMode);
    }
  }, [open, initialMode]);

  const title = useMemo(() => {
    return mode === "login" ? "Log in to Basketworks" : "Create new account";
  }, [mode]);

  const resetMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStep("request");
    setNotice(null);
  };

  const handlePassword = async (event: FormEvent) => {
    event.preventDefault();
    setNotice(null);

    if (!EMAIL_PATTERN.test(email.trim())) {
      setNotice({ type: "error", text: "Enter a valid email address." });
      return;
    }

    if (!password.trim()) {
      setNotice({ type: "error", text: "Password is required." });
      return;
    }

    try {
      setLoading(true);
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        if (data.user && data.user.identities?.length === 0) {
          setNotice({
            type: "error",
            text: "Account already exists. Please log in instead.",
          });
          setMode("login");
          return;
        }
        setNotice({
          type: "success",
          text: "Account created. Check your email to confirm your account.",
        });
        setStep("success");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        if (!data.user?.email_confirmed_at) {
          await supabase.auth.signOut();
          setNotice({
            type: "error",
            text: "Please confirm your email before logging in.",
          });
          setStep("request");
        } else {
          setNotice({ type: "success", text: "Logged in successfully." });
          setStep("success");
        }
      }
    } catch (err: any) {
      const message =
        err?.message?.includes("Email not confirmed") ||
        err?.message?.includes("email not confirmed")
          ? "Please confirm your email before logging in."
          : err?.message || "Auth failed.";
      setNotice({ type: "error", text: message });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!EMAIL_PATTERN.test(email.trim())) {
      setNotice({ type: "error", text: "Enter a valid email address first." });
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
      });
      if (error) throw error;
      setNotice({ type: "success", text: "Confirmation email resent." });
    } catch (err: any) {
      setNotice({ type: "error", text: err?.message || "Failed to resend email." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 py-6 sm:items-center"
        >
          <div className="absolute inset-0 theme-overlay" onClick={onClose} />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-3xl p-6 md:p-8 theme-card max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Account
                </p>
                <h3 className="mt-2 text-2xl font-semibold font-display">
                  {title}
                </h3>
                <p className="mt-2 text-sm theme-muted">
                  {mode === "login"
                    ? "Welcome back. Use your email and password to continue."
                    : "It's quick and easy."}
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition theme-outline-btn"
                aria-label="Close"
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

            <div className="mt-6">
                <form className="space-y-4" onSubmit={handlePassword}>
                  <div>
                    <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                      Email address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-3 w-full rounded-full px-4 py-3 theme-input-pill"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-3 w-full rounded-full px-4 py-3 theme-input-pill"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    {loading
                      ? "Working..."
                      : mode === "register"
                        ? "Create account"
                        : "Log in"}
                  </button>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                    >
                      Resend confirmation
                    </button>
                  )}
                </form>

              {step === "success" && (
                <div className="space-y-4">
                  <p className="theme-muted">
                    You're signed in. Your session is active on this device.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    Close
                  </button>
                </div>
              )}
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

            <div className="mt-6 text-center text-sm theme-muted">
              {mode === "login" ? (
                <>
                  New to Basketworks?{" "}
                  <button
                    type="button"
                    onClick={() => resetMode("register")}
                    className="theme-link"
                  >
                    Create an account
                  </button>
                  .
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => resetMode("login")}
                    className="theme-link"
                  >
                    Log in
                  </button>
                  .
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
