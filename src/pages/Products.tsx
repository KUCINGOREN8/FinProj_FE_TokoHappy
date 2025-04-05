import { useEffect, useState, useCallback } from "react";
import { Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Navbar1 } from "../components/Navbar-Only";
import Cart from "../components/Cart";
import Wishlist from "../Wishlist";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

const categories = ["All", "Furniture", "Clothes", "Shoes", "Electronics"];

export default function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const products: Product[] = await res.json();
      setData(products);
    } catch (err) {
      console.error("Error fetching products:", err);
      alert("Error loading products. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (!prev.find((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );
  };

  const filteredData = data
    .filter(
      (product) =>
        selectedCategory === "All" || product.category.name === selectedCategory
    )
    .filter(
      (product) =>
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        wishlistItemCount={wishlist.length}
        onWishlistClick={() => setIsWishlistOpen(!isWishlistOpen)}
        onSearchSubmit={setSearchQuery}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center">
                  <Filter size={18} className="text-gray-500 mr-2" />
                  <h3 className="font-medium">Filter by Category</h3>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-lg hover:shadow-xl ring-2 ring-green-400 z-50 relative"
                  >
                    <div className="font-bold">ADD NEW PRODUCT</div>
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {filteredData.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">
                  No products found. Try a different search or category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    addToWishlist={addToWishlist}
                    isInWishlist={wishlist.some((p) => p.id === product.id)}
                  />
                ))}
              </div>
            )}
          </main>

          <aside className="lg:w-96 flex flex-col gap-6">
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />

            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
              isWishlistOpen={isWishlistOpen}
              setIsWishlistOpen={() => setIsWishlistOpen(false)}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
