import React from 'react';
import { ShoppingCart, Heart, SlidersHorizontal, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    formatMZN,
    t
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className={`group relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-2xl overflow-hidden hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 hover:shadow-md hover:shadow-blue-500/5 flex flex-col h-full ${compact ? 'text-xs' : ''}`}>
      {/* Top Media Container - Compact height */}
      <div className={`relative ${compact ? 'aspect-square p-2' : 'aspect-[16/11] max-h-36 p-2.5'} bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-800/40 dark:to-slate-900/40 overflow-hidden flex items-center justify-center`}>
        {/* Badges no canto superior esquerdo */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs tracking-tight">
              -{discountPercent}%
            </span>
          )}
          <span className={`text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
            product.inStock 
              ? 'bg-blue-50/95 dark:bg-blue-950/90 text-blue-600 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60' 
              : 'bg-slate-100/95 dark:bg-slate-800/90 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
          }`}>
            {product.inStock ? t.inStock : t.outOfStock}
          </span>
        </div>

        {/* Heart Favorite Button (Sinal de favorito sempre visível em todos os cards) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-xs ${
            isFavorited 
              ? 'bg-rose-50 dark:bg-rose-950/90 text-rose-500 border border-rose-200 dark:border-rose-800 scale-105' 
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-700/70'
          }`}
          title={isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          aria-label="Favorito"
        >
          <Heart className={`w-3.5 h-3.5 transition-transform active:scale-125 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <button
          onClick={() => navigate('product-detail', { productId: product.id })}
          className="w-full h-full flex items-center justify-center cursor-pointer p-0.5"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-106 transition-transform duration-300 ease-out"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect fill="%23f1f5f9" width="300" height="200"/><text fill="%2364748b" font-family="sans-serif" font-size="12" dy="5" font-weight="bold" x="50%" y="50%" text-anchor="middle">NCAR Tec</text></svg>';
            }}
          />
        </button>

        {/* Action icons hover bar (Comparar e Ver Detalhes) */}
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-lg p-1 shadow-sm border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => toggleCompare(product.id)}
            className={`p-1 rounded-md transition-colors ${
              isCompared ? 'text-blue-600 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-500 hover:text-blue-600'
            }`}
            title="Comparar"
          >
            <SlidersHorizontal className="w-3 h-3" />
          </button>
          <button
            onClick={() => navigate('product-detail', { productId: product.id })}
            className="p-1 rounded-md text-slate-500 hover:text-blue-600 transition-colors"
            title="Ver Detalhes"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Card Body - Reduzido e compacto */}
      <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[9px] text-slate-400 mb-0.5">
            <span className="font-semibold uppercase tracking-wider text-[9px] text-blue-600 dark:text-blue-400 font-mono truncate max-w-[90px]">
              {product.brand}
            </span>
            <span className="text-[9px] truncate max-w-[80px] text-slate-400">{product.category}</span>
          </div>

          {/* Product Name */}
          <button
            onClick={() => navigate('product-detail', { productId: product.id })}
            className="text-left font-semibold text-[11px] sm:text-xs line-clamp-1 text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight cursor-pointer font-display block w-full"
            title={product.name}
          >
            {product.name}
          </button>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-0.5 text-[9px] text-slate-500">
            <div className="flex items-center text-amber-500">
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-[9px]">{product.rating}</span>
            <span className="text-[8px] text-slate-400 font-mono">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Buy Action - Azul uniforme */}
        <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1.5">
          <div className="min-w-0">
            <div className="font-extrabold text-xs sm:text-[13px] text-blue-600 dark:text-blue-400 tabular-nums font-display tracking-tight truncate">
              {formatMZN(product.price)}
            </div>
            {product.oldPrice && (
              <div className="text-[9px] text-slate-400 line-through tabular-nums truncate">
                {formatMZN(product.oldPrice)}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-xs transition-all cursor-pointer flex items-center justify-center shrink-0"
            title="Adicionar ao Carrinho"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
