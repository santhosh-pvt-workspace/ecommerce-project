import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartQuery, useRemoveCartItem, useUpdateCartItem, useClearCart } from '../queries/cartQueries';

export const CartDrawer: React.FC = observer(() => {
  const { cartStore } = useStore();
  
  const { data: cartData, isLoading, isError } = useCartQuery();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const clearCart = useClearCart();

  if (!cartStore.isOpen) return null;

  // Extract products correctly based on the response format
  // assuming cart returning has `id` and `items` or similar structure.
  const cartItems = cartData?.items || [];

  const handleUpdateQuantity = (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty <= 0) {
      removeCartItem.mutate(id);
    } else {
      updateCartItem.mutate({ id, data: { quantity: newQty } });
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => cartStore.closeCart()}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
          </div>
          <button 
            onClick={() => cartStore.closeCart()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading && <div className="text-center py-8 text-gray-500">Loading cart...</div>}
          {isError && <div className="text-center py-8 text-red-500">Error loading cart</div>}
          
          {!isLoading && !isError && cartItems.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty.</p>
              <button 
                onClick={() => cartStore.closeCart()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}

          {Array.isArray(cartItems) && cartItems.map((item: any) => (
            <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
              {/* Product Image Placeholder (Replace if API returns image) */}
              <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                <span className="text-xs text-gray-400">No Image</span>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 line-clamp-2">{item.priceSnapshot || 'Item'}</h3>
                  <button 
                    onClick={() => removeCartItem.mutate(item.id)}
                    className="text-red-500 p-1 hover:bg-red-50 rounded"
                    disabled={removeCartItem.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 border rounded-md bg-white">
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                      className="p-1 text-gray-500 hover:text-black transition"
                      disabled={updateCartItem.isPending}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                      className="p-1 text-gray-500 hover:text-black transition"
                      disabled={updateCartItem.isPending}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-semibold text-indigo-600">
                    {/* Convert string to number for display if necessary */}
                    ${(Number(item.priceSnapshot) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {!isLoading && cartItems.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span>
                ${cartItems.reduce((acc: number, item: any) => acc + (Number(item.priceSnapshot) * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <button 
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg disabled:opacity-50"
              onClick={() => alert('Checkout logic to be implemented')}
            >
              Checkout
            </button>
            <button 
              className="w-full mt-2 text-sm text-gray-500 hover:text-red-600 transition"
              onClick={() => {
                if (cartData?.id) {
                    clearCart.mutate(cartData.id);
                }
              }}
              disabled={clearCart.isPending}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
});
