import { FadeUp } from "./Animate";

const steps = [
  {
    title: "Strategy Sprint",
    desc: "Audit, benchmarks, and a conversion roadmap aligned to your goals.",
  },
  {
    title: "Design System",
    desc: "UX flows, component library, and high-fidelity UI prototypes.",
  },
  {
    title: "Build & Optimize",
    desc: "Fast Shopify builds, testing, and performance tuning.",
  },
];

export default function Process() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                Process
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
                Clear steps, minimal noise
              </h3>
            </div>
            <button className="inline-flex items-center gap-3 rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition md:self-end theme-outline-btn">
              View Case Studies
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeUp delay={i * 0.12} key={step.title}>
              <div className="relative rounded-2xl p-6 transition hover:-translate-y-1 theme-card theme-card-hover">
                <p className="text-xs uppercase tracking-[0.3em] theme-subtle">
                  0{i + 1}
                </p>
                <h4 className="mt-3 text-lg font-semibold font-display">
                  {step.title}
                </h4>
                <p className="mt-2 theme-muted">{step.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
