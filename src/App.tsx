import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import StorageCalculatorModal from './components/StorageCalculatorModal';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import QuoteWizard from './pages/QuoteWizard';
import Reviews from './pages/Reviews';
import CompanyProfile from './pages/CompanyProfile';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import { Blog, BlogPostView } from './pages/Blog';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

const MainAppContent: React.FC = () => {
  const { currentPage, toastMessage } = useApp();
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onOpenCalculator={() => setIsCalculatorOpen(true)} />;
      case 'products':
        return <Products />;
      case 'product-detail':
        return <ProductDetail />;
      case 'services':
        return <Services />;
      case 'quote':
        return <QuoteWizard />;
      case 'reviews':
        return <Reviews />;
      case 'company-profile':
        return <CompanyProfile />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      case 'blog':
        return <Blog />;
      case 'blog-post':
        return <BlogPostView />;
      case 'cart':
        return <Cart />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onOpenCalculator={() => setIsCalculatorOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#05101A] text-slate-100 selection:bg-[#E65100] selection:text-white">
      {/* Top Header */}
      <Header onOpenCalculator={() => setIsCalculatorOpen(true)} />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onOpenCalculator={() => setIsCalculatorOpen(true)} />

      {/* Floating Interactive WhatsApp Button */}
      <WhatsAppButton />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0E3A5C] text-white text-xs font-semibold px-4 py-3 rounded-xl border border-slate-700 shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Surveillance Storage & Bandwidth Calculator Modal */}
      <StorageCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
