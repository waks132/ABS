import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyButton from "@/components/StickyButton";
import Accueil from "@/pages/Accueil";
import NosSystemes from "@/pages/NosSystemes";
import Expertise from "@/pages/Expertise";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import VilleSEO from "@/pages/VilleSEO";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/nos-systemes" element={<NosSystemes />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cloison-amovible/:ville" element={<VilleSEO />} />
          </Routes>
        </main>
        <Footer />
        <StickyButton />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
