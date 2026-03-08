import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const COLORS = {
  bg: "#F7F8FA",
  text: "#1B2836",
};

export default function SiteHeaderFooter({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "DM Sans, sans-serif" }}>
      <SiteHeader />

      <div style={{ paddingTop: 88 }}>{children}</div>

      <SiteFooter />
    </div>
  );
}
