import { FadeUp } from "./Animate";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl p-10 md:p-14 theme-card theme-card-hover">
          <FadeUp>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.4em] theme-subtle">
                  Ready to scale
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
                  Launch a premium Shopify experience in weeks.
                </h3>
                <p className="mt-3 theme-muted max-w-xl">
                  We partner with fast-growing brands to unlock growth with
                  conversion-led design and performance builds.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row md:justify-end">
                <button className="px-8 py-4 rounded-full font-semibold transition theme-solid-btn">
                  Book a Call
                </button>
                <button className="px-8 py-4 rounded-full transition theme-outline-btn">
                  View Process
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
