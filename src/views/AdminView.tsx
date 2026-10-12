import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Tag, 
  ShoppingCart, 
  Users, 
  Percent, 
  FileText, 
  BarChart3, 
  Settings, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  RotateCcw, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Truck, 
  X,
  Printer,
  ShieldCheck,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Product, Order, Category, Brand, Invoice, QuoteRequest } from '../types';
import { storageService } from '../services/storageService';

export const AdminView: React.FC = () => {
  const { 
    products, 
    orders, 
    categories, 
    brands, 
    invoices, 
    quotes, 
    refreshData, 
    resetAllDemoData, 
    formatMZN, 
    openInvoiceModal,
    t, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'orders' | 'categories' | 'quotes' | 'invoices' | 'settings'
  >('dashboard');

  // Search & Filters in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Product Create/Edit
  const [productFormData, setProductFormData] = useState<Partial<Product>>({
    name: '',
    brand: 'Lenovo',
    category: 'Portáteis',
    price: 45000,
    oldPrice: undefined,
    stockCount: 10,
    inStock: true,
    isFeatured: true,
    isPromo: false,
    shortDescription: '',
    description: '',
    sku: 'NCAR-001',
    images: ['/src/assets/images/product_laptop_slim_1791692634354.jpg'],
    specs: {
      processor: 'Intel Core i5',
      ram: '8GB DDR4',
      storage: '512GB SSD',
      screen: '15.6" Full HD',
      warranty: '1 Ano NCAR Tec'
    }
  });

  // Calculate Dashboard KPIs
  const totalSalesRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 150000; // Realistic demo base
  const totalOrdersCount = orders.length + 20;
  const totalCustomersCount = 18;
  const totalProductsCount = products.length;

  // Chart Data: Vendas dos últimos 7 dias
  const salesChartData = [
    { day: 'Seg', valor: 28500 },
    { day: 'Ter', valor: 42000 },
    { day: 'Qua', valor: 35900 },
    { day: 'Qui', valor: 58000 },
    { day: 'Sex', valor: 74500 },
    { day: 'Sáb', valor: 92000 },
    { day: 'Dom', valor: 48000 },
  ];

  // Chart Data: Vendas por Categoria
  const categoryChartData = [
    { name: 'Portáteis', vendas: 124000 },
    { name: 'Smartphones', vendas: 68000 },
    { name: 'Starlink', vendas: 85000 },
    { name: 'CCTV', vendas: 42000 },
    { name: 'Acessórios', vendas: 21000 },
  ];

  // Handle open product modal
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      brand: brands[0]?.name || 'Lenovo',
      category: categories[0]?.name || 'Portáteis',
      price: 25000,
      stockCount: 10,
      inStock: true,
      isFeatured: true,
      isPromo: false,
      shortDescription: '',
      description: '',
      sku: `NC-${Math.floor(1000 + Math.random() * 9000)}`,
      images: ['/src/assets/images/product_laptop_slim_1791692634354.jpg'],
      specs: {
        processor: 'Intel Core i5 / AMD Ryzen',
        ram: '8GB / 16GB',
        storage: '512GB SSD',
        screen: '15.6" FHD',
        warranty: '1 Ano NCAR Tec'
      }
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductFormData({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name || !productFormData.price) return;

    const saved = storageService.saveProduct({
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: productFormData.name || 'Novo Equipamento',
      slug: (productFormData.name || 'novo-equipamento').toLowerCase().replace(/\s+/g, '-'),
      brand: productFormData.brand || 'Lenovo',
      category: productFormData.category || 'Portáteis',
      price: Number(productFormData.price) || 0,
      oldPrice: productFormData.oldPrice ? Number(productFormData.oldPrice) : undefined,
      inStock: (productFormData.stockCount || 0) > 0,
      stockCount: Number(productFormData.stockCount) || 1,
      isFeatured: !!productFormData.isFeatured,
      isPromo: !!productFormData.isPromo,
      rating: editingProduct ? editingProduct.rating : 4.8,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      images: productFormData.images && productFormData.images.length > 0 
        ? productFormData.images 
        : ['/src/assets/images/product_laptop_slim_1791692634354.jpg'],
      shortDescription: productFormData.shortDescription || 'Equipamento de alta tecnologia com garantia oficial.',
      description: productFormData.description || 'Descrição detalhada e especificações certificadas pela NCAR Tec.',
      specs: productFormData.specs || {},
      sku: productFormData.sku || 'SKU-001',
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString().split('T')[0]
    });

    refreshData();
    setIsProductModalOpen(false);
    showToast(editingProduct ? 'Produto atualizado com sucesso!' : 'Novo produto adicionado ao catálogo!', 'success');
  };

  const handleDeleteProduct = (id: string) => {
    storageService.deleteProduct(id);
    refreshData();
    setDeleteConfirmId(null);
    showToast('Produto removido do catálogo.', 'info');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    storageService.updateOrderStatus(orderId, newStatus);
    refreshData();
    showToast(`Estado da encomenda atualizado para: ${newStatus}`, 'success');
  };

  const handleUpdateQuoteStatus = (quoteId: string, newStatus: QuoteRequest['status']) => {
    storageService.updateQuoteStatus(quoteId, newStatus);
    refreshData();
    showToast(`Estado do orçamento atualizado para: ${newStatus}`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-6 shrink-0">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center font-black text-white text-lg shadow-md">
            N
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1">
              <span>NCAR</span>
              <span className="text-blue-400 font-semibold">Admin</span>
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">Consola Local de Gestão</p>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t.adminDashboard}</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>{t.adminProducts}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{products.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4" />
              <span>{t.adminOrders}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('quotes')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'quotes' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Wrench className="w-4 h-4" />
              <span>{t.adminQuotes}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{quotes.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'categories' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            <span>{t.adminCategories} & Marcas</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'invoices' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.adminInvoices}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t.adminSettings}</span>
          </button>
        </nav>

        {/* Local Demo Disclaimer */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Ambiente de Testes</span>
          </div>
          <p className="leading-snug">
            Modo offline em <code className="text-blue-300 font-mono">localStorage</code>. Não sincroniza externamente.
          </p>
          <button
            onClick={resetAllDemoData}
            className="w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[10px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Repor Demonstração</span>
          </button>
        </div>
      </aside>

      {/* ADMIN MAIN CONTENT */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {t.adminDashboard} Executivo
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Visão consolidada de receitas, encomendas, catálogo e orçamentos em Moçambique.
              </p>
            </div>

            {/* 4 KPI Cards (Matching Prototype 10 screenshot) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t.totalSales}</span>
                <div className="text-2xl font-black text-white font-mono">
                  {formatMZN(totalSalesRevenue)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+18.4% este mês em Maputo</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t.ordersCount}</span>
                <div className="text-2xl font-black text-white font-mono">
                  {totalOrdersCount}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-blue-400">
                  <span>Média de 4.2 pedidos/dia</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t.clientsCount}</span>
                <div className="text-2xl font-black text-white font-mono">
                  {totalCustomersCount}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-sky-400">
                  <span>Particulares e Empresas</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400">{t.productsInCatalog}</span>
                <div className="text-2xl font-black text-white font-mono">
                  {totalProductsCount}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <span>Todos com stock e garantia</span>
                </div>
              </div>
            </div>

            {/* Recharts Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Vendas Últimos 7 Dias (7 cols) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    <span>{t.salesLast7Days}</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Valores em Meticais (MZN)</span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                        formatter={(val: any) => [`MZN ${Number(val).toLocaleString('pt-MZ')}`, 'Vendas']}
                      />
                      <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Vendas por Categoria (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">
                  Desempenho por Categoria
                </h3>

                <div className="space-y-3 pt-2">
                  {categoryChartData.map((cat, idx) => {
                    const max = 130000;
                    const percent = Math.round((cat.vendas / max) * 100);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">{cat.name}</span>
                          <span className="font-mono text-blue-400 tabular-nums">{formatMZN(cat.vendas)}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Orders List (Matching Prototype 10) */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  {t.latestOrders}
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Gerir Todas as Encomendas →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                      <th className="py-2.5 px-3">Nº</th>
                      <th className="py-2.5 px-3">Cliente</th>
                      <th className="py-2.5 px-3">Data</th>
                      <th className="py-2.5 px-3">Estado</th>
                      <th className="py-2.5 px-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {orders.slice(0, 4).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-400">{ord.orderNumber}</td>
                        <td className="py-2.5 px-3">{ord.customer.name}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{ord.date}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold">{formatMZN(ord.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT (CRUD) */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  {t.adminProducts} ({products.length})
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Adicione, edite preços, ajuste stock ou remova artigos do catálogo.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addNewProduct}</span>
              </button>
            </div>

            {/* Search filter */}
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Pesquisar por nome, marca ou SKU..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            {/* Products Table */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-3 px-4">Equipamento</th>
                      <th className="py-3 px-4">Categoria</th>
                      <th className="py-3 px-4">Marca</th>
                      <th className="py-3 px-4 text-right">Preço (MZN)</th>
                      <th className="py-3 px-4 text-center">Stock</th>
                      <th className="py-3 px-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {products
                      .filter(p => 
                        !productSearch || 
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.brand.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.sku.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((prod) => (
                        <tr key={prod.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-700">
                                <img src={prod.images[0]} alt={prod.name} className="max-h-full max-w-full object-contain" />
                              </div>
                              <div>
                                <p className="font-bold text-white line-clamp-1">{prod.name}</p>
                                <p className="text-[10px] text-slate-400 font-mono">SKU: {prod.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{prod.category}</td>
                          <td className="py-3 px-4 font-semibold text-blue-400">{prod.brand}</td>
                          <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                            {formatMZN(prod.price)}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                              prod.stockCount > 5 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                            }`}>
                              {prod.stockCount} un
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Editar Produto"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(prod.id)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                              title="Eliminar Produto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDER MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {t.adminOrders} ({orders.length})
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Acompanhe e altere os estados de expedição e entrega das encomendas em Moçambique.
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-3 px-4">Nº Encomenda</th>
                      <th className="py-3 px-4">Cliente & Contacto</th>
                      <th className="py-3 px-4">Cidade / Morada</th>
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4">Estado Atual</th>
                      <th className="py-3 px-4 text-right">Total</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono font-bold text-blue-400">{ord.orderNumber}</td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-white">{ord.customer.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{ord.customer.phone}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{ord.customer.city}</td>
                        <td className="py-3 px-4 font-mono text-slate-400">{ord.date}</td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                            className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="Confirmada">Confirmada</option>
                            <option value="Em preparação">Em preparação</option>
                            <option value="Enviada">Enviada</option>
                            <option value="Entregue">Entregue</option>
                            <option value="Cancelada">Cancelada</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                          {formatMZN(ord.total)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              const inv = invoices.find(i => i.orderId === ord.id) || invoices[0];
                              if (inv) openInvoiceModal(inv);
                            }}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            Factura
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUOTES MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {t.adminQuotes} ({quotes.length})
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Pedidos de assistência técnica, Starlink e orçamentos enviados por clientes através do website.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-blue-400 font-mono">
                      {q.serviceName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{q.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{q.clientName}</h3>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>Telefone: <span className="text-slate-200 font-mono">{q.phone}</span></p>
                    {q.email && <p>Email: <span className="text-slate-200">{q.email}</span></p>}
                    <p>Localização: <span className="text-slate-200">{q.location}</span></p>
                  </div>

                  <p className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic">
                    "{q.description}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">Alterar Estado:</span>
                    <select
                      value={q.status}
                      onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Respondido">Respondido</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CATEGORIES & BRANDS */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Categorias e Marcas em Catálogo
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categorias */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">Categorias Registadas</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <div key={c.id} className="p-2.5 rounded-xl bg-slate-950 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{c.itemCount} equipamentos</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Marcas */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <h3 className="text-sm font-bold text-white">Marcas Oficiais</h3>
                <div className="space-y-2">
                  {brands.map((b) => (
                    <div key={b.id} className="p-2.5 rounded-xl bg-slate-950 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{b.name}</span>
                      <span className="text-[10px] text-emerald-400">Garantia Ativa</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: INVOICES & PROFORMAS */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  Facturas e Proformas Emitidas
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Documentos oficiais para contabilidade e aquisições corporativas.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-3 px-4">Documento</th>
                      <th className="py-3 px-4">Cliente</th>
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4">Total com IVA</th>
                      <th className="py-3 px-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono font-bold text-blue-400">{inv.invoiceNumber} ({inv.type})</td>
                        <td className="py-3 px-4">{inv.clientName}</td>
                        <td className="py-3 px-4 font-mono text-slate-400">{inv.date}</td>
                        <td className="py-3 px-4 font-mono font-bold">{formatMZN(inv.total)}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => openInvoiceModal(inv)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Abrir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS & FACTORY RESET */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <h1 className="text-2xl font-black text-white tracking-tight">
              {t.adminSettings}
            </h1>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Restaurar Dados Originais de Fábrica (Demonstração)</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Repõe o catálogo completo de portáteis, telemóveis, Starlink, encomendas (#NC1234, etc.) e faturas de demonstração da NCAR Tec. Utilize esta opção sempre que desejar reiniciar os testes.
              </p>
              <button
                onClick={resetAllDemoData}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                {t.resetDemoData}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            onClick={() => setIsProductModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 p-6 z-10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? t.editProduct : t.addNewProduct}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nome do Equipamento *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Código SKU *</label>
                  <input
                    type="text"
                    required
                    value={productFormData.sku}
                    onChange={(e) => setProductFormData(p => ({ ...p, sku: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Categoria *</label>
                  <select
                    value={productFormData.category}
                    onChange={(e) => setProductFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Marca *</label>
                  <select
                    value={productFormData.brand}
                    onChange={(e) => setProductFormData(p => ({ ...p, brand: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                  >
                    {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Preço Venda (MZN) *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={productFormData.price}
                    onChange={(e) => setProductFormData(p => ({ ...p, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Preço Anterior (Riscado)</label>
                  <input
                    type="number"
                    min={0}
                    value={productFormData.oldPrice || ''}
                    onChange={(e) => setProductFormData(p => ({ ...p, oldPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Stock Disponível *</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={productFormData.stockCount}
                    onChange={(e) => setProductFormData(p => ({ ...p, stockCount: Number(e.target.value) }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 font-mono text-white"
                  />
                </div>
                <div className="flex items-center gap-4 pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isFeatured}
                      onChange={(e) => setProductFormData(p => ({ ...p, isFeatured: e.target.checked }))}
                      className="accent-blue-600"
                    />
                    <span>Destaque</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productFormData.isPromo}
                      onChange={(e) => setProductFormData(p => ({ ...p, isPromo: e.target.checked }))}
                      className="accent-blue-600"
                    />
                    <span>Promoção</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Descrição Curta</label>
                <input
                  type="text"
                  value={productFormData.shortDescription}
                  onChange={(e) => setProductFormData(p => ({ ...p, shortDescription: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Descrição Completa</label>
                <textarea
                  rows={3}
                  value={productFormData.description}
                  onChange={(e) => setProductFormData(p => ({ ...p, description: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-700 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs"
            onClick={() => setDeleteConfirmId(null)}
          />
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4 z-10">
            <div className="w-12 h-12 rounded-full bg-rose-900/40 text-rose-400 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Eliminar Produto?</h3>
            <p className="text-xs text-slate-400">
              {t.deleteConfirm}
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-slate-700 rounded-xl text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
