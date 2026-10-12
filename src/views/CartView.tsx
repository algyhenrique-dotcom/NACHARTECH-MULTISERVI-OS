import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartView: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartSubtotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    navigate, 
    formatMZN, 
    t,
    showToast
  } = useApp();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'NCAR10') {
      setDiscountPercent(10);
      showToast('Cupom NCAR10 aplicado com sucesso (10% de desconto)!', 'success');
    } else {
      showToast('Código promocional inválido ou expirado.', 'error');
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalTotal = cartSubtotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          {t.emptyCartTitle}
        </h1>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          {t.emptyCartDesc}
        </p>
        <button
          onClick={() => navigate('store')}
          className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
        >
          {t.continueShopping}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {t.shoppingCart} ({cartCount} {cartCount === 1 ? 'item' : 'itens'})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Reveja os seus equipamentos selecionados antes de avançar para a finalização de encomenda.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Esvaziar Carrinho</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart items table (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-sm overflow-hidden">
          {cart.map((item) => (
            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 p-2 shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 font-mono">
                    {item.product.brand}
                  </span>
                  <h3 
                    onClick={() => navigate('product-detail', { productId: item.product.id })}
                    className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 cursor-pointer"
                  >
                    {item.product.name}
                  </h3>
                  {(item.selectedColor || item.selectedStorage) && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.selectedColor} {item.selectedStorage ? `· ${item.selectedStorage}` : ''}
                    </p>
                  )}
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
                    {formatMZN(item.product.price)}
                  </p>
                </div>
              </div>

              {/* Stepper & Total */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 p-1">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono font-medium text-xs">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 tabular-nums">
                    {formatMZN(item.product.price * item.quantity)}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping button */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <button
              onClick={() => navigate('store')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.continueShopping}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t.orderSummary}
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>{t.subtotal}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
                  {formatMZN(cartSubtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>{t.shipping}</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {t.shippingFree}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-rose-600 font-semibold">
                  <span>Desconto ({discountPercent}%)</span>
                  <span className="tabular-nums">- {formatMZN(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-base font-black text-slate-900 dark:text-slate-100">
                <span>{t.total}</span>
                <span className="text-blue-600 dark:text-blue-400 tabular-nums">
                  {formatMZN(finalTotal)}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="pt-2 flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Cupom (ex: NCAR10)"
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {t.applyCoupon}
              </button>
            </form>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>{t.checkoutBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantees */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Garantia de conformidade e assistência NCAR Tec.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Opção de levantamento gratuito na nossa loja em Maputo.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
