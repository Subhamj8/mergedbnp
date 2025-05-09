import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Heart, Search } from "lucide-react";

const NavBar: React.FC = () => (
  <header className="bg-white border-b">
    <div className="container mx-auto px-4 flex items-center justify-between h-16">
      <a href="/" className="flex items-center">
        <img src="https://ext.same-assets.com/311281781/260646423.svg" alt="VistaPrint" className="h-8" />
      </a>
      <nav className="hidden lg:flex space-x-6">
        <a href="/deals" className="text-gray-700 hover:text-gray-900">Deals</a>
        <a href="/business-cards" className="text-gray-700 hover:text-gray-900">Business Cards</a>
        <a href="/postcards" className="text-gray-700 hover:text-gray-900">Postcards</a>
        <a href="/signs" className="text-gray-700 hover:text-gray-900">Signs & Banners</a>
        <a href="/labels-stickers" className="text-gray-700 hover:text-gray-900">Labels & Stickers</a>
      </nav>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input type="text" placeholder="Search" className="pl-8" />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Button variant="ghost"><Heart /></Button>
        <Button variant="ghost"><User /></Button>
        <Button variant="ghost"><ShoppingCart /></Button>
      </div>
    </div>
  </header>
);

export default NavBar;
