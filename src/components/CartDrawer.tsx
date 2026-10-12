import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    navigate,
    formatMZN,
    t
  } = useApp();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {t.shoppingCart} ({cartCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t.emptyCartTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  {t.emptyCartDesc}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('store');
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Explorar Loja
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="pt-4 flex gap-3">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg p-2 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {item.product.name}
                      </h4>
                      {(item.selectedColor || item.selectedStorage) && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {item.selectedColor} {item.selectedStorage ? `· ${item.selectedStorage}` : ''}
                        </p>
                      )}
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
                        {formatMZN(item.product.price)}
                      </p>
                    </div>

                    {/* Stepper & Trash */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-blue-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-blue-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remover"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">{t.subtotal}</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
                  {formatMZN(cartSubtotal)}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Entrega calculada no próximo passo (Grátis para Maputo).
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('cart');
                  }}
                  className="px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-center transition-colors cursor-pointer"
                >
                  Ver Carrinho
                </button>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('checkout');
                  }}
                  className="px-3 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <span>{t.checkoutBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
