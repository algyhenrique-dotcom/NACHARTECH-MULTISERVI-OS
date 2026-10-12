import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  Grid, 
  List, 
  RotateCcw, 
  Search,
  ArrowUpDown,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const StoreView: React.FC = () => {
  const { products, categories, brands, t, navigate, language } = useApp();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest'>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18; // 6 colunas x 3 linhas em ecrãs grandes

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSearchQuery('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Search query (name, brand, sku, description, category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.sku.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return b.rating - a.rating; // default: popular
    });
  }, [products, selectedCategory, selectedBrands, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedBrands.length > 0 || 
    searchQuery.trim() !== '' || 
    sortBy !== 'popular';

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-4">
      
      {/* CABEÇALHO DA LOJA: TÍTULO FORA DO CARD + CARD DE FILTROS QUE TERMINA JUNTO AO TÍTULO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Título FORA do card (sem contagem de número de itens como '15 itens') */}
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-display whitespace-nowrap shrink-0">
          {selectedCategory === 'all' 
            ? (language === 'pt' ? 'Todos os Produtos' : 'All Products') 
            : selectedCategory}
        </h1>

        {/* Card de Filtros Horizontais (pesquisa, categorias, ordenar, grelha/lista) */}
        <div className="bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 justify-end">
          
          {/* 1. Barra de Pesquisa Horizontal */}
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={language === 'pt' ? 'Pesquisar por nome ou marca...' : 'Search by name or brand...'}
              className="w-full pl-8.5 pr-8 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 cursor-pointer"
                title={language === 'pt' ? 'Limpar pesquisa' : 'Clear search'}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 2. Dropdown de Categorias */}
          <div className="relative min-w-[160px] sm:max-w-[210px]">
            <Layers className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none pl-8 pr-8 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="all">{language === 'pt' ? 'Todas as Categorias' : 'All Categories'}</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 3. Dropdown de Ordenar Por (Mais Populares, Preço, etc.) */}
          <div className="relative min-w-[140px] sm:max-w-[180px]">
            <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full appearance-none pl-8 pr-8 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="popular">{language === 'pt' ? 'Mais Populares' : 'Most Popular'}</option>
              <option value="price-asc">{language === 'pt' ? 'Menor Preço' : 'Lowest Price'}</option>
              <option value="price-desc">{language === 'pt' ? 'Maior Preço' : 'Highest Price'}</option>
              <option value="newest">{language === 'pt' ? 'Mais Recentes' : 'Newest'}</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* 4. Modo Grelha / Lista */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700 shrink-0 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title={language === 'pt' ? 'Visualização em Grelha' : 'Grid View'}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title={language === 'pt' ? 'Visualização em Lista' : 'List View'}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Chips de Filtros Ativos (se houver pesquisa ou categoria selecionada) */}
      {hasActiveFilters && (
        <div className="p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono flex items-center gap-1">
              <Filter className="w-3 h-3 text-blue-500" />
              {language === 'pt' ? 'Filtros:' : 'Filters:'}
            </span>

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs border border-blue-200 dark:border-blue-800">
                {language === 'pt' ? 'Pesquisa:' : 'Search:'} "{searchQuery}"
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSearchQuery('')} />
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs border border-blue-200 dark:border-blue-800">
                {language === 'pt' ? 'Categoria:' : 'Category:'} {selectedCategory}
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {sortBy !== 'popular' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs border border-blue-200 dark:border-blue-800">
                {language === 'pt' ? 'Ordem:' : 'Order:'} {
                  sortBy === 'price-asc' 
                    ? (language === 'pt' ? 'Menor Preço' : 'Lowest Price')
                    : sortBy === 'price-desc' 
                    ? (language === 'pt' ? 'Maior Preço' : 'Highest Price')
                    : (language === 'pt' ? 'Mais Recentes' : 'Newest')
                }
                <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => setSortBy('popular')} />
              </span>
            )}
          </div>

          <button
            onClick={handleClearFilters}
            className="text-xs text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-semibold flex items-center gap-1 cursor-pointer underline underline-offset-2 ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            {language === 'pt' ? 'Limpar tudo' : 'Clear all'}
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* PRODUTOS LISTADOS EM 6 COLUNAS HORIZONTAIS COM CARDS COMPACTOS */}
      {/* ============================================================== */}
      <main className="w-full space-y-6">
        {paginatedProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-display">
              {language === 'pt' ? 'Nenhum produto encontrado' : 'No products found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'pt' 
                ? 'Não encontramos nenhum produto correspondente aos termos ou à categoria selecionada.' 
                : 'We did not find any products matching your search terms or category.'}
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-colors shadow-sm cursor-pointer"
            >
              {language === 'pt' ? 'Ver Todos os Produtos' : 'View All Products'}
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grelha de 6 cards horizontais (2 no mobile, 3 tablet, 4/5 laptop, 6 desktop xl) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-3">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Visualização em Lista (com cores azuis uniformizadas) */
          <div className="space-y-3">
            {paginatedProducts.map((product) => (
              <div 
                key={product.id} 
                className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center gap-4 hover:border-blue-500 transition-all shadow-xs group"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 dark:bg-slate-800/80 rounded-xl p-2 shrink-0 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700/60">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                      {product.brand} · {product.category}
                    </span>
                    {product.isPromo && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-blue-600 text-white">
                        Promo
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{product.shortDescription}</p>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {product.inStock 
                      ? (language === 'pt' ? 'Em Stock Disponível' : 'In Stock') 
                      : (language === 'pt' ? 'Sob Encomenda' : 'On Order')} ({language === 'pt' ? 'Garantia Oficial' : 'Official Warranty'})
                  </div>
                </div>
                <div className="text-center sm:text-right shrink-0 space-y-2 min-w-[130px]">
                  <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 tabular-nums font-display">
                    {product.price.toLocaleString('pt-MZ')} MZN
                  </div>
                  {product.oldPrice && (
                    <div className="text-xs text-slate-400 line-through tabular-nums">
                      {product.oldPrice.toLocaleString('pt-MZ')} MZN
                    </div>
                  )}
                  <div className="flex items-center justify-center sm:justify-end gap-2 pt-1">
                    <button
                      onClick={() => navigate('product-detail', { productId: product.id })}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {language === 'pt' ? 'Ver Detalhes' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Anterior' : 'Previous'}
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {language === 'pt' ? 'Seguinte' : 'Next'}
            </button>
          </div>
        )}
      </main>

    </div>
  );
};
