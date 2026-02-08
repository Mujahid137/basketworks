import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }
  return (
    <section id="contact" className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
              Contact
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold font-display">
              Let&#39;s scope your next launch.
            </h2>
            <p className="mt-4 theme-muted">
              Tell us about your goals and we&#39;ll respond within 24 hours with
              next steps.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              className="theme-outline-btn rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em]"
              href="mailto:mdjx137@gmail.com"
            >
              Email Us
            </a>
            <a
              className="theme-outline-btn rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em]"
              href="tel:+14155552671"
            >
              Call
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="theme-card rounded-3xl p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] theme-subtle">
                  Email
                </p>
                <a
                  className="mt-2 inline-block theme-link"
                  href="mailto:mdjx137@gmail.com"
                >
                  mdjx137@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] theme-subtle">
                  Phone
                </p>
                <a
                  className="mt-2 inline-block theme-link"
                  href="tel:+14155552671"
                >
                  +1 (415) 555-2671
                </a>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] theme-subtle">
                  Social
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <a
                    href="#"
                    className="rounded-full p-2 transition theme-icon-btn"
                    aria-label="LinkedIn"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM3 9h3.96v12H3zM9.5 9H13v1.64h.05C13.54 9.68 15 8.7 17.1 8.7c4.07 0 4.82 2.68 4.82 6.16V21H18v-5.14c0-1.23-.02-2.82-1.72-2.82-1.73 0-2 1.35-2 2.73V21H9.5z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="rounded-full p-2 transition theme-icon-btn"
                    aria-label="Instagram"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                      <circle cx="12" cy="12" r="3.2" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="rounded-full p-2 transition theme-icon-btn"
                    aria-label="Dribbble"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3.5 9.5c5.5 0 10-.8 14.8-4.4" />
                      <path d="M6 20c2.4-3.9 5.2-7.1 8.3-9.7" />
                      <path d="M8.5 4.5c3.7 5.1 5.6 9.7 6.7 15" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 theme-divider" />
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.3em] theme-subtle">
                Office
              </p>
              <p className="mt-2 theme-muted">
                Dhaka • Remote‑first, global delivery
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="theme-card rounded-3xl p-8 space-y-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                name="name"
                required
                className="w-full py-3 transition theme-input"
                placeholder="Name"
              />
              <input
                name="email"
                type="email"
                required
                className="w-full py-3 transition theme-input"
                placeholder="Email"
              />
            </div>
            <input
              name="company"
              className="w-full py-3 transition theme-input"
              placeholder="Company / Brand"
            />
            <textarea
              name="message"
              required
              rows={5}
              className="w-full py-3 transition resize-none theme-input"
              placeholder="Project details, goals, and timeline"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs uppercase tracking-[0.3em] theme-subtle">
                Avg response: 24h
              </p>
              <button className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn">
                {status === "sending" ? "Sending..." : "Send Message"}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
            {status === "success" && (
              <p className="text-sm theme-muted">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm theme-muted">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
