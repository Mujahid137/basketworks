import { FadeUp } from "./Animate";

export default function Portfolio() {
  const projects = [
    {
      name: "BasLagbe",
      type: "Real Estate",
      href: "https://mujahid137.github.io/HomeRent/",
      image: "/work/baslagbe.png",
    },
    {
      name: "DigitalStudio",
      type: "Agency",
      href: "https://mujahid137.github.io/my-tsx-site/",
      image: "/work/digitalstudio.png",
    },
    {
      name: "Mujahid's Portfolio",
      type: "Portfolio",
      href: "https://mujahid137.github.io/Mujahid-s-Portfolio/",
      image: "/work/mujahid-portfolio.png",
    },
  ];

  return (
    <section id="work" className="py-40 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <h2 className="text-5xl font-bold mb-20 font-display">
            Selected Work
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <FadeUp delay={i * 0.1} key={project.name}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-2xl transition hover:scale-[1.02]"
              >
                <div className="h-56 overflow-hidden rounded-2xl theme-card theme-card-hover">
                  <img
                    src={project.image}
                    alt={`${project.name} homepage`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] theme-subtle">
                      {project.type}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold font-display">
                      {project.name}
                    </h3>
                  </div>
                  <span className="theme-muted text-sm uppercase tracking-[0.3em]">
                    View
                  </span>
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
