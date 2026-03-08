import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { insights } from "../content/libraryData";
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

function getPartNumber(item) {
  const fromField = item?.part ?? item?.order ?? item?.week;
  if (typeof fromField === "number") return fromField;
  const m = String(item?.slug ?? "").match(/part-(\d+)/i);
  return m ? Number(m[1]) : null;
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function InsightPage() {
  const { slug } = useParams();
  const insight = insights.find((item) => item.slug === slug);
  const [tocOpen, setTocOpen] = useState(false);

  const ordered = useMemo(() => {
    const list = [...insights];
    return list.sort((a, b) => {
      const ao = getPartNumber(a);
      const bo = getPartNumber(b);
      if (typeof ao === "number" && typeof bo === "number") return ao - bo;
      return 0;
    });
  }, []);

  const index = useMemo(() => ordered.findIndex((x) => x.slug === slug), [ordered, slug]);
  const prev = index > 0 ? ordered[index - 1] : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

  const toc = useMemo(() => {
    if (!insight?.sections?.length) return [];
    return insight.sections.map((section) => ({ heading: section.heading, id: slugify(section.heading) }));
  }, [insight]);

  useEffect(() => {
    if (!insight) return;
    document.title = insight?.title ? `${insight.title} | AMKA Digital` : "Insights | AMKA Digital";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug, insight]);

  if (!insight) {
    return (
      <SiteHeaderFooter>
        <main style={{ minHeight: "100vh", background: COLORS.bg, padding: "40px 24px 72px", fontFamily: "DM Sans, sans-serif" }}>
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <h1 style={{ color: COLORS.navy, fontFamily: "Poppins, sans-serif" }}>Insight not found</h1>
            <Link to="/insights" style={{ color: COLORS.teal, fontWeight: 800, textDecoration: "none" }}>
              Back to insights library →
            </Link>
          </div>
        </main>
      </SiteHeaderFooter>
    );
  }

  const part = getPartNumber(insight);
  const partLabel = typeof part === "number" ? `Part ${part} of 8` : "BD Playbook Library";

  return (
    <SiteHeaderFooter>
      <main style={{ minHeight: "100vh", background: COLORS.bg, padding: "28px 24px 72px", fontFamily: "DM Sans, sans-serif" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ marginBottom: 16 }}>
            <Link to="/insights" style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 800 }}>
              ← Back to insights library
            </Link>
          </div>

          <article style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "34px 30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{ color: COLORS.saffron, fontFamily: "DM Mono, monospace", fontWeight: 800, letterSpacing: 1.5, fontSize: 10 }}>
                {(insight.tag ?? "INSIGHT").toUpperCase()}
              </span>
              <span style={{ color: COLORS.textMuted, fontFamily: "DM Mono, monospace", fontSize: 11 }}>{partLabel}</span>
            </div>

            <h1 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, lineHeight: 1.25, margin: "0 0 10px", fontSize: 38, letterSpacing: -0.4 }}>
              {insight.title}
            </h1>

            <p style={{ margin: "0 0 18px", color: COLORS.textLight, fontSize: 16, lineHeight: 1.75, maxWidth: 860 }}>
              {insight.description || insight.hook}
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                alignItems: "center",
                paddingTop: 12,
                borderTop: `1px solid ${COLORS.border}`,
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "DM Mono, monospace" }}>SERIES NAV</span>
              <span style={{ color: COLORS.textMuted }}>·</span>

              {prev ? (
                <Link to={`/insights/${prev.slug}`} style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 800 }}>
                  ← Previous
                </Link>
              ) : (
                <span style={{ color: COLORS.textMuted, fontWeight: 700 }}>← Previous</span>
              )}

              <span style={{ color: COLORS.textMuted }}>·</span>

              {next ? (
                <Link to={`/insights/${next.slug}`} style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 800 }}>
                  Next →
                </Link>
              ) : (
                <span style={{ color: COLORS.textMuted, fontWeight: 700 }}>Next →</span>
              )}

              <span style={{ color: COLORS.textMuted }}>·</span>

              <Link
                to="/insights#playbooks"
                style={{
                  textDecoration: "none",
                  color: COLORS.bgDark,
                  background: COLORS.saffron,
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontWeight: 900,
                  marginLeft: "auto",
                }}
              >
                Jump to Playbooks →
              </Link>
            </div>

            {toc.length > 0 && (
              <div style={{ marginBottom: 22 }}>
                <button
                  type="button"
                  onClick={() => setTocOpen((v) => !v)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.bgWarm,
                    cursor: "pointer",
                    fontWeight: 900,
                    color: COLORS.navy,
                    fontFamily: "DM Sans, sans-serif",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>On this page</span>
                  <span style={{ color: COLORS.textMuted, fontWeight: 900 }}>{tocOpen ? "–" : "+"}</span>
                </button>

                <div style={{ maxHeight: tocOpen ? 480 : 0, overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <div style={{ padding: "12px 14px", border: `1px solid ${COLORS.border}`, borderTop: "none", borderRadius: "0 0 12px 12px", background: COLORS.white }}>
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        style={{
                          display: "block",
                          padding: "10px 10px",
                          borderRadius: 10,
                          textDecoration: "none",
                          color: COLORS.textLight,
                          fontWeight: 800,
                        }}
                      >
                        {item.heading}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {insight.sections?.map((section) => {
              const id = slugify(section.heading);
              return (
                <section key={id} id={id} style={{ marginBottom: 26, scrollMarginTop: 96 }}>
                  <h2 style={{ fontFamily: "Poppins, sans-serif", color: COLORS.navy, fontSize: 22, margin: "0 0 8px", lineHeight: 1.35 }}>
                    {section.heading}
                  </h2>
                  <p style={{ margin: 0, color: COLORS.text, lineHeight: 1.85, whiteSpace: "pre-line", fontSize: 15 }}>
                    {section.body}
                  </p>
                </section>
              );
            })}

            <div style={{ marginTop: 30, paddingTop: 18, borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                {prev ? (
                  <Link to={`/insights/${prev.slug}`} style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 900 }}>
                    ← Previous
                  </Link>
                ) : (
                  <span style={{ color: COLORS.textMuted, fontWeight: 800 }}>← Previous</span>
                )}

                <span style={{ color: COLORS.textMuted }}>·</span>

                {next ? (
                  <Link to={`/insights/${next.slug}`} style={{ textDecoration: "none", color: COLORS.teal, fontWeight: 900 }}>
                    Next →
                  </Link>
                ) : (
                  <span style={{ color: COLORS.textMuted, fontWeight: 800 }}>Next →</span>
                )}

                <Link
                  to="/insights#playbooks"
                  style={{
                    marginLeft: "auto",
                    textDecoration: "none",
                    background: COLORS.bgDark,
                    color: COLORS.white,
                    padding: "12px 16px",
                    borderRadius: 10,
                    fontWeight: 900,
                  }}
                >
                  Download playbooks →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </SiteHeaderFooter>
  );
}
