import { Plus, Heart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export default function ProductCard({ product, addToCart, addToWishlist, isInWishlist }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group">
      <div className="relative h-60 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/400x300/EEE/999?text=Image+not+found";
          }}
        />
        <button
          onClick={() => addToWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isInWishlist ? "bg-red-100 text-red-500" : "bg-white text-gray-400 hover:text-red-500"
          }`}
        >
          <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => addToCart(product)}
            className="bg-white text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-50 transition w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium line-clamp-1">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {product.category.name}
            </p>
          </div>
          <p className="font-bold text-green-600">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium flex items-center lg:hidden"
        >
          <Plus size={16} className="mr-1" /> Add to cart
        </button>
      </div>
    </div>
  );
}