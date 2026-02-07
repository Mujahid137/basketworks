import { FadeUp } from "./Animate";

export default function LeadMagnet() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="rounded-3xl p-8 md:p-10 theme-card">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs uppercase tracking-[0.35em] theme-subtle">
                  Free Resource
                </p>
                <h3 className="mt-3 text-2xl md:text-3xl font-semibold font-display">
                  Get our Shopify CRO checklist
                </h3>
                <p className="mt-3 theme-muted max-w-xl">
                  17 quick wins to improve conversion rate and page speed.
                </p>
              </div>
              <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full flex-1 rounded-full px-4 py-3 theme-input-pill"
                />
                <button className="w-full rounded-full px-5 py-3 text-xs uppercase tracking-[0.35em] transition theme-outline-btn sm:w-auto">
                  Send
                </button>
              </form>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
