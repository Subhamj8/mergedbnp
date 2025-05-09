import type React from 'react';
import PromotionalBanner from '../components/PromotionalBanner';
import HeroBanner from '../components/HeroBanner';
import CategoryCarousel from '../components/CategoryCarousel';
import SmallBusinessFavorites from '../components/SmallBusinessFavorites';
import TopPicks from '../components/TopPicks';
import CelebrationGrid from '../components/CelebrationGrid';
import ToolsSection from '../components/ToolsSection';
import SocialCarousel from '../components/SocialCarousel';

const HomePage: React.FC = () => (
  <>
    <PromotionalBanner />
    <HeroBanner />
    <main className="container mx-auto px-4 py-8 space-y-12">
      <CategoryCarousel />
      <SmallBusinessFavorites />
      <TopPicks />
      <CelebrationGrid />
      <ToolsSection />
      <SocialCarousel />
    </main>
  </>
);

export default HomePage;
