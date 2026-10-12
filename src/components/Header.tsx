import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  SlidersHorizontal, 
  User, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Layers, 
  FileText, 
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  LogIn,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NacharTechLogo } from './NacharTechLogo';

export const Header: React.FC = () => {
  const {
    currentView,
    navigate,
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    cartCount,
    setIsCartDrawerOpen,
    wishlist,
    compareList,
    user,
    toggleAdminRole,
    setIsSearchModalOpen,
    isAuthenticated,
    openAuthModal,
    logout,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 text-white shadow-xl transition-colors">
      {/* Main Header Bar (Sem barras vazias nos cantos e logo chegado à esquerda) */}
      <div className="max-w-[1600px] w-full mx-auto px-2 sm:px-4 lg:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo Lockup (Chegado mais para a esquerda sem recuo excessivo) */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => navigate('home')} 
            className="group text-left cursor-pointer shrink-0 transition-transform hover:scale-[1.02]"
          >
            <NacharTechLogo size="md" />
          </button>
        </div>

        {/* Desktop Navigation Links (Sem quebras de linha e com fonte limpa) */}
        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4.5 text-xs font-semibold text-slate-300 shrink-0">
          <button 
            onClick={() => navigate('home')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'home' 
                ? 'text-blue-400 font-bold border-b-2 border-blue-500' 
                : 'hover:text-slate-100'
            }`}
          >
            {t.home}
          </button>
          <button 
            onClick={() => navigate('store')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'store' 
                ? 'text-blue-400 font-bold border-b-2 border-blue-500' 
                : 'hover:text-slate-100'
            }`}
          >
            {t.store}
          </button>
          <button 
            onClick={() => navigate('services')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'services' 
                ? 'text-orange-400 font-bold border-b-2 border-orange-500' 
                : 'hover:text-slate-100'
            }`}
          >
            {t.services}
          </button>
          <button 
            onClick={() => navigate('about')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'about' 
                ? 'text-blue-400 font-bold border-b-2 border-blue-500' 
                : 'hover:text-slate-100'
            }`}
          >
            {t.about}
          </button>
          <button 
            onClick={() => navigate('invoices')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'invoices' 
                ? 'text-blue-400 font-bold border-b-2 border-blue-500' 
                : 'hover:text-slate-100'
            }`}
          >
            {t.invoicing}
          </button>
          <button 
            onClick={() => navigate('contact')} 
            className={`whitespace-nowrap px-1.5 py-1 transition-colors hover:text-white cursor-pointer ${
              currentView === 'contact' 
                ? 'text-blue-400 font-bold border-b-2 border-blue-500' 
                : 'hover:text-slate-100'
            }`}
          >
            {t.contact}
          </button>
        </nav>



        {/* Right Action Icons & Controls (Sempre visíveis e alinhados) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Pesquisar"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[10px] font-bold">
            <button
              onClick={() => setLanguage('pt')}
              className={`px-1.5 py-0.5 rounded transition-colors ${language === 'pt' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded transition-colors ${language === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
          </button>

          {/* Compare Button */}
          <button
            onClick={() => navigate('account')}
            className="hidden sm:flex relative p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Comparar produtos"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {compareList.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-sky-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigate('account')}
            className="relative p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Favoritos"
          >
            <Heart className="w-3.5 h-3.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
            title="Ver carrinho de compras"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-blue-400" />
            {cartCount > 0 && (
              <span className="w-4 h-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Button: Só mostra 'João' se tiver feito login! Caso contrário mostra botão 'Entrar' */}
          {!isAuthenticated ? (
            <button
              onClick={() => openAuthModal('login')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title="Entrar com Google ou Criar Conta"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.login || 'Entrar'}</span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-200 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline font-semibold text-[11px] max-w-[75px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-800">
                    <p className="text-xs font-semibold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded font-mono ${user.role === 'admin' ? 'bg-amber-900/60 text-amber-300' : 'bg-blue-900/60 text-blue-300'}`}>
                      {user.role === 'admin' ? 'Administrador' : (user.provider === 'google' ? 'Conta Google Conectada' : 'Cliente Registado')}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate('account')}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    {t.myDashboard || 'Painel da Conta'}
                  </button>
                  <button
                    onClick={() => navigate('account')}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    {t.myOrders || 'Meus Pedidos'}
                  </button>
                  <button
                    onClick={() => navigate('invoices')}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    {t.invoicing || 'Facturação & Proformas'}
                  </button>

                  <div className="my-1 border-t border-slate-800"></div>

                  <button
                    onClick={() => navigate('admin')}
                    className="w-full text-left px-4 py-2 text-xs text-amber-400 hover:bg-slate-800 flex items-center gap-2 font-medium cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {t.admin}
                  </button>
                  <button
                    onClick={toggleAdminRole}
                    className="w-full text-left px-4 py-2 text-[11px] text-slate-400 hover:text-slate-200 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {user.role === 'admin' ? 'Mudar para Cliente' : 'Ativar Modo Admin'}
                  </button>

                  <div className="my-1 border-t border-slate-800"></div>

                  {/* Terminar Sessão (Logout) */}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-slate-800 flex items-center gap-2 cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t.logout || 'Terminar Sessão'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur px-4 py-4 space-y-3">
          <button
            onClick={() => { navigate('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-xs font-semibold text-slate-200 hover:text-blue-400"
          >
            {t.home}
          </button>
          <button
            onClick={() => { navigate('store'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-xs font-semibold text-slate-200 hover:text-blue-400"
          >
            {t.store}
          </button>
          <button
            onClick={() => { navigate('services'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-xs font-semibold text-slate-200 hover:text-orange-400"
          >
            {t.services}
          </button>
          <button
            onClick={() => { navigate('about'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-xs font-semibold text-slate-200 hover:text-blue-400"
          >
            {t.about}
          </button>
          <button
            onClick={() => { navigate('invoices'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-xs font-semibold text-slate-200 hover:text-blue-400"
          >
            {t.invoicing}
          </button>
          <button
            onClick={() => { navigate('contact'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-xs font-semibold text-slate-200 hover:text-blue-400"
          >
            {t.contact}
          </button>
          <div className="pt-2 border-t border-slate-800 space-y-2">
            {!isAuthenticated ? (
              <button
                onClick={() => { openAuthModal('login'); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.login || 'Entrar'} / {language === 'pt' ? 'Criar Conta' : 'Register'}</span>
              </button>
            ) : (
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-200">{user.name}</span>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t.logout || 'Sair'}</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => { navigate('admin'); setMobileMenuOpen(false); }}
                className="text-xs font-semibold text-amber-400 flex items-center gap-1.5 py-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.admin}
              </button>
              <span className="text-[11px] text-slate-400 font-mono">Maputo & Nampula, MZ</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
