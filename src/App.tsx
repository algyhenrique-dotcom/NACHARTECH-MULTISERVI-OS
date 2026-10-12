/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { InvoiceModal } from './components/InvoiceModal';
import { ToastContainer } from './components/ToastContainer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AuthModal } from './components/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { StoreView } from './views/StoreView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { AccountView } from './views/AccountView';
import { ServicesView } from './views/ServicesView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { InvoicesView } from './views/InvoicesView';
import { PolicyView } from './views/PolicyView';
import { AdminView } from './views/AdminView';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'store':
        return <StoreView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'account':
        return <AccountView />;
      case 'services':
        return <ServicesView />;
      case 'service-detail':
        return <ServiceDetailView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'invoices':
        return <InvoicesView />;
      case 'policy':
        return <PolicyView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Show regular footer when not in full admin mode */}
      {currentView !== 'admin' && <Footer />}

      {/* Global Modals & Floating Tools */}
      <CartDrawer />
      <GlobalSearchModal />
      <InvoiceModal />
      <ToastContainer />
      <WhatsAppFloat />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
