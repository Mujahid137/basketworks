import { FadeUp } from "./Animate";

export default function CaseStudy() {
  return (
    <section className="py-28">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeUp>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
              Case Study
            </p>
            <h3 className="mt-4 text-3xl md:text-4xl font-semibold font-display">
              BasLagbe — 3.2x conversion lift in 6 weeks
            </h3>
            <p className="mt-4 theme-muted max-w-xl">
              We rebuilt the home‑rental flow with a conversion‑led layout,
              streamlined search, and a faster checkout experience.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div className="theme-card p-4 rounded-2xl">
                <p className="text-lg font-semibold font-display">+3.2x</p>
                <p className="text-xs uppercase tracking-[0.25em] theme-subtle mt-2">
                  Conversion
                </p>
              </div>
              <div className="theme-card p-4 rounded-2xl">
                <p className="text-lg font-semibold font-display">-41%</p>
                <p className="text-xs uppercase tracking-[0.25em] theme-subtle mt-2">
                  Bounce Rate
                </p>
              </div>
              <div className="theme-card p-4 rounded-2xl">
                <p className="text-lg font-semibold font-display">6 weeks</p>
                <p className="text-xs uppercase tracking-[0.25em] theme-subtle mt-2">
                  Launch
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="theme-card theme-card-hover rounded-3xl p-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}work/baslagbe.png`}
                alt="BasLagbe homepage preview"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] theme-subtle">
                Real Estate
              </p>
              <a
                className="theme-link text-sm uppercase tracking-[0.3em]"
                href="https://mujahid137.github.io/HomeRent/"
                target="_blank"
                rel="noreferrer"
              >
                View Site
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
