import { FadeUp } from "./Animate";

export default function Testimonials() {
  return (
    <section className="py-40">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <FadeUp>
          <p className="text-xl theme-muted">
            "Basketworks helped us scale faster than ever. Conversion rates
            increased by 40%."
          </p>
          <p className="mt-6 theme-subtle">— Founder, DTC Brand</p>
        </FadeUp>
      </div>
    </section>
  );
}
