import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LOGO_LIGHT = "/brand/logos/amka-digital-logo-light.png";

const COLORS = {
  navy: "#246180",
  text: "#1B2836",
  border: "#DCE3EB",
  white: "#FFFFFF",
};

export default function SiteHeader() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 60);
  }, [location.pathname]);

  const links = [
    { label: "Home", href: "/", key: "home" },
    { label: "Services", href: "/services", key: "services" },
    { label: "Industries", href: "/industries", key: "industries" },
    { label: "Proof", href: "/proof", key: "proof" },
    { label: "Insights", href: "/insights", key: "insights" },
    { label: "About", href: "/about", key: "about" },
  ];

  const activeSection = location.pathname.startsWith("/insights")
      ? "insights"
      : location.pathname.startsWith("/services")
        ? "services"
        : location.pathname.startsWith("/industries")
          ? "industries"
          : location.pathname.startsWith("/proof")
            ? "proof"
            : location.pathname.startsWith("/about")
              ? "about"
              : location.pathname === "/"
                ? "home"
                : "";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(247,248,250,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
          <img src={LOGO_LIGHT} alt="AMKA Technologies" style={{ height: 38, width: "auto", display: "block" }} />
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              style={{
                fontSize: 13,
                color: link.key && activeSection === link.key ? COLORS.navy : COLORS.text,
                textDecoration: "none",
                fontWeight: 600,
                letterSpacing: 0.3,
                fontFamily: "DM Sans, sans-serif",
                padding: "6px 0",
                borderBottom: `2px solid ${link.key && activeSection === link.key ? "rgba(36,97,128,0.45)" : "transparent"}`,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.white,
              background: COLORS.navy,
              padding: "10px 24px",
              borderRadius: 6,
              textDecoration: "none",
              letterSpacing: 0.3,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Talk to Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
