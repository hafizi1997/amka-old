import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { insights, playbooks } from "../content/libraryData";

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

const TEMPLATE_1 = "/templates/nbf-growth-planner.csv";
const TEMPLATE_2 = "/templates/pipeline-followup-cadence.csv";
const LIBRARY_CARDS_PER_PAGE = 6;

const NICHE_OPTIONS = {
  "technical-services": ["Condition Monitoring", "Testing & Inspection", "Maintenance Services", "Engineering Consultancy"],
  "built-environment": ["Architecture", "Quantity Surveying", "M&E Engineering", "Project Management"],
  "training-consulting": ["Corporate Training", "Business Coaching", "HR Consulting", "Management Consulting"],
};

const Section = ({ children, bg = COLORS.bg, id, style = {} }) => (
  <section id={id} style={{ background: bg, padding: "92px 0", scrollMarginTop: 96, ...style }}>
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>{children}</div>
  </section>
);

const Label = ({ children, color = COLORS.teal }) => (
  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
    {children}
  </div>
);

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), { threshold: 0.15 });
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

const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 14px",
      borderRadius: 999,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      border: `1px solid ${active ? COLORS.navy : COLORS.border}`,
      background: active ? COLORS.navy : COLORS.white,
      color: active ? COLORS.white : COLORS.textLight,
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    {children}
  </button>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "26px 22px", ...style }}>
    {children}
  </div>
);

function getPartNumberFromSlug(slug) {
  if (!slug) return null;
  const match = slug.match(/part-(\d+)/i);
  return match ? Number(match[1]) : null;
}

function normalizeTag(tag) {
  const value = (tag || "").trim().toLowerCase();
  if (!value) return "all";
  if (value.includes("mind")) return "mindset";
  if (value.includes("frame")) return "framework";
  if (value.includes("tactic")) return "tactical";
  if (value.includes("system") || value.includes("process")) return "system";
  return value;
}

export default function InsightsIndexPage() {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [roadmapIndex, setRoadmapIndex] = useState(0);
  const [libraryPage, setLibraryPage] = useState(1);
  const [isPlaybookModalOpen, setIsPlaybookModalOpen] = useState(false);
  const [isPlaybookUnlocked, setIsPlaybookUnlocked] = useState(false);
  const [playbookFormError, setPlaybookFormError] = useState("");
  const [playbookForm, setPlaybookForm] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    niche: "",
  });

  useEffect(() => {
    document.title = "Insights | AMKA Digital";
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("amka_playbook_unlocked");
      if (saved === "true") setIsPlaybookUnlocked(true);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsPlaybookModalOpen(false);
    };

    if (isPlaybookModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isPlaybookModalOpen]);

  useEffect(() => {
    const scrollToHashSection = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.replace("#", "");
      const target = document.getElementById(targetId);
      if (!target) return;

      const headerOffset = 92;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    };

    const timer = window.setTimeout(scrollToHashSection, 60);
    window.addEventListener("hashchange", scrollToHashSection);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHashSection);
    };
  }, []);

  const sortedInsights = useMemo(() => {
    const list = [...insights];
    return list.sort((a, b) => {
      const ao = a.order ?? a.part ?? getPartNumberFromSlug(a.slug);
      const bo = b.order ?? b.part ?? getPartNumberFromSlug(b.slug);
      if (typeof ao === "number" && typeof bo === "number") return ao - bo;
      return 0;
    });
  }, []);

  const seriesRoadmap = useMemo(() => {
    const withParts = sortedInsights
      .map((post) => ({ ...post, _part: post.part ?? getPartNumberFromSlug(post.slug) }))
      .filter((post) => typeof post._part === "number")
      .sort((a, b) => a._part - b._part);

    if (withParts.length >= 7) return withParts.filter((post) => post._part >= 1 && post._part <= 7);
    return sortedInsights.slice(0, 7).map((post, index) => ({ ...post, _part: index + 1 }));
  }, [sortedInsights]);

  useEffect(() => {
    if (!seriesRoadmap.length) return;
    if (roadmapIndex > seriesRoadmap.length - 1) setRoadmapIndex(0);
  }, [seriesRoadmap, roadmapIndex]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortedInsights.filter((post) => {
      const tag = normalizeTag(post.tag);
      const matchesTag = tagFilter === "all" ? true : tag === tagFilter;
      const matchesQuery = !needle ? true : `${post.title ?? ""} ${post.hook ?? ""}`.toLowerCase().includes(needle);
      return matchesTag && matchesQuery;
    });
  }, [sortedInsights, query, tagFilter]);

  const totalLibraryPages = Math.max(1, Math.ceil(filtered.length / LIBRARY_CARDS_PER_PAGE));

  useEffect(() => {
    setLibraryPage(1);
  }, [query, tagFilter]);

  useEffect(() => {
    if (libraryPage > totalLibraryPages) setLibraryPage(totalLibraryPages);
  }, [libraryPage, totalLibraryPages]);

  const paginatedFiltered = useMemo(() => {
    const start = (libraryPage - 1) * LIBRARY_CARDS_PER_PAGE;
    return filtered.slice(start, start + LIBRARY_CARDS_PER_PAGE);
  }, [filtered, libraryPage]);

  const handlePlaybookFormChange = (field, value) => {
    setPlaybookFormError("");
    setPlaybookForm((prev) => {
      if (field === "industry") {
        return { ...prev, industry: value, niche: "" };
      }
      return { ...prev, [field]: value };
    });
  };

  const handlePlaybookUnlock = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!playbookForm.name.trim() || !playbookForm.email.trim() || !playbookForm.company.trim() || !playbookForm.industry || !playbookForm.niche) {
      setPlaybookFormError("Please complete all fields before downloading playbooks.");
      return;
    }

    if (!emailPattern.test(playbookForm.email.trim())) {
      setPlaybookFormError("Please enter a valid email address.");
      return;
    }

    try {
      window.localStorage.setItem("amka_playbook_unlocked", "true");
      window.localStorage.setItem(
        "amka_playbook_lead",
        JSON.stringify({
          ...playbookForm,
          submittedAt: new Date().toISOString(),
        })
      );
    } catch {
      // ignore storage errors
    }

    setIsPlaybookUnlocked(true);
    setPlaybookFormError("");
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: COLORS.bg }}>
      <style>{`
        @media (max-width: 980px) {
          .insights-controls-grid { grid-template-columns: 1fr !important; }
          .insights-cards-grid { grid-template-columns: 1fr !important; }
          .playbook-form-grid { grid-template-columns: 1fr !important; }
        }
        .insight-title-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .insight-hook-clamp {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          overflow: hidden;
        }
      `}</style>
      <SiteHeader />

      <section style={{ background: "linear-gradient(180deg, #F7F8FA 0%, #EEF3F8 100%)", paddingTop: 150, paddingBottom: 70 }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px" }}>
          <FadeIn>
            <Label>INSIGHTS</Label>
          </FadeIn>

          <FadeIn delay={0.06}>
            <h1 style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.12, color: COLORS.navy, margin: "0 0 14px", fontFamily: "'Poppins', sans-serif", letterSpacing: -0.6 }}>
              Insights & Playbook Library
            </h1>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: COLORS.textLight, margin: "0 0 22px", maxWidth: 860 }}>
              Practical growth insights, implementation frameworks, and downloadable playbooks for professional services teams.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section bg={COLORS.white} id="series" style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <FadeIn>
          <Label>SERIES ROADMAP</Label>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 style={{ fontSize: 38, fontWeight: 700, color: COLORS.navy, margin: "0 0 10px", fontFamily: "'Poppins', sans-serif", lineHeight: 1.15 }}>
            Start here: Part 1 → Part 7
          </h2>
          <p style={{ margin: "0 0 24px", color: COLORS.textLight, fontSize: 15, lineHeight: 1.7, maxWidth: 820 }}>
            Follow the sequence in order to build a complete growth system, then move to Part 8 for implementation playbooks.
          </p>
        </FadeIn>

        {seriesRoadmap.length > 0 && (
          <>
            <FadeIn delay={0.1}>
              <Card style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, maxWidth: 920, padding: "30px 28px", margin: "0 auto", height: 260, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: COLORS.saffron, fontFamily: "'DM Mono', monospace" }}>
                    {(seriesRoadmap[roadmapIndex].tag ?? "INSIGHT").toUpperCase()}
                  </span>
                  <span style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace" }}>
                    Part {seriesRoadmap[roadmapIndex]._part ?? roadmapIndex + 1} of 8
                  </span>
                </div>

                <div style={{ fontSize: 40 - 14, fontWeight: 700, color: COLORS.navy, lineHeight: 1.3, marginBottom: 10, fontFamily: "'Poppins', sans-serif", minHeight: 68 }}>
                  {seriesRoadmap[roadmapIndex].title}
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.textLight, minHeight: 64 }}>
                  {seriesRoadmap[roadmapIndex].hook}
                </div>

                <Link
                  to={`/insights/${seriesRoadmap[roadmapIndex].slug}`}
                  style={{ display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 700, color: COLORS.teal, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Read part →
                </Link>
              </Card>
            </FadeIn>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 12 }}>
              <button
                onClick={() => setRoadmapIndex((prev) => (prev === 0 ? seriesRoadmap.length - 1 : prev - 1))}
                style={{ border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 700, fontSize: 18 - 4 }}
              >
                ← Prev
              </button>
              <button
                onClick={() => setRoadmapIndex((prev) => (prev === seriesRoadmap.length - 1 ? 0 : prev + 1))}
                style={{ border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontWeight: 700, fontSize: 18 - 4 }}
              >
                Next →
              </button>
            </div>
          </>
        )}

        <FadeIn delay={0.25}>
          <div style={{ marginTop: 22, fontSize: 13, color: COLORS.textMuted, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>
            Part 8: downloadable playbooks are now included below in this page.
          </div>
        </FadeIn>
      </Section>

      <Section bg={COLORS.bg} id="library">
        <div>
            <FadeIn>
              <Label>LIBRARY</Label>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: COLORS.navy, margin: 0, fontFamily: "'Poppins', sans-serif" }}>
                  All articles
                </h2>
                <button
                  onClick={() => setIsPlaybookModalOpen(true)}
                  style={{ border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, padding: "10px 14px", borderRadius: 9, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                >
                  Playbook quick access
                </button>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="insights-controls-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by title or hook…"
                  style={{
                    padding: "14px 14px",
                    borderRadius: 10,
                    border: `1px solid ${COLORS.border}`,
                    background: COLORS.white,
                    fontSize: 14,
                    outline: "none",
                    color: COLORS.text,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
                <Chip active={tagFilter === "all"} onClick={() => setTagFilter("all")}>All</Chip>
                <Chip active={tagFilter === "mindset"} onClick={() => setTagFilter("mindset")}>Mindset</Chip>
                <Chip active={tagFilter === "framework"} onClick={() => setTagFilter("framework")}>Framework</Chip>
                <Chip active={tagFilter === "tactical"} onClick={() => setTagFilter("tactical")}>Tactical</Chip>
                <Chip active={tagFilter === "system"} onClick={() => setTagFilter("system")}>System</Chip>
              </div>
            </FadeIn>

            <div className="insights-cards-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
              {paginatedFiltered.map((post, index) => (
                <FadeIn key={post.slug ?? post.title} delay={index * 0.03}>
                  <div style={{ padding: "26px 22px", borderRadius: 12, background: COLORS.white, border: `1px solid ${COLORS.border}`, height: "100%", minHeight: 332, display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: COLORS.saffron, fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>
                      {(post.tag ?? "INSIGHT").toUpperCase()}
                    </span>
                    <h3 className="insight-title-clamp" style={{ fontSize: 17, fontWeight: 700, color: COLORS.navy, margin: "0 0 10px", lineHeight: 1.35, fontFamily: "'DM Sans', sans-serif", minHeight: 70 }}>
                      {post.title}
                    </h3>
                    <p className="insight-hook-clamp" style={{ fontSize: 14, lineHeight: 1.65, color: COLORS.textLight, margin: 0, flex: 1, minHeight: 115 }}>
                      {post.hook}
                    </p>
                    <Link to={`/insights/${post.slug}`} style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: COLORS.teal, textDecoration: "none" }}>
                      Read article →
                    </Link>
                  </div>
                </FadeIn>
              ))}
            </div>

            {filtered.length > 0 && totalLibraryPages > 1 && (
              <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={() => setLibraryPage((prev) => Math.max(1, prev - 1))}
                  disabled={libraryPage === 1}
                  style={{ border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, borderRadius: 8, padding: "10px 14px", cursor: libraryPage === 1 ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14, opacity: libraryPage === 1 ? 0.5 : 1 }}
                >
                  ← Prev page
                </button>
                <div style={{ fontSize: 13, color: COLORS.textMuted, minWidth: 90, textAlign: "center" }}>
                  Page {libraryPage} / {totalLibraryPages}
                </div>
                <button
                  onClick={() => setLibraryPage((prev) => Math.min(totalLibraryPages, prev + 1))}
                  disabled={libraryPage === totalLibraryPages}
                  style={{ border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.navy, borderRadius: 8, padding: "10px 14px", cursor: libraryPage === totalLibraryPages ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14, opacity: libraryPage === totalLibraryPages ? 0.5 : 1 }}
                >
                  Next page →
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <FadeIn delay={0.1}>
                <div style={{ marginTop: 18, padding: "18px 16px", borderRadius: 10, border: `1px solid ${COLORS.border}`, background: COLORS.white, color: COLORS.textMuted }}>
                  No matches. Try another keyword or reset filters.
                </div>
              </FadeIn>
            )}

            <div id="playbooks" style={{ marginTop: 32 }}>
              <FadeIn delay={0.12}>
                <Label>PART 8 — PLAYBOOKS</Label>
              </FadeIn>
              <FadeIn delay={0.16}>
                <h2 style={{ fontSize: 30, fontWeight: 700, color: COLORS.navy, margin: "0 0 10px", fontFamily: "'Poppins', sans-serif" }}>
                  Choose your industry playbook
                </h2>
                <p style={{ margin: "0 0 16px", color: COLORS.textLight, lineHeight: 1.7, maxWidth: 760 }}>
                  Download the full implementation-ready playbook for your industry, including system templates and execution checklists.
                </p>
              </FadeIn>

              <FadeIn delay={0.17}>
                <div id="playbooks-gate" style={{ marginBottom: 14, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 16px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 11, letterSpacing: 2, color: COLORS.teal, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                    DOWNLOAD ACCESS
                  </p>
                  {isPlaybookUnlocked ? (
                    <p style={{ margin: 0, color: COLORS.teal, fontWeight: 700 }}>
                      Access unlocked. You can now download all playbooks below.
                    </p>
                  ) : (
                    <>
                      <p style={{ margin: "0 0 12px", color: COLORS.textLight, lineHeight: 1.7, fontSize: 14 }}>
                        Please share your details first. Download links will unlock immediately.
                      </p>

                      <form onSubmit={handlePlaybookUnlock} className="playbook-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <input
                          value={playbookForm.name}
                          onChange={(event) => handlePlaybookFormChange("name", event.target.value)}
                          placeholder="Full name"
                          style={{ padding: "12px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", color: COLORS.text }}
                        />
                        <input
                          value={playbookForm.email}
                          onChange={(event) => handlePlaybookFormChange("email", event.target.value)}
                          placeholder="Work email"
                          style={{ padding: "12px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", color: COLORS.text }}
                        />
                        <input
                          value={playbookForm.company}
                          onChange={(event) => handlePlaybookFormChange("company", event.target.value)}
                          placeholder="Company"
                          style={{ padding: "12px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", color: COLORS.text }}
                        />
                        <select
                          value={playbookForm.industry}
                          onChange={(event) => handlePlaybookFormChange("industry", event.target.value)}
                          style={{ padding: "12px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", color: COLORS.textLight, background: COLORS.white }}
                        >
                          <option value="">Select industry</option>
                          <option value="technical-services">Technical Services</option>
                          <option value="built-environment">Built Environment</option>
                          <option value="training-consulting">Training & Consulting</option>
                        </select>

                        <select
                          value={playbookForm.niche}
                          onChange={(event) => handlePlaybookFormChange("niche", event.target.value)}
                          disabled={!playbookForm.industry}
                          style={{ padding: "12px 12px", borderRadius: 8, border: `1px solid ${COLORS.border}`, fontSize: 14, outline: "none", color: COLORS.textLight, background: COLORS.white }}
                        >
                          <option value="">Select niche</option>
                          {(NICHE_OPTIONS[playbookForm.industry] ?? []).map((niche) => (
                            <option key={niche} value={niche}>{niche}</option>
                          ))}
                        </select>

                        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                          <button type="submit" style={{ border: "none", background: COLORS.navy, color: COLORS.white, padding: "11px 14px", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                            Unlock playbook downloads
                          </button>
                          {playbookFormError && (
                            <span style={{ color: "#B42318", fontSize: 13, fontWeight: 600 }}>{playbookFormError}</span>
                          )}
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </FadeIn>

              <div style={{ display: "grid", gap: 12 }}>
                {playbooks.map((book, index) => (
                  <FadeIn key={book.slug} delay={0.18 + index * 0.03}>
                    <article style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "22px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{book.title}</div>
                        <div style={{ color: COLORS.textLight, fontSize: 13 }}>{book.subhead}</div>
                      </div>
                      {isPlaybookUnlocked ? (
                        <a href={book.downloadUrl} style={{ textDecoration: "none", color: COLORS.bgDark, background: COLORS.saffron, padding: "10px 14px", borderRadius: 9, fontWeight: 800, fontSize: 13, whiteSpace: "nowrap" }}>
                          Download PDF →
                        </a>
                      ) : (
                        <a href="#playbooks-gate" style={{ textDecoration: "none", color: COLORS.navy, background: COLORS.bgWarm, padding: "10px 14px", borderRadius: 9, fontWeight: 800, fontSize: 13, whiteSpace: "nowrap", border: `1px solid ${COLORS.border}` }}>
                          Unlock to download ↓
                        </a>
                      )}
                    </article>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={0.24}>
                <div style={{ marginTop: 14, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 16px" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 11, letterSpacing: 2, color: COLORS.teal, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>LEAD CAPTURE TEMPLATES</p>
                  <p style={{ margin: "0 0 12px", color: COLORS.textLight, lineHeight: 1.7, fontSize: 14 }}>
                    Use these templates immediately while implementing the playbook.
                  </p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href={TEMPLATE_1} style={{ textDecoration: "none", color: COLORS.white, background: COLORS.navy, padding: "10px 14px", borderRadius: 8, fontWeight: 700, fontSize: 13 }}>
                      Download N×B×F Planner
                    </a>
                    <a href={TEMPLATE_2} style={{ textDecoration: "none", color: COLORS.white, background: COLORS.teal, padding: "10px 14px", borderRadius: 8, fontWeight: 700, fontSize: 13 }}>
                      Download Pipeline Cadence Template
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
        </div>
      </Section>

      {isPlaybookModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Playbook quick access"
          onClick={() => setIsPlaybookModalOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(16,24,40,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200, padding: 20 }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{ width: "100%", maxWidth: 520, padding: "24px 22px", borderRadius: 12, background: COLORS.bgDark, border: "1px solid rgba(255,255,255,0.18)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, color: COLORS.saffron, fontFamily: "'DM Mono', monospace" }}>
                PART 8 — PLAYBOOKS
              </div>
              <button
                onClick={() => setIsPlaybookModalOpen(false)}
                style={{ border: "none", background: "transparent", color: COLORS.white, fontSize: 18, cursor: "pointer", lineHeight: 1 }}
                aria-label="Close playbook quick access"
              >
                ×
              </button>
            </div>

            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.white, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
              Download the full system
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "#C7D9E7", marginBottom: 14 }}>
              Choose the version for your industry. Templates + checklists included.
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={isPlaybookUnlocked ? PLAYBOOK_URLS.technical : "#playbooks-gate"} onClick={() => !isPlaybookUnlocked && setIsPlaybookModalOpen(false)} style={{ textDecoration: "none", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.12)", color: COLORS.white, fontWeight: 700 }}>
                Technical Services →
              </a>
              <a href={isPlaybookUnlocked ? PLAYBOOK_URLS.built : "#playbooks-gate"} onClick={() => !isPlaybookUnlocked && setIsPlaybookModalOpen(false)} style={{ textDecoration: "none", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.12)", color: COLORS.white, fontWeight: 700 }}>
                Built Environment →
              </a>
              <a href={isPlaybookUnlocked ? PLAYBOOK_URLS.training : "#playbooks-gate"} onClick={() => !isPlaybookUnlocked && setIsPlaybookModalOpen(false)} style={{ textDecoration: "none", padding: "12px 14px", borderRadius: 10, background: "rgba(255,255,255,0.12)", color: COLORS.white, fontWeight: 700 }}>
                Training & Consulting →
              </a>
            </div>

            <a href="#playbooks" onClick={() => setIsPlaybookModalOpen(false)} style={{ display: "inline-block", marginTop: 14, color: COLORS.bgDark, background: COLORS.saffron, padding: "12px 14px", borderRadius: 10, fontWeight: 800, textDecoration: "none" }}>
              View playbooks section ↓
            </a>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
