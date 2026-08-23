import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { FlavorProvider } from './context/FlavorContext';
import { CustomCursor } from './components/CustomCursor';
import { AmbientBackground } from './components/AmbientBackground';
import { AgeGate } from './components/AgeGate';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';

// Pages
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Flavours } from './pages/Flavours';
import { Craft } from './pages/Craft';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';

export const App = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      const verified = localStorage.getItem('vibeAgeVerified') === 'true';
      setIsAgeVerified(verified);
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
      setIsAgeVerified(false);
    }
  }, []);

  return (
    <FlavorProvider>
      {/* Age Gate modal if not verified */}
      {!isAgeVerified && (
        <AgeGate onVerified={() => setIsAgeVerified(true)} />
      )}

      {/* Luxury Custom Interactive Cursor (Desktop) */}
      <CustomCursor />

      {/* Dynamic Ambient Background with Glow Blobs & Subtle Embers */}
      <AmbientBackground />

      {/* Fine Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <div className="app-layout">
        {/* Floating Glass Navigation */}
        <Navbar />

        {/* Main Content with Route Transitions */}
        <main>
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/flavours" element={<Flavours />} />
              <Route path="/craft" element={<Craft />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>

        {/* Premium Brand Footer */}
        <Footer />
      </div>
    </FlavorProvider>
  );
};

export default App;
