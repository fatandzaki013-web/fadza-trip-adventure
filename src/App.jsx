import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import VideoModal from './components/VideoModal';
import LightboxModal from './components/LightboxModal';
import FadzaAIChatbot from './components/FadzaAIChatbot';
import BookingModal from './components/BookingModal';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import StoriesPage from './pages/StoriesPage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';

import { DESTINATIONS, PACKAGES, GALLERY_ITEMS } from './data/travelData';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [exploreFilters, setExploreFilters] = useState({});
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  // Modern Booking Modal State
  const [bookingModalState, setBookingModalState] = useState({
    isOpen: false,
    package: null,
    guests: 2,
    date: ''
  });

  const handleOpenBooking = (pkg = null, guests = 2, date = '') => {
    setBookingModalState({
      isOpen: true,
      package: pkg || selectedPackage || PACKAGES[0],
      guests: guests || 2,
      date: date || ''
    });
  };

  const handleCloseBooking = () => {
    setBookingModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Lightbox State
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    item: null,
    index: 0,
    list: []
  });

  // Sync with URL Hash on load & back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';

      // Destination Detail Route (#destination-[id])
      if (hash.startsWith('destination-')) {
        const destId = hash.replace('destination-', '');
        const found = DESTINATIONS.find((d) => d.id === destId || d.name.toLowerCase() === destId.toLowerCase());
        if (found) {
          setSelectedDestination(found);
          setActivePage('destination-detail');
          return;
        }
      }

      // Package Detail Route (#package-[id] or #package-[slug])
      if (hash.startsWith('package-')) {
        const pkgIdOrSlug = hash.replace('package-', '');
        const found = PACKAGES.find((p) => p.id === pkgIdOrSlug || p.slug === pkgIdOrSlug);
        if (found) {
          setSelectedPackage(found);
          setActivePage('package-detail');
          return;
        } else {
          // If not found, use first package as safe fallback
          setSelectedPackage(PACKAGES[0]);
          setActivePage('package-detail');
          return;
        }
      }

      if (hash === 'destinations') {
        setActivePage('explore');
        return;
      }

      if (['home', 'explore', 'packages', 'about', 'gallery', 'stories', 'contact', 'testimonials'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activePage or navigation changes
  const navigateTo = (pageId, filters = null) => {
    if (filters) {
      setExploreFilters(filters);
    }
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestinationDetail = (dest) => {
    let destObj = dest;
    if (typeof dest === 'string') {
      destObj = DESTINATIONS.find((d) => d.id === dest || d.name.toLowerCase() === dest.toLowerCase()) || DESTINATIONS[0];
    }
    setSelectedDestination(destObj);
    setActivePage('destination-detail');
    window.location.hash = `destination-${destObj.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg) => {
    let pkgObj = pkg;
    if (typeof pkg === 'string') {
      pkgObj = PACKAGES.find((p) => p.id === pkg || p.slug === pkg) || PACKAGES[0];
    } else if (pkg && pkg.id) {
      pkgObj = PACKAGES.find((p) => p.id === pkg.id || p.slug === pkg.slug) || pkg;
    }
    setSelectedPackage(pkgObj || PACKAGES[0]);
    setActivePage('package-detail');
    window.location.hash = `package-${pkgObj ? pkgObj.id : 'bali-escape'}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (destName) => {
    const found = DESTINATIONS.find(
      (d) => d.name.toLowerCase() === destName.toLowerCase() || d.id === destName.toLowerCase()
    );
    if (found) {
      handleSelectDestinationDetail(found);
    } else {
      setExploreFilters({ destination: destName });
      navigateTo('packages');
    }
  };

  // Lightbox Handlers
  const handleOpenLightbox = (item, index = 0, list = GALLERY_ITEMS) => {
    setLightboxState({
      isOpen: true,
      item,
      index,
      list
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePrevLightbox = () => {
    const { index, list } = lightboxState;
    if (index > 0) {
      setLightboxState({
        ...lightboxState,
        index: index - 1,
        item: list[index - 1]
      });
    }
  };

  const handleNextLightbox = () => {
    const { index, list } = lightboxState;
    if (index < list.length - 1) {
      setLightboxState({
        ...lightboxState,
        index: index + 1,
        item: list[index + 1]
      });
    }
  };

  return (
    <div className="fadza-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation Header */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onOpenAiChat={() => setAiChatOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Page Views */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage
            onSelectPackage={handleSelectPackage}
            onSelectDestination={handleSelectDestination}
            onSelectDestinationDetail={handleSelectDestinationDetail}
            onNavigate={navigateTo}
            onOpenVideo={() => setVideoModalOpen(true)}
            onOpenGalleryItem={handleOpenLightbox}
            onOpenAiChat={() => setAiChatOpen(true)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {(activePage === 'explore' || activePage === 'destinations') && (
          <ExplorePage
            initialFilters={exploreFilters}
            onSelectPackage={handleSelectPackage}
            onSelectDestination={handleSelectDestination}
            onSelectDestinationDetail={handleSelectDestinationDetail}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activePage === 'destination-detail' && (
          <DestinationDetailPage
            destination={selectedDestination || DESTINATIONS[0]}
            onBack={() => navigateTo('explore')}
            onSelectPackage={handleSelectPackage}
            onOpenGalleryItem={handleOpenLightbox}
            onNavigate={navigateTo}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {(activePage === 'packages' || activePage === 'styles' || activePage === 'package' || activePage === 'tours') && (
          <PackagesPage
            initialDestination={exploreFilters.destination}
            onSelectPackage={handleSelectPackage}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activePage === 'package-detail' && (
          <PackageDetailPage
            packageData={selectedPackage || PACKAGES[0]}
            onBack={() => navigateTo('packages')}
            onOpenGalleryItem={handleOpenLightbox}
            onSelectPackage={handleSelectPackage}
            onOpenAiChat={() => setAiChatOpen(true)}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={navigateTo}
            onSelectDestination={handleSelectDestinationDetail}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage onOpenLightbox={handleOpenLightbox} />
        )}

        {activePage === 'testimonials' && (
          <TestimonialsPage
            onSelectPackage={handleSelectPackage}
            onSelectDestination={handleSelectDestinationDetail}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'stories' && (
          <StoriesPage />
        )}

        {activePage === 'contact' && (
          <ContactPage onOpenBooking={handleOpenBooking} />
        )}

        {/* Fallback to prevent blank page on unrecognized route */}
        {!['home', 'explore', 'destinations', 'destination-detail', 'packages', 'styles', 'package', 'tours', 'package-detail', 'about', 'gallery', 'testimonials', 'stories', 'contact'].includes(activePage) && (
          <PackagesPage
            initialDestination={exploreFilters.destination}
            onSelectPackage={handleSelectPackage}
            onOpenBooking={handleOpenBooking}
          />
        )}
      </main>

      {/* Global Modals */}
      <BookingModal
        isOpen={bookingModalState.isOpen}
        onClose={handleCloseBooking}
        initialPackage={bookingModalState.package}
        initialGuests={bookingModalState.guests}
        initialDate={bookingModalState.date}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      {lightboxState.isOpen && (
        <LightboxModal
          item={lightboxState.item}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
          hasPrev={lightboxState.index > 0}
          hasNext={lightboxState.index < lightboxState.list.length - 1}
          onSelectPackage={handleSelectPackage}
          onNavigate={navigateTo}
        />
      )}

      {/* Global FADZA AI Travel Assistant Floating Chatbot (Bottom Left) */}
      <FadzaAIChatbot
        isOpen={aiChatOpen}
        onToggle={setAiChatOpen}
        currentPackage={activePage === 'package-detail' ? selectedPackage : null}
        onSelectPackage={handleSelectPackage}
        onOpenBooking={handleOpenBooking}
      />

      {/* Compact Floating WhatsApp Action Button (Bottom Right) */}
      <FloatingWhatsApp />

      {/* Global Footer with 100% Operational Links */}
      <Footer
        onNavigate={navigateTo}
        onSelectDestination={handleSelectDestinationDetail}
        onSelectPackage={handleSelectPackage}
        onOpenAiChat={() => setAiChatOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />
    </div>
  );
}
