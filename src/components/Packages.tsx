import { FadeUp } from "./Animate";

const packages = [
  {
    name: "Starter",
    price: "2.5k",
    desc: "For new brands launching fast.",
    bullets: ["1-2 key pages", "Design + build", "Launch in 2 weeks"],
  },
  {
    name: "Growth",
    price: "5k",
    desc: "For scaling stores and optimization.",
    bullets: ["Full site refresh", "CRO sprints", "Analytics setup"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For complex teams and integrations.",
    bullets: ["Multi-store setup", "Custom integrations", "Ongoing support"],
  },
];

export default function Packages() {
  return (
    <section className="py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                Packages
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
                Simple, transparent pricing
              </h3>
            </div>
            <p className="theme-muted max-w-md">
              Pick a starting point. We'll tailor it to your scope.
            </p>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <FadeUp delay={i * 0.1} key={pkg.name}>
              <div
                className={`rounded-2xl p-5 md:p-6 theme-card theme-card-hover ${
                  pkg.featured ? "ring-1 ring-white/20" : ""
                }`}
              >
                <p className="text-sm uppercase tracking-[0.3em] theme-subtle">
                  {pkg.name}
                </p>
                <p className="mt-3 text-3xl font-semibold font-display">
                  {pkg.price}
                </p>
                <p className="mt-2 theme-muted">{pkg.desc}</p>
                <ul className="mt-6 space-y-2 text-sm theme-muted">
                  {pkg.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <button className="mt-6 w-full rounded-full px-4 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn">
                  Get Started
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
