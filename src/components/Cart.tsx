import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../type";

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, change: number) => void;
  removeFromCart: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({
  cart,
  updateQuantity,
  removeFromCart,
  isOpen,
  onClose,
}: CartProps) {
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 w-full transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } fixed lg:static right-0 top-0 h-full lg:h-auto z-20 lg:z-auto lg:translate-x-0`}
    >
      <div className="flex flex-col h-full lg:h-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingCart size={20} className="text-green-600 mr-2" /> Your Cart
          </h2>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
              onClick={onClose}
              className="text-green-600 font-medium hover:text-green-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto max-h-[70vh] space-y-6 mb-8">
              {cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-20 h-20 rounded-lg object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/400x300/EEE/999?text=Image+not+found";
                    }}
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium line-clamp-1">
                        {product.title}
                      </h3>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-green-600 font-medium">
                      ${product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-8">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Checkout
              </button>

              <p
                onClick={onClose}
                className="w-full text-center mt-4 text-green-600 font-medium lg:hidden"
              >
                Continue Shopping
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
