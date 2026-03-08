import { useState, useEffect, useRef } from "react";
import { insights } from "./content/libraryData";
import SiteHeader from "./components/SiteHeader";

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

const PLAYBOOK_URLS = {
  technical: "/playbooks/bd-playbook-technical-services.pdf",
  built: "/playbooks/bd-playbook-built-environment.pdf",
  training: "/playbooks/bd-playbook-training-consulting.pdf",
};

const WHATSAPP_URL = "https://wa.me/60198176949";

const Section = ({ children, bg = COLORS.bg, id, style = {}, fullScreen = true, snap = fullScreen }) => (
  <section
    id={id}
    style={{
      background: bg,
      padding: fullScreen ? "72px 0 0 0" : "100px 0",
      minHeight: fullScreen ? "100vh" : "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: fullScreen ? "center" : "flex-start",
      alignItems: "stretch",
      boxSizing: "border-box",
      scrollSnapAlign: snap ? "start" : "none",
      scrollSnapStop: snap && fullScreen ? "always" : "normal",
      ...style,
    }}
  >
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", width: "100%" }}>{children}</div>
  </section>
);

const Label = ({ children, color = COLORS.teal }) => (
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
    {children}
  </div>
);

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
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

const Hero = () => (
  <section
    style={{
      background: "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      paddingTop: 72,
      boxSizing: "border-box",
      scrollSnapAlign: "start",
      scrollSnapStop: "always",
    }}
  >
    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", width: "100%" }}>
      <div>
      <FadeIn>
        <Label>DIGITAL SYSTEMS FOR PROFESSIONAL SERVICES</Label>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            color: COLORS.navy,
            margin: "0 0 24px",
            fontFamily: "'Poppins', sans-serif",
            maxWidth: 780,
            letterSpacing: -0.5,
          }}
        >
          Your expertise grows businesses.
          <br />
          <span style={{ fontWeight: 600, color: COLORS.teal }}>We build the systems</span> behind that growth.
        </h1>
      </FadeIn>

      <FadeIn delay={0.18}>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: COLORS.textLight, maxWidth: 700, margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif" }}>
          Websites that sell credibility, CRM pipelines that don’t leak leads, and content systems that keep working while you deliver — built for Malaysian
          specialist firms.
        </p>
      </FadeIn>

      <FadeIn delay={0.22}>
        <p style={{ fontSize: 13, color: COLORS.textMuted, margin: "0 0 36px", fontFamily: "'DM Sans', sans-serif" }}>
          Show, don’t claim — systems that demonstrate trust before the first meeting.
        </p>
      </FadeIn>

      <FadeIn delay={0.28}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="/insights#playbooks"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.white,
              background: COLORS.navy,
              padding: "14px 30px",
              borderRadius: 10,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Download Your Industry Playbook →
          </a>
          <a
            href="#contact"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.navy,
              background: "transparent",
              padding: "14px 30px",
              borderRadius: 10,
              textDecoration: "none",
              border: `1.5px solid ${COLORS.border}`,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Book a Free Growth Strategy →
          </a>
        </div>
      </FadeIn>
      </div>
      </div>
    </div>

    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px 24px", width: "100%" }}>
      <FadeIn delay={0.36}>
        <div style={{ paddingTop: 24, borderTop: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Practical growth tips</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
              Follow our WhatsApp Channel for quick ideas and useful resources &mdash; no spam.
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.white,
              background: "#25D366",
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Join WhatsApp Channel →
          </a>
        </div>
      </FadeIn>
    </div>
  </section>
);

const Problem = () => (
  <Section bg={COLORS.bgDark} id="problem" fullScreen>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
      <FadeIn>
        <Label color={COLORS.saffron}>THE PROBLEM WE SOLVE</Label>
        <h2 style={{ fontSize: 34, fontWeight: 700, color: COLORS.white, lineHeight: 1.3, margin: "0 0 24px", fontFamily: "'Poppins', sans-serif" }}>
          Your pipeline shouldn’t depend on whether you had time to market this month.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#D3E2ED", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
          Most specialist firms swing between too much work and too little. When delivery gets busy, marketing stops. When marketing stops, the pipeline
          empties. Then you scramble.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#D3E2ED", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          This cycle has a name — <em style={{ color: COLORS.saffron }}>porpoising</em> — and the fix isn’t “more marketing.” It’s a system that grows
          pipeline while you deliver.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Founder’s Trap", desc: "You’re too busy doing the work to find the next work." },
            { label: "Invisible Expertise", desc: "You’re excellent, but the market can’t see it before meeting you." },
            { label: "Scattered Systems", desc: "Follow-ups live in someone’s head. Deals slip quietly." },
          ].map((item) => (
            <div key={item.label} style={{ padding: "24px 28px", borderRadius: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.white, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
              <div style={{ fontSize: 14, color: "#C7D9E7", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </Section>
);

const Services = () => {
  const services = [
    {
      icon: "◉",
      title: "CRM & Pipeline Systems",
      desc: "A CRM pipeline designed around how you actually sell — stages, follow-up rules, handover, and visibility. Not a template you abandon.",
      example: "Move from “contacts in WhatsApp” to a trackable pipeline with next-actions and follow-up discipline.",
    },
    {
      icon: "◌",
      title: "Websites That Convert",
      desc: "Not a brochure. A site that answers your prospect’s real question: “Can these people solve my problem?” Built for credibility, conversion, and SEO.",
      example: "Problem-led pages + proof-led structure + conversion paths.",
    },
    {
      icon: "△",
      title: "Digital Growth Strategy",
      desc: "Before you spend a ringgit on marketing, get a clear build order. We audit your funnel, identify leaks, then prioritise the 90-day roadmap.",
      example: "Most companies don’t need more marketing — they need to fix what makes marketing ineffective.",
    },
    {
      icon: "□",
      title: "Lead Funnels & Content Systems",
      desc: "Turn expertise into compounding visibility. Content infrastructure, lead capture, nurture sequences, and assets prospects actually download.",
      example: "Publish once → distribute everywhere → capture leads → follow up automatically.",
    },
  ];

  return (
    <Section id="services" fullScreen>
      <FadeIn>
        <Label>WHAT WE BUILD</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 40px", maxWidth: 620, fontFamily: "'Poppins', sans-serif" }}>
          Digital systems, not just digital deliverables.
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {services.map((service, i) => (
          <FadeIn key={service.title} delay={i * 0.08}>
            <div style={{ padding: "28px 28px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}`, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.navy, fontSize: 18, marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>{service.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: COLORS.textLight, margin: "0 0 16px", fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{service.desc}</p>
              <div style={{ padding: "12px 14px", borderRadius: 8, background: COLORS.bgWarm, borderLeft: `3px solid ${COLORS.saffron}` }}>
                <p style={{ fontSize: 12, lineHeight: 1.55, color: COLORS.text, margin: 0, fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>{service.example}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

const Industries = () => {
  const industries = ["Technical Services", "Built Environment", "Training & Consulting"];
  const sharedProblems = [
    "Pipeline that dries up between projects or cycles",
    "Competing on price instead of positioning",
    "Content and expertise that never converts to leads",
    "No system to track relationships or follow-up",
  ];

  return (
    <Section bg={COLORS.bgWarm} id="industries" fullScreen>
      <FadeIn>
        <Label>WHO WE WORK WITH</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 16px", fontFamily: "'Poppins', sans-serif" }}>
          Three industries. One shared constraint.
        </h2>
      </FadeIn>
      <FadeIn delay={0.08}>
        <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
          {industries.map((name) => (
            <span key={name} style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: COLORS.white, color: COLORS.navy, border: `1px solid ${COLORS.border}` }}>
              {name}
            </span>
          ))}
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
        <FadeIn delay={0.12}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.navy, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
              Across all three, the same pattern keeps showing up:
            </h3>
            {sharedProblems.map((problem) => (
              <div key={problem} style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                <p style={{ fontSize: 15, lineHeight: 1.65, color: COLORS.text, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{problem}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.18}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.teal, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>What we build instead</h3>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>
              A connected system &mdash; CRM, website, and content &mdash; designed around how professional services actually win work: through trust, visibility, and consistent follow-up.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textLight, fontFamily: "'DM Sans', sans-serif" }}>
              Not templates. Not campaigns. A growth engine built for your sales cycle, your buyer, and your expertise.
            </p>
            <a href="/industries" style={{ display: "inline-block", marginTop: 24, fontSize: 14, fontWeight: 600, color: COLORS.teal, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", borderBottom: `2px solid ${COLORS.teal}`, paddingBottom: 2 }}>
              See how it applies to your industry &rarr;
            </a>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
};

const Playbooks = () => {
  const packs = [
    {
      slug: "technical-services",
      title: "The Business Development Playbook for Malaysian Technical Services Companies",
      subtitle: "Condition Monitoring · Testing & Inspection · Maintenance · Engineering Consultancy",
      who: "Specialist firms selling expertise into facilities — where trust and follow-up matter more than “ads.”",
      learn: [
        "The N × B × F engine (and targets that make growth predictable)",
        "The Trust Equation (how credibility becomes purchase orders)",
        "A sales process built for technical buyers (not generic sales advice)",
        "A content engine that makes your expertise visible before meetings",
      ],
      cta: "Download Technical Services Playbook →",
      href: PLAYBOOK_URLS.technical,
    },
    {
      slug: "built-environment",
      title: "The Business Development Playbook for Built Environment Professionals",
      subtitle: "Architecture · Quantity Surveying · M&E · Project Management",
      who: "Practices that want to stop being tender commodities and start being appointed for trust and methodology.",
      learn: [
        "Positioning that moves you upstream (adviser vs vendor)",
        "Relationship tracking across long project cycles",
        "Proof-led visibility: what to publish, what to show, what to stop claiming",
      ],
      cta: "Download Built Environment Playbook →",
      href: PLAYBOOK_URLS.built,
    },
    {
      slug: "training-consulting",
      title: "The Business Development Playbook for Training & Consulting Professionals",
      subtitle: "Corporate Trainers · Business Coaches · HR Consultants · Consultancies",
      who: "Practitioners who want predictable cohorts and programme sales, not random workshop bookings.",
      learn: [
        "How to sell programmes (not days)",
        "Lead capture + nurture that fills calendars without chasing",
        "Pipeline structure for HR/L&D decision cycles",
      ],
      cta: "Download Training & Consulting Playbook →",
      href: PLAYBOOK_URLS.training,
    },
  ];

  return (
    <Section id="playbooks" bg={COLORS.white} fullScreen>
      <FadeIn>
        <Label>PLAYBOOKS</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 18px", fontFamily: "'Poppins', sans-serif" }}>
          Download a Playbook
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p style={{ fontSize: 14, lineHeight: 1.75, color: COLORS.textMuted, maxWidth: 760, margin: "0 0 34px", fontFamily: "'DM Sans', sans-serif" }}>
          Choose the version for your industry. Each playbook translates proven professional services BD frameworks into an implementation-ready system.
        </p>
      </FadeIn>

      <div style={{ display: "grid", gap: 20 }}>
        {packs.map((pack, index) => (
          <FadeIn key={pack.title} delay={index * 0.08}>
            <div style={{ padding: "30px 28px", borderRadius: 12, border: `1px solid ${COLORS.border}`, background: COLORS.bg }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.4, color: COLORS.navy, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>{pack.title}</h3>
              <div style={{ fontSize: 12, color: COLORS.textMuted, letterSpacing: 0.4, marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>{pack.subtitle}</div>
              <p style={{ margin: "0 0 14px", color: COLORS.textLight, lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: COLORS.text }}>Who it’s for:</strong> {pack.who}
              </p>

              <div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: COLORS.teal, marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>WHAT YOU’LL LEARN</div>
                  {pack.learn.map((point) => (
                    <div key={point} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                      <p style={{ margin: 0, lineHeight: 1.6, color: COLORS.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                <a href="/insights#playbooks" style={{ display: "inline-block", fontSize: 14, fontWeight: 700, color: COLORS.navy, background: "transparent", borderRadius: 8, textDecoration: "none", padding: "11px 18px", border: `1px solid ${COLORS.border}`, fontFamily: "'DM Sans', sans-serif" }}>
                  View in insights
                </a>
                <a href={pack.href} style={{ display: "inline-block", fontSize: 14, fontWeight: 700, color: COLORS.bgDark, background: COLORS.saffron, borderRadius: 8, textDecoration: "none", padding: "12px 22px", fontFamily: "'DM Sans', sans-serif" }}>
                  {pack.cta}
                </a>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

const Proof = () => {
  const cases = [
    {
      title: "Welding Management System",
      broken: "Paper tracking + compliance gaps",
      system: "Digital workflow + reporting",
      change: "Reporting time cut, fewer misses",
      tags: ["Web App", "Process"],
    },
    {
      title: "CRM Integration",
      broken: "3 tools + no single pipeline view",
      system: "One pipeline + stage definitions + follow-up rules",
      change: "Clear opportunity visibility and consistent follow-ups",
      tags: ["CRM", "Workflow"],
    },
    {
      title: "Secretary Services Platform",
      broken: "Manual onboarding + document chasing",
      system: "Onboarding + document management + status tracking",
      change: "Less back-and-forth, smoother delivery",
      tags: ["Platform", "Automation"],
    },
    {
      title: "E-Commerce Platform",
      broken: "Disconnected inventory + weak tracking",
      system: "Storefront + inventory sync + conversion tracking",
      change: "Faster operations and measurable performance",
      tags: ["E-Commerce", "Web"],
    },
  ];

  return (
    <Section bg={COLORS.bgWarm} id="proof" fullScreen>
      <FadeIn>
        <Label>OUR PROOF</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 50px", fontFamily: "'Poppins', sans-serif" }}>
          Systems we’ve built. Results that followed.
        </h2>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {cases.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08}>
            <div style={{ padding: "30px 26px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}`, height: "100%" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {item.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: COLORS.teal, padding: "4px 10px", borderRadius: 4, background: "#EDF4F4", fontFamily: "'DM Mono', monospace" }}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, margin: "0 0 14px", fontFamily: "'DM Sans', sans-serif" }}>{item.title}</h3>
              <p style={{ margin: "0 0 8px", color: COLORS.textLight, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: COLORS.text }}>Broken:</strong> {item.broken}
              </p>
              <p style={{ margin: "0 0 8px", color: COLORS.textLight, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: COLORS.text }}>System:</strong> {item.system}
              </p>
              <p style={{ margin: 0, color: COLORS.textLight, fontSize: 14, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                <strong style={{ color: COLORS.text }}>Change:</strong> {item.change}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};

const Insights = () => {
  const posts = insights.slice(0, 3);

  return (
    <Section bg={COLORS.bg} id="insights" fullScreen>
      <FadeIn>
        <Label>INSIGHTS</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 10px", fontFamily: "'Poppins', sans-serif" }}>
          The BD Playbook Library
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textMuted, margin: "0 0 34px", maxWidth: 760, fontFamily: "'DM Sans', sans-serif" }}>
          Featured articles from our BD Playbook Library. Explore the full seven-article collection on the dedicated insights page.
        </p>
      </FadeIn>

      <FadeIn delay={0.12}>
        <a href="/insights" style={{ display: "inline-block", margin: "0 0 24px", textDecoration: "none", color: COLORS.teal, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
          View full insights library →
        </a>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {posts.map((post, i) => (
          <FadeIn key={post.title} delay={i * 0.06}>
            <div style={{ padding: "30px 24px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}`, height: "100%", display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: COLORS.saffron, fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>{post.tag}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: COLORS.navy, margin: "0 0 10px", lineHeight: 1.35, fontFamily: "'DM Sans', sans-serif" }}>{post.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif", flex: 1 }}>{post.hook}</p>
              <a href={`/insights/${post.slug}`} style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: COLORS.teal, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>
                Read article →
              </a>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.25}>
        <div style={{ marginTop: 42, padding: "34px 40px", borderRadius: 14, background: COLORS.bgDark, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.white, margin: "0 0 8px", fontFamily: "'Poppins', sans-serif" }}>Download your industry playbook</h3>
            <p style={{ fontSize: 14, color: "#C7D9E7", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Get the full system + templates in one PDF.</p>
          </div>
          <a href="/insights#playbooks" style={{ fontSize: 14, fontWeight: 700, color: COLORS.bgDark, background: COLORS.saffron, padding: "14px 28px", borderRadius: 8, textDecoration: "none", whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>
            Choose your playbook →
          </a>
        </div>
      </FadeIn>
    </Section>
  );
};

const About = () => (
  <Section bg={COLORS.bgWarm} id="about" fullScreen>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
      <FadeIn>
        <Label>ABOUT AMKA DIGITAL</Label>
        <h2 style={{ fontSize: 34, fontWeight: 700, color: COLORS.navy, lineHeight: 1.35, margin: "0 0 24px", fontFamily: "'Poppins', sans-serif" }}>
          Built by engineers.
          <br />
          Designed for growth.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.textLight, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>
          AMKA Digital is the digital solutions division of AMKA Technologies. We didn’t start as a digital agency — we started as a professional services
          business that needed better systems to grow.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
          That heritage means we think in workflows, trust, and compounding — not “pretty pages.” We build digital infrastructure that fits how your
          business actually operates.
        </p>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ padding: "28px 24px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>Our Thinking</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
              Synthesised from proven professional services BD frameworks and translated into systems.
            </p>
          </div>
          <div style={{ padding: "28px 24px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>Our Principle</h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.textLight, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Show, don’t claim.</p>
          </div>
          <div style={{ padding: "28px 24px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.navy, margin: "0 0 12px", fontFamily: "'DM Sans', sans-serif" }}>Our Services</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["CRM Setup", "Website Design", "Lead Funnels", "Content Systems", "Strategy"].map((service) => (
                <span key={service} style={{ fontSize: 12, fontWeight: 500, color: COLORS.teal, padding: "6px 14px", borderRadius: 6, background: "#EDF4F4", fontFamily: "'DM Sans', sans-serif" }}>
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </Section>
);

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      q: "Do you only build websites?",
      a: "No. We build digital systems — websites are one part. Our work typically includes CRM setup, lead funnels, content systems, and digital strategy.",
    },
    {
      q: "Who do you usually work with?",
      a: "Technical services firms, built environment practices, and training & consulting firms where expertise is the product.",
    },
    {
      q: "Do you offer fixed pricing?",
      a: "We scope based on outcomes and complexity, then provide a clear scope, timeline, and deliverables before work starts.",
    },
    {
      q: "How long does a typical project take?",
      a: "Website: 4–6 weeks. CRM setup: 2–4 weeks. Full system implementation: typically 8–12 weeks.",
    },
    {
      q: "Can we build this ourselves?",
      a: "Yes — the tools are easy. The hard part is the system design, adoption, and follow-up discipline. We shorten the trial-and-error and build something your team actually uses.",
    },
    {
      q: "Do you work with small teams or solo founders?",
      a: "Yes. Many engagements start with a founder-led pipeline and evolve into a team system once the process is stable.",
    },
  ];

  return (
    <Section bg={COLORS.white} id="faq" fullScreen>
      <FadeIn>
        <Label>FREQUENTLY ASKED</Label>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 48px", maxWidth: 560, fontFamily: "'Poppins', sans-serif" }}>
          Answers before you get started.
        </h2>
      </FadeIn>

      <div style={{ maxWidth: 760 }}>
        {faqs.map((faq, i) => (
          <FadeIn key={faq.q} delay={i * 0.04}>
            <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "24px 0", cursor: "pointer", background: "none", border: "none", textAlign: "left" }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.navy, fontFamily: "'DM Sans', sans-serif", paddingRight: 24 }}>{faq.q}</span>
                <span style={{ fontSize: 20, color: COLORS.textMuted, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
                  +
                </span>
              </button>
              <div style={{ maxHeight: open === i ? 320 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: COLORS.textLight, margin: "0 0 24px", fontFamily: "'DM Sans', sans-serif", paddingRight: 60 }}>{faq.a}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};


const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/amka-technologies/",
  facebook: "https://www.facebook.com/amkatechnologies",
  whatsapp: "https://wa.me/60198176949",
};

const Contact = () => {
  const [email, setEmail] = useState("");
  const [barVisible, setBarVisible] = useState(false);
  const sectionRef = useRef();
  const year = new Date().getFullYear();

  useEffect(() => {
    let inView = false;

    // Track when Contact section is in view
    const obs = new IntersectionObserver(
      ([entry]) => { inView = entry.isIntersecting; },
      { threshold: 0.6 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    // On any downward scroll gesture while section is in view, reveal bar
    const onWheel = (e) => {
      if (inView && e.deltaY > 0) setBarVisible(true);
    };
    const onTouch = (() => {
      let startY = 0;
      return {
        start: (e) => { startY = e.touches[0].clientY; },
        move: (e) => {
          if (inView && e.touches[0].clientY < startY - 10) setBarVisible(true);
        },
      };
    })();

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch.start, { passive: true });
    window.addEventListener("touchmove", onTouch.move, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch.start);
      window.removeEventListener("touchmove", onTouch.move);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: COLORS.bgWarm,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: 72,
        boxSizing: "border-box",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <FadeIn>
              <Label color={COLORS.saffron}>GET STARTED</Label>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, margin: "0 0 24px", fontFamily: "'Poppins', sans-serif" }}>
                Let's talk about what your business actually needs.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: COLORS.textLight, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>
                No pitch deck. No generic proposal. We start with your pipeline, your visibility, and where a system would create the biggest lift.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace", minWidth: 60 }}>Email</span>
                  <a href="mailto:team@amkatechnologies.com" style={{ fontSize: 14, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>team@amkatechnologies.com</a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace", minWidth: 60 }}>Phone</span>
                  <a href="tel:+60198176949" style={{ fontSize: 14, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", textDecoration: "none" }}>+6019-817 6949 (Hafizi)</a>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace", minWidth: 60, paddingTop: 2 }}>Address</span>
                  <span style={{ fontSize: 14, color: COLORS.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
                    Bangunan Cube Self Storage, 2A, Jalan 51a/243,<br />Seksyen 51a, 46100 Petaling Jaya, Selangor, Malaysia
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 24, display: "flex", gap: 16, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace", letterSpacing: 1, textTransform: "uppercase" }}>Follow</span>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: COLORS.navy, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>LinkedIn</a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: COLORS.navy, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Facebook</a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: COLORS.navy, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>WhatsApp</a>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ padding: "36px 32px", borderRadius: 14, background: COLORS.white, border: `1px solid ${COLORS.border}` }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: COLORS.navy, margin: "0 0 8px", fontFamily: "'DM Sans', sans-serif" }}>Book a Free Growth Strategy</h3>
                <p style={{ fontSize: 13, color: COLORS.textLight, margin: "0 0 24px", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                  Tell us your company + what you sell. We'll reply with a suggested build order.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input className="contact-form-field" placeholder="Your name" style={{ padding: "14px 16px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.bg, color: COLORS.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                  <input
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="contact-form-field"
                    style={{ padding: "14px 16px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.bg, color: COLORS.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                  />
                  <input className="contact-form-field" placeholder="Company name" style={{ padding: "14px 16px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.bg, color: COLORS.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                  <select className="contact-form-field contact-form-select" style={{ padding: "14px 16px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.bg, color: COLORS.textLight, fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "auto" }}>
                    <option>Select your industry</option>
                    <option>Technical Services</option>
                    <option>Built Environment</option>
                    <option>Training & Consulting</option>
                    <option>Other</option>
                  </select>
                  <button style={{ padding: "14px 24px", borderRadius: 8, border: "none", cursor: "pointer", background: COLORS.saffron, color: COLORS.bgDark, fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", marginTop: 4 }}>
                    Book a Free Growth Strategy &rarr;
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        opacity: barVisible ? 1 : 0,
        transform: barVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        borderTop: `1px solid ${COLORS.border}`,
        padding: "20px 32px",
        maxWidth: 1140,
        margin: "0 auto",
        width: "100%",
      }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <img src="/brand/logos/amka-digital-logo-light.png" alt="AMKA Digital" style={{ width: 82, display: "block" }} />
              <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                A division of AMKA Technologies Sdn Bhd (1535682-T) &middot; &copy; {year}
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a href="#" style={{ fontSize: 12, color: COLORS.textMuted, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Terms</a>
              <span style={{ color: COLORS.border }}>|</span>
              <a href="#" style={{ fontSize: 12, color: COLORS.textMuted, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>Privacy</a>
              <span style={{ color: COLORS.border }}>|</span>
              <a href={WHATSAPP_URL} style={{ fontSize: 12, color: "#25D366", textDecoration: "none", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Join WhatsApp Channel</a>
            </div>
          </div>
        </div>
    </section>
  );
};

export default function AMKADigitalRedesign() {
  useEffect(() => {
    document.title = "Home | AMKA Digital";
  }, []);

  useEffect(() => {
    const prevHtmlSnap = document.documentElement.style.scrollSnapType;
    const prevBodySnap = document.body.style.scrollSnapType;

    document.documentElement.style.scrollSnapType = "y mandatory";
    document.body.style.scrollSnapType = "";

    return () => {
      document.documentElement.style.scrollSnapType = prevHtmlSnap;
      document.body.style.scrollSnapType = prevBodySnap;
    };
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.bg }}>
      <SiteHeader />
      <Hero />
      <Problem />
      <Services />
      <Industries />
      <Proof />
      <Insights />
      <About />
      <FAQ />
      <Contact />
    </div>
  );
}
