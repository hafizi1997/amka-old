import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import InsightPage from "./pages/InsightPage";
import InsightsIndexPage from "./pages/InsightsIndexPage";
import ServicesPage from "./pages/ServicesPage";
import IndustriesPage from "./pages/IndustriesPage";
import ProofPage from "./pages/ProofPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LiveSiteChrome from "./components/LiveSiteChrome";

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
