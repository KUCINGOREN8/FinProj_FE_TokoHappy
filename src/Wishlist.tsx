import { Heart } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

interface WishlistProps {
  wishlist: Product[];
  removeFromWishlist: (id: number) => void;
  addToCart: (product: Product) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
}

export default function Wishlist({
  wishlist,
  removeFromWishlist,
  addToCart,
}: WishlistProps) {
  return (
    <div className="w-full lg:w-80 xl:w-96 bg-white shadow-lg border rounded-lg mt-4">
      <div className="p-6 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Heart size={20} className="text-green-600 mr-2" /> My Wishlist (
            {wishlist.length})
          </h2>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <Heart size={40} className="text-gray-300 mb-3" />
            <p className="text-gray-500 mb-3">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto max-h-[50vh] space-y-4">
            {wishlist.map((product) => (
              <div key={product.id} className="flex p-4 bg-gray-50 rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 rounded-lg object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/150?text=No+Image";
                  }}
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium line-clamp-1">{product.title}</h3>
                  <p className="text-green-600 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button
                      onClick={() => addToCart(product)}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-red-600 hover:text-red-500 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
