import { FadeUp } from "./Animate";

const services = [
  "Shopify Development",
  "UI / UX Design",
  "Conversion Optimization",
];

export default function Services() {
  return (
    <section id="services" className="py-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-5xl font-bold mb-20 font-display">What We Do</h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((s, i) => (
            <FadeUp delay={i * 0.15} key={s}>
              <div className="p-10 rounded-2xl transition hover:-translate-y-2 theme-card theme-card-hover">
                <h3 className="text-xl font-semibold font-display">{s}</h3>
                <p className="mt-4 theme-muted">
                  Premium solutions built for growth.
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
