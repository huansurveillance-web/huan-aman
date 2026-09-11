import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Check, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Package as PackageIcon,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const Products: React.FC = () => {
  const { 
    products, 
    formatPrice, 
    addToCart, 
    navigate, 
    searchQuery, 
    setSearchQuery,
    companyStats
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'package', label: 'Turnkey Packages' },
    { id: 'dome', label: 'Turret & Domes' },
    { id: 'bullet', label: 'Bullet Cameras' },
    { id: 'ptz', label: 'Speed Dome PTZ' },
    { id: 'nvr', label: 'NVR Recorders' },
    { id: 'fiber', label: 'Fiber Optic Gear' },
    { id: 'control-room', label: 'Command Center Video Walls' },
    { id: 'access', label: 'Biometric Access Control' },
  ];

  // Filtering Logic
  const filteredProducts = (products || []).filter(product => {
    // Category match
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'package' && !product.isPackage) return false;
      if (selectedCategory !== 'package' && product.category !== selectedCategory) return false;
    }

    // Search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.shortDescription.toLowerCase().includes(q);
      const matchModel = product.modelNumber.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchModel && !matchBrand) return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'price-asc') return a.price - b.price;
    if (sortOrder === 'price-desc') return b.price - a.price;
    return b.rating - a.rating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="bg-[#081827] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
            Surveillance Catalog & Turnkey Bundles
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Security Hardware & Commercial Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All equipment is commercial-grade, backed by official 2-year replacement warranties, and eligible for guaranteed 24–36hr on-site service in Karachi.
          </p>
        </div>

        {/* Action Prompt */}
        <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => navigate('quote')}
            className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl shadow cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Need Custom Engineering? Launch AI Quote Flow</span>
          </button>
        </div>
      </div>

      {/* Category Pills & Search Controls */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cameras, NVRs, fiber, video walls..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#0A1F30] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Sort By:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-white dark:bg-[#0A1F30] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
            >
              <option value="featured">Featured / Highest Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0E3A5C] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Search className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No matching products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or switch to "All Equipment" to browse our complete catalog.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-[#0E3A5C] text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-amber-500/50"
            >
              <div>
                {/* Image Container */}
                <div 
                  className="relative h-52 bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => navigate('product-detail', product.id)}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#E65100] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider shadow">
                      {product.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/80 text-slate-200 text-[10px] font-mono px-2 py-0.5 rounded">
                    {product.brand} • {product.modelNumber}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-slate-500 text-[11px]">({product.reviewCount})</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-500 font-semibold uppercase">
                      In Stock
                    </span>
                  </div>

                  <h3 
                    onClick={() => navigate('product-detail', product.id)}
                    className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors cursor-pointer line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                    {product.features?.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 line-clamp-1">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <div className="flex items-baseline justify-between mb-4 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                  <span className="text-xs text-slate-400 font-medium">Price:</span>
                  <span className="text-lg font-black text-[#0E3A5C] dark:text-amber-400 font-mono">
                    {formatPrice(product.price, product.isPriceOnQuote)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigate('product-detail', product.id)}
                    className="w-full text-center text-xs font-semibold py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => addToCart(product, 1, true)}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider py-2.5 rounded-lg bg-[#E65100] hover:bg-[#D97706] text-white transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Bottom Trust Strip */}
      <div className="bg-[#05111B] text-slate-300 rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
          <span>
            Every purchase includes <strong>{companyStats.standardWarranty || '2-Year Hardware Replacement Warranty'}</strong> and optional turnkey installation anywhere in Pakistan.
          </span>
        </div>

        <button
          onClick={() => navigate('quote')}
          className="whitespace-nowrap px-4 py-2 rounded-lg bg-[#0E3A5C] hover:bg-[#134a74] text-white font-bold cursor-pointer"
        >
          Custom Quote Engine
        </button>
      </div>

    </div>
  );
};

export default Products;
