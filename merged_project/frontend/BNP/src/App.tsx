import React from 'react';
import NavBar from './components/NavBar';
import HeroBanner from './components/HeroBanner';
import PromotionalBanner from './components/PromotionalBanner';
import CategoryCarousel from './components/CategoryCarousel';
import SmallBusinessFavorites from './components/SmallBusinessFavorites';
import TopPicks from './components/TopPicks';
import CelebrationGrid from './components/CelebrationGrid';
import ToolsSection from './components/ToolsSection';
import SocialCarousel from './components/SocialCarousel';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <PromotionalBanner />
      <HeroBanner />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-12">
        <CategoryCarousel />
        <SmallBusinessFavorites />
        <TopPicks />
        <CelebrationGrid />
        <ToolsSection />
        <SocialCarousel />
      </main>
      <Footer />
    </div>
  );
}

export default App;
