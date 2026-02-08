import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-3xl"
      >
        <p className="text-xs uppercase tracking-[0.4em] theme-subtle">
          Basketworks
        </p>
        <h1 className="mt-6 text-[clamp(2.5rem,5vw,4.2rem)] font-semibold leading-[1.1] tracking-tight font-display">
          We Build <span className="text-accent">High-Converting</span>{" "}
          Experiences
        </h1>

        <p className="mt-6 theme-muted text-base md:text-lg max-w-2xl mx-auto">
          Strategy, design, and development for ambitious eCommerce brands.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="px-8 py-3 bg-accent text-black rounded-full font-semibold hover:shadow-[0_0_40px_#7C5CFF] transition">
            Start a Project
          </button>
          <button className="px-8 py-3 rounded-full transition theme-outline-btn">
            View Work
          </button>
          <button
            onClick={() => window.dispatchEvent(new Event("basketworks:profile"))}
            className="px-8 py-3 rounded-full transition theme-outline-btn"
          >
            Client Portal
          </button>
        </div>
      </motion.div>
    </section>
  );
}
