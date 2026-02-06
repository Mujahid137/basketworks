export default function Contact() {
  return (
    <section id="contact" className="py-40">
      <div className="max-w-7xl mx-auto px-6 grid gap-16 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] theme-subtle">
            Contact
          </p>
          <h2 className="mt-6 text-4xl md:text-5xl font-semibold font-display">
            Let&#39;s build your next store.
          </h2>
          <p className="mt-4 theme-muted max-w-md">
            Share a brief about your project and we&#39;ll respond within 24
            hours.
          </p>

          <div className="mt-10 space-y-6 text-sm">
            <div>
              <p className="theme-subtle uppercase tracking-[0.25em] text-[11px]">
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
              <p className="theme-subtle uppercase tracking-[0.25em] text-[11px]">
                Phone
              </p>
              <a
                className="mt-2 inline-block theme-link"
                href="tel:+14155552671"
              >
                +1 (415) 555-2671
              </a>
            </div>
            <div>
              <p className="theme-subtle uppercase tracking-[0.25em] text-[11px]">
                Social
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
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
        </div>

        <form
          action="https://formspree.io/f/meeljwkp"
          method="POST"
          className="space-y-8"
        >
          <div className="space-y-6">
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
            <textarea
              name="message"
              required
              rows={4}
              className="w-full py-3 transition resize-none theme-input"
              placeholder="Project details"
            />
          </div>
          <button className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm uppercase tracking-[0.3em] transition theme-outline-btn">
            Send Message
            <span aria-hidden="true">?</span>
          </button>
        </form>
      </div>
    </section>
  );
}
