const COLORS = {
  text: "#FFFFFF",
  textSoft: "#D6E2EC",
  contactTone: "#C7D9E7",
  headingTint: "#FFB26A",
  navy: "#246180",
  border: "rgba(255, 255, 255, 0.25)",
  white: "#FFFFFF",
};

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/amka-technologies/",
  facebook: "https://www.facebook.com/amkatechnologies",
  whatsapp: "https://wa.me/60198176949",
};

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const siteLinks = [
    ["Home", "/"],
    ["Services", "/services"],
    ["Industries", "/industries"],
    ["Proof", "/proof"],
    ["Insights", "/insights"],
    ["About", "/about"],
  ];

  return (
    <footer style={{ borderTop: `1px solid ${COLORS.border}`, background: COLORS.navy }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "34px 24px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.75fr 0.75fr", gap: 28, alignItems: "start" }}>
        
          <div>
            <h4 style={{ margin: "0 0 12px", color: COLORS.headingTint, fontSize: 16, fontWeight: 700 }}>Contact</h4>
            <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.65, color: COLORS.textSoft }}>
              <strong style={{ color: COLORS.text }}>Address:</strong> Bangunan Cube Self Storage<br />
              2A, Jalan 51a/243, Seksyen 51a, 46100<br />
              Petaling Jaya, Selangor, Malaysia
            </p>
            <div style={{ display: "grid", gap: 6 }}>
              <a href="mailto:team@amkatechnologies.com" style={{ color: COLORS.textSoft, textDecoration: "none", fontSize: 14 }}>
                <strong style={{ color: COLORS.text }}>E:</strong> team@amkatechnologies.com
              </a>
              <a href="tel:+60198176949" style={{ color: COLORS.textSoft, textDecoration: "none", fontSize: 14 }}>
                <strong style={{ color: COLORS.text }}>T:</strong> +6019-817 6949 (Hafizi)
              </a>
            </div>
          </div>

          <div style={{ justifySelf: "end" }}>
            <h4 style={{ margin: "0 0 12px", color: COLORS.headingTint, fontSize: 16, fontWeight: 700 }}>Follow Us</h4>
            <div style={{ display: "grid", gap: 10 }}>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" style={{ color: COLORS.contactTone, textDecoration: "none", fontSize: 15 }}>
                LinkedIn
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: COLORS.contactTone, textDecoration: "none", fontSize: 15 }}>
                Facebook
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer" style={{ color: COLORS.contactTone, textDecoration: "none", fontSize: 15 }}>
                WhatsApp
              </a>
            </div>
          </div>

          <div style={{ justifySelf: "end" }}>
            <h4 style={{ margin: "0 0 12px", color: COLORS.headingTint, fontSize: 16, fontWeight: 700 }}>Links</h4>
            <div style={{ display: "grid", gap: 10 }}>
              {siteLinks.map(([label, href]) => (
                <a key={label} href={href} style={{ color: COLORS.contactTone, textDecoration: "none", fontSize: 15 }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`, color: COLORS.textSoft, fontSize: 12, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <img src="/brand/logos/amka-digital-logo-dark.png" alt="AMKA Digital" style={{ width: 82, display: "block" }} />
            <div>A division of AMKA Technologies Sdn Bhd (1535682-T) · Copyright © {year}</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms & Condition</a>
            <span>|</span>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <span>|</span>
            <a href="/contact" style={{ color: "inherit", textDecoration: "none" }}>Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
