import React, { useState } from 'react';
import { 
  User, 
  Layers, 
  Heart, 
  SlidersHorizontal, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Package, 
  FileText, 
  Eye, 
  Trash2, 
  ShoppingCart, 
  ShieldCheck, 
  X,
  Plus,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const AccountView: React.FC = () => {
  const { 
    user, 
    setUser, 
    orders, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare, 
    clearCompare,
    products, 
    addToCart, 
    navigate, 
    formatMZN, 
    t, 
    openInvoiceModal,
    invoices,
    toggleAdminRole,
    isAuthenticated,
    openAuthModal
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'wishlist' | 'compare' | 'profile'>('overview');
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);

  // Filter favorite products
  const favoriteProducts = products.filter(p => wishlist.includes(p.id));
  const comparedProducts = products.filter(p => compareList.includes(p.id));

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Entregue':
        return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200';
      case 'Em preparação':
        return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200';
      case 'Enviada':
        return 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200';
      case 'Confirmada':
        return 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200';
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Aviso se não estiver autenticado */}
      {!isAuthenticated && (
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Ainda não iniciou sessão na sua conta
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inicie sessão com a sua Conta Google ou crie uma conta aqui no site para gerir os seus dados e pedidos.
              </p>
            </div>
          </div>
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            Entrar com Google / Criar Conta
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 text-white flex items-center justify-center font-black text-2xl shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
              {t.hello}, {user.name}!
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.welcomeBack} · Conta de Demonstração
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? 'Perfil Administrador' : 'Perfil Cliente'}
              </span>
              <button 
                onClick={toggleAdminRole} 
                className="text-[10px] text-blue-600 hover:underline cursor-pointer"
              >
                (Alternar Papel)
              </button>
            </div>
          </div>
        </div>

        {/* 3 Metric counters (Matching Prototype screenshot) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/60">
          <div className="text-center px-2">
            <div className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
              {orders.length}
            </div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Encomendas</p>
          </div>
          <div className="text-center px-2 border-x border-slate-200 dark:border-slate-700">
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
              {wishlist.length}
            </div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Favoritos</p>
          </div>
          <div className="text-center px-2">
            <div className="text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">
              {compareList.length}
            </div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Comparar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Account Navigation Sidebar (3 cols) */}
        <aside className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-1 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.myDashboard}</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4" />
              <span>{t.myOrders}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{orders.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4" />
              <span>{t.wishlist}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{wishlist.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              activeTab === 'compare'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4" />
              <span>{t.compare}</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">{compareList.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.personalData}</span>
          </button>
        </aside>

        {/* Right Main Content Area (9 cols) */}
        <main className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {/* TAB 1: OVERVIEW & ORDERS LIST */}
          {(activeTab === 'overview' || activeTab === 'orders') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {t.latestOrders}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Histórico de encomendas efetuadas e acompanhamento de estados.
                  </p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-500">
                  Ainda não tem encomendas registadas.
                </div>
              ) : (
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                        <th className="py-3 px-4">Nº Encomenda</th>
                        <th className="py-3 px-4">Data</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Total</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500">{ord.date}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(ord.status)}`}>
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                            {formatMZN(ord.total)}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedOrderForTracking(ord)}
                              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-300 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                              title="Acompanhar Linha do Tempo"
                            >
                              Ver Estado
                            </button>
                            <button
                              onClick={() => {
                                const inv = invoices.find(i => i.orderId === ord.id) || invoices[0];
                                if (inv) openInvoiceModal(inv);
                              }}
                              className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer"
                              title="Ver Factura"
                            >
                              Factura
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {t.wishlist} ({favoriteProducts.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Equipamentos que guardou para compra posterior.
                </p>
              </div>

              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-500">
                  Não tem produtos guardados nos favoritos.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteProducts.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 p-2 shrink-0 flex items-center justify-center">
                          <img src={p.images[0]} alt={p.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{p.name}</p>
                          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono mt-0.5">{formatMZN(p.price)}</p>
                          <span className="text-[10px] text-emerald-600 font-medium">Em stock</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="p-2 rounded-lg bg-blue-600 text-white text-xs hover:bg-blue-700 transition-colors"
                          title="Mover para o Carrinho"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COMPARE */}
          {activeTab === 'compare' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {t.compareProducts} ({comparedProducts.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Compare especificações de processador, memória, ecrã e preços lado a lado.
                  </p>
                </div>
                {comparedProducts.length > 0 && (
                  <button
                    onClick={clearCompare}
                    className="text-xs text-rose-600 hover:underline cursor-pointer"
                  >
                    {t.removeAll}
                  </button>
                )}
              </div>

              {comparedProducts.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-500">
                  {t.emptyCompare} Navegue pela loja e clique no ícone de comparar.
                </div>
              ) : (
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                        <th className="p-4 w-40 text-slate-500 font-bold">Especificação</th>
                        {comparedProducts.map((p) => (
                          <th key={p.id} className="p-4 min-w-[200px] text-center">
                            <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-800 p-2 rounded-lg mb-2 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                              <img src={p.images[0]} alt={p.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <p className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{p.name}</p>
                            <p className="font-bold text-blue-600 font-mono mt-1">{formatMZN(p.price)}</p>
                            <button
                              onClick={() => addToCart(p, 1)}
                              className="mt-2 w-full py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-semibold hover:bg-blue-700 cursor-pointer"
                            >
                              Adicionar
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-3 font-semibold text-slate-500">Marca</td>
                        {comparedProducts.map(p => <td key={p.id} className="p-3 text-center font-medium">{p.brand}</td>)}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-500">Processador</td>
                        {comparedProducts.map(p => <td key={p.id} className="p-3 text-center">{p.specs.processor || 'N/A'}</td>)}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-500">Memória RAM</td>
                        {comparedProducts.map(p => <td key={p.id} className="p-3 text-center">{p.specs.ram || 'N/A'}</td>)}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-500">Armazenamento</td>
                        {comparedProducts.map(p => <td key={p.id} className="p-3 text-center">{p.specs.storage || 'N/A'}</td>)}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-500">Ecrã</td>
                        {comparedProducts.map(p => <td key={p.id} className="p-3 text-center">{p.specs.screen || 'N/A'}</td>)}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-500">Garantia</td>
                        {comparedProducts.map(p => <td key={p.id} className="p-3 text-center">{p.specs.warranty || '1 Ano NCAR Tec'}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {t.personalData}
                </h2>
                <p className="text-xs text-slate-500">
                  Atualize as suas informações de contacto e morada padrão para entregas.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setUser(user);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Telefone Moçambique</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Morada Principal</label>
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cidade</label>
                    <input
                      type="text"
                      value={user.city}
                      onChange={(e) => setUser({ ...user, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Província</label>
                    <input
                      type="text"
                      value={user.province}
                      onChange={(e) => setUser({ ...user, province: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Guardar Perfil
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ORDER TRACKING TIMELINE */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setSelectedOrderForTracking(null)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Rastreio de Encomenda</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {selectedOrderForTracking.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {selectedOrderForTracking.trackingTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {idx < selectedOrderForTracking.trackingTimeline.length - 1 && (
                      <div className="w-0.5 h-10 bg-emerald-500/40 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{item.status}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
