import { FadeUp } from "./Animate";

const tools = [
  { name: "Shopify", role: "Commerce" },
  { name: "Klaviyo", role: "Retention" },
  { name: "GA4", role: "Analytics" },
  { name: "Stripe", role: "Payments" },
  { name: "Figma", role: "Design" },
  { name: "Hotjar", role: "Insights" },
];

export default function Tools() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                Tools
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
                Stack we deliver with
              </h3>
            </div>
            <p className="theme-muted max-w-md">
              Trusted platforms for performance, analytics, and retention.
            </p>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center justify-between rounded-2xl px-5 py-4 theme-card theme-card-hover"
            >
              <p className="text-sm uppercase tracking-[0.3em] theme-subtle">
                {tool.role}
              </p>
              <p className="text-lg font-semibold font-display">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
