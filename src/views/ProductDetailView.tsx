import React, { useState } from 'react';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  SlidersHorizontal, 
  ShieldCheck, 
  Truck, 
  Headphones, 
  Check, 
  MessageCircle, 
  Plus, 
  Minus, 
  ArrowLeft,
  Share2,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { storageService } from '../services/storageService';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare,
    formatMZN,
    t,
    showToast
  } = useApp();

  // Find product or fallback to first product
  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.variants?.colors?.[0] || '');
  const [selectedStorage, setSelectedStorage] = useState<string>(product.variants?.storage?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');

  // Review form state
  const [reviews, setReviews] = useState(() => storageService.getReviews(product.id));
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  // Discount percentage
  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  // Related products from same category or accessories
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'Acessórios'))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
  };

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Olá NCAR Tec! Gostaria de esclarecer dúvidas sobre o equipamento: ${product.name} (SKU: ${product.sku}, Preço: ${formatMZN(product.price)}).`
    );
    window.open(`https://wa.me/258841234567?text=${text}`, '_blank');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;
    const added = storageService.addReview({
      productId: product.id,
      author: newAuthor,
      rating: newRating,
      comment: newComment,
      verified: true
    });
    setReviews(prev => [added, ...prev]);
    setNewAuthor('');
    setNewComment('');
    showToast('A sua avaliação foi registada com sucesso!', 'success');
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('store')}
            className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Loja</span>
          </button>
          <span>·</span>
          <span>{product.category}</span>
          <span>·</span>
          <span className="text-slate-900 dark:text-slate-100 font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            showToast('Link do produto copiado para a área de transferência!', 'info');
          }}
          className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Partilhar</span>
        </button>
      </div>

      {/* Main PDP Grid: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Gallery & Images (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-center overflow-hidden shadow-sm">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                -{discountPercent}% Promoção
              </span>
            )}

            <img
              src={selectedImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl p-2 bg-white dark:bg-slate-900 border transition-all cursor-pointer flex items-center justify-center ${
                    selectedImage === img
                      ? 'border-blue-600 ring-2 ring-blue-600/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
                {product.brand}
              </span>
              <span className="font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Rating & Stock row */}
            <div className="flex items-center gap-4 mt-2.5 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} 
                  />
                ))}
                <span className="ml-1.5 font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
                <span className="text-slate-400 ml-1">({product.reviewCount} avaliações)</span>
              </div>

              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.inStock}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-blue-700 dark:text-blue-400 tabular-nums">
                {formatMZN(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  {formatMZN(product.oldPrice)}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Impostos e IVA de 16% incluídos. Emitimos factura com NUIT corporativo.
            </p>
          </div>

          {/* Quick Specs Highlight */}
          <div className="space-y-2 text-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Destaques de Hardware
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
              {product.specs.processor && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Processador:</span>
                  <span className="font-medium truncate block">{product.specs.processor}</span>
                </div>
              )}
              {product.specs.ram && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Memória RAM:</span>
                  <span className="font-medium truncate block">{product.specs.ram}</span>
                </div>
              )}
              {product.specs.storage && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Armazenamento:</span>
                  <span className="font-medium truncate block">{product.specs.storage}</span>
                </div>
              )}
              {product.specs.screen && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Ecrã:</span>
                  <span className="font-medium truncate block">{product.specs.screen}</span>
                </div>
              )}
            </div>
          </div>

          {/* Variants Selectors */}
          {product.variants?.colors && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.colorAvailable}: <span className="text-blue-600 font-medium">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.storage && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.storageAvailable}: <span className="text-blue-600 font-medium">{selectedStorage}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.storage.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStorage(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      selectedStorage === st
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Action */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 p-1">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-2 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-mono font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(product.stockCount, prev + 1))}
                  className="p-2 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t.addToCart}</span>
              </button>
            </div>

            {/* Wishlist, Compare & WhatsApp actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isFavorited
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-current' : ''}`} />
                <span>Favoritos</span>
              </button>

              <button
                onClick={() => toggleCompare(product.id)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isCompared
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Comparar</span>
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="py-2 px-3 rounded-lg border border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Garantia oficial de 1 a 2 anos NCAR Tec com substituição.</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Entrega no mesmo dia em Maputo e Matola; envio nacional seguro.</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Apoio pós-venda permanente e suporte laboratorial.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Descrição / Especificações Técnicas / Avaliações */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <button
            onClick={() => setActiveTab('desc')}
            className={`px-6 py-3.5 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'desc'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.description}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-3.5 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.specs}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3.5 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {t.reviews} ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === 'desc' && (
            <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                {product.shortDescription}
              </p>
              <p>{product.description}</p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2">Por que comprar na NCAR Tec?</h4>
                <ul className="space-y-1.5 list-disc list-inside text-xs">
                  <li>Equipamentos 100% genuínos e selados de fábrica.</li>
                  <li>Opção de configuração inicial de software e migração de dados no nosso laboratório.</li>
                  <li>Atendimento rápido em Maputo com facturas proforma para aquisições empresariais.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 p-3 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <span className="font-bold text-slate-500 dark:text-slate-400 capitalize">
                      {key}
                    </span>
                    <span className="col-span-2 text-slate-800 dark:text-slate-200 font-medium">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-3xl">
              {/* Existing Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-medium">
                            Compra Verificada
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Form to submit review */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {t.writeReview}
                </h4>

                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                        {t.yourName}
                      </label>
                      <input
                        type="text"
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="Ex: João M."
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                        {t.yourRating} (1 a 5 estrelas)
                      </label>
                      <select
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      >
                        <option value={5}>5 Estrelas - Excelente</option>
                        <option value={4}>4 Estrelas - Muito Bom</option>
                        <option value={3}>3 Estrelas - Satisfatório</option>
                        <option value={2}>2 Estrelas - Abaixo do Esperado</option>
                        <option value={1}>1 Estrela - Fraco</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                      {t.yourComment}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Conte a sua experiência com o produto..."
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t.submitReview}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                {t.relatedProducts}
              </h2>
              <p className="text-xs text-slate-500">
                Acessórios e equipamentos complementares recomendados.
              </p>
            </div>
            <button
              onClick={() => navigate('store')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver Todos →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
