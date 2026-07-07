import { useState, useEffect, useRef } from "react";

// ============================================================
// SALT LABS — by Revive Supplements
// Full React build from the Salt Labs mockup.
// ============================================================

// ── RESEARCH CITATIONS ──
const REFS = {
  sodiumCitrate: "https://pubmed.ncbi.nlm.nih.gov/29324186/",
  potassiumCitrate: "https://pubmed.ncbi.nlm.nih.gov/2723122/",
  calciumCitrate: "https://pubmed.ncbi.nlm.nih.gov/24772062/",
  dextrose: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2653028/",
  sodiumChloride: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2657026/",
  magnesiumChloride: "https://pubmed.ncbi.nlm.nih.gov/16765926/",
  oralRehydration: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2653028/",
  sweatSodium: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5371639/",
  multiCarb: "https://pubmed.ncbi.nlm.nih.gov/18202575/",
};

// ── HOOKS ──
function useInView(threshold = 0.08) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function scrollTo(href) {
  if (!href || !href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── REVEAL WRAPPER (matches data-reveal behaviour from mockup) ──
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(28px)",
      transition: `opacity .75s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .75s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── HOVER WRAPPER (matches style-hover pattern from mockup) ──
function Hoverable({ children, hoverStyle, style = {}, as = "div", ...rest }) {
  const [hov, setHov] = useState(false);
  const Tag = as;
  return (
    <Tag
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...style, ...(hov ? hoverStyle : {}) }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ── ILLUSTRATION: STICK PACK ──
function StickPack({ accent = "#1c4dff", seal = "#0b34c9", ink = "#ffffff", variant = "CORE", sub = "SUGAR-FREE", flavor = "CITRUS SALT", width = 94, height = 326 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 94 326" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.18))" }}>
      <rect x="3" y="26" width="88" height="288" rx="14" fill={accent} stroke="#0b0b0d" strokeWidth="2.5" />
      <rect x="3" y="26" width="88" height="22" rx="10" fill={seal} stroke="#0b0b0d" strokeWidth="2.5" />
      <path d="M3 20 L13 30 L23 20 L33 30 L43 20 L53 30 L63 20 L73 30 L83 20 L91 28" stroke="#0b0b0d" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="288" width="88" height="26" rx="10" fill={seal} stroke="#0b0b0d" strokeWidth="2.5" />
      <text x="47" y="70" textAnchor="middle" fill={ink} fontFamily="'IBM Plex Mono',monospace" fontSize="7" letterSpacing="1.5" opacity="0.85">SALT LABS</text>
      <text x="47" y="150" textAnchor="middle" fill={ink} fontFamily="Archivo,sans-serif" fontWeight="900" fontSize="26" letterSpacing="-0.5">
        {variant.split(" ").map((word, i) => (
          <tspan key={i} x="47" dy={i === 0 ? 0 : 30}>{word}</tspan>
        ))}
      </text>
      <rect x="12" y="185" width="70" height="20" rx="10" stroke={ink} strokeWidth="1.3" fill="none" opacity="0.9" />
      <text x="47" y="198" textAnchor="middle" fill={ink} fontFamily="'IBM Plex Mono',monospace" fontSize="7.5" letterSpacing="1">{sub}</text>
      <text x="47" y="270" textAnchor="middle" fill={ink} fontFamily="'IBM Plex Mono',monospace" fontSize="7.5" letterSpacing="1.2" opacity="0.9">{flavor}</text>
    </svg>
  );
}

// ── ILLUSTRATION: CARTON ──
function Carton({ accent = "#1c4dff", seal = "#0b34c9", top = "#3f6bff", ink = "#ffffff", variant = "CORE", sub = "SUGAR-FREE", flavor = "CITRUS SALT · 30 SERVINGS", count = "30 STICK PACKS", width = 230, height = 326 }) {
  return (
    <svg width={width} height={height} viewBox="0 0 230 326" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.2))" }}>
      <rect x="3" y="3" width="224" height="320" rx="14" fill={accent} stroke="#0b0b0d" strokeWidth="2.5" />
      <path d="M3 60 L227 60" stroke="#0b0b0d" strokeWidth="2.5" />
      <rect x="3" y="3" width="224" height="57" rx="14" fill={top} />
      <rect x="3" y="45" width="224" height="15" fill={top} />
      <text x="20" y="35" fill={ink} fontFamily="Archivo,sans-serif" fontWeight="900" fontSize="16" letterSpacing="-0.3">SALT&#160;LABS<tspan fill={seal} fontSize="10">®</tspan></text>
      <text x="115" y="145" textAnchor="middle" fill={ink} fontFamily="Archivo,sans-serif" fontWeight="900" fontSize="46" letterSpacing="-1">{variant}</text>
      <rect x="55" y="168" width="120" height="26" rx="13" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.9" />
      <text x="115" y="185" textAnchor="middle" fill={ink} fontFamily="'IBM Plex Mono',monospace" fontSize="9.5" letterSpacing="1.2">{sub}</text>
      <line x1="30" y1="225" x2="200" y2="225" stroke={ink} strokeWidth="1" opacity="0.25" />
      <text x="115" y="255" textAnchor="middle" fill={ink} fontFamily="'IBM Plex Mono',monospace" fontSize="10" letterSpacing="0.8" opacity="0.95">{flavor}</text>
      <text x="115" y="278" textAnchor="middle" fill={ink} fontFamily="'IBM Plex Mono',monospace" fontSize="9" letterSpacing="1" opacity="0.7">{count}</text>
      <rect x="3" y="300" width="224" height="23" rx="0" fill="#0b0b0d" opacity="0.08" />
    </svg>
  );
}

// ── LINKED INGREDIENT NAME (research citation) ──
function IngredientTitle({ name, paper }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={paper}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title="Read the research"
      style={{
        fontWeight: 800, fontSize: 18, letterSpacing: "-0.01em", marginBottom: 8,
        color: hov ? "var(--yellow)" : "var(--paper)",
        textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: 8,
        borderBottom: `1px dashed ${hov ? "var(--yellow)" : "rgba(251,246,236,0.35)"}`,
        paddingBottom: 2,
        transition: "color .2s, border-color .2s",
        cursor: "pointer",
      }}
    >
      {name}
      <span style={{
        fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, fontWeight: 600, letterSpacing: "0.08em",
        color: hov ? "var(--yellow)" : "rgba(251,246,236,0.5)",
        background: hov ? "rgba(255,207,0,0.12)" : "rgba(251,246,236,0.06)",
        border: `1px solid ${hov ? "var(--yellow)" : "rgba(251,246,236,0.2)"}`,
        padding: "2px 6px", transition: "all .2s", whiteSpace: "nowrap",
      }}>STUDY ↗</span>
    </a>
  );
}

// ── NAV ──
function Nav() {
  const links = [
    { label: "Science", href: "#thesis" },
    { label: "Formula", href: "#formula" },
    { label: "Products", href: "#products" },
    { label: "Story", href: "#story" },
  ];
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "var(--yellow)", borderBottom: "3px solid var(--ink)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 34px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo("#top"); }} style={{ display: "flex", alignItems: "baseline", gap: 9, textDecoration: "none", color: "var(--ink)" }}>
          <span style={{ fontWeight: 900, fontSize: 21, letterSpacing: "-0.03em" }}>SALT&nbsp;LABS</span>
          <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--pink)", transform: "translateY(-7px)" }}>®</span>
        </a>
        <nav style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {links.map(l => (
            <Hoverable key={l.href} as="a" href={l.href}
              onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
              style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", textDecoration: "none", padding: "4px 0", borderBottom: "2px solid transparent", transition: "border-color .25s ease" }}
              hoverStyle={{ borderColor: "var(--ink)" }}
            >{l.label}</Hoverable>
          ))}
        </nav>
        <Hoverable as="a" href="#products" onClick={(e) => { e.preventDefault(); scrollTo("#products"); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--ink)", color: "var(--yellow)", textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", padding: "12px 20px", borderRadius: 100, transition: "transform .25s cubic-bezier(.2,.8,.2,1),background .25s ease,color .25s ease" }}
          hoverStyle={{ background: "var(--pink)", color: "#fff", transform: "translateY(-2px)" }}
        >Get Salt Labs <span style={{ fontSize: 13 }}>→</span></Hoverable>
      </div>
    </header>
  );
}

// ── HERO ──
function Hero() {
  return (
    <section id="top" style={{ background: "var(--blue)", color: "#fff", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: -140, right: -120, width: 420, height: 420, borderRadius: "50%", background: "var(--pink)", opacity: 0.9, animation: "sl-float 7s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: -160, left: "34%", width: 300, height: 300, borderRadius: "50%", background: "var(--green)", opacity: 0.85, animation: "sl-float 9s ease-in-out infinite" }} />
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "34px 34px 0", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 40, alignItems: "stretch" }}>
          <div style={{ padding: "34px 0 46px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 580 }}>
            <Reveal style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>
              <span style={{ width: 9, height: 9, background: "var(--yellow)", borderRadius: "50%", animation: "sl-pulse 2.2s ease-in-out infinite", flexShrink: 0 }} />
              Revive Supplements — Est. 2026
              <span style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.35)", maxWidth: 120 }} />
              Formulated, not flavored
            </Reveal>

            <div>
              <Reveal delay={100}>
                <h1 style={{ fontWeight: 900, fontSize: "clamp(66px,9.6vw,150px)", lineHeight: 0.82, letterSpacing: "-0.04em", margin: "26px 0 0", textTransform: "uppercase" }}>
                  Run<br/>on<br/><span style={{ color: "var(--yellow)", WebkitTextStroke: "3px var(--ink)" }}>salt.</span>
                </h1>
              </Reveal>
            </div>

            <div style={{ maxWidth: 540 }}>
              <Reveal delay={150}>
                <p style={{ fontFamily: "Spectral,serif", fontSize: "clamp(17px,1.7vw,21px)", lineHeight: 1.5, margin: "0 0 26px", color: "rgba(255,255,255,0.92)" }}>
                  Your body runs on a saline circuit. <em>Salt Labs</em> is precision electrolyte fuel — engineered to the milligram from the peer-reviewed science of fluid absorption. Sugar-free for daily life. Carb-charged for the edge.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                  <Hoverable as="a" href="#formula" onClick={(e) => { e.preventDefault(); scrollTo("#formula"); }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--yellow)", color: "var(--ink)", textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 26px", borderRadius: 100, transition: "transform .25s cubic-bezier(.2,.8,.2,1),background .25s ease" }}
                    hoverStyle={{ background: "var(--pink)", color: "#fff", transform: "translateY(-2px)" }}
                  >See the formula →</Hoverable>
                  <Hoverable as="a" href="#story" onClick={(e) => { e.preventDefault(); scrollTo("#story"); }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "transparent", color: "#fff", textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 26px", borderRadius: 100, border: "2px solid rgba(255,255,255,0.65)", transition: "border-color .25s ease,background .25s ease" }}
                    hoverStyle={{ borderColor: "#fff", background: "rgba(255,255,255,0.12)" }}
                  >Our thesis</Hoverable>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={200} style={{ border: "3px solid var(--ink)", borderRadius: 8, background: "#fff", color: "var(--ink)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "14px 14px 0 var(--ink)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mut)", borderBottom: "2px solid var(--ink)" }}>
              <span>Specimen 001</span><span>Isotonic · pH 7.2</span>
            </div>
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "34px 30px 24px", backgroundImage: "repeating-linear-gradient(135deg,transparent 0 13px,rgba(28,77,255,.07) 13px 14px)" }}>
              <StickPack accent="#1c4dff" seal="#0b34c9" ink="#ffffff" variant="CORE" sub="SUGAR-FREE" flavor="CITRUS SALT" width={94} height={326} />
              <div style={{ position: "absolute", left: 16, bottom: 14, fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: "0.1em", color: "var(--mut)" }}>SALT LABS CORE · SINGLE-SERVE STICK</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderTop: "2px solid var(--ink)" }}>
              <div style={{ padding: "14px 12px", borderRight: "2px solid var(--ink)" }}><div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: "0.14em", color: "var(--mut)" }}>SODIUM</div><div style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em" }}>800<span style={{ fontSize: 11, fontWeight: 500, color: "var(--mut)" }}>mg</span></div></div>
              <div style={{ padding: "14px 12px", borderRight: "2px solid var(--ink)" }}><div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: "0.14em", color: "var(--mut)" }}>POTASSIUM</div><div style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em" }}>200<span style={{ fontSize: 11, fontWeight: 500, color: "var(--mut)" }}>mg</span></div></div>
              <div style={{ padding: "14px 12px" }}><div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 9, letterSpacing: "0.14em", color: "var(--mut)" }}>MAGNESIUM</div><div style={{ fontWeight: 800, fontSize: 19, letterSpacing: "-0.02em" }}>60<span style={{ fontSize: 11, fontWeight: 500, color: "var(--mut)" }}>mg</span></div></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── MARQUEE ──
function Marquee() {
  const items = ["Sodium-glucose cotransport", "Zero fillers", "Peer-reviewed dosing", "Two engines, one science", "Made for the collapse point"];
  const colors = ["var(--pink)", "var(--green)", "var(--orange)", "var(--pink)", "var(--green)"];
  return (
    <div style={{ background: "var(--ink)", padding: "18px 0", overflow: "hidden", whiteSpace: "nowrap", borderTop: "3px solid var(--ink)", borderBottom: "3px solid var(--ink)" }}>
      <div style={{ display: "inline-block", animation: "sl-marquee 30s linear infinite", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--yellow)" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i}>
            <span style={{ padding: "0 22px" }}>{item}</span>
            <span style={{ color: colors[i % colors.length] }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── THESIS ──
function Thesis() {
  const stats = [
    { bg: "var(--ink)", color: "var(--yellow)", big: "2×", text: "Faster fluid uptake vs. water when sodium is present", textColor: "rgba(255,255,255,0.8)" },
    { bg: "var(--pink)", color: "#fff", big: "0", unit: "g", text: "Added sugar in the daily formula. Nothing you don't need", textColor: "rgba(255,255,255,0.85)" },
    { bg: "var(--green)", color: "var(--ink)", big: "7", text: "Active ingredients. Every one earns its place", textColor: "rgba(11,11,13,0.7)" },
  ];
  return (
    <section id="thesis" style={{ background: "var(--yellow)", color: "var(--ink)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "96px 34px" }}>
        <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 56, alignItems: "start" }}>
          <Reveal>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 18 }}>01 — The thesis</div>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(34px,4.2vw,62px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0, textTransform: "uppercase" }}>Water alone doesn't hydrate.</h2>
          </Reveal>
          <Reveal delay={100} style={{ paddingTop: 8 }}>
            <p style={{ fontFamily: "Spectral,serif", fontSize: "clamp(18px,1.9vw,23px)", lineHeight: 1.5, margin: "0 0 34px", color: "rgba(11,11,13,0.82)" }}>
              Drink plain water when you're depleted and most of it passes straight through. Absorption is a chemical handshake — sodium and glucose pulling water across the gut wall together. Get the ratio wrong and you stay thirsty. Get it right and you rehydrate faster than water ever could.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {stats.map((s, i) => (
                <Hoverable key={i} style={{ background: s.bg, color: s.color, padding: "24px 20px", borderRadius: 6, transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }} hoverStyle={{ transform: "translateY(-6px)" }}>
                  <div style={{ fontWeight: 900, fontSize: 44, letterSpacing: "-0.03em" }}>{s.big}{s.unit && <span style={{ fontSize: 22 }}>{s.unit}</span>}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, lineHeight: 1.5, color: s.textColor, marginTop: 8 }}>{s.text}</div>
                </Hoverable>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── FORMULA ──
function Formula() {
  const core = {
    label: "Salt Labs Core", tag: "Sugar-Free", color: "var(--blue)",
    ingredients: [
      { name: "Sodium Citrate", paper: REFS.sodiumCitrate, desc: "The primary electrolyte lost through sweat. Pharmaceutical-grade sodium — better tolerated than table salt, gentler on the gut, and superior at maintaining blood plasma volume and driving fluid absorption at the cellular level." },
      { name: "Potassium Citrate", paper: REFS.potassiumCitrate, desc: "Works in concert with sodium to regulate the body's fluid balance. The citrate form offers higher bioavailability and alkalising properties — buffering exercise-induced acidity while preventing muscle cramps." },
      { name: "Calcium Citrate", paper: REFS.calciumCitrate, desc: "Critical for muscle contraction, nerve signalling, and bone integrity. Absorbed significantly better than cheaper carbonate forms — regardless of whether you've eaten or not." },
    ]
  };
  const drive = {
    label: "Salt Labs Drive", tag: "Carb-Charged", color: "var(--orange)",
    ingredients: [
      { name: "Dextrose (glucose)", paper: REFS.dextrose, desc: "Activates the SGLT1 sodium-glucose co-transporter in your gut — the fastest known mechanism for simultaneous electrolyte and water absorption. Not sugar for taste. Sugar for science." },
      { name: "Sodium Chloride & Sodium Citrate", paper: REFS.sodiumChloride, desc: "A dual sodium strategy. NaCl provides rapid ionic replenishment and triggers the thirst response. Sodium Citrate adds alkalising buffering capacity to offset lactic acid build-up during hard output." },
      { name: "Magnesium Chloride", paper: REFS.magnesiumChloride, desc: "Highest bioavailability of any magnesium salt. MgCl₂ is absorbed rapidly and completely — supporting ATP energy production, muscle relaxation post-contraction, and nervous system recovery." },
    ]
  };
  const FormulaCard = ({ data }) => (
    <Hoverable style={{ display: "flex", flexDirection: "column", transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }} hoverStyle={{ transform: "translateY(-6px)" }}>
      <div style={{ background: data.color, color: "#fff", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: "8px 8px 0 0" }}>
        <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em", textTransform: "uppercase" }}>{data.label}</span>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.5)", padding: "5px 9px", borderRadius: 100 }}>{data.tag}</span>
      </div>
      <div style={{ border: `2px solid ${data.color}`, borderTop: 0, borderRadius: "0 0 8px 8px", flex: 1 }}>
        {data.ingredients.map((ing, i) => (
          <div key={i} style={{ padding: 24, borderBottom: i < data.ingredients.length - 1 ? "1px solid rgba(251,246,236,0.12)" : "none" }}>
            <div><IngredientTitle name={ing.name} paper={ing.paper} /></div>
            <p style={{ color: "rgba(251,246,236,0.7)", fontSize: 14, lineHeight: 1.55, margin: "8px 0 0" }}>{ing.desc}</p>
          </div>
        ))}
      </div>
    </Hoverable>
  );
  return (
    <section id="formula" style={{ background: "var(--ink)", color: "var(--paper)", padding: "96px 0" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 34px" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 52 }}>
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 16 }}>02 — What's inside &amp; why</div>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(34px,4.6vw,68px)", lineHeight: 0.94, letterSpacing: "-0.035em", margin: 0, textTransform: "uppercase" }}>What's inside,<br/>and why.</h2>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.1em", color: "rgba(251,246,236,0.55)", maxWidth: 280, lineHeight: 1.7 }}>TWO FORMULAS · ONE STANDARD<br/>PHARMA-GRADE · FULLY DISCLOSED</div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <FormulaCard data={core} />
            <FormulaCard data={drive} />
          </div>
        </Reveal>
        <Reveal delay={180} style={{ marginTop: 26, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.06em", color: "rgba(251,246,236,0.45)", lineHeight: 1.7 }}>
          NO ARTIFICIAL COLORS · NO MALTODEXTRIN FILLER · NO PROPRIETARY BLENDS — EVERY INGREDIENT ON THE LABEL, IN THE OPEN.
        </Reveal>
      </div>
    </section>
  );
}

// ── PRODUCTS (Two Engines) ──
function Products() {
  return (
    <section id="products" style={{ background: "var(--paper)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "96px 34px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>03 — Two engines</div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(34px,4.6vw,68px)", lineHeight: 0.94, letterSpacing: "-0.035em", margin: 0, textTransform: "uppercase" }}>Same science.<br/>Two states of tune.</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal delay={100} style={{ border: "3px solid var(--ink)", borderRadius: 10, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "10px 10px 0 var(--blue)", transition: "transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease" }}>
            <div style={{ padding: "18px 22px", borderBottom: "2px solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mut)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 9, height: 9, background: "var(--blue)", borderRadius: "50%" }} />Daily driver</span><span>Sugar-free</span>
            </div>
            <div style={{ padding: "30px 26px 24px", backgroundImage: "repeating-linear-gradient(135deg,transparent 0 13px,rgba(28,77,255,.06) 13px 14px)", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
              <StickPack accent="#1c4dff" seal="#0b34c9" ink="#ffffff" variant="CORE" sub="SUGAR-FREE" flavor="CITRUS SALT" width={94} height={280} />
            </div>
            <div style={{ padding: "26px 26px 30px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontWeight: 900, fontSize: 28, letterSpacing: "-0.02em", margin: "0 0 8px", textTransform: "uppercase", color: "var(--ink)" }}>Salt Labs Core</h3>
              <p style={{ fontFamily: "Spectral,serif", fontSize: 16, lineHeight: 1.5, color: "rgba(11,11,13,0.75)", margin: "0 0 22px" }}>Hypotonic, zero-sugar hydration for the other 23 hours. Desk, heat, travel, the morning after — the baseline your body should never dip below.</p>
              <div style={{ display: "flex", gap: 22, marginBottom: 24, fontFamily: "'IBM Plex Mono',monospace" }}>
                <div><div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mut)" }}>SUGAR</div><div style={{ fontWeight: 900, fontFamily: "Archivo", fontSize: 22, color: "var(--ink)" }}>0g</div></div>
                <div><div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mut)" }}>SODIUM</div><div style={{ fontWeight: 900, fontFamily: "Archivo", fontSize: 22, color: "var(--ink)" }}>800mg</div></div>
                <div><div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mut)" }}>CALORIES</div><div style={{ fontWeight: 900, fontFamily: "Archivo", fontSize: 22, color: "var(--ink)" }}>10</div></div>
              </div>
              <Hoverable as="a" href="#" style={{ marginTop: "auto", textAlign: "center", background: "var(--blue)", color: "#fff", textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: 16, borderRadius: 100, transition: "background .25s ease" }} hoverStyle={{ background: "var(--ink)" }}>Shop Core</Hoverable>
            </div>
          </Reveal>

          <Reveal delay={200} style={{ border: "3px solid var(--ink)", borderRadius: 10, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column", boxShadow: "10px 10px 0 var(--orange)", transition: "transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s ease" }}>
            <div style={{ padding: "18px 22px", borderBottom: "2px solid var(--ink)", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mut)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 9, height: 9, background: "var(--orange)", borderRadius: "50%" }} />Full throttle</span><span>Carb-charged</span>
            </div>
            <div style={{ padding: "30px 26px 24px", backgroundImage: "repeating-linear-gradient(135deg,transparent 0 13px,rgba(255,77,23,.07) 13px 14px)", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
              <StickPack accent="#ff4d17" seal="#c9330a" ink="#ffffff" variant="DRIVE" sub="+CARB FUEL" flavor="BLOOD ORANGE" width={94} height={280} />
            </div>
            <div style={{ padding: "26px 26px 30px", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontWeight: 900, fontSize: 28, letterSpacing: "-0.02em", margin: "0 0 8px", textTransform: "uppercase", color: "var(--ink)" }}>Salt Labs Drive</h3>
              <p style={{ fontFamily: "Spectral,serif", fontSize: 16, lineHeight: 1.5, color: "rgba(11,11,13,0.75)", margin: "0 0 22px" }}>Isotonic, dual-carbohydrate fuel dosed to real athlete demand. Long efforts, deep heat, race day — when fluid and glycogen have to arrive together.</p>
              <div style={{ display: "flex", gap: 22, marginBottom: 24, fontFamily: "'IBM Plex Mono',monospace" }}>
                <div><div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mut)" }}>CARBS</div><div style={{ fontWeight: 900, fontFamily: "Archivo", fontSize: 22, color: "var(--ink)" }}>25g</div></div>
                <div><div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mut)" }}>SODIUM</div><div style={{ fontWeight: 900, fontFamily: "Archivo", fontSize: 22, color: "var(--ink)" }}>500mg</div></div>
                <div><div style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--mut)" }}>CALORIES</div><div style={{ fontWeight: 900, fontFamily: "Archivo", fontSize: 22, color: "var(--ink)" }}>100</div></div>
              </div>
              <Hoverable as="a" href="#" style={{ marginTop: "auto", textAlign: "center", background: "var(--orange)", color: "#fff", textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: 16, borderRadius: 100, transition: "background .25s ease" }} hoverStyle={{ background: "var(--ink)" }}>Shop Drive</Hoverable>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── PACKAGING SHOWCASE ──
function Packaging() {
  return (
    <section id="packaging" style={{ background: "var(--green)" }}>
      <Reveal style={{ maxWidth: 1360, margin: "0 auto", padding: "96px 34px 46px" }}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.7, marginBottom: 16 }}>04 — The drop</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(34px,4.6vw,68px)", lineHeight: 0.94, letterSpacing: "-0.035em", margin: 0, textTransform: "uppercase", maxWidth: 820, color: "var(--ink)" }}>Single-serve sticks.<br/>Thirty to a box.</h2>
      </Reveal>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 34px 96px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Reveal delay={100}>
          <Hoverable style={{ background: "var(--blue)", color: "#fff", border: "3px solid var(--ink)", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "12px 12px 0 var(--ink)", transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }} hoverStyle={{ transform: "translateY(-6px)" }}>
            <div style={{ padding: "34px 34px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                <div style={{ fontWeight: 900, fontSize: "clamp(34px,4vw,50px)", letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 0.9 }}>Core</div>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.16em", border: "1px solid rgba(255,255,255,0.55)", padding: "6px 11px", borderRadius: 100, whiteSpace: "nowrap" }}>SUGAR-FREE</span>
              </div>
              <p style={{ fontFamily: "Spectral,serif", fontSize: 17, lineHeight: 1.5, margin: "16px 0 0", color: "rgba(255,255,255,0.94)", maxWidth: 420 }}>Zero-sugar daily hydration. Tear, pour, go — a full electrolyte load in one 8.2g stick, thirty to the carton.</p>
            </div>
            <div style={{ background: "var(--paper)", flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 14, padding: "44px 24px 0", minHeight: 340 }}>
              <Carton accent="#1c4dff" seal="#0b34c9" top="#3f6bff" ink="#ffffff" variant="CORE" sub="SUGAR-FREE" flavor="CITRUS SALT · 30 SERVINGS" count="30 STICK PACKS" width={230} height={300} />
              <StickPack accent="#1c4dff" seal="#0b34c9" ink="#ffffff" variant="CORE" sub="SUGAR-FREE" flavor="CITRUS SALT" width={80} height={280} />
            </div>
          </Hoverable>
        </Reveal>
        <Reveal delay={200}>
          <Hoverable style={{ background: "var(--orange)", color: "#fff", border: "3px solid var(--ink)", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "12px 12px 0 var(--ink)", transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }} hoverStyle={{ transform: "translateY(-6px)" }}>
            <div style={{ padding: "34px 34px 26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                <div style={{ fontWeight: 900, fontSize: "clamp(34px,4vw,50px)", letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 0.9 }}>Drive</div>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.16em", border: "1px solid rgba(255,255,255,0.55)", padding: "6px 11px", borderRadius: 100, whiteSpace: "nowrap" }}>CARB-CHARGED</span>
              </div>
              <p style={{ fontFamily: "Spectral,serif", fontSize: 17, lineHeight: 1.5, margin: "16px 0 0", color: "rgba(255,255,255,0.94)", maxWidth: 420 }}>Dual-carbohydrate fuel for the hard efforts. Fluid, minerals and glycogen in one stick — thirty to the carton.</p>
            </div>
            <div style={{ background: "var(--paper)", flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 14, padding: "44px 24px 0", minHeight: 340 }}>
              <Carton accent="#ff4d17" seal="#c9330a" top="#ff6f42" ink="#ffffff" variant="DRIVE" sub="+CARB FUEL" flavor="BLOOD ORANGE · 30 SERVINGS" count="30 STICK PACKS" width={230} height={300} />
              <StickPack accent="#ff4d17" seal="#c9330a" ink="#ffffff" variant="DRIVE" sub="+CARB FUEL" flavor="BLOOD ORANGE" width={80} height={280} />
            </div>
          </Hoverable>
        </Reveal>
      </div>
    </section>
  );
}

// ── EVIDENCE ──
function Evidence() {
  const refs = [
    { tag: "REF 01 — Oral rehydration therapy", text: "Sodium-glucose cotransport as the mechanism behind ORS fluid absorption.", url: REFS.oralRehydration },
    { tag: "REF 02 — Sweat sodium concentration", text: "Individual sweat losses ranging 300–2000mg/L inform the sodium-forward dose.", url: REFS.sweatSodium },
    { tag: "REF 03 — Multiple-transportable carbs", text: "Glucose + fructose raise oxidation and uptake beyond glucose alone in the Drive formula.", url: REFS.multiCarb },
  ];
  return (
    <section style={{ background: "var(--pink)", color: "#fff" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "96px 34px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 56, alignItems: "center" }}>
          <Reveal>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 16 }}>05 — The evidence</div>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(32px,4vw,58px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 22px", textTransform: "uppercase" }}>Built on the literature, not the hype.</h2>
            <p style={{ fontFamily: "Spectral,serif", fontSize: 19, lineHeight: 1.55, color: "rgba(255,255,255,0.92)", margin: 0 }}>We didn't reverse-engineer a competitor. We read the field — decades of work on oral rehydration, sweat sodium losses and carbohydrate co-ingestion — and dosed to what the studies actually support. Then we put every number on the label.</p>
          </Reveal>
          <Reveal delay={120} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {refs.map((r, i) => (
              <Hoverable key={i} as="a" href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ background: "#fff", color: "var(--ink)", padding: "22px 24px", borderRadius: 8, transition: "transform .3s cubic-bezier(.2,.8,.2,1)", textDecoration: "none", display: "block", cursor: "pointer" }}
                hoverStyle={{ transform: "translateX(8px)" }}
              >
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: "var(--pink)", letterSpacing: "0.06em" }}>{r.tag}</div>
                <div style={{ fontSize: 16, lineHeight: 1.5, marginTop: 6 }}>{r.text}</div>
              </Hoverable>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── BUILT FOR ──
function BuiltFor() {
  const audiences = [
    { n: "01", bg: "var(--blue)", color: "#fff", numColor: "var(--yellow)", title: "Endurance athletes", text: "Marathon, triathlon, the long ride. Fluid and fuel dosed for hours, not minutes.", textColor: "rgba(255,255,255,0.85)" },
    { n: "02", bg: "var(--orange)", color: "#fff", numColor: "var(--yellow)", title: "Gym & everyday", text: "Lifting, classes, the daily grind. Baseline minerals so you never train depleted.", textColor: "rgba(255,255,255,0.85)" },
    { n: "03", bg: "var(--green)", color: "var(--ink)", numColor: "rgba(11,11,13,0.6)", title: "Health & longevity", text: "Clean minerals without the sugar tax. Hydration as a daily habit, not a treat.", textColor: "rgba(11,11,13,0.7)" },
    { n: "04", bg: "var(--yellow)", color: "var(--ink)", numColor: "var(--pink)", title: "Heat & trade work", text: "Outdoor shifts, high sweat rates. Replace what the heat pulls out of you, fast.", textColor: "rgba(11,11,13,0.7)" },
  ];
  return (
    <section style={{ background: "var(--paper)" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "96px 34px" }}>
        <Reveal>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: 16 }}>06 — Built for</div>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(32px,4vw,58px)", lineHeight: 0.98, letterSpacing: "-0.035em", margin: "0 0 44px", textTransform: "uppercase", maxWidth: 760 }}>Anyone whose body is under load.</h2>
        </Reveal>
        <Reveal delay={100} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {audiences.map((a, i) => (
            <Hoverable key={i} style={{ background: a.bg, color: a.color, padding: "28px 22px", minHeight: 210, display: "flex", flexDirection: "column", borderRadius: 8, transition: "transform .3s cubic-bezier(.2,.8,.2,1)" }} hoverStyle={{ transform: "translateY(-6px)" }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: a.numColor }}>{a.n}</div>
              <h3 style={{ fontWeight: 900, fontSize: 21, letterSpacing: "-0.01em", margin: "16px 0 10px", textTransform: "uppercase" }}>{a.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: a.textColor, margin: 0 }}>{a.text}</p>
            </Hoverable>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ── STORY / MANIFESTO ──
function Story() {
  return (
    <section id="story" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "110px 34px", textAlign: "center" }}>
        <Reveal>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 34 }}>07 — The story</div>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontFamily: "Spectral,serif", fontWeight: 300, fontSize: "clamp(24px,3.3vw,42px)", lineHeight: 1.32, letterSpacing: "-0.01em", margin: "0 0 30px" }}>
            We started Revive because the hydration aisle was <em style={{ fontStyle: "italic", color: "var(--yellow)" }}>loud on marketing and quiet on evidence.</em> Salt Labs is our answer — a formula pulled from the literature, dosed in the open, and built for the moment your body starts to fail.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,246,236,0.55)" }}>— Revive Supplements, Est. 2026</div>
        </Reveal>
      </div>
    </section>
  );
}

// ── CTA WORDMARK ──
function CTAWordmark() {
  return (
    <section style={{ background: "var(--blue)", color: "#fff", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: -90, left: -70, width: 260, height: 260, borderRadius: "50%", background: "var(--yellow)", opacity: 0.9, animation: "sl-float 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: -110, right: -60, width: 300, height: 300, borderRadius: "50%", background: "var(--pink)", opacity: 0.9, animation: "sl-float 6.5s ease-in-out infinite" }} />
      <Reveal style={{ maxWidth: 1360, margin: "0 auto", padding: "100px 34px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", marginBottom: 24 }}>Fuel the machine. Every drop counts.</div>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(44px,8vw,124px)", lineHeight: 0.84, letterSpacing: "-0.04em", margin: "0 0 34px", textTransform: "uppercase" }}>Run on <span style={{ color: "var(--yellow)", WebkitTextStroke: "2px var(--ink)" }}>salt.</span></h2>
        <Hoverable as="a" href="#products" onClick={(e) => { e.preventDefault(); scrollTo("#products"); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "var(--yellow)", color: "var(--ink)", textDecoration: "none", fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", padding: "19px 38px", borderRadius: 100, transition: "transform .25s cubic-bezier(.2,.8,.2,1),background .25s ease,color .25s ease" }}
          hoverStyle={{ background: "#0b0b0d", color: "#fff", transform: "translateY(-3px)" }}
        >Get Salt Labs <span style={{ fontSize: 15 }}>→</span></Hoverable>
      </Reveal>
    </section>
  );
}

// ── FOOTER ──
function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };
  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", overflow: "hidden" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "48px 34px 20px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr", gap: 34 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: "-0.03em" }}>SALT&nbsp;LABS<span style={{ color: "var(--yellow)" }}>®</span></div>
          <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, lineHeight: 1.7, color: "rgba(251,246,236,0.55)", margin: "14px 0 0", maxWidth: 230 }}>Precision electrolyte fuel by Revive Supplements. Formulated, not flavored.</p>
        </div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(251,246,236,0.5)", marginBottom: 14 }}>Product</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <Hoverable as="a" href="#products" onClick={(e) => { e.preventDefault(); scrollTo("#products"); }} style={{ color: "var(--paper)", textDecoration: "none", transition: "color .2s ease" }} hoverStyle={{ color: "var(--yellow)" }}>Core · Sugar-Free</Hoverable>
            <Hoverable as="a" href="#products" onClick={(e) => { e.preventDefault(); scrollTo("#products"); }} style={{ color: "var(--paper)", textDecoration: "none", transition: "color .2s ease" }} hoverStyle={{ color: "var(--yellow)" }}>Drive · Carb-Charged</Hoverable>
            <Hoverable as="a" href="#formula" onClick={(e) => { e.preventDefault(); scrollTo("#formula"); }} style={{ color: "var(--paper)", textDecoration: "none", transition: "color .2s ease" }} hoverStyle={{ color: "var(--yellow)" }}>The Formula</Hoverable>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(251,246,236,0.5)", marginBottom: 14 }}>Brand</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <Hoverable as="a" href="#thesis" onClick={(e) => { e.preventDefault(); scrollTo("#thesis"); }} style={{ color: "var(--paper)", textDecoration: "none", transition: "color .2s ease" }} hoverStyle={{ color: "var(--yellow)" }}>The Science</Hoverable>
            <Hoverable as="a" href="#story" onClick={(e) => { e.preventDefault(); scrollTo("#story"); }} style={{ color: "var(--paper)", textDecoration: "none", transition: "color .2s ease" }} hoverStyle={{ color: "var(--yellow)" }}>Our Story</Hoverable>
            <Hoverable as="a" href="mailto:contact@therevivesupplements.com" style={{ color: "var(--paper)", textDecoration: "none", transition: "color .2s ease" }} hoverStyle={{ color: "var(--yellow)" }}>Contact</Hoverable>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(251,246,236,0.5)", marginBottom: 14 }}>Get the drop</div>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", border: "2px solid rgba(251,246,236,0.25)", borderRadius: 100, overflow: "hidden", background: "rgba(255,255,255,0.04)" }}>
              <input
                type="email" required placeholder="you@email.com" value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, border: 0, background: "transparent", padding: "12px 16px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--paper)", outline: "none", minWidth: 0 }}
              />
              <button type="submit" style={{ border: 0, background: "var(--yellow)", color: "var(--ink)", padding: "0 18px", fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 600, letterSpacing: "0.1em", cursor: "pointer" }}>→</button>
            </form>
          ) : (
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: "var(--yellow)", letterSpacing: "0.05em" }}>You're on the list →</div>
          )}
        </div>
      </div>
      <div style={{ fontWeight: 900, fontSize: "clamp(70px,17vw,240px)", lineHeight: 0.8, letterSpacing: "-0.04em", textAlign: "center", padding: "10px 0 0", color: "var(--paper)", opacity: 0.06, whiteSpace: "nowrap", textTransform: "uppercase" }}>SALT LABS</div>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "18px 34px 28px", borderTop: "1px solid rgba(251,246,236,0.14)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontFamily: "'IBM Plex Mono',monospace", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(251,246,236,0.5)" }}>
        <span>© 2026 Revive Supplements</span>
        <span>These statements have not been evaluated by the FDA.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}

// ── GLOBAL STYLE ──
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,600&family=IBM+Plex+Mono:wght@400;500;600&family=Spectral:ital,wght@0,300;0,400;1,300&display=swap');
      *{box-sizing:border-box}
      body{margin:0}
      @keyframes sl-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes sl-pulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:1;transform:scale(1.35)}}
      @keyframes sl-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
      ::selection{background:#ff2e93;color:#fff}
      a,button,input{font-family:inherit}
      html{scroll-behavior:smooth}
      @media (max-width: 900px) {
        header nav { display: none !important; }
      }
    `}</style>
  );
}

// ── APP ──
export default function App() {
  return (
    <div style={{
      "--ink": "#0b0b0d", "--paper": "#fbf6ec", "--blue": "#1c4dff", "--orange": "#ff4d17",
      "--yellow": "#ffcf00", "--green": "#00c46a", "--pink": "#ff2e93",
      "--line": "rgba(11,11,13,.16)", "--mut": "rgba(11,11,13,.55)",
      background: "var(--paper)", color: "var(--ink)",
      fontFamily: "Archivo,system-ui,sans-serif", WebkitFontSmoothing: "antialiased",
      overflowX: "hidden", position: "relative",
    }}>
      <GlobalStyle />
      <Nav />
      <Hero />
      <Marquee />
      <Thesis />
      <Formula />
      <Products />
      <Packaging />
      <Evidence />
      <BuiltFor />
      <Story />
      <CTAWordmark />
      <Footer />
    </div>
  );
}
