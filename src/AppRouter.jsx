import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import InsightPage from "./pages/InsightPage";
import InsightsIndexPage from "./pages/InsightsIndexPage";
import ServicesPage from "./pages/ServicesPage";
import IndustriesPage from "./pages/IndustriesPage";
import ProofPage from "./pages/ProofPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LiveSiteChrome from "./components/LiveSiteChrome";

function RootRelativeLinkInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

    function onDocumentClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) {
        return;
      }

      const url = new URL(href, window.location.origin);
      let routePath = `${url.pathname}${url.search}${url.hash}`;

      if (baseUrl && routePath.startsWith(`${baseUrl}/`)) {
        routePath = routePath.slice(baseUrl.length);
      }

      event.preventDefault();
      navigate(routePath);
    }

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, [navigate]);

  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RootRelativeLinkInterceptor />
      <LiveSiteChrome />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/proof" element={<ProofPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsIndexPage />} />
        <Route path="/insights/:slug" element={<InsightPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
