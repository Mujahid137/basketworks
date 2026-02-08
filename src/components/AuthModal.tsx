import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

type AuthMode = "login" | "register";
type AuthMethod = "password" | "otp";
type Step = "request" | "verify" | "success";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [method, setMethod] = useState<AuthMethod>("password");
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!open) {
      setStep("request");
      setCode("");
      setNotice(null);
      setPassword("");
    }
  }, [open]);

  const title = useMemo(() => {
    if (method === "otp") {
      return mode === "login" ? "Sign in with OTP" : "Create account with OTP";
    }
    return mode === "login" ? "Sign in with password" : "Create an account";
  }, [mode, method]);

  const resetMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setStep("request");
    setCode("");
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
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        setNotice({
          type: "success",
          text: "Account created. Check your email to confirm.",
        });
        setStep("success");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        if (error) throw error;
        setNotice({ type: "success", text: "Signed in successfully." });
        setStep("success");
      }
    } catch (err: any) {
      setNotice({ type: "error", text: err?.message || "Auth failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpRequest = async (event: FormEvent) => {
    event.preventDefault();
    setNotice(null);

    if (!EMAIL_PATTERN.test(email.trim())) {
      setNotice({ type: "error", text: "Enter a valid email address." });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: mode === "register",
        },
      });
      if (error) throw error;
      setStep("verify");
      setNotice({ type: "success", text: "OTP sent. Check your inbox." });
    } catch (err: any) {
      setNotice({ type: "error", text: err?.message || "Failed to send OTP." });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (event: FormEvent) => {
    event.preventDefault();
    setNotice(null);

    if (!code.trim()) {
      setNotice({ type: "error", text: "Enter the OTP code." });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: "email",
      });
      if (error) throw error;
      setNotice({ type: "success", text: "Signed in successfully." });
      setStep("success");
    } catch (err: any) {
      setNotice({ type: "error", text: err?.message || "Invalid OTP." });
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
          className="fixed inset-0 z-[60]"
        >
          <div className="absolute inset-0 theme-overlay" onClick={onClose} />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 top-16 w-[92%] max-w-xl -translate-x-1/2 rounded-3xl p-6 md:p-8 theme-card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Account
                </p>
                <h3 className="mt-2 text-2xl font-semibold font-display">
                  {title}
                </h3>
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

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => resetMode("login")}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition ${
                  mode === "login" ? "theme-outline-btn" : "theme-link"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => resetMode("register")}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition ${
                  mode === "register" ? "theme-outline-btn" : "theme-link"
                }`}
              >
                Register
              </button>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => {
                    setMethod("password");
                    setStep("request");
                    setNotice(null);
                  }}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition ${
                    method === "password" ? "theme-outline-btn" : "theme-link"
                  }`}
                >
                  Password
                </button>
                <button
                  onClick={() => {
                    setMethod("otp");
                    setStep("request");
                    setNotice(null);
                  }}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] transition ${
                    method === "otp" ? "theme-outline-btn" : "theme-link"
                  }`}
                >
                  OTP
                </button>
              </div>
            </div>

            <div className="mt-6">
              {method === "password" && (
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
                    {loading ? "Working..." : mode === "register" ? "Create" : "Sign in"}
                  </button>
                </form>
              )}

              {method === "otp" && step === "request" && (
                <form className="space-y-4" onSubmit={handleOtpRequest}>
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              )}

              {method === "otp" && step === "verify" && (
                <form className="space-y-4" onSubmit={handleOtpVerify}>
                  <div>
                    <label className="text-xs uppercase tracking-[0.35em] theme-subtle">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="6-digit code"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      className="mt-3 w-full rounded-full px-4 py-3 theme-input-pill"
                    />
                    <p className="mt-2 text-sm theme-muted">
                      Sent to {email.trim() || "your email"}.
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("request")}
                    className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn"
                  >
                    Resend OTP
                  </button>
                </form>
              )}

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
