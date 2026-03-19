import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyButton from "@/components/StickyButton";
import Accueil from "@/pages/Accueil";
import NosSystemes from "@/pages/NosSystemes";
import Expertise from "@/pages/Expertise";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
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
        </Routes>
      </main>
      <Footer />
      <StickyButton />
    </BrowserRouter>
  );
}

export default App;
