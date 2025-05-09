import type React from 'react';
import { Button } from '@/components/ui/button';

const PromotionalBanner: React.FC = () => (
  <section className="bg-[#262f3c] text-white py-3">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <p className="text-center md:text-left text-sm">
        Small Business Week: Get $20 off orders $60+ or $40 off orders $120+. Code: FORYOU
      </p>
      <Button variant="outline" className="mt-2 md:mt-0 border-white text-white hover:bg-white hover:text-[#262f3c]">
        Shop Now
      </Button>
    </div>
  </section>
);

export default PromotionalBanner;
