import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer } from "./index";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { title: "Vision · doggy" },
      { name: "description", content: "doggy's vision: become the operating system for pet ownership in Israel." },
    ],
  }),
  component: VisionPage,
});

const pillars = [
  {
    n: "01",
    title: "Own the Walk",
    body: "Become the default booking layer for every dog walk in Israel — Tel Aviv first, national by year three.",
  },
  {
    n: "02",
    title: "Expand the Stack",
    body: "Layer grooming, boarding, vet booking, and insurance on top of the trusted walker relationship.",
  },
  {
    n: "03",
    title: "Operating System for Pets",
    body: "Become the indispensable Hebrew-first app every Israeli pet household opens daily — from Dog Cop alerts to vaccine reminders.",
  },
];

function VisionPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <TopNav />
      <main className="flex-1 px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-6">
            00 / VISION
          </div>
          <h1 className="text-[clamp(2rem,4.8vw,4rem)] font-extrabold leading-[1.05] tracking-tight mb-8">
            Not a walking app.<br />
            <span className="text-[var(--ink-muted)]">The operating system for pet ownership in Israel.</span>
          </h1>
          <p className="text-lg text-[var(--ink-muted)] max-w-2xl leading-relaxed mb-16">
            Walks are the wedge. Trust is the moat. The endgame is every transaction a dog owner makes — booked, paid, and remembered through doggy.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.n} className="bg-[var(--panel)]/50 border border-[var(--line)] p-8 hover:border-[var(--orange)] transition-colors">
                <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-6">{p.n}</div>
                <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                <p className="text-[var(--ink-muted)] leading-relaxed text-[15px]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
