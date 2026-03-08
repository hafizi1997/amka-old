import { useEffect, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const COLORS = {
  bg: "#F7F8FA",
  bgDark: "#246180",
  bgWarm: "#EEF3F8",
  navy: "#246180",
  teal: "#1D806B",
  saffron: "#FF952C",
  gold: "#C4993D",
  text: "#1B2836",
  textLight: "#5A6877",
  textMuted: "#7B8898",
  border: "#DCE3EB",
  white: "#FFFFFF",
};

const Section = ({ children, bg = COLORS.bg, id, style = {} }) => (
  <section id={id} style={{ background: bg, padding: "92px 0", ...style }}>
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>{children}</div>
  </section>
);

const Label = ({ children, color = COLORS.teal }) => (
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>{children}</div>
);

const FadeIn = ({ children, delay = 0, style = {}, className }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={className}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "28px 24px", ...style }}>{children}</div>
);

const Pill = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      fontSize: 12,
      fontWeight: 500,
      color: COLORS.teal,
      padding: "6px 14px",
      borderRadius: 999,
      background: "#EDF4F4",
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    {children}
  </span>
);

const AboutHero = () => {
  return (
    <section style={{ background: "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)", paddingTop: 150, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 760 }}>
          <div>
            <FadeIn>
              <Label>ABOUT</Label>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  lineHeight: 1.12,
                  color: COLORS.navy,
                  margin: "0 0 18px",
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: -0.6,
                }}
              >
                AMKA Digital
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: COLORS.textLight, margin: "0 0 18px", fontFamily: "'DM Sans', sans-serif", maxWidth: 760 }}>
                AMKA Digital is a systems-first digital solutions division under AMKA Technologies Sdn Bhd. The work sits at the intersection of engineering
                discipline and modern operating infrastructure—built for clarity, repeatability, and operational use.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Pill>Built by engineers</Pill>
                <Pill>Designed for growth</Pill>
                <Pill>Editorial clarity</Pill>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const Origin = () => (
  <Section bg={COLORS.bg} id="origin">
    <div className="about-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>
      <FadeIn>
        <Label>ORIGIN</Label>
        <h2 style={{ fontSize: 34, fontWeight: 700, color: COLORS.navy, lineHeight: 1.25, margin: "0 0 18px", fontFamily: "'Poppins', sans-serif" }}>
          Built inside an engineering business.
          <br />
          Not inside a design studio.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: COLORS.textLight, margin: "0 0 14px", fontFamily: "'DM Sans', sans-serif" }}>
          AMKA Digital began inside an engineering company. The initial problem was not “branding” or “marketing.” It was operational: growth depended too
          heavily on founder time, follow-ups were inconsistent, and the website behaved like a brochure rather than a system.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          The internal infrastructure was built first—pipeline structure, CRM discipline, content architecture, lead capture, and a follow-up loop that could
          run alongside delivery. Once those pieces existed, growth became less emotional and more measurable.
        </p>
      </FadeIn>

      <FadeIn delay={0.12} className="origin-right-offset">
        <Card>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, color: COLORS.saffron, marginBottom: 14, fontFamily: "'DM Mono', monospace" }}>
            A WORKING BELIEF
          </div>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.7, color: COLORS.text, fontFamily: "'DM Sans', sans-serif" }}>
            Systems outlast motivation.
          </p>
          <div style={{ marginTop: 14, fontSize: 13, lineHeight: 1.7, color: COLORS.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
            The goal is infrastructure that holds up under real delivery pressure—not temporary bursts of activity.
          </div>
        </Card>
      </FadeIn>
    </div>
  </Section>
);

const WhatWeBuild = () => {
  const items = [
    { icon: "◉", title: "Websites as credibility systems", desc: "Structured to communicate method, reduce uncertainty, and support decisions." },
    { icon: "◌", title: "CRM pipelines as decision systems", desc: "Stages, ownership, next-actions, and cadence—designed to prevent leakage." },
    { icon: "△", title: "Funnels as capture + nurture loops", desc: "Lead magnets, email capture, sequences, and handoff into pipeline." },
    { icon: "□", title: "Content libraries as proof", desc: "Framework-led publishing that demonstrates thinking without hype." },
  ];

  return (
    <Section bg={COLORS.bgWarm} id="what-we-build">
      <FadeIn>
        <Label>WHAT WE BUILD</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.25, margin: "0 0 42px", fontFamily: "'Poppins', sans-serif" }}>
          Digital operating infrastructure.
        </h2>
      </FadeIn>

      <div className="about-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {items.map((it, i) => (
          <FadeIn key={it.title} delay={i * 0.06}>
            <Card style={{ height: "100%" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.navy,
                  fontSize: 20,
                  marginBottom: 14,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {it.icon}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>{it.title}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: COLORS.textLight, fontFamily: "'DM Sans', sans-serif" }}>{it.desc}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

const Principles = () => {
  const items = [
    {
      title: "Show, don’t claim",
      desc: "Proof artifacts build trust: method, criteria, process, and examples that make competence self-evident.",
    },
    {
      title: "Systems, not projects",
      desc: "A website alone is a surface. A CRM alone is a database. Systems connect surfaces to behaviour: capture, follow-up, renewal, compounding.",
    },
    {
      title: "Editorial clarity",
      desc: "Clear writing is a competitive advantage. It turns expertise into decisions—and content into long-term assets.",
    },
  ];

  return (
    <Section bg={COLORS.bg} id="principles">
      <FadeIn>
        <Label>PRINCIPLES</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.25, margin: "0 0 42px", fontFamily: "'Poppins', sans-serif" }}>
          How AMKA Digital thinks.
        </h2>
      </FadeIn>

      <div className="about-grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {items.map((it, i) => (
          <FadeIn key={it.title} delay={i * 0.06}>
            <Card style={{ height: "100%" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.2, color: COLORS.saffron, marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>
                PRINCIPLE {i + 1}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>{it.title}</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: COLORS.textLight, fontFamily: "'DM Sans', sans-serif" }}>{it.desc}</p>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

const Method = () => {
  const steps = [
    { n: "01", title: "Diagnosis", desc: "Pipeline, visibility, and follow-up mapped. Leakage points identified." },
    { n: "02", title: "System design", desc: "Architecture + build order defined: what to build first, what to sequence later." },
    { n: "03", title: "Build", desc: "Website, CRM, funnels, and supporting infrastructure implemented." },
    { n: "04", title: "Adoption", desc: "Handover structured. Usage rules and cadence standardised." },
    { n: "05", title: "Iteration", desc: "Improvements driven by real behaviour and real constraints." },
  ];

  return (
    <Section bg={COLORS.white} id="method">
      <FadeIn>
        <Label>METHOD</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.25, margin: "0 0 42px", fontFamily: "'Poppins', sans-serif" }}>
          How engagements run.
        </h2>
      </FadeIn>

      <div style={{ maxWidth: 920 }}>
        {steps.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.06}>
            <div
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gap: 14,
                marginBottom: i === steps.length - 1 ? 0 : 12,
                padding: "18px 18px",
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.white,
              }}
            >
              <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: COLORS.bgWarm,
                    border: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.teal,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.4,
                    fontFamily: "'DM Mono', monospace",
                    zIndex: 2,
                  }}
                >
                  {s.n}
                </div>
                {i !== steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 36,
                      width: 1,
                      bottom: -30,
                      background: COLORS.border,
                    }}
                  />
                )}
              </div>

              <div>
                <div style={{ fontSize: 19, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{s.title}</div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: COLORS.textLight, fontFamily: "'DM Sans', sans-serif" }}>{s.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

const Team = () => {
  const members = ["Amirul", "Hafizi", "Musfirah"];

  return (
    <Section bg={COLORS.bgWarm} id="team">
      <FadeIn>
        <div style={{ maxWidth: 760 }}>
          <Label>TEAM</Label>
          <h2 style={{ fontSize: 34, fontWeight: 700, color: COLORS.navy, lineHeight: 1.25, margin: "0 0 16px", fontFamily: "'Poppins', sans-serif" }}>
            A small unit.
            <br />
            Organised around outcomes.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
            AMKA Digital operates as a focused team where roles map to system outcomes rather than generic agency titles.
          </p>

          <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, letterSpacing: 1.6, color: COLORS.teal, fontFamily: "'DM Mono', monospace" }}>
            CORE TEAM
          </div>
          <div className="about-team-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 10 }}>
            {members.map((member) => (
              <Card key={member} style={{ padding: "16px 14px", background: COLORS.white }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: COLORS.saffron, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                  MEMBER
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>
                  {member}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                  AMKA Digital Core Team
                </div>
              </Card>
            ))}
          </div>
        </div>
      </FadeIn>
    </Section>
  );
};

const Relationship = () => (
  <Section bg={COLORS.bg} id="amkatech">
    <FadeIn>
      <div style={{ maxWidth: 760 }}>
        <Label>RELATIONSHIP</Label>
        <h2 style={{ fontSize: 34, fontWeight: 700, color: COLORS.navy, lineHeight: 1.25, margin: "0 0 16px", fontFamily: "'Poppins', sans-serif" }}>
          A division under AMKA Technologies.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          AMKA Digital operates under AMKA Technologies Sdn Bhd. The engineering background shapes the operating style: structured diagnostics, explicit
          criteria, respect for constraints, and an emphasis on repeatable systems.
        </p>
      </div>
    </FadeIn>
  </Section>
);

export default function AboutPage() {
  useEffect(() => {
    document.title = "About | AMKA Digital";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.bg }}>
      <style>{`
        .origin-right-offset { margin-top: 48px; }
        @media (max-width: 980px) {
          .about-grid-2 { grid-template-columns: 1fr !important; }
          .about-grid-3 { grid-template-columns: 1fr !important; }
          .about-team-grid { grid-template-columns: 1fr !important; }
          .origin-right-offset { margin-top: 0 !important; }
        }
      `}</style>
      <SiteHeader />
      <main>
        <AboutHero />
        <Origin />
        <WhatWeBuild />
        <Principles />
        <Method />
        <Team />
        <Relationship />
      </main>
      <SiteFooter />
    </div>
  );
}
