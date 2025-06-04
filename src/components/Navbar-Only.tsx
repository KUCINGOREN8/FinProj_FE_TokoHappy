import React, { useState } from "react";
import { ShoppingCart, Search, Menu, User } from "lucide-react";

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  wishlistItemCount: number;
  onWishlistClick: () => void;
  onSearchSubmit: (query: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Navbar1({
  cartItemCount,
  onCartClick,
  wishlistItemCount,
  onWishlistClick,
  onSearchSubmit,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="text-green-500">Toko</span>Happy
            </h1>

            <nav className="hidden md:flex space-x-8">
              <a
                href="/about"
                className="text-gray-800 hover:text-green-600 font-medium"
              >
                About
              </a>
              <a
                href="/product"
                className="text-gray-800 hover:text-green-600 font-medium"
              >
                Product
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <form
                onSubmit={handleSearchSubmit}
                className="hidden md:block relative"
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </form>

              <a
                href="/login"
                className="hidden sm:flex text-gray-700 hover:text-green-600"
              >
                <User size={22} />
              </a>

              <button
                onClick={onCartClick}
                className="relative text-gray-700 hover:text-green-600 bg-green-100 p-2 rounded-full"
              >
                <ShoppingCart size={22} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>

              <button
                className="md:hidden text-gray-700 hover:text-green-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          <button
            onClick={onWishlistClick}
            className="relative p-2 text-gray-500 hover:text-red-500 transition"
          >
            {wishlistItemCount > 0 && (
              <span className="justify-center text-xs"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
