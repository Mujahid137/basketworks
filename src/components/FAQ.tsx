import { FadeUp } from "./Animate";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most projects launch in 4–6 weeks depending on scope and approvals.",
  },
  {
    q: "Do you work with existing Shopify stores?",
    a: "Yes. We can redesign, optimize, or rebuild with minimal downtime.",
  },
  {
    q: "Can you handle copy and product photography?",
    a: "We can partner with your team or bring in trusted specialists.",
  },
  {
    q: "What if I need ongoing support?",
    a: "We offer monthly retainers for CRO, A/B tests, and feature updates.",
  },
  {
    q: "Do you integrate Klaviyo, GA4, or other tools?",
    a: "Yes — we handle analytics, email flows, and performance tooling.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
              FAQ
            </p>
            <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
              Answers, upfront
            </h3>
          </div>
        </FadeUp>

        <div className="mt-10 space-y-4">
          {faqs.map((item, i) => (
            <FadeUp delay={i * 0.06} key={item.q}>
              <details className="rounded-2xl p-5 theme-card">
                <summary className="cursor-pointer list-none font-semibold">
                  {item.q}
                </summary>
                <p className="mt-3 theme-muted">{item.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
