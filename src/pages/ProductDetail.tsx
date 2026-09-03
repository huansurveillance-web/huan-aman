import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Star, 
  FileText, 
  Share2, 
  Sparkles,
  Layers,
  Wrench
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetail: React.FC = () => {
  const { 
    products, 
    pageParam, 
    navigate, 
    formatPrice, 
    addToCart, 
    showToast 
  } = useApp();

  const [quantity, setQuantity] = useState<number>(1);
  const [includeInstallation, setIncludeInstallation] = useState<boolean>(true);

  const product = (products || []).find(p => p.id === pageParam) || (products && products[0]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <button
          onClick={() => navigate('products')}
          className="px-4 py-2 bg-[#0E3A5C] text-white rounded-lg text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, includeInstallation);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('products')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Catalog</span>
      </button>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Product Image & Badges (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl bg-slate-900 overflow-hidden border border-slate-700/80 aspect-4/3 sm:aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#E65100] text-white text-xs font-bold uppercase px-3 py-1 rounded-md tracking-wider shadow">
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-mono px-3 py-1 rounded-md">
              {product.brand} • {product.modelNumber}
            </span>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-[#081827] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
              <span>2-Year Warranty</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#081827] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Karachi 24–36hr SLA</span>
            </div>
          </div>
        </div>

        {/* Right: Info, Pricing, Configuration & Add to Cart (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-wider">
                {product.category.toUpperCase()} • MODEL: {product.modelNumber}
              </span>
              <button
                onClick={handleShare}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 text-xs pt-1">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {product.rating} / 5.0
              </span>
              <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 bg-slate-50 dark:bg-[#0A1F30] rounded-2xl border border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-500 block">Unit Investment:</span>
              <span className="text-2xl sm:text-3xl font-black text-[#0E3A5C] dark:text-amber-400 font-mono">
                {formatPrice(product.price, product.isPriceOnQuote)}
              </span>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
              In Stock & Ready for Dispatch
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Package Inclusions if bundle */}
          {product.packageIncludes && product.packageIncludes.length > 0 && (
            <div className="p-4 bg-[#081827] rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Package Turnkey Inclusions
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                {product.packageIncludes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Installation Option & Quantity Selector */}
          <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={(e) => setIncludeInstallation(e.target.checked)}
                  className="accent-[#E65100] w-4 h-4 rounded cursor-pointer"
                />
                <span className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-500" />
                  Include On-Site Installation & Mobile App Setup
                </span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">Karachi / Nationwide</span>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-mono font-bold text-xs text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-2 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider py-3 px-6 rounded-xl shadow transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Quote Cart</span>
              </button>
            </div>

          </div>

          {/* Quick AI Quote Link */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>Need multiple items or full facility design?</span>
            <button
              onClick={() => navigate('quote')}
              className="text-amber-500 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch AI Custom Wizard</span>
            </button>
          </div>

        </div>

      </div>

      {/* Technical Specifications Table */}
      <div className="bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-mono uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-3">
          Technical Specifications & Engineering Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specs || {}).map(([key, val], idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-4 text-xs"
            >
              <span className="font-semibold text-slate-500 dark:text-slate-400">{key}</span>
              <span className="font-medium text-slate-900 dark:text-white text-right font-mono">{val}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
