import { FadeUp } from "./Animate";

export default function Trust() {
  const brands = ["Shopify", "Klaviyo", "Stripe", "Meta"];

  return (
    <section className="relative overflow-hidden py-24 theme-divider">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <FadeUp>
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] theme-subtle">
            Trusted by fast-growing brands
          </p>
          <h3 className="mt-4 text-2xl md:text-3xl font-semibold font-display">
            Built for teams that scale fast
          </h3>
        </div>
      </FadeUp>

      <div className="mt-12 marquee">
        <div className="marquee__track gap-6 px-6">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="group flex items-center justify-center rounded-2xl px-6 py-5 backdrop-blur-sm transition hover:-translate-y-1 theme-card theme-card-hover"
            >
              {brand === "Shopify" && (
                <svg
                  aria-label="Shopify"
                  role="img"
                  viewBox="0 0 120 32"
                  className="h-8 w-28 theme-icon"
                  fill="currentColor"
                >
                  <path d="M16 2l6 4 4 24H6L10 6l6-4Zm0 4.2L13 7.7 10.9 26h10.2L19 7.7 16 6.2Z" />
                  <path d="M12.5 14.5c.7-2.2 3.5-3.2 5.6-2.1l-1 3c-1-.7-2.1-.6-2.6.4-.8 1.4 2.6 2 1.5 4.3-1 2-3.7 2.8-6 1.6l1.1-3.1c1 .7 2.4 1 3 .1.9-1.4-2.6-2-1.6-4.2Z" />
                  <text
                    x="34"
                    y="22"
                    fontSize="16"
                    fontFamily="Space Grotesk, Inter, sans-serif"
                    fontWeight="700"
                  >
                    Shopify
                  </text>
                </svg>
              )}

              {brand === "Klaviyo" && (
                <svg
                  aria-label="Klaviyo"
                  role="img"
                  viewBox="0 0 120 32"
                  className="h-8 w-28 theme-icon"
                  fill="currentColor"
                >
                  <path d="M12 6h6l-6 6 6 8h-6l-4-6v6H4V6h4v7l4-7Z" />
                  <text
                    x="30"
                    y="22"
                    fontSize="16"
                    fontFamily="Space Grotesk, Inter, sans-serif"
                    fontWeight="700"
                  >
                    Klaviyo
                  </text>
                </svg>
              )}

              {brand === "Stripe" && (
                <svg
                  aria-label="Stripe"
                  role="img"
                  viewBox="0 0 120 32"
                  className="h-8 w-28 theme-icon"
                  fill="currentColor"
                >
                  <text
                    x="8"
                    y="22"
                    fontSize="18"
                    fontFamily="Space Grotesk, Inter, sans-serif"
                    fontWeight="700"
                  >
                    Stripe
                  </text>
                </svg>
              )}

              {brand === "Meta" && (
                <svg
                  aria-label="Meta"
                  role="img"
                  viewBox="0 0 120 32"
                  className="h-8 w-28 theme-icon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 22c4-8 8-12 12-12s8 4 12 12c2 4 6 4 8 0 2-4 6-12 10-12 4 0 8 4 12 12" />
                  <text
                    x="70"
                    y="22"
                    fontSize="16"
                    fontFamily="Space Grotesk, Inter, sans-serif"
                    fontWeight="700"
                    fill="currentColor"
                    stroke="none"
                  >
                    Meta
                  </text>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
