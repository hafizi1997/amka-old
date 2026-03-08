import { useEffect, useMemo, useState } from "react";
import SiteHeaderFooter from "../components/SiteHeaderFooter";

const COLORS = {
  bg: "#F7F8FA",
  bgDark: "#246180",
  bgWarm: "#EEF3F8",
  navy: "#246180",
  teal: "#1D806B",
  saffron: "#FF952C",
  text: "#1B2836",
  textLight: "#5A6877",
  border: "#DCE3EB",
  white: "#FFFFFF",
};

const Section = ({ children, bg = COLORS.bg, id, style = {} }) => (
  <section id={id} style={{ background: bg, padding: "92px 0", scrollMarginTop: 96, ...style }}>
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>{children}</div>
  </section>
);

const Label = ({ children, color = COLORS.teal }) => (
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color, marginBottom: 16, fontFamily: "DM Sans, sans-serif" }}>{children}</div>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "28px 24px", ...style }}>{children}</div>
);

const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 14px",
      borderRadius: 999,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 900,
      border: `1px solid ${active ? COLORS.navy : COLORS.border}`,
      background: active ? COLORS.navy : COLORS.white,
      color: active ? COLORS.white : COLORS.textLight,
      fontFamily: "DM Sans, sans-serif",
    }}
  >
    {children}
  </button>
);

export default function ProofPage() {
  useEffect(() => {
    document.title = "Proof | AMKA Digital";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const cases = [
    {
      title: "Welding Management System",
      tags: ["Platform", "Process"],
      broken: "Paper tracking + compliance gaps",
      system: "Digital workflow + reporting",
      change: "Reporting time cut, fewer misses",
    },
    {
      title: "CRM Integration",
      tags: ["CRM", "Workflow"],
      broken: "3 tools + no single pipeline view",
      system: "One pipeline + stage definitions + follow-up rules",
      change: "Clear opportunity visibility and consistent follow-ups",
    },
    {
      title: "Secretary Services Platform",
      tags: ["Platform", "Automation"],
      broken: "Manual onboarding + document chasing",
      system: "Onboarding + document management + status tracking",
      change: "Less back-and-forth, smoother delivery",
    },
    {
      title: "E-Commerce Platform",
      tags: ["Website", "Automation"],
      broken: "Disconnected inventory + weak tracking",
      system: "Storefront + inventory sync + conversion tracking",
      change: "Faster operations and measurable performance",
    },
    {
      title: "Conversion Website Rebuild",
      tags: ["Website"],
      broken: "Brochure site + unclear positioning",
      system: "Problem-led pages + proof structure + conversion paths",
      change: "More qualified enquiries, less price-shopping",
    },
    {
      title: "Lead Capture + Nurture Loop",
      tags: ["Automation", "CRM"],
      broken: "Traffic exists but no capture + follow-up",
      system: "Lead magnet + forms + email sequence + CRM routing",
      change: "More captured leads and consistent follow-up",
    },
  ];

  const filters = ["All", "CRM", "Website", "Automation", "Platform", "Process"];
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return cases;
    return cases.filter((c) => c.tags.includes(active));
  }, [active]);

  return (
    <SiteHeaderFooter>
      <style>{`
        @media (max-width: 980px) {
          .proof-grid-2 { grid-template-columns: 1fr !important; }
          .proof-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "DM Sans, sans-serif" }}>
        <section style={{ background: "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)", paddingTop: 150, paddingBottom: 74 }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ maxWidth: 860 }}>
              <Label>PROOF</Label>
              <h1 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 14px", fontSize: 46, lineHeight: 1.12, letterSpacing: -0.6 }}>
                Systems we’ve built.
                <br />
                Results that followed.
              </h1>
              <p style={{ margin: "0 0 22px", fontSize: 16, lineHeight: 1.85, color: COLORS.textLight, maxWidth: 860 }}>
                We document work as systems: what was broken, what was built, and what changed. Proof beats claims.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {filters.map((f) => (
                  <Chip key={f} active={active === f} onClick={() => setActive(f)}>
                    {f}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Section bg={COLORS.bg} id="cases">
          <div className="proof-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {filtered.map((item) => (
              <Card key={item.title} style={{ height: "100%" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1,
                        color: COLORS.teal,
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "#EDF4F4",
                        fontFamily: "DM Mono, monospace",
                      }}
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 900, color: COLORS.navy, margin: "0 0 14px" }}>{item.title}</h3>

                <p style={{ margin: "0 0 8px", color: COLORS.textLight, fontSize: 14, lineHeight: 1.65 }}>
                  <strong style={{ color: COLORS.text }}>Broken:</strong> {item.broken}
                </p>
                <p style={{ margin: "0 0 8px", color: COLORS.textLight, fontSize: 14, lineHeight: 1.65 }}>
                  <strong style={{ color: COLORS.text }}>System:</strong> {item.system}
                </p>
                <p style={{ margin: 0, color: COLORS.textLight, fontSize: 14, lineHeight: 1.65 }}>
                  <strong style={{ color: COLORS.text }}>Change:</strong> {item.change}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section bg={COLORS.bgWarm} id="proof">
          <Label>HOW WE PRESENT PROOF</Label>
          <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 14px", fontSize: 34, lineHeight: 1.2 }}>
            Show, don’t claim.
          </h2>
          <div className="proof-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
            {[
              { t: "Systems outlast motivation", d: "We measure success by adoption and repeatability, not launch day aesthetics." },
              { t: "Clarity is a competitive advantage", d: "We structure information to reduce uncertainty and accelerate decisions." },
              { t: "Work must hold under delivery pressure", d: "We design for real constraints: limited time, busy teams, and long cycles." },
            ].map((x) => (
              <Card key={x.t}>
                <div style={{ fontWeight: 900, color: COLORS.navy, marginBottom: 8 }}>{x.t}</div>
                <div style={{ color: COLORS.textLight, lineHeight: 1.75, fontSize: 14 }}>{x.d}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section bg={COLORS.bgWarm} id="cta" style={{ padding: "72px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>
                Want the full system + templates?
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: COLORS.textLight, lineHeight: 1.7 }}>
                Part 8 includes industry playbooks and implementation templates.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/insights#playbooks"
                style={{ fontSize: 14, fontWeight: 900, color: COLORS.bgDark, background: COLORS.saffron, padding: "14px 18px", borderRadius: 12, textDecoration: "none" }}
              >
                Download playbooks →
              </a>
              <a
                href="/contact"
                style={{ fontSize: 14, fontWeight: 900, color: COLORS.navy, border: `1.5px solid ${COLORS.border}`, background: COLORS.white, padding: "14px 18px", borderRadius: 12, textDecoration: "none" }}
              >
                Book a strategy →
              </a>
            </div>
          </div>
        </Section>
      </main>
    </SiteHeaderFooter>
  );
}
