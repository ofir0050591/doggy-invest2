import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer } from "./index";
import founderPhoto from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us · doggy" },
      { name: "description", content: "The team behind doggy — building Israel's first dog walking marketplace." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <TopNav />
      <main className="flex-1 px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-16">
            <div className="flex flex-row gap-6 md:gap-10 items-start mb-8">
              <div className="flex-1">
                <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-6">
                  00 / ABOUT
                </div>
                <h1 className="text-[clamp(2rem,4.8vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
                  Built in Tel Aviv.<br />
                  <span className="text-[var(--ink-muted)]">For the Israeli pack.</span>
                </h1>
              </div>
              <img
                src={founderPhoto}
                alt="Ofir, founder of doggy"
                className="w-28 h-36 md:w-36 md:h-44 object-cover object-top rounded-lg border border-[var(--line)] shrink-0"
              />
            </div>
            <p className="text-lg text-[var(--ink-muted)] leading-relaxed mb-6">
              doggy was founded by Ofir, a startup owner, who saw the opportunity and the problem in the Israeli market. The demand is simply there.
            </p>
            <p className="text-lg text-[var(--ink-muted)] leading-relaxed">
              We're building the platform we wished existed for dog owners — opinionated about quality, local by design, and uncompromising on walker trust.
            </p>
          </div>

          <div className="border-t border-[var(--line)] pt-12">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-4">Contact</div>
            <a
              href="mailto:investdoggy@atomicmail.io"
              className="text-2xl md:text-3xl font-extrabold hover:text-[var(--orange)] transition-colors inline-flex items-baseline gap-3"
            >
              investdoggy@atomicmail.io <span className="text-base text-[var(--ink-dim)]">↗</span>
            </a>
            <div className="mt-4 font-mono text-[12px] tracking-[0.15em] uppercase text-[var(--ink-dim)]">
              Tel Aviv · Israel
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
