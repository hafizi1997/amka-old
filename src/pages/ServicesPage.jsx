import { useEffect } from "react";
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
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color, marginBottom: 16, fontFamily: "DM Sans, sans-serif" }}>{children}</div>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "28px 24px", ...style }}>{children}</div>
);

const PillLink = ({ href, children }) => (
  <a
    href={href}
    style={{
      textDecoration: "none",
      color: COLORS.textLight,
      border: `1px solid ${COLORS.border}`,
      background: COLORS.white,
      padding: "10px 14px",
      borderRadius: 999,
      fontWeight: 800,
      fontSize: 13,
      fontFamily: "DM Sans, sans-serif",
    }}
  >
    {children}
  </a>
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

const ServicesHero = () => (
  <section style={{ background: "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)", paddingTop: 150, paddingBottom: 74 }}>
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
      <div style={{ maxWidth: 860 }}>
        <Label>SERVICES</Label>

        <h1 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 14px", fontSize: 46, lineHeight: 1.12, letterSpacing: -0.6 }}>
          Systems-first digital infrastructure.
        </h1>

        <p style={{ margin: "0 0 20px", fontSize: 16, lineHeight: 1.85, color: COLORS.textLight, maxWidth: 860 }}>
          Services are structured as systems: credibility (website), capture (funnels), control (CRM), and compounding (content + follow-up). Each engagement
          is designed for adoption and measurable behaviour—not just delivery.
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
          <PillLink href="#crm">CRM</PillLink>
          <PillLink href="#website">Website</PillLink>
          <PillLink href="#strategy">Strategy</PillLink>
          <PillLink href="#funnels">Funnels + Content</PillLink>
          <PillLink href="#engagements">Engagement Types</PillLink>
          <PillLink href="#process">Process</PillLink>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <PrimaryBtn href="/contact">Book a free growth strategy →</PrimaryBtn>
          <SecondaryBtn href="/insights">Read the insights library →</SecondaryBtn>
        </div>

        <div style={{ marginTop: 10 }}>
          <a href="/insights#playbooks" style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 900, fontSize: 14, fontFamily: "DM Sans, sans-serif" }}>
            Download playbooks →
          </a>
        </div>
      </div>
    </div>
  </section>
);

const ServiceMap = () => {
  const items = [
    {
      id: "crm",
      icon: "◉",
      title: "CRM & Pipeline Systems",
      desc: "A pipeline designed around how the business sells: stages, ownership, follow-up rules, and visibility.",
      bullets: ["Stage definitions + next-action rules", "Contact + account structure", "Follow-up cadence + handover"],
    },
    {
      id: "website",
      icon: "◌",
      title: "Websites That Convert",
      desc: "A credibility system that answers real buyer questions and creates decision momentum.",
      bullets: ["Problem-led architecture", "Proof-led pages", "Conversion paths + SEO structure"],
    },
    {
      id: "strategy",
      icon: "△",
      title: "Digital Growth Strategy",
      desc: "A build order and 90-day roadmap that prioritises what actually moves pipeline.",
      bullets: ["Funnel audit + leakage map", "System design + sequencing", "Execution-ready plan"],
    },
    {
      id: "funnels",
      icon: "□",
      title: "Lead Funnels & Content Systems",
      desc: "Capture + nurture infrastructure that turns expertise into compounding inbound.",
      bullets: ["Lead magnets + capture", "Email sequences + routing", "Content library structure"],
    },
  ];

  return (
    <Section bg={COLORS.bg} id="map">
      <Label>WHAT WE BUILD</Label>
      <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 38px", fontSize: 34, lineHeight: 1.2 }}>
        Four systems. One growth loop.
      </h2>

      <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {items.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card style={{ height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.navy,
                    fontSize: 20,
                    fontFamily: "DM Mono, monospace",
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: COLORS.navy, fontFamily: "DM Sans, sans-serif" }}>{s.title}</div>
              </div>

              <p style={{ margin: "0 0 14px", color: COLORS.textLight, lineHeight: 1.75, fontSize: 14 }}>
                {s.desc}
              </p>

              <div style={{ display: "grid", gap: 8 }}>
                {s.bullets.map((b) => (
                  <div key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                    <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6 }}>{b}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 14, fontWeight: 900, color: COLORS.teal, fontSize: 13 }}>
                View details →
              </div>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
};

const ServiceDetail = ({ id, label, title, intro, deliverables, outcomes, timeline, note }) => (
  <Section bg={COLORS.bgWarm} id={id}>
    <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 18, alignItems: "start" }}>
      <div>
        <Label>{label}</Label>
        <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 12px", fontSize: 34, lineHeight: 1.2 }}>
          {title}
        </h2>
        <p style={{ margin: "0 0 16px", color: COLORS.textLight, fontSize: 15, lineHeight: 1.85 }}>
          {intro}
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          <PrimaryBtn href="/contact">Discuss this service →</PrimaryBtn>
          <SecondaryBtn href="/insights">Read frameworks →</SecondaryBtn>
        </div>

        {note ? (
          <div style={{ marginTop: 16, padding: "14px 14px", borderRadius: 12, border: `1px solid ${COLORS.border}`, background: COLORS.white }}>
            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.saffron, marginBottom: 8 }}>
              NOTE
            </div>
            <div style={{ color: COLORS.textLight, lineHeight: 1.75, fontSize: 14 }}>{note}</div>
          </div>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: 14 }}>
        <Card>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal, marginBottom: 10 }}>
            DELIVERABLES
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {deliverables.map((d) => (
              <div key={d} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal, marginBottom: 10 }}>
            EXPECTED OUTCOMES
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {outcomes.map((o) => (
              <div key={o} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.65 }}>{o}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ background: COLORS.bg }}>
          <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal, marginBottom: 10 }}>
            TYPICAL TIMELINE
          </div>
          <div style={{ color: COLORS.textLight, lineHeight: 1.75, fontSize: 14 }}>{timeline}</div>
        </Card>
      </div>
    </div>
  </Section>
);

const EngagementTypes = () => {
  const items = [
    {
      title: "Strategy Sprint",
      time: "1–2 weeks",
      for: "Teams that need the build order before doing anything else.",
      includes: ["Funnel + pipeline diagnosis", "Leakage map + priorities", "90-day system roadmap"],
    },
    {
      title: "Website System Build",
      time: "4–6 weeks",
      for: "Firms that need a credibility engine and clear conversion paths.",
      includes: ["Information architecture", "Proof-led pages + SEO structure", "Conversion paths + tracking plan"],
    },
    {
      title: "CRM Pipeline Build",
      time: "2–4 weeks",
      for: "Firms losing leads to inconsistent follow-up and unclear stages.",
      includes: ["Pipeline stages + rules", "Account/contact structure", "Follow-up cadence + handover"],
    },
    {
      title: "Full Growth System",
      time: "8–12 weeks",
      for: "Firms ready to connect credibility → capture → follow-up → renewal.",
      includes: ["Website + CRM integration", "Lead capture + nurture loops", "Content system + distribution cadence"],
    },
  ];

  return (
    <Section bg={COLORS.bg} id="engagements">
      <Label>ENGAGEMENT TYPES</Label>
      <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 38px", fontSize: 34, lineHeight: 1.2 }}>
        How delivery is packaged.
      </h2>

      <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {items.map((it) => (
          <Card key={it.title} style={{ height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", marginBottom: 10 }}>
              <div style={{ fontWeight: 900, color: COLORS.navy, fontSize: 16 }}>{it.title}</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, color: COLORS.textMuted }}>{it.time}</div>
            </div>

            <p style={{ margin: "0 0 12px", color: COLORS.textLight, lineHeight: 1.75, fontSize: 14 }}>
              {it.for}
            </p>

            <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal, marginBottom: 10 }}>
              INCLUDES
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              {it.includes.map((x) => (
                <div key={x} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                  <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6 }}>{x}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <a href="/contact" style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 900 }}>
                Discuss this engagement →
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const Process = () => {
  const steps = [
    { n: "01", title: "Diagnosis", desc: "Pipeline, visibility, and follow-up mapped. Leakage points identified." },
    { n: "02", title: "System design", desc: "Architecture + sequencing defined: what to build first, what to delay." },
    { n: "03", title: "Build", desc: "Website, CRM, funnels, and supporting infrastructure implemented." },
    { n: "04", title: "Adoption", desc: "Handover structured. Usage rules and cadence standardised." },
    { n: "05", title: "Iteration", desc: "Improvements driven by real behaviour and constraints, not assumptions." },
  ];

  return (
    <Section bg={COLORS.white} id="process">
      <Label>PROCESS</Label>
      <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 34px", fontSize: 34, lineHeight: 1.2 }}>
        How engagements run.
      </h2>

      <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {steps.map((s) => (
          <Card key={s.n}>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 10 }}>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal }}>{s.n}</div>
              <div style={{ fontWeight: 900, color: COLORS.navy, fontSize: 16 }}>{s.title}</div>
            </div>
            <div style={{ color: COLORS.textLight, lineHeight: 1.8, fontSize: 14 }}>{s.desc}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const CTA = () => (
  <Section bg={COLORS.bgWarm} id="cta" style={{ padding: "72px 0" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
      <div>
        <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>
          Prefer to start with the full system?
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: COLORS.textLight, lineHeight: 1.7 }}>
          Part 8 includes the playbooks and implementation templates.
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
  </Section>
);

export default function ServicesPage() {
  useEffect(() => {
    document.title = "Services | AMKA Digital";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <SiteHeaderFooter>
      <style>{`
        @media (max-width: 980px) {
          .grid2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "DM Sans, sans-serif" }}>
        <ServicesHero />
        <ServiceMap />

        <ServiceDetail
          id="crm"
          label="SERVICE 01"
          title="CRM & Pipeline Systems"
          intro="A CRM is only useful when it matches how opportunities move. This service designs the pipeline as a decision system: stages, ownership, follow-up rules, visibility, and handover—built for adoption."
          deliverables={[
            "Pipeline stages + definitions (what qualifies as “in stage”)",
            "Next-action rules + follow-up cadence",
            "Account + contact structure (who matters in the decision)",
            "Handover rules (who owns what, when)",
            "Dashboard view for active opportunities",
          ]}
          outcomes={[
            "Fewer dropped conversations and silent losses",
            "Clear next-actions for every active opportunity",
            "Consistent follow-up discipline across the team",
            "Visibility into where pipeline actually stalls",
          ]}
          timeline="Typically 2–4 weeks depending on complexity and team size."
          note="Tool choice is secondary. The core value is the system design and adoption rules."
        />

        <ServiceDetail
          id="website"
          label="SERVICE 02"
          title="Websites That Convert"
          intro="A website is not a brochure. It is a credibility system that reduces uncertainty and helps buyers decide. This service builds a site architecture that answers real buyer questions and leads them to a clear next step."
          deliverables={[
            "Information architecture (problem-led navigation)",
            "Core pages + proof structure (what to show, not claim)",
            "SEO foundations (title hierarchy + on-page structure)",
            "Conversion paths (CTAs + lead capture points)",
            "Analytics + measurement plan",
          ]}
          outcomes={[
            "Clearer positioning and reduced buyer confusion",
            "Higher-quality enquiries (better fit, less price shopping)",
            "Stronger conversion paths from content to action",
            "A site that supports sales conversations instead of replacing them",
          ]}
          timeline="Typically 4–6 weeks for a focused build."
        />

        <ServiceDetail
          id="strategy"
          label="SERVICE 03"
          title="Digital Growth Strategy"
          intro="Strategy here means build order. This service maps the funnel, identifies leakage, then sequences the work into a practical 90-day roadmap so effort compounds instead of scattering."
          deliverables={[
            "Current state map: visibility → capture → follow-up → renewal",
            "Leakage diagnosis (where opportunities die quietly)",
            "Prioritised build order for the next 90 days",
            "What to stop doing (noise reduction)",
            "Execution plan with milestones",
          ]}
          outcomes={[
            "Clear priorities instead of “random marketing”",
            "Less wasted effort and tool-churn",
            "A roadmap that matches operational constraints",
            "Faster movement toward a predictable pipeline loop",
          ]}
          timeline="Typically 1–2 weeks (strategy sprint), with optional build follow-on."
        />

        <ServiceDetail
          id="funnels"
          label="SERVICE 04"
          title="Lead Funnels & Content Systems"
          intro="This is the compounding layer: lead capture, nurture, routing, and a content library structure that turns expertise into proof. The goal is a loop that works while delivery is busy."
          deliverables={[
            "Lead magnet structure + capture placement",
            "Email nurture sequences + routing rules",
            "Content library structure (topics → assets → conversion paths)",
            "Repurposing and distribution cadence (lightweight, repeatable)",
            "Integration into CRM pipeline",
          ]}
          outcomes={[
            "More captured leads from the same traffic and content",
            "Less chasing and more structured follow-up",
            "A reusable system for publishing and conversion",
            "Clear handoff from marketing to pipeline",
          ]}
          timeline="Typically 3–6 weeks depending on scope and integrations."
        />

        <EngagementTypes />
        <Process />
        <CTA />
      </main>
    </SiteHeaderFooter>
  );
}
