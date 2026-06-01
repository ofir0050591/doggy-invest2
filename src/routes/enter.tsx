import { createFileRoute } from "@tanstack/react-router";
import { TopNav, Footer } from "./index";

export const Route = createFileRoute("/enter")({
  head: () => ({
    meta: [
      { title: "Enter · doggy" },
      { name: "description", content: "Enter doggy — Israel's Hebrew-first dog walking marketplace." },
    ],
  }),
  component: EnterPage,
});

function EnterPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <TopNav />
      <main className="flex-1 px-6 md:px-10 py-28 md:py-36">
        <div className="max-w-2xl mx-auto text-center">
          <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-8">ACCESS · BETA</div>
          <h1 className="text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.05] tracking-tight mb-8">
            Enter the pack.
          </h1>
          <p className="text-lg text-[var(--ink-muted)] mb-12 leading-relaxed">
            The doggy beta is currently invite-only. Drop your email to join the waitlist for early access.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 bg-[var(--panel)]/60 border border-[var(--line)] px-4 py-3 font-mono text-sm focus:outline-none focus:border-[var(--orange)]"
            />
            <button
              type="submit"
              className="bg-[var(--orange)] text-white px-6 py-3 font-mono text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[var(--orange-soft)] transition-colors"
            >
              Join →
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
