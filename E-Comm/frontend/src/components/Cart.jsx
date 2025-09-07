import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onBack }) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 200 ? 0 : 50; // Free shipping over R200
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // Handle checkout process
    alert('Checkout functionality will be implemented here!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-300 min-h-[44px]"
              >
                <ArrowLeft size={20} />
                <span className="text-sm sm:text-base">Back to Home</span>
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Your Cart</h1>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <ShoppingBag size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
            Looks like you haven't added any delicious chilli products to your cart yet.
          </p>
          <button
            onClick={onBack}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors duration-300 min-h-[44px]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors duration-300 min-h-[44px]"
              >
                <ArrowLeft size={20} />
                <span className="text-sm sm:text-base">Back to Home</span>
              </button>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Your Cart</h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <div className="flex flex-col space-y-4">
                  {/* Mobile: Image and Info Row */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{item.heat} Heat Level</p>
                      <p className="text-base sm:text-lg font-bold text-red-600 mt-1">
                        R{item.price} {item.unit && <span className="text-xs sm:text-sm font-normal">{item.unit}</span>}
                      </p>
                    </div>
                  </div>

                  {/* Mobile: Quantity and Total Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      
                      <span className="w-12 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                      
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                        R{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700 flex items-center space-x-1 min-h-[44px] text-sm"
                      >
                        <Trash2 size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Subtotal</span>
                  <span className="text-sm sm:text-base font-semibold">R{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm sm:text-base text-gray-600">Shipping</span>
                  <span className="text-sm sm:text-base font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `R${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    Free shipping on orders over R200
                  </p>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg mt-6 transition-colors duration-300"
              >
                Proceed to Checkout
              </button>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery: 1-2 business days</li>
                  <li>• Free delivery on orders over R200</li>
                  <li>• Temperature controlled for fresh products</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
