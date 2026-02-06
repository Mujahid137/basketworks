import { FadeUp } from "./Animate";

const metrics = [
  { value: "3.2x", label: "Conversion lift" },
  { value: "+28%", label: "Average order value" },
  { value: "6 wks", label: "Typical launch" },
  { value: "98%", label: "Client retention" },
];

export default function Metrics() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                Outcomes
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
                Results, kept simple
              </h3>
            </div>
            <p className="max-w-md theme-muted md:text-right">
              A compact view of the impact we target.
            </p>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {metrics.map((m, i) => (
            <FadeUp delay={i * 0.1} key={m.label}>
              <div className="rounded-2xl p-5 theme-card theme-card-hover">
                <p className="text-2xl font-semibold font-display">{m.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] theme-subtle">
                  {m.label}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
