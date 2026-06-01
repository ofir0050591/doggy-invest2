import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
export { TopNav, Footer };
import logo from "@/assets/logo.png";
import appDashboard from "@/assets/app-dashboard.png";
import appBookings from "@/assets/app-bookings.png";
import appBookingDetail from "@/assets/app-booking-detail.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "doggy — Israel's 1st Dog Walking Marketplace · Investment Brief" },
      { name: "description", content: "doggy is the Hebrew-first marketplace built to capture Israel's ₪2.2B pet market — 500K+ dogs, zero Rover, ready to deploy." },
      { property: "og:title", content: "doggy — Investment Brief Q3 2024" },
      { property: "og:description", content: "Israel's ₪2.2B pet market has a vacancy. doggy is ready to deploy." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" },
    ],
  }),
  component: Landing,
});

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, threshold]);
  return { ref, inView };
}

function AnimatedNumber({
  target, duration = 1600, prefix = "", suffix = "", decimals = 0, start,
}: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number; start: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return <span>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}

/* ---------- top chrome ---------- */

function TopNav() {
  const tabs = [
    { to: "/enter", label: "Enter" },
    { to: "/", label: "Main" },
    { to: "/market-research", label: "Market Research" },
    { to: "/vision", label: "Vision" },
    { to: "/about", label: "About Us" },
  ] as const;
  return (
    <nav className="w-full bg-[var(--bg)] border-b border-[var(--line)] sticky top-0 z-50 backdrop-blur">
      <div className="px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="doggy" className="h-9 w-9" />
          <span className="font-mono font-bold tracking-[0.15em] text-sm">doggy</span>
        </Link>
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-[var(--orange)] border-[var(--orange)]" }}
              inactiveProps={{ className: "text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]" }}
              className="px-3 py-2 font-mono text-[11px] tracking-[0.18em] uppercase border-b-2 transition-colors whitespace-nowrap"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Ticker() {
  const items = [
    "ROVER.IL: NULL",
    "WAG.IL: NULL",
    "SYS.STATUS: OPERATIONAL",
    "TLV.DOGS: 500K+",
    "MARKET.VAL: ₪2.2B",
    "CAGR: +5.4%",
    "TAKE.RATE: 18%",
    "STAGE: SEED",
  ];
  const doubled = [...items, ...items];
  return (
    <div className="w-full bg-[var(--orange)] text-white overflow-hidden border-b border-[var(--orange)]">
      <div className="ticker-track flex whitespace-nowrap py-2.5 font-mono text-[12px] tracking-[0.18em] font-bold">
        {doubled.map((t, i) => (
          <span key={i} className="px-10 inline-flex items-center gap-3">
            <span className="opacity-70">▸</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative w-full px-6 md:px-10 pt-20 md:pt-28 pb-28 md:pb-36 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(800px 500px at 85% 30%, rgba(255,90,31,0.10), transparent 70%)",
        }}
      />
      <div className="relative grid lg:grid-cols-12 gap-12 max-w-[1400px] mx-auto">
        <div className="lg:col-span-8">
          <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-10 flex items-center gap-3">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <path d="M1 8 L4 8 L6 2 L9 12 L11 6 L15 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
            INVESTMENT BRIEF · Q3 2024
          </div>
          <h1 className="text-[clamp(2.6rem,7.5vw,6.5rem)] font-extrabold leading-[0.98] tracking-tight mb-10">
            Israel's{" "}
            <a
              href={`/pdf-view?url=${encodeURIComponent("/reports/doggy-marketplace.pdf")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-bold underline decoration-[var(--orange)] underline-offset-4 hover:text-[var(--orange)] transition-colors"
            >
              $1.46B
            </a>{" "}
            pet market
            <br />
            <span className="text-[var(--ink-muted)]">has a vacancy.</span>
          </h1>
          <p className="text-lg text-[var(--ink-muted)] max-w-2xl leading-relaxed mb-12">
            No main competitors, demand is huge, first marketplace to capture
            600,000+ registered dogs.
          </p>
          <Link
            to="/contact-funder"
            className="inline-flex items-center gap-3 bg-[var(--orange)] text-white px-7 py-4 font-mono text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[var(--orange-soft)] transition-colors"
          >
            Contact Founder
            <span>→</span>
          </Link>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-5 self-end">
          <HeroStat
            label="Total Addressable Market"
            value="$1.46B"
            sub="↗  +5.4% CAGR"
            subClass="text-[var(--green)]"
            href={`/pdf-view?url=${encodeURIComponent("/reports/doggy-marketplace.pdf")}`}
            sourceLabel="doggy market research"
          />
          <HeroStat
            label="Tel Aviv Dog Density"
            value="1 in 3"
            sub="Tel Aviv Households"
            href="https://www.gov.il/he/pages/dog_names_2024"
            sourceLabel="Gov.IL '24"
          />
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value, sub, subClass = "text-[var(--ink-muted)]", href, sourceLabel }: { label: string; value: string; sub: string; subClass?: string; href: string; sourceLabel: string }) {
  return (
    <div className="bg-[var(--panel)]/60 border border-[var(--line)] p-6 group">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--ink-muted)] mb-3">{label}</div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 hover:text-[var(--orange)] transition-colors inline-flex items-baseline gap-2">
          {value}
          <span className="text-xs text-[var(--ink-dim)] group-hover:text-[var(--orange)]">↗</span>
        </div>
      </a>
      <div className={`font-mono text-[12px] ${subClass}`}>{sub}</div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--ink-dim)] hover:text-[var(--orange)] transition-colors">
        Source · {sourceLabel}
      </a>
    </div>
  );
}

/* ---------- section frame ---------- */

function SectionHeader({ num, label, title, subtitle, center = false }: { num: string; label: string; title: React.ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-6">
        {num} / {label}
      </div>
      <h2 className="text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-lg text-[var(--ink-muted)] leading-relaxed ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- 01 thesis: bar chart ---------- */

function ThesisSection() {
  const { ref, inView } = useInView<HTMLElement>(0.2);
  const data = [
    { year: 2011, v: 0.275 },
    { year: 2017, v: 0.76 },
    { year: 2023, v: 1.32 },
    { year: 2026, v: 1.46 },
  ];
  const [hover, setHover] = useState<number | null>(null);
  const max = 1.6;
  const VBW = 800;
  const VBH = 360;
  const padL = 56;
  const padR = 24;
  const padT = 30;
  const padB = 40;
  const plotW = VBW - padL - padR;
  const plotH = VBH - padT - padB;
  const bw = plotW / data.length * 0.6;
  const slot = plotW / data.length;
  const xAt = (i: number) => padL + slot * i + slot / 2 - bw / 2;
  const yAt = (v: number) => padT + (1 - v / max) * plotH;
  const yBase = padT + plotH;

  return (
    <section ref={ref} className="w-full px-6 md:px-10 py-32 md:py-44 border-t border-[var(--line-soft)]">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <SectionHeader
            num="01"
            label="THE THESIS"
            title={<>An Isolated <span className="text-[var(--ink-muted)]">Hyper-Market.</span></>}
            subtitle="The Israeli market is isolated by language (Hebrew RTL) and payment systems (NIS). This structural friction keeps global incumbents out, leaving a massive gap for a localized aggregator."
          />
          <div className="mt-10 grid grid-cols-2 border border-[var(--line)]">
            {([
              {
                v: "600K+",
                l: "Registered Dogs",
                sources: [
                  { href: "https://www.gov.il/he/pages/dog_names_2024", src: "Gov.IL '24" },
                  { href: "https://www.gov.il/BlobFolder/guide/dog_stats/he/dog_stats_2025.pdf", src: "Gov. Totals '25" },
                  { href: "https://p.ynet.co.il/dognames_en", src: "Ynet" },
                ],
              },
              { v: "#3", l: "Global Dog City (TLV)", sources: [{ href: "https://www.rustourismnews.com/2020/09/01/2020-best-cities-for-dogs-unveiled/?utm_source=chatgpt.com", src: "Rus Tourism" }] },
              { v: "$252", l: "Avg Monthly Spend", sources: [{ href: "#", src: "doggy marketplace value" }] },
              { v: "$40", l: "Per 30m Walker", sources: [] as { href: string; src: string }[] },
            ]).map((s, i) => {
              const primary = s.sources[0];
              return (
                <div key={s.l} className={`p-6 border-[var(--line)] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                  {primary ? (
                    <a href={primary.href} target="_blank" rel="noopener noreferrer" className="group block">
                      <div className="text-3xl md:text-4xl font-extrabold mb-2 group-hover:text-[var(--orange)] transition-colors inline-flex items-baseline gap-1.5">
                        {s.v}
                        <span className="text-[10px] text-[var(--ink-dim)] group-hover:text-[var(--orange)]">↗</span>
                      </div>
                    </a>
                  ) : (
                    <div className="text-3xl md:text-4xl font-extrabold mb-2">{s.v}</div>
                  )}
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-muted)]">{s.l}</div>
                  {s.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {s.sources.map((src) => (
                        <a
                          key={src.href}
                          href={src.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[var(--line)] bg-[var(--panel)]/40 font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--ink-dim)] hover:text-[var(--orange)] hover:border-[var(--orange)] transition-colors"
                        >
                          {src.src}
                          <span className="text-[8px]">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-[var(--panel)]/40 border border-[var(--line)] p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-mono text-sm font-bold mb-1">Market Growth Projection</div>
                <div className="font-mono text-[12px] text-[var(--ink-muted)]">Israeli Pet Sector (USD)</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-muted)]">Source</div>
                <div className="font-mono text-[12px] text-[var(--orange)]">doggy market research</div>
              </div>
            </div>

            <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full h-auto block">
              {/* y grid */}
              {[0, 0.4, 0.8, 1.2, 1.6].map((t) => (
                <g key={t}>
                  <line x1={padL} x2={VBW - padR} y1={yAt(t)} y2={yAt(t)} stroke="#1f2f57" strokeDasharray={t === 0 ? "0" : "2 4"} />
                  <text x={padL - 10} y={yAt(t) + 4} fontSize="10" textAnchor="end" fill="#56688a" fontFamily="JetBrains Mono">${t.toFixed(2)}B</text>
                </g>
              ))}
              {/* bars */}
              {data.map((d, i) => {
                const h = yBase - yAt(d.v);
                return (
                  <g
                    key={d.year}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect x={xAt(i)} y={padT} width={bw} height={plotH} fill="transparent" />
                    <rect
                      x={xAt(i)}
                      y={inView ? yAt(d.v) : yBase}
                      width={bw}
                      height={inView ? h : 0}
                      fill="#ff5a1f"
                      opacity={hover === null || hover === i ? 1 : 0.45}
                      style={{
                        transition: `y 900ms ${150 + i * 110}ms cubic-bezier(.22,.61,.36,1), height 900ms ${150 + i * 110}ms cubic-bezier(.22,.61,.36,1), opacity 200ms`,
                      }}
                    />
                    <text x={xAt(i) + bw / 2} y={yBase + 22} fontSize="11" textAnchor="middle" fill="#56688a" fontFamily="JetBrains Mono">{d.year}</text>
                  </g>
                );
              })}
              {/* tooltip */}
              {hover !== null && (
                <g style={{ pointerEvents: "none" }}>
                  <rect x={xAt(hover) - 30} y={yAt(data[hover].v) - 56} width="90" height="46" fill="#0a1226" stroke="#1f2f57" />
                  <text x={xAt(hover) + 15} y={yAt(data[hover].v) - 38} fontSize="11" textAnchor="middle" fill="#fff" fontFamily="JetBrains Mono" fontWeight="700">{data[hover].year}</text>
                  <text x={xAt(hover) + 15} y={yAt(data[hover].v) - 22} fontSize="11" textAnchor="middle" fill="#ff5a1f" fontFamily="JetBrains Mono">${data[hover].v.toFixed(2)}B</text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 02 the gap: table ---------- */

function GapSection() {
  const rows: {
    e: string;
    o: string;
    m: string;
    statuses: { text: string; danger?: boolean }[];
    danger?: boolean;
    us?: boolean;
  }[] = [
    { e: "Rover / Wag!", o: "USA", m: "20–40% Take", statuses: [{ text: "NOT IN ISRAEL", danger: true }], danger: true },
    { e: "Dogiz", o: "ISR", m: "Commission", statuses: [
      { text: "Not active", danger: true },
      { text: "No full marketplace app", danger: true },
    ] },
    { e: "PetBacker", o: "GLB", m: "~25% Take", statuses: [
      { text: "Not localized, thin supply" },
      { text: "No full marketplace app", danger: true },
    ] },
    { e: "Wooof", o: "ISR", m: "Free / Social", statuses: [
      { text: "No sign of active", danger: true },
      { text: "No full marketplace app", danger: true },
    ] },
    { e: "doggy", o: "ISR", m: "Subs tiers · 20% commission · ads · local shop collab", statuses: [{ text: "READY TO DEPLOY" }], us: true },
  ];
  return (
    <section className="w-full px-6 md:px-10 py-32 md:py-44 border-t border-[var(--line-soft)]">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          num="02"
          label="THE GAP"
          title={<>Almost No Competitors.</>}
        />
        {/* desktop table */}
        <div className="mt-14 border border-[var(--line)] hidden md:block">
          <div className="grid grid-cols-[1.4fr_0.6fr_1fr_1.6fr] font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--ink-muted)] border-b border-[var(--line)]">
            {["Entity", "Origin", "Model", "IL Status"].map((h) => (
              <div key={h} className="px-5 py-5">{h}</div>
            ))}
          </div>
          {rows.map((r) => (
            <div
              key={r.e}
              className={`grid grid-cols-[1.4fr_0.6fr_1fr_1.6fr] border-b last:border-b-0 border-[var(--line-soft)] ${r.us ? "bg-[var(--panel)]/80 border-l-4 border-l-[var(--orange)]" : ""}`}
            >
              <div className={`px-5 py-6 font-mono text-sm ${r.us ? "text-[var(--orange)] font-bold flex items-center gap-2" : ""}`}>
                {r.us && <span className="h-2 w-2 rounded-full bg-[var(--orange)] shrink-0" />}
                <span className="break-words">{r.e}</span>
              </div>
              <div className="px-5 py-6 font-mono text-sm text-[var(--ink-muted)]">{r.o}</div>
              <div className="px-5 py-6 font-mono text-sm text-[var(--ink-muted)]">{r.m}</div>
              <div className="px-5 py-6 font-mono text-sm flex flex-col gap-2">
                {r.statuses.map((st) => (
                  <div
                    key={st.text}
                    className={`flex items-start gap-2 leading-snug ${st.danger ? "text-[var(--red)] font-bold" : r.us ? "text-[var(--orange)] font-bold" : "text-[var(--ink-muted)]"}`}
                  >
                    {(st.danger || r.us) && <span className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${st.danger ? "bg-[var(--red)]" : "bg-[var(--orange)]"}`} />}
                    <span>{st.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* mobile cards */}
        <div className="mt-12 grid gap-4 md:hidden">
          {rows.map((r) => (
            <div
              key={r.e}
              className={`border border-[var(--line)] p-5 ${r.us ? "bg-[var(--panel)]/80 border-l-4 border-l-[var(--orange)]" : "bg-[var(--panel)]/30"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`font-mono text-sm flex items-center gap-2 ${r.us ? "text-[var(--orange)] font-bold" : "font-bold"}`}>
                  {r.us && <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />}
                  {r.e}
                </div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--ink-dim)]">{r.o}</div>
              </div>
              <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--ink-dim)] mb-1">Model</div>
              <div className="font-mono text-sm text-[var(--ink-muted)] mb-4">{r.m}</div>
              <div className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--ink-dim)] mb-2">IL Status</div>
              <div className="flex flex-col gap-2">
                {r.statuses.map((st) => (
                  <div
                    key={st.text}
                    className={`flex items-start gap-2 font-mono text-sm leading-snug ${st.danger ? "text-[var(--red)] font-bold" : r.us ? "text-[var(--orange)] font-bold" : "text-[var(--ink-muted)]"}`}
                  >
                    {(st.danger || r.us) && <span className={`h-2 w-2 mt-1.5 rounded-full shrink-0 ${st.danger ? "bg-[var(--red)]" : "bg-[var(--orange)]"}`} />}
                    <span>{st.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 03 the moat ---------- */

function MoatSection() {
  const cards = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
      ),
      title: "Hebrew-First Architecture",
      body: "RTL native UX. In-app chat-based walker communication. NIS payments. Global competitors fail by bolting Hebrew translation onto English-first codebases.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
      ),
      title: "Within 48 Hours of Walker Approved",
      body: "Walkers go from sign-up to active in under 48 hours. Fast vetting + automated onboarding means supply scales as fast as demand.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>
      ),
      title: "First Subscription Tier",
      body: "5-walk or 20-walk monthly plans. Guarantees walker income (killing off-platform leakage) and gives owners cost certainty (the Israeli 'mana' mindset).",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" /></svg>
      ),
      title: "Customer Chat Support 24/7",
      body: "Always-on in-app support for owners and walkers. Issues resolved fast, trust compounds, churn stays low.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h13l-3-3M21 18H8l3 3" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /></svg>
      ),
      title: "Advanced Disputes System",
      body: "Structured claim flow with evidence capture, mediator review, and automated refunds. Protects both sides and keeps the marketplace fair.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>
      ),
      title: "Real-Time Map Tracking",
      body: "Live GPS tracking during every walk. Owners watch the route in real time — peace of mind on tap. Available on the premium tier.",
    },
  ];
  return (
    <section className="w-full px-6 md:px-10 py-32 md:py-44 border-t border-[var(--line-soft)]">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader num="03" label="THE MOAT" title="Defensible from Day One." center />
        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((c) => (
            <div key={c.title} className="bg-[var(--panel)]/25 border border-[var(--line)] p-9 hover:border-[var(--orange)] transition-colors">
              <div className="grid place-items-center h-11 w-11 bg-[var(--orange)] text-white mb-8">
                {c.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{c.title}</h3>
              <p className="text-[var(--ink-muted)] leading-relaxed text-[15px]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 product readiness ---------- */

function PhoneFrame({
  src,
}: {
  src: string;
}) {
  return (
    <img
      src={src}
      alt="doggy app screen"
      className="block h-auto w-full max-w-[260px] mx-auto"
    />
  );
}

function ProductSection() {
  const screenshots = [
    appDashboard,
    appBookingDetail,
    appBookings,
  ];

  return (
    <section id="product-readiness" className="w-full px-6 md:px-10 py-32 md:py-44 border-t border-[var(--line-soft)]">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          num="04"
          label="PRODUCT READINESS"
          title="Built. Not Mocked."
          subtitle="A fully localized product ready to capture the Tel Aviv market immediately."
          center
        />
        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 items-end justify-items-center">
          {screenshots.map((src) => (
            <PhoneFrame key={src} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 the precedent ---------- */

function PrecedentSection() {
  const { ref, inView } = useInView<HTMLElement>(0.3);
  return (
    <section ref={ref} className="w-full px-6 md:px-10 py-32 md:py-44 border-t border-[var(--line-soft)]">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          num="05"
          label="THE PRECEDENT"
          title="The Model is Proven."
          subtitle="We are executing the regional playbook before the global giants arrive."
          center
        />
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {[
            { tag: "INCUMBENT 01", v: 235, label: "Rover Annual Revenue", href: "https://investors.rover.com/financials/sec-filings", src: "Rover 10-K (SEC)" },
            { tag: "INCUMBENT 02", v: 84, label: "Wag! Annual Revenue", href: "https://rocketreach.co/wag-group-co-profile_b58c2248f6ecdb6e", src: "RocketReach" },
          ].map((c) => (
            <div key={c.tag} className="bg-[var(--panel)]/50 border border-[var(--line)] p-10 md:p-14 relative group">
              <div className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.2em] text-[var(--ink-muted)]">{c.tag}</div>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="block">
                <div className="text-[clamp(3rem,8vw,6rem)] font-extrabold tracking-tight leading-none my-6 group-hover:text-[var(--orange)] transition-colors inline-flex items-baseline gap-3">
                  $<AnimatedNumber start={inView} target={c.v} />M
                  <span className="text-base text-[var(--ink-dim)] group-hover:text-[var(--orange)]">↗</span>
                </div>
              </a>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--ink-muted)]">{c.label}</div>
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--ink-dim)] hover:text-[var(--orange)] transition-colors">
                Source · {c.src}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA + footer ---------- */

function CTASection() {
  return (
    <section id="cta" className="w-full px-6 md:px-10 py-32 md:py-40 border-t border-[var(--line-soft)]">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-mono text-[12px] tracking-[0.2em] text-[var(--orange)] mb-8">SEED ROUND · OPEN</div>
        <h2 className="text-[clamp(2.2rem,5.5vw,4.6rem)] font-extrabold leading-[1.05] tracking-tight mb-10">
          630,000 dogs. <span className="text-[var(--ink-muted)]">Zero competition.</span> One window.
        </h2>
        <p className="text-lg text-[var(--ink-muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
          Own the market before the US giants arrive. We are accepting expressions of interest for the Seed round.
        </p>
        <Link to="/contact-funder" className="inline-flex items-center gap-3 bg-[var(--orange)] text-white px-10 py-5 font-mono text-[12px] tracking-[0.2em] uppercase font-bold hover:bg-[var(--orange-soft)] transition-colors">
          Contact Founder <span>→</span>
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t border-[var(--line)] py-10 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--ink-dim)]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="doggy" className="h-7 w-7" />
          <span>© doggy · Tel Aviv · 2026</span>
        </div>
        <a href="mailto:investdoggy@atomicmail.io" className="hover:text-[var(--orange)] transition-colors">
          investdoggy@atomicmail.io
        </a>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <TopNav />
      <Hero />

      <ThesisSection />
      <GapSection />
      <MoatSection />
      <ProductSection />
      <PrecedentSection />
      <CTASection />
      <Footer />
    </div>
  );
}
