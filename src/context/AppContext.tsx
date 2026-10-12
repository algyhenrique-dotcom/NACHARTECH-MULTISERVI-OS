import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, Brand, ServiceItem, Order, Invoice, QuoteRequest, CartItem, UserProfile, Language, ThemeMode } from '../types';
import { storageService } from '../services/storageService';
import { translations } from '../locales/translations';

export type ViewType = 
  | 'home' 
  | 'store' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'account' 
  | 'services' 
  | 'service-detail' 
  | 'about' 
  | 'contact' 
  | 'invoices' 
  | 'policy' 
  | 'admin';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
}

interface AppContextType {
  // Navigation & View
  currentView: ViewType;
  selectedProductId: string | null;
  selectedServiceId: string | null;
  navigate: (view: ViewType, params?: { productId?: string; serviceId?: string; policyTab?: string }) => void;
  policyTab: string;
  setPolicyTab: (tab: string) => void;

  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['pt'];
  theme: ThemeMode;
  toggleTheme: () => void;

  // E-commerce state
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist & Compare
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  compareList: string[];
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  // User & Auth
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  toggleAdminRole: () => void;
  isAuthenticated: boolean;
  loginWithGoogle: (accountInfo?: { name: string; email: string; avatar?: string; phone?: string; city?: string }) => void;
  loginWithEmail: (email: string, password: string, name?: string) => boolean;
  registerAccount: (userData: { name: string; email: string; phone?: string; password?: string; city?: string }) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  openAuthModal: (mode?: 'login' | 'register') => void;
  authModalInitialTab: 'login' | 'register';

  // Data from Storage
  products: Product[];
  categories: Category[];
  brands: Brand[];
  services: ServiceItem[];
  orders: Order[];
  invoices: Invoice[];
  quotes: QuoteRequest[];
  refreshData: () => void;

  // Actions
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'trackingTimeline'>) => Order;
  submitQuote: (quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => QuoteRequest;
  resetAllDemoData: () => void;

  // Invoice & Modal
  activeInvoice: Invoice | null;
  openInvoiceModal: (invoice: Invoice) => void;
  closeInvoiceModal: () => void;

  // Search
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type'], title?: string) => void;
  dismissToast: (id: string) => void;

  // Formatting utility
  formatMZN: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [policyTab, setPolicyTab] = useState<string>('terms');

  // Language & Theme
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ncartec_lang') as Language) || 'pt';
  });
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('ncartec_theme') as ThemeMode) || 'light';
  });

  // Cart, Wishlist, Compare
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ncartec_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ncartec_wishlist_v1');
      return saved ? JSON.parse(saved) : ['prod-lenovo-ideapad-3', 'prod-jbl-tune-720bt'];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ncartec_compare_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User & Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ncartec_auth_v1') === 'true';
  });
  const [user, setUserState] = useState<UserProfile>(() => storageService.getUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialTab, setAuthModalInitialTab] = useState<'login' | 'register'>('login');

  // Storage data states
  const [products, setProducts] = useState<Product[]>(() => storageService.getProducts());
  const [categories, setCategories] = useState<Category[]>(() => storageService.getCategories());
  const [brands, setBrands] = useState<Brand[]>(() => storageService.getBrands());
  const [services, setServices] = useState<ServiceItem[]>(() => storageService.getServices());
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [invoices, setInvoices] = useState<Invoice[]>(() => storageService.getInvoices());
  const [quotes, setQuotes] = useState<QuoteRequest[]>(() => storageService.getQuotes());

  // UI state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme class to html/document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      document.body.classList.remove('dark');
    }
    localStorage.setItem('ncartec_theme', theme);
  }, [theme]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('ncartec_cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('ncartec_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync compare to localStorage
  useEffect(() => {
    localStorage.setItem('ncartec_compare_v1', JSON.stringify(compareList));
  }, [compareList]);

  // Listen to custom storage events
  const refreshData = () => {
    setProducts(storageService.getProducts());
    setCategories(storageService.getCategories());
    setBrands(storageService.getBrands());
    setServices(storageService.getServices());
    setOrders(storageService.getOrders());
    setInvoices(storageService.getInvoices());
    setQuotes(storageService.getQuotes());
    setUserState(storageService.getUser());
  };

  useEffect(() => {
    const handleStorageUpdate = () => {
      refreshData();
    };
    window.addEventListener('ncartec-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('ncartec-storage-update', handleStorageUpdate);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ncartec_lang', lang);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setUser = (newUser: UserProfile) => {
    setUserState(newUser);
    storageService.saveUser(newUser);
  };

  const toggleAdminRole = () => {
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const updated = { ...user, role: newRole as 'customer' | 'admin' };
    setUser(updated);
    showToast(
      newRole === 'admin' 
        ? 'Modo Administrador activado com acesso total ao painel.' 
        : 'Modo Cliente demo activado.',
      'info'
    );
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalInitialTab(mode);
    setIsAuthModalOpen(true);
  };

  const loginWithGoogle = (accountInfo?: { name: string; email: string; avatar?: string; phone?: string; city?: string }) => {
    const chosenName = accountInfo?.name?.trim() || 'Henrique Nivarela';
    const chosenEmail = accountInfo?.email?.trim() || 'nivarelahenrique@gmail.com';
    const googleUser: UserProfile = {
      id: `usr-google-${Date.now()}`,
      name: chosenName,
      email: chosenEmail,
      phone: accountInfo?.phone || '+258 84 761 0803',
      address: 'Moçambique',
      city: accountInfo?.city || 'Nampula',
      province: 'Nampula',
      role: chosenEmail.toLowerCase().includes('admin') ? 'admin' : 'customer',
      avatar: accountInfo?.avatar,
      provider: 'google'
    };
    setUserState(googleUser);
    storageService.saveUser(googleUser);
    setIsAuthenticated(true);
    localStorage.setItem('ncartec_auth_v1', 'true');
    setIsAuthModalOpen(false);
    showToast(
      language === 'pt' 
        ? `Sessão iniciada como ${chosenName} (${chosenEmail}) com a Conta Google!` 
        : `Signed in as ${chosenName} (${chosenEmail}) with Google!`, 
      'success'
    );
  };

  const loginWithEmail = (email: string, password: string, name?: string): boolean => {
    const displayName = name || (email.toLowerCase().includes('joao') ? 'João Silva' : email.split('@')[0]);
    const loggedUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: displayName,
      email: email,
      phone: '+258 84 987 6543',
      address: 'Maputo',
      city: 'Maputo',
      province: 'Maputo Cidade',
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
      provider: 'local'
    };
    setUserState(loggedUser);
    storageService.saveUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('ncartec_auth_v1', 'true');
    setIsAuthModalOpen(false);
    showToast(language === 'pt' ? `Bem-vindo de volta, ${displayName}!` : `Welcome back, ${displayName}!`, 'success');
    return true;
  };

  const registerAccount = (userData: { name: string; email: string; phone?: string; password?: string; city?: string }) => {
    const newUser: UserProfile = {
      id: `usr-reg-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+258 84 000 0000',
      address: userData.city || 'Maputo',
      city: userData.city || 'Maputo',
      province: 'Maputo Cidade',
      role: 'customer',
      provider: 'local'
    };
    setUserState(newUser);
    storageService.saveUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('ncartec_auth_v1', 'true');
    setIsAuthModalOpen(false);
    showToast(language === 'pt' ? `Conta criada com sucesso! Bem-vindo(a), ${userData.name}!` : `Account created successfully! Welcome, ${userData.name}!`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ncartec_auth_v1');
    showToast(language === 'pt' ? 'Sessão terminada.' : 'Signed out successfully.', 'info');
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'info', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, type, message, title };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigate = (view: ViewType, params?: { productId?: string; serviceId?: string; policyTab?: string }) => {
    setCurrentView(view);
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.serviceId) setSelectedServiceId(params.serviceId);
    if (params?.policyTab) setPolicyTab(params.policyTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === color && 
        item.selectedStorage === storage
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedColor: color, selectedStorage: storage }];
    });
    showToast(`${product.name} adicionado ao carrinho!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removido do carrinho.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const cartSubtotal = cart.reduce((acc, it) => acc + (it.product.price * it.quantity), 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removido dos favoritos.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Adicionado aos favoritos!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        showToast('Item removido da comparação.', 'info');
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 4) {
        showToast('Pode comparar até 4 produtos simultaneamente.', 'warning');
        return prev;
      }
      showToast('Produto adicionado ao comparador.', 'success');
      return [...prev, productId];
    });
  };

  const isInCompare = (productId: string) => compareList.includes(productId);
  const clearCompare = () => setCompareList([]);

  // Create Order
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'trackingTimeline'>) => {
    const newOrder = storageService.createOrder(orderData);
    clearCart();
    refreshData();
    showToast(`Encomenda ${newOrder.orderNumber} registada com sucesso!`, 'success');
    return newOrder;
  };

  // Submit Quote
  const submitQuote = (quoteData: Omit<QuoteRequest, 'id' | 'status' | 'createdAt'>) => {
    const q = storageService.submitQuote(quoteData);
    refreshData();
    showToast('Pedido de orçamento enviado com sucesso!', 'success');
    return q;
  };

  // Reset Demo Data
  const resetAllDemoData = () => {
    storageService.resetAllDemoData();
    setCart([]);
    setWishlist(['prod-lenovo-ideapad-3', 'prod-jbl-tune-720bt']);
    setCompareList([]);
    refreshData();
    showToast('Todos os dados locais foram restaurados para o padrão de demonstração!', 'info');
  };

  const openInvoiceModal = (invoice: Invoice) => setActiveInvoice(invoice);
  const closeInvoiceModal = () => setActiveInvoice(null);

  // Format currency in Mozambican Meticais (MZN)
  const formatMZN = (amount: number): string => {
    return `MZN ${amount.toLocaleString('pt-MZ')}`;
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedProductId,
        selectedServiceId,
        navigate,
        policyTab,
        setPolicyTab,
        language,
        setLanguage,
        t: translations[language],
        theme,
        toggleTheme,
        cart,
        cartCount,
        cartSubtotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        user,
        setUser,
        toggleAdminRole,
        isAuthenticated,
        loginWithGoogle,
        loginWithEmail,
        registerAccount,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        openAuthModal,
        authModalInitialTab,
        products,
        categories,
        brands,
        services,
        orders,
        invoices,
        quotes,
        refreshData,
        createOrder,
        submitQuote,
        resetAllDemoData,
        activeInvoice,
        openInvoiceModal,
        closeInvoiceModal,
        isSearchModalOpen,
        setIsSearchModalOpen,
        toasts,
        showToast,
        dismissToast,
        formatMZN,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
