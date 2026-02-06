import { FadeUp } from "./Animate";

const logos = [
  "Shopify Plus",
  "Klaviyo",
  "Stripe",
  "Meta",
  "Recharge",
  "Gorgias",
  "Attentive",
  "Yotpo",
];

export default function LogoMarquee() {
  return (
    <section className="py-16 theme-divider">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.4em] theme-subtle text-center">
            Platform Partners
          </p>
        </FadeUp>
      </div>
      <div className="mt-8 marquee">
        <div className="marquee__track gap-10 px-6">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={`${logo}-${i}`}
              className="flex items-center justify-center rounded-full px-6 py-3 text-sm uppercase tracking-[0.25em] backdrop-blur-sm theme-card theme-muted"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
