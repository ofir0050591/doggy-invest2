import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { TopNav, Footer } from "./index";
import { openPdfInNewTab } from "./pdf-view";
import marketplacePreview from "@/assets/reports/doggy-marketplace.jpg";
import competitivePreview from "@/assets/reports/doggy-competitive-analysis.jpg";
import productStatePreview from "@/assets/reports/doggy-product-state.jpg";
import seedRaisePreview from "@/assets/reports/doggy-seed-raise.jpg";
import executionRoadmapPreview from "@/assets/reports/doggy-execution-roadmap.jpg";

type Report = {
  slug: string;
  title: string;
  pdf: string;
  preview: string;
  locked?: boolean;
  lockedMessage?: string;
};

export const reports: Report[] = [
  {
    slug: "doggy-marketplace",
    title: "Market value research",
    pdf: "/reports/doggy-marketplace.pdf",
    preview: marketplacePreview,
  },
  {
    slug: "doggy-competitive-analysis",
    title: "Doggy competitive analysis",
    pdf: "/reports/doggy-competitive-analysis.pdf",
    preview: competitivePreview,
  },
  {
    slug: "doggy-product-state",
    title: "Doggy product state",
    pdf: "/reports/doggy-product-state.pdf",
    preview: productStatePreview,
  },
  {
    slug: "doggy-seed-raise",
    title: "Doggy seed raise",
    pdf: "/reports/doggy-seed-raise.pdf",
    preview: seedRaisePreview,
  },
  {
    slug: "doggy-execution-roadmap",
    title: "Doggy execution roadmap",
    pdf: "/reports/doggy-execution-roadmap.pdf",
    preview: executionRoadmapPreview,
    locked: true,
    lockedMessage: "This file contains crucial information about the Application",
  },
];

function ReportCard({ r }: { r: Report }) {
  const navigate = useNavigate();
  if (r.locked) {
    return (
      <div className="group relative aspect-square border border-[var(--line)] bg-[var(--panel)]/40 overflow-hidden flex flex-col text-left hover:border-[var(--orange)] transition-colors">
        <div className="relative flex-1 overflow-hidden bg-white">
          <img
            src={r.preview}
            alt={`${r.title} preview`}
            className="w-full h-full object-cover object-top blur-[2px]"
          />
        </div>
        <div className="relative border-t border-[var(--line)] bg-[var(--panel)] px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-sm font-bold leading-tight truncate">{r.title}</div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-dim)] shrink-0">
            PDF
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--bg)]/92 opacity-0 group-hover:opacity-100 transition-opacity z-20 p-5 text-center">
          <p className="text-sm font-medium text-[var(--ink)] leading-snug">
            {r.lockedMessage}
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/contact-funder" })}
            className="bg-[var(--orange)] text-white font-mono text-[11px] tracking-[0.2em] uppercase px-4 py-2.5 hover:opacity-90 transition-opacity"
          >
            Contact Funder
          </button>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => openPdfInNewTab(r.pdf)}
      className="group relative aspect-square border border-[var(--line)] bg-[var(--panel)]/40 overflow-hidden flex flex-col text-left hover:border-[var(--orange)] transition-colors"
    >
      <div className="relative flex-1 overflow-hidden bg-white">
        <img
          src={r.preview}
          alt={`${r.title} preview`}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="relative border-t border-[var(--line)] bg-[var(--panel)] px-4 py-3 flex items-center justify-between gap-3">
        <div className="text-sm font-bold leading-tight truncate">{r.title}</div>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-dim)] shrink-0">
          PDF
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg)]/85 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[var(--orange)]">
          View now ↗
        </span>
      </div>
    </button>
  );
}

export const Route = createFileRoute("/market-research")({
  head: () => ({
    meta: [
      { title: "Market Research · doggy" },
      { name: "description", content: "Research reports on Israel's dog market." },
    ],
  }),
  component: MarketResearchPage,
});

function MarketResearchPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <TopNav />
      <main className="flex-1 px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-6">
            00 / RESEARCH
          </div>
          <h1 className="text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight mb-6">
            Market Research.
          </h1>
          <p className="text-lg text-[var(--ink-muted)] max-w-2xl leading-relaxed mb-14">
            Click any report to open it.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reports.map((r) => (
              <ReportCard key={r.slug} r={r} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
