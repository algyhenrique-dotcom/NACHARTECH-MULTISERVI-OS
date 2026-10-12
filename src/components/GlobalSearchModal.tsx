import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Laptop, ArrowRight, Wrench, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    products, 
    services, 
    categories, 
    navigate, 
    formatMZN 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchModalOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedProducts = q 
    ? products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      ).slice(0, 5)
    : products.slice(0, 4);

  const matchedServices = q
    ? services.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.shortDesc.toLowerCase().includes(q)
      ).slice(0, 3)
    : services.slice(0, 3);

  const matchedCategories = q
    ? categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 4)
    : categories.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="relative flex items-center p-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por portátil, marca (Lenovo, Apple), Starlink, reparação..."
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Categories Quick Filter */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Categorias Populares
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setIsSearchModalOpen(false);
                    navigate('store');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>{q ? 'Produtos Encontrados' : 'Produtos em Destaque'}</span>
              <span className="text-[10px] font-mono">{matchedProducts.length} itens</span>
            </div>

            {matchedProducts.length === 0 ? (
              <p className="text-xs text-slate-500 py-2">Nenhum produto correspondente a "{query}".</p>
            ) : (
              <div className="space-y-2">
                {matchedProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setIsSearchModalOpen(false);
                      navigate('product-detail', { productId: p.id });
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {p.brand} · {p.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                      {formatMZN(p.price)}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Serviços de Assistência Técnica
            </div>
            <div className="space-y-2">
              {matchedServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setIsSearchModalOpen(false);
                    navigate('service-detail', { serviceId: s.id });
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {s.title}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">
                        {s.shortDesc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd> para fechar</span>
          <button
            onClick={() => {
              setIsSearchModalOpen(false);
              navigate('store');
            }}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Ver catálogo completo →
          </button>
        </div>
      </div>
    </div>
  );
};
