import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import banner from "/hero-banner.png";

type NavItem = {
  label: string;
  path: string;
};

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("About");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: "About", path: "/about" },
    { label: "Products", path: "/product" },
  ];

  const handleNavItemClick = (item: NavItem) => {
    setActiveItem(item.label);
    navigate(item.path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-100">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-white/80 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="text-green-500">Toko</span>Happy
            </h1>

            <ul className="hidden md:flex space-x-8 text-gray-700">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`cursor-pointer relative pb-1 ${
                    activeItem === item.label
                      ? "text-green-500 font-medium"
                      : "hover:text-green-500"
                  }`}
                  onClick={() => handleNavItemClick(item)}
                >
                  {item.label}
                  {activeItem === item.label && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full"></span>
                  )}
                </li>
              ))}
            </ul>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-green-500 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="text-gray-700 hover:text-green-500 cursor-pointer"
                  onClick={() => handleNavItemClick(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-start justify-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-xl space-y-6 pt-20">
            <div className="inline-block bg-green-500/90 text-white text-sm font-medium px-4 py-1 rounded-full backdrop-blur-sm">
              Spring Collection 2025
            </div>

            <div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-wide text-white">
                New Items
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white mt-2">
                Collection
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-white/90 max-w-md">
              Shop Happy, Live Happy with TokoHappy. Discover our new collection
              with exclusive discounts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => navigate("/product")}
                className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg hover:bg-green-600 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                aria-label="Shop Now"
              >
                Shop Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/product")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/30 transition-all"
              >
                View Lookbook
              </button>
            </div>

            <div className="flex gap-8 mt-12 pt-6 border-t border-white/20">
              <div>
                <p className="text-green-400 text-3xl font-bold">50+</p>
                <p className="text-white/70 text-sm">New Products</p>
              </div>
              <div>
                <p className="text-green-400 text-3xl font-bold">24h</p>
                <p className="text-white/70 text-sm">Delivery</p>
              </div>
              <div>
                <p className="text-green-400 text-3xl font-bold">100k</p>
                <p className="text-white/70 text-sm">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
