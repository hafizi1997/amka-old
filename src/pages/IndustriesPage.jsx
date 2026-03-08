import { useEffect, useMemo, useState } from "react";
import SiteHeaderFooter from "../components/SiteHeaderFooter";
import { insights } from "../content/libraryData";

const COLORS = {
  bg: "#F7F8FA",
  bgDark: "#246180",
  bgWarm: "#EEF3F8",
  navy: "#246180",
  teal: "#1D806B",
  saffron: "#FF952C",
  text: "#1B2836",
  textLight: "#5A6877",
  textMuted: "#7B8898",
  border: "#DCE3EB",
  white: "#FFFFFF",
};

const Section = ({ children, bg = COLORS.bg, id, style = {} }) => (
  <section id={id} style={{ background: bg, padding: "92px 0", scrollMarginTop: 96, ...style }}>
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>{children}</div>
  </section>
);

const Label = ({ children, color = COLORS.teal }) => (
  <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 3, color, marginBottom: 14, fontFamily: "DM Sans, sans-serif" }}>{children}</div>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "28px 24px", ...style }}>{children}</div>
);

const PrimaryBtn = ({ href, children }) => (
  <a
    href={href}
    style={{
      textDecoration: "none",
      background: COLORS.navy,
      color: COLORS.white,
      padding: "14px 18px",
      borderRadius: 12,
      fontWeight: 900,
      display: "inline-block",
      fontFamily: "DM Sans, sans-serif",
      fontSize: 14,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </a>
);

const SecondaryBtn = ({ href, children }) => (
  <a
    href={href}
    style={{
      textDecoration: "none",
      background: "transparent",
      color: COLORS.navy,
      padding: "14px 18px",
      borderRadius: 12,
      fontWeight: 900,
      display: "inline-block",
      fontFamily: "DM Sans, sans-serif",
      fontSize: 14,
      border: `1.5px solid ${COLORS.border}`,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </a>
);

const DownloadBtn = ({ href, children }) => (
  <a
    href={href}
    style={{
      textDecoration: "none",
      background: COLORS.saffron,
      color: "#0C1117",
      padding: "14px 18px",
      borderRadius: 12,
      fontWeight: 900,
      display: "inline-block",
      fontFamily: "DM Sans, sans-serif",
      fontSize: 14,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </a>
);

const SmallKicker = ({ children, color = COLORS.teal }) => (
  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color, marginBottom: 10 }}>{children}</div>
);

const BulletList = ({ items }) => (
  <div style={{ display: "grid", gap: 10 }}>
    {items.map((x) => (
      <div key={x} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
        <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7 }}>{x}</div>
      </div>
    ))}
  </div>
);

const StepList = ({ items }) => (
  <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
    {items.map((x, i) => (
      <div key={x} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 10,
            border: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "DM Mono, monospace",
            fontWeight: 900,
            fontSize: 11,
            color: COLORS.navy,
            flexShrink: 0,
          }}
        >
          {String(i + 1).padStart(2, "0")}
        </div>
        <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7 }}>{x}</div>
      </div>
    ))}
  </div>
);

function pickInsightsByTag(tag, count = 3) {
  const t = String(tag || "").toLowerCase();
  return insights.filter((x) => String(x.tag || "").toLowerCase().includes(t)).slice(0, count);
}

const PathGate = ({ selectedPath, onChoosePath, onUnlockAll }) => {
  const paths = [
    {
      key: "technical",
      title: "Technical Services",
      subtitle: "Risk-led buying, operational proof",
      resonates: "Our work is strong, but repeat scope drops between maintenance cycles.",
    },
    {
      key: "built",
      title: "Built Environment",
      subtitle: "Long cycles, stakeholder-heavy decisions",
      resonates: "Projects close, then pipeline quiets and we default back to tenders.",
    },
    {
      key: "training",
      title: "Training & Consulting",
      subtitle: "Trust-led approvals, renewals, cohorts",
      resonates: "We deliver good sessions, but cohort fill and renewals feel inconsistent.",
    },
  ];

  const selected = paths.find((path) => path.key === selectedPath);

  return (
    <Section bg={COLORS.bg} id="path-gate" style={{ paddingTop: 56, paddingBottom: 56 }}>
      <Card style={{ background: COLORS.white }}>
        <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal, marginBottom: 8 }}>
          STEP 01 — WHAT RESONATES MOST?
        </div>
        <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 8px", fontSize: 30, lineHeight: 1.2 }}>
          Choose the path that feels most true right now.
        </h2>
        <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: 1.75, color: COLORS.textLight, maxWidth: 760 }}>
          Pick based on current friction, not company label. We’ll unlock the most relevant breakdown first.
        </p>

        <div className="pathGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {paths.map((path) => {
            const active = selectedPath === path.key;
            return (
              <button
                key={path.key}
                type="button"
                onClick={() => onChoosePath(path.key)}
                style={{
                  textAlign: "left",
                  border: `1px solid ${active ? COLORS.navy : COLORS.border}`,
                  background: active ? COLORS.bgWarm : COLORS.white,
                  borderRadius: 12,
                  padding: "14px 14px",
                  cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif",
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 1.4, color: active ? COLORS.teal : COLORS.textMuted, marginBottom: 8, fontFamily: "DM Mono, monospace" }}>
                  {active ? "UNLOCKED" : "LOCKED"}
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.navy, marginBottom: 4 }}>{path.title}</div>
                <div style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6 }}>{path.subtitle}</div>
                <div style={{ marginTop: 10, fontSize: 12, color: COLORS.textMuted, lineHeight: 1.7 }}>
                  <strong style={{ color: COLORS.text }}>Resonates when:</strong> {path.resonates}
                </div>
              </button>
            );
          })}
        </div>

        {selectedPath ? (
          <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontSize: 13, color: COLORS.teal, fontWeight: 900 }}>
              STEP 02 — UNLOCKED: {selected?.title ?? "Path"}
            </div>
            <button
              type="button"
              onClick={onUnlockAll}
              style={{
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
                color: COLORS.navy,
                padding: "10px 14px",
                borderRadius: 10,
                fontWeight: 900,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Compare all paths →
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 14, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7 }}>
            Choose one path to get your industry-specific breakdown, typical build order, and recommended reading sequence.
          </div>
        )}
      </Card>
    </Section>
  );
};

const RecommendedReading = ({ items }) => (
  <div style={{ marginTop: 18 }}>
    <SmallKicker>RECOMMENDED READING</SmallKicker>

    <div className="readingGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {items.map((r) => (
        <a
          key={r.slug}
          href={`/insights/${r.slug}`}
          style={{
            textDecoration: "none",
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 14,
            padding: "14px 14px",
            color: COLORS.text,
            display: "block",
          }}
        >
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 10, fontWeight: 900, letterSpacing: 1.4, color: COLORS.saffron, marginBottom: 8 }}>
            {(r.tag || "INSIGHT").toUpperCase()}
          </div>
          <div style={{ fontWeight: 900, color: COLORS.navy, lineHeight: 1.35 }}>{r.title}</div>
          <div style={{ marginTop: 8, color: COLORS.teal, fontWeight: 900, fontSize: 13 }}>Read →</div>
        </a>
      ))}
    </div>

    <div style={{ marginTop: 10 }}>
      <a href="/insights" style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 900 }}>
        View full library →
      </a>
    </div>
  </div>
);

const IndustryCard = ({ id, label, title, subtitle, reality, problems, system, buildOrder, playbookHref, reading }) => (
  <Section id={id} bg={COLORS.bg}>
    <Card>
      <div style={{ display: "grid", gap: 12 }}>
        <div>
          <Label>{label}</Label>
          <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 8px", fontSize: 40, lineHeight: 1.1, letterSpacing: -0.6 }}>
            {title}
          </h2>
          <div style={{ color: COLORS.textMuted, fontFamily: "DM Mono, monospace", letterSpacing: 0.6, fontSize: 12, marginBottom: 10 }}>{subtitle}</div>

          <div style={{ color: COLORS.textLight, fontSize: 15, lineHeight: 1.85, maxWidth: 980 }}>
            <strong style={{ color: COLORS.text }}>Buying reality:</strong> {reality}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <DownloadBtn href={playbookHref}>Download playbook →</DownloadBtn>
          <SecondaryBtn href="/services">View services →</SecondaryBtn>
          <PrimaryBtn href="/contact">Book strategy →</PrimaryBtn>
        </div>

        <div className="industryGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start", marginTop: 6 }}>
          <Card style={{ background: COLORS.bgWarm }}>
            <SmallKicker color={COLORS.saffron}>COMMON FAILURE MODE</SmallKicker>
            <BulletList items={problems} />
          </Card>

          <Card style={{ background: COLORS.bgWarm }}>
            <SmallKicker>SYSTEM THAT FIXES IT</SmallKicker>
            <div style={{ color: COLORS.textLight, fontSize: 14, lineHeight: 1.85 }}>{system}</div>

            <div style={{ marginTop: 14 }}>
              <SmallKicker>TYPICAL BUILD ORDER</SmallKicker>
              <StepList items={buildOrder} />
            </div>
          </Card>
        </div>

        <RecommendedReading items={reading} />
      </div>
    </Card>
  </Section>
);

const SharedConstraint = ({ showActions = true, asHero = false }) => (
  <Section
    id="shared"
    bg={asHero ? "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)" : COLORS.bgWarm}
    style={asHero ? { paddingTop: 150, paddingBottom: 74 } : {}}
  >
    <Label>{asHero ? "UNIVERSAL CONSTRAINT" : "SHARED CONSTRAINT"}</Label>
    {asHero ? (
      <>
        <h1 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 14px", fontSize: 52, lineHeight: 1.1, letterSpacing: -0.7, maxWidth: 980 }}>
          Every industry has the same hidden failure mode.
        </h1>
        <p style={{ margin: "0 0 16px", color: COLORS.textLight, lineHeight: 1.9, fontSize: 17, maxWidth: 980 }}>
          Delivery gets busy, the pipeline engine turns off, and growth becomes random. This is not an industry problem—it’s a systems problem.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          {[
            "Technical Services",
            "Built Environment",
            "Training & Consulting",
          ].map((item) => (
            <span
              key={item}
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 999,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
                color: COLORS.text,
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.2,
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </>
    ) : (
      <>
        <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 14px", fontSize: 34, lineHeight: 1.2 }}>
          Porpoising is a systems problem.
        </h2>
        <p style={{ margin: "0 0 18px", color: COLORS.textLight, lineHeight: 1.9, fontSize: 15, maxWidth: 920 }}>
          Across industries, delivery consumes attention and the pipeline engine turns off. The fix is infrastructure that keeps credibility, capture, and
          follow-up running while delivery is busy.
        </p>
      </>
    )}

    {showActions ? (
      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <DownloadBtn href="/insights#playbooks">Download playbooks →</DownloadBtn>
        <SecondaryBtn href="/services">View services →</SecondaryBtn>
        <PrimaryBtn href="/contact">Book strategy →</PrimaryBtn>
      </div>
    ) : null}
  </Section>
);

const SharedConstraintBreakdown = () => (
  <Section id="shared-breakdown" bg={COLORS.bg} style={{ paddingTop: 62, paddingBottom: 66, borderTop: `1px solid ${COLORS.border}` }}>
    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal, marginBottom: 10 }}>
      SECTION 02 — PATTERN IN MOTION
    </div>
    <p style={{ margin: "0 0 14px", color: COLORS.textLight, lineHeight: 1.8, fontSize: 15, maxWidth: 900 }}>
      Before any solution, this is the pattern we keep seeing across teams. If this feels familiar, you’re not the problem—the system is underpowered.
    </p>

    <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.saffron, marginBottom: 10 }}>
      HOW PORPOISING HAPPENS
    </div>
    <div className="cycleGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
      {[
        { n: "01", t: "Delivery load spikes", d: "Client work consumes founder and team attention." },
        { n: "02", t: "Visibility drops", d: "Website, outbound, and content cadence weaken." },
        { n: "03", t: "Follow-up stalls", d: "Leads sit idle and next actions get delayed." },
        { n: "04", t: "Pipeline thins", d: "Future work becomes unpredictable and fragile." },
        { n: "05", t: "Panic activity", d: "Short bursts restart demand, then collapse again." },
      ].map((step) => (
        <Card key={step.n} style={{ padding: "18px 16px", background: COLORS.white, height: "100%" }}>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.5, color: COLORS.teal, marginBottom: 8 }}>{step.n}</div>
          <div style={{ fontWeight: 900, color: COLORS.navy, marginBottom: 6, fontSize: 15, lineHeight: 1.35 }}>{step.t}</div>
          <div style={{ color: COLORS.textLight, lineHeight: 1.65, fontSize: 13 }}>{step.d}</div>
        </Card>
      ))}
    </div>
  </Section>
);

export default function IndustriesPage() {
  const [selectedPath, setSelectedPath] = useState("");

  useEffect(() => {
    document.title = "Industries | AMKA Digital";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const mindset = useMemo(() => pickInsightsByTag("mindset", 4), []);
  const framework = useMemo(() => pickInsightsByTag("framework", 4), []);
  const tactical = useMemo(() => pickInsightsByTag("tactical", 4), []);

  const techReading = useMemo(() => [...framework, ...tactical].slice(0, 2), [framework, tactical]);
  const builtReading = useMemo(() => [...framework, ...mindset].slice(0, 2), [framework, mindset]);
  const trainingReading = useMemo(() => [...tactical, ...framework].slice(0, 2), [tactical, framework]);

  const choosePath = (path) => {
    setSelectedPath(path);
    window.setTimeout(() => {
      const target = document.getElementById(path);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }, 40);
  };

  const unlockAllPaths = () => {
    setSelectedPath("all");
    window.setTimeout(() => {
      const target = document.getElementById("technical");
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 92;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    }, 40);
  };

  return (
    <SiteHeaderFooter>
      <style>{`
        @media (max-width: 980px) {
          .industryGrid { grid-template-columns: 1fr !important; }
          .readingGrid { grid-template-columns: 1fr !important; }
          .cycleGrid { grid-template-columns: 1fr 1fr !important; }
          .pathGrid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .cycleGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "DM Sans, sans-serif" }}>
        <SharedConstraint showActions={false} asHero />
        <SharedConstraintBreakdown />
        <PathGate selectedPath={selectedPath} onChoosePath={choosePath} onUnlockAll={unlockAllPaths} />

        {(selectedPath === "technical" || selectedPath === "all") && (
        <IndustryCard
          id="technical"
          label="INDUSTRY 01"
          title="Technical Services"
          subtitle="Condition Monitoring · Testing · Maintenance · Engineering"
          reality="Risk-led decisions (uptime, compliance, audit). Proof has to be operational—method, examples, reporting outcomes."
          problems={[
            "Pipeline dries up between maintenance cycles.",
            "Work stays one-off because follow-up and programme offers are inconsistent.",
            "Reports are delivered but don’t convert into the next scope.",
          ]}
          system="A credibility + pipeline system that turns one-off jobs into repeat programmes: website proof + CRM facility tracking + follow-up cadence + content that pre-sells expertise."
          buildOrder={[
            "Website proof pages (methods, standards, outcomes)",
            "CRM pipeline + facility relationship tracking",
            "Lead capture assets (checklists, inspection templates)",
            "Nurture + follow-up cadence",
          ]}
          playbookHref="/insights#playbooks"
          reading={techReading}
        />
        )}

        {(selectedPath === "built" || selectedPath === "all") && (
        <IndustryCard
          id="built"
          label="INDUSTRY 02"
          title="Built Environment"
          subtitle="Architecture · QS · M&E · Project Management"
          reality="Long cycles and stakeholder-heavy decisions. Methodology matters more than portfolio volume."
          problems={[
            "Tender dependency commoditises the practice.",
            "Pipeline disappears between project completions.",
            "Websites look like brochures and fail to position advisory value.",
          ]}
          system="A positioning + relationship system: proof-led website that shows methodology + CRM tracking across long cycles + content that moves the practice upstream."
          buildOrder={[
            "Positioning + method pages (how value is created)",
            "Website conversion paths (appointments, brief requests)",
            "CRM relationship tracking across stakeholder roles",
            "Content library (case methods, decision frameworks)",
          ]}
          playbookHref="/insights#playbooks"
          reading={builtReading}
        />
        )}

        {(selectedPath === "training" || selectedPath === "all") && (
        <IndustryCard
          id="training"
          label="INDUSTRY 03"
          title="Training & Consulting"
          subtitle="Corporate Trainers · Coaches · HR Consultants · Consultancies"
          reality="Trust + internal approval cycles. Renewals and cohorts are the engine—capture and nurture need to be designed."
          problems={[
            "Selling workshop days instead of programmes.",
            "Content exists but doesn’t capture leads.",
            "No nurture system to fill cohorts consistently.",
          ]}
          system="A demand infrastructure system: landing pages + capture assets + nurture sequences + CRM tracking for HR relationships and renewal cycles."
          buildOrder={[
            "Programme landing pages (structure + outcomes + proof)",
            "Lead capture assets (checklists, templates, mini guides)",
            "Email nurture sequences + routing rules",
            "CRM pipeline for HR decision cycles + renewals",
          ]}
          playbookHref="/insights#playbooks"
          reading={trainingReading}
        />
        )}

        {selectedPath ? (
        <Section bg={COLORS.bg} id="cta" style={{ padding: "72px 0" }}>
          <Card style={{ background: COLORS.bgWarm }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
              <div>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>
                  Start with the playbook or start with a build order.
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: COLORS.textLight, lineHeight: 1.7 }}>
                  Part 8 includes the industry playbooks and implementation templates.
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="/insights#playbooks"
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    color: COLORS.bgDark,
                    background: COLORS.saffron,
                    padding: "14px 18px",
                    borderRadius: 12,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Download playbooks →
                </a>
                <a
                  href="/contact"
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    color: COLORS.navy,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.white,
                    padding: "14px 18px",
                    borderRadius: 12,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Book a strategy →
                </a>
              </div>
            </div>
          </Card>
        </Section>
        ) : null}
      </main>
    </SiteHeaderFooter>
  );
}
