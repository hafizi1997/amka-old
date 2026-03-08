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
  textMuted: "#7B8898",
  border: "#DCE3EB",
  white: "#FFFFFF",
};

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/amka-technologies/",
  facebook: "https://www.facebook.com/amkatechnologies",
  whatsapp: "https://wa.me/60198176949",
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

const Pill = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      fontSize: 12,
      fontWeight: 800,
      color: COLORS.teal,
      padding: "7px 14px",
      borderRadius: 999,
      background: "#EDF4F4",
      fontFamily: "DM Sans, sans-serif",
    }}
  >
    {children}
  </span>
);

const Btn = ({ href, variant = "primary", children }) => {
  const base = {
    textDecoration: "none",
    padding: "14px 18px",
    borderRadius: 12,
    fontWeight: 900,
    display: "inline-block",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 14,
    whiteSpace: "nowrap",
  };

  if (variant === "primary") {
    return (
      <a href={href} style={{ ...base, background: COLORS.navy, color: COLORS.white }}>
        {children}
      </a>
    );
  }

  if (variant === "saffron") {
    return (
      <a href={href} style={{ ...base, background: COLORS.saffron, color: "#0C1117" }}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} style={{ ...base, background: "transparent", color: COLORS.navy, border: `1.5px solid ${COLORS.border}` }}>
      {children}
    </a>
  );
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    industry: "Select your industry",
    website: "",
    whatYouSell: "",
    goal: "",
    timeline: "Select a timeline",
    preferredChannel: "WhatsApp",
  });

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.company.trim() && form.whatYouSell.trim();
  }, [form]);

  const onChange = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const submitFallback = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`[AMKA Digital] Growth Strategy Request — ${form.company}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Company: ${form.company}`,
        `Role: ${form.role || "-"}`,
        `Industry: ${form.industry}`,
        `Website: ${form.website || "-"}`,
        `What you sell: ${form.whatYouSell}`,
        `Goal: ${form.goal || "-"}`,
        `Timeline: ${form.timeline}`,
        `Preferred channel: ${form.preferredChannel}`,
        "",
        "Notes:",
        "—",
      ].join("\n")
    );

    window.location.href = `mailto:team@amkatechnologies.com?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    document.title = "Talk to Us | AMKA Digital";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <SiteHeaderFooter>
      <style>{`
        @media (max-width: 980px) {
          .contact-grid-2 { grid-template-columns: 1fr !important; }
          .contact-form-grid-2 { grid-template-columns: 1fr !important; }
        }
        .field {
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid ${COLORS.border};
          background: ${COLORS.white};
          color: ${COLORS.text};
          font-size: 14px;
          font-family: DM Sans, sans-serif;
          outline: none;
        }
        .field:focus {
          border-color: ${COLORS.saffron};
          box-shadow: 0 0 0 3px rgba(255,149,44,0.18);
        }
        .helper {
          font-size: 12px;
          color: ${COLORS.textMuted};
          line-height: 1.6;
        }
      `}</style>

      <main style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "DM Sans, sans-serif" }}>
        <section style={{ background: "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)", paddingTop: 150, paddingBottom: 74 }}>
          <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ maxWidth: 920 }}>
              <Label>TALK TO US</Label>

              <h1 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 14px", fontSize: 46, lineHeight: 1.12, letterSpacing: -0.6 }}>
                A short intake.
                <br />
                A clear build order.
              </h1>

              <p style={{ margin: "0 0 18px", fontSize: 16, lineHeight: 1.85, color: COLORS.textLight, maxWidth: 860 }}>
                Tell us what you sell, who you sell to, and where your pipeline leaks. We’ll reply with the 3 systems we would build first—sequenced for your constraints.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
                <Pill>Reply within 1–2 business days</Pill>
                <Pill>Systems-first approach</Pill>
                <Pill>No generic proposal</Pill>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Btn href="#intake" variant="primary">Start the intake →</Btn>
                <Btn href="/insights#playbooks" variant="saffron">Download playbooks →</Btn>
                <Btn href="/insights" variant="secondary">Read frameworks →</Btn>
              </div>
            </div>
          </div>
        </section>

        <Section id="intake" bg={COLORS.bg}>
          <div className="contact-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "stretch" }}>
            <div style={{ display: "grid", gap: 14 }}>
              <Card>
                <Label>DIRECT CHANNELS</Label>

                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 900, color: COLORS.navy }}>WhatsApp</div>
                      <div className="helper">Fastest for quick clarification.</div>
                    </div>
                    <a
                      href={SOCIAL_LINKS.whatsapp}
                      style={{ textDecoration: "none", background: "#25D366", color: COLORS.white, padding: "12px 14px", borderRadius: 12, fontWeight: 900 }}
                    >
                      Message →
                    </a>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 900, color: COLORS.navy }}>Email</div>
                      <div className="helper">Best for structured requests.</div>
                    </div>
                    <a
                      href="mailto:team@amkatechnologies.com"
                      style={{ textDecoration: "none", border: `1px solid ${COLORS.border}`, color: COLORS.navy, padding: "12px 14px", borderRadius: 12, fontWeight: 900, background: COLORS.white }}
                    >
                      Email →
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontFamily: "DM Mono, monospace", fontSize: 11, fontWeight: 900, letterSpacing: 1.6, color: COLORS.saffron, marginBottom: 8 }}>
                    FAST START
                  </div>
                  <div className="helper">
                    If you’re not ready to message, start with the industry playbooks. They show the full system (Part 8).
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <a href="/insights#playbooks" style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 900 }}>
                      Go to playbooks →
                    </a>
                  </div>
                </div>
              </Card>

              <Card style={{ background: COLORS.bgWarm }}>
                <Label>WHAT WE NEED</Label>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    "What you sell (in one sentence)",
                    "Typical client (who signs off / who uses)",
                    "Current pipeline reality (quiet / random / stable)",
                    "Your desired outcome (more inbound / better conversion / follow-up discipline)",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.saffron, marginTop: 8, flexShrink: 0 }} />
                      <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.65 }}>{item}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Label>WHAT HAPPENS NEXT</Label>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    ["01", "We review your inputs and identify leakage."],
                    ["02", "We reply with the suggested build order (3 priorities)."],
                    ["03", "If you want, we book a short call to confirm scope."],
                  ].map(([n, d]) => (
                    <div key={n} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                      <div style={{ fontFamily: "DM Mono, monospace", fontSize: 12, fontWeight: 900, letterSpacing: 1.6, color: COLORS.teal }}>
                        {n}
                      </div>
                      <div style={{ color: COLORS.textLight, fontSize: 14, lineHeight: 1.75 }}>{d}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card style={{ height: "100%" }}>
              <Label>INTAKE FORM</Label>

              <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, margin: "0 0 10px", fontSize: 22, lineHeight: 1.25 }}>
                Free Growth Strategy Intake
              </h2>

              <p className="helper" style={{ marginTop: 0, marginBottom: 16 }}>
                This form opens an email draft on submit for now. You can replace it later with your preferred form provider.
              </p>

              <form onSubmit={submitFallback} style={{ display: "grid", gap: 12 }}>
                <div className="contact-form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input className="field" placeholder="Your name *" value={form.name} onChange={onChange("name")} />
                  <input className="field" type="email" placeholder="Email address *" value={form.email} onChange={onChange("email")} />
                </div>

                <div className="contact-form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input className="field" placeholder="Company name *" value={form.company} onChange={onChange("company")} />
                  <input className="field" placeholder="Your role (optional)" value={form.role} onChange={onChange("role")} />
                </div>

                <div className="contact-form-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <select className="field" value={form.industry} onChange={onChange("industry")}>
                    <option>Select your industry</option>
                    <option>Technical Services</option>
                    <option>Built Environment</option>
                    <option>Training & Consulting</option>
                    <option>Other</option>
                  </select>

                  <select className="field" value={form.timeline} onChange={onChange("timeline")}>
                    <option>Select a timeline</option>
                    <option>Immediately (0–2 weeks)</option>
                    <option>Soon (2–6 weeks)</option>
                    <option>This quarter (6–12 weeks)</option>
                    <option>Exploring</option>
                  </select>
                </div>

                <input className="field" placeholder="Website / LinkedIn (optional)" value={form.website} onChange={onChange("website")} />

                <textarea
                  className="field"
                  placeholder="What do you sell? (one sentence) *"
                  rows={3}
                  value={form.whatYouSell}
                  onChange={onChange("whatYouSell")}
                />

                <textarea
                  className="field"
                  placeholder="What outcome do you want? (more inbound, better conversion, follow-up discipline, etc.)"
                  rows={3}
                  value={form.goal}
                  onChange={onChange("goal")}
                />

                <select className="field" value={form.preferredChannel} onChange={onChange("preferredChannel")}>
                  <option>WhatsApp</option>
                  <option>Email</option>
                </select>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 12,
                    border: "none",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    background: canSubmit ? COLORS.saffron : "#F3D2B4",
                    color: "#0C1117",
                    fontWeight: 900,
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 14,
                  }}
                >
                  Send intake →
                </button>

                <div className="helper">
                  We’ll reply with a suggested build order. No automated spam. No mailing list unless you choose to join later.
                </div>
              </form>
            </Card>
          </div>
        </Section>

        <Section bg={COLORS.bgWarm} id="cta" style={{ padding: "72px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: COLORS.navy, margin: "0 0 6px" }}>
                Prefer to start from templates?
              </h3>
              <p style={{ margin: 0, fontSize: 14, color: COLORS.textLight, lineHeight: 1.7 }}>
                Part 8 includes the industry playbooks and implementation templates.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="/insights#playbooks"
                style={{ fontSize: 14, fontWeight: 900, color: COLORS.bgDark, background: COLORS.saffron, padding: "14px 18px", borderRadius: 12, textDecoration: "none", whiteSpace: "nowrap" }}
              >
                Download playbooks →
              </a>
              <a
                href="/insights"
                style={{ fontSize: 14, fontWeight: 900, color: COLORS.navy, border: `1px solid ${COLORS.border}`, background: COLORS.white, padding: "14px 18px", borderRadius: 12, textDecoration: "none", whiteSpace: "nowrap" }}
              >
                Read frameworks →
              </a>
            </div>
          </div>
        </Section>
      </main>
    </SiteHeaderFooter>
  );
}
