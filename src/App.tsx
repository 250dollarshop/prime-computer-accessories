import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { FloatingControls } from './components/FloatingControls';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import {
  AboutPage,
  ContactPage,
  FaqPage,
  NotFoundPage,
  ShippingReturnsPage,
} from './pages/InfoPages';

const PageRouter: React.FC = () => {
  const { route } = useStore();

  const renderPage = () => {
    switch (route.name) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'account':
        return <AccountPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FaqPage />;
      case 'shipping-returns':
        return <ShippingReturnsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <NotFoundPage />;
    }
  };

  const pageKey = `${route.name}-${route.param || ''}-${route.categoryFilter || ''}-${
    route.collectionFilter || ''
  }-${route.brandFilter || ''}-${route.searchFilter || ''}`;

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pageKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {renderPage()}
      </motion.main>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F7FB] text-slate-900 dark:bg-navy-gradient dark:text-slate-100 transition-colors">
        <AnnouncementBar />
        <Navbar />
        <PageRouter />
        <Footer />
        <CartDrawer />
        <QuickViewModal />
        <FloatingControls />
      </div>
    </StoreProvider>
  );
}
