import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Users, 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Download, 
  Search, 
  Eye, 
  Phone, 
  Mail, 
  Calendar,
  Save,
  Check,
  HardDrive,
  FileText,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, QuoteLead, Review } from '../types';
import { generateQuotePDF } from '../services/pdfService';
import { uploadMediaFile } from '../services/appwriteService';

export const Admin: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    adminCheckingSession,
    loginAdmin, 
    logoutAdmin, 
    leads, 
    updateLeadStatus, 
    deleteLead,
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    categories,
    addCategory,
    deleteCategory,
    reviews, 
    approveReview, 
    deleteReview,
    companyStats, 
    updateCompanyStats,
    formatPrice,
    showToast
  } = useApp();

  // Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Admin Active Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'products' | 'reviews' | 'settings'>('leads');

  // Leads Filter & Search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [selectedLeadModal, setSelectedLeadModal] = useState<QuoteLead | null>(null);

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    brand: 'Hikvision',
    modelNumber: '',
    category: 'dome',
    price: 15000,
    shortDescription: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    isPackage: false,
    isPriceOnQuote: false,
    rating: 5,
    reviewCount: 1
  });

  // Settings State Form
  const [statsForm, setStatsForm] = useState(companyStats);

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const ok = await loginAdmin(adminEmail, adminPassword);
    setLoginLoading(false);
    if (!ok) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setAdminPassword('');
    }
  };

  // Lead Download PDF
  const handleDownloadLeadPDF = (lead: QuoteLead) => {
    generateQuotePDF(lead, companyStats);
  };

  // Product Submit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.modelNumber) {
      alert('Name and Model Number are required.');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
      showToast('Product updated successfully.');
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name || 'New Hardware',
        brand: productForm.brand || 'Hikvision',
        modelNumber: productForm.modelNumber || 'DS-HUAN',
        category: (productForm.category as any) || 'dome',
        price: Number(productForm.price) || 0,
        isPriceOnQuote: Boolean(productForm.isPriceOnQuote),
        imageUrl: productForm.imageUrl || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
        shortDescription: productForm.shortDescription || '',
        description: productForm.description || '',
        features: productForm.features || ['Commercial Surveillance Grade', '2-Year Official Replacement Warranty'],
        specs: productForm.specs || { 'Warranty': '2-Year Official Replacement' },
        warranty: productForm.warranty || '2-Year Official Replacement',
        isPackage: Boolean(productForm.isPackage),
        packageIncludes: productForm.isPackage ? ['Complete Kit Hardware', 'Certified Installation'] : undefined,
        inStock: true,
        rating: 5,
        reviewCount: 1,
        badge: productForm.badge
      };
      addProduct(newProd);
      showToast('Product added to catalog.');
    }

    setIsProductModalOpen(false);
    setEditingProductId(null);
  };

  const handleEditProductClick = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm(prod);
    setIsProductModalOpen(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyStats(statsForm);
    showToast('Company settings & NTN credentials saved.');
  };

  // Filtered Leads
  const filteredLeads = (leads || []).filter(l => {
    if (leadStatusFilter !== 'all' && l.status !== leadStatusFilter) return false;
    if (leadSearch.trim()) {
      const q = leadSearch.toLowerCase();
      const matchName = (l.customerName || '').toLowerCase().includes(q);
      const matchPhone = (l.phone || '').toLowerCase().includes(q);
      const matchCity = (l.city || '').toLowerCase().includes(q);
      const matchId = (l.id || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchCity && !matchId) return false;
    }
    return true;
  });

  if (adminCheckingSession) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-slate-400 text-sm">
        Checking session...
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-[#081827] border border-slate-800 rounded-3xl p-8 text-white text-center space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-[#0E3A5C] text-amber-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black">HUAN Operations Portal</h2>
            <p className="text-xs text-slate-400">
              Access the secured lead CRM, product management, and reviews moderation.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Admin email"
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                  setLoginError(false);
                }}
                className="w-full text-center text-sm bg-slate-900 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:border-amber-500"
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setLoginError(false);
                }}
                className="w-full text-center text-sm bg-slate-900 border border-slate-700 rounded-xl py-3 text-white focus:outline-none focus:border-amber-500"
                autoComplete="current-password"
              />
              {loginError && (
                <p className="text-[11px] text-red-400 mt-1">Invalid email or password. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-[#E65100] hover:bg-[#D97706] disabled:opacity-60 text-white font-bold uppercase tracking-wider py-3 rounded-xl transition-colors cursor-pointer"
            >
              {loginLoading ? 'Signing in...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          <p className="text-[11px] text-slate-500">
            Secured by Appwrite Auth — only accounts created in your Appwrite Console can sign in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Bar */}
      <div className="bg-[#081827] border border-slate-800 rounded-2xl p-4 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#0E3A5C] text-amber-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">HUAN Surveillance Management Console</h1>
            <p className="text-xs text-slate-400">Karachi Operations, Nationwide Leads & Inventory</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Authenticated Admin
          </span>
          <button
            onClick={logoutAdmin}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'leads'
              ? 'bg-[#0E3A5C] text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Inquiries & Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-[#0E3A5C] text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'reviews'
              ? 'bg-[#0E3A5C] text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reviews Moderation ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-[#0E3A5C] text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Company Profile & NTN</span>
        </button>
      </div>

      {/* ================= TAB 1: LEADS CRM ================= */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          
          {/* Filter / Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lead by name, phone, reference ID..."
                value={leadSearch}
                onChange={(e) => setLeadSearch(e.target.value)}
                className="w-full bg-white dark:bg-[#081827] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Status:</span>
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="bg-white dark:bg-[#081827] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Statuses ({leads.length})</option>
                <option value="new">New Inquiries</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted / Survey Scheduled</option>
                <option value="won">Won / Converted</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                  <tr>
                    <th className="p-3.5">Ref ID / Date</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Service / City</th>
                    <th className="p-3.5">AI Architecture</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="p-3.5 font-mono">
                        <span className="font-bold text-amber-500 block">{lead.id}</span>
                        <span className="text-[10px] text-slate-400">{lead.createdAt.split('T')[0]}</span>
                      </td>

                      <td className="p-3.5">
                        <strong className="text-slate-900 dark:text-white block">{lead.customerName}</strong>
                        <span className="text-[11px] text-slate-500 font-mono block">{lead.phone}</span>
                        <span className="text-[10px] text-slate-400 truncate max-w-[150px] block">{lead.email}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block capitalize">
                          {lead.serviceCategory.replace('-', ' ')}
                        </span>
                        <span className="text-[11px] text-slate-500">{lead.city}</span>
                      </td>

                      <td className="p-3.5">
                        {lead.aiRecommendation ? (
                          <div className="max-w-xs">
                            <span className="text-[11px] font-bold text-emerald-500 block">
                              {lead.aiRecommendation.recommendedTier}
                            </span>
                            <span className="text-[10px] text-slate-400 line-clamp-1">
                              {lead.aiRecommendation.estimatedPriceRangePKR}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Direct Contact Inquiry</span>
                        )}
                      </td>

                      <td className="p-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize focus:outline-none border ${
                            lead.status === 'new'
                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/30'
                              : lead.status === 'contacted'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                              : lead.status === 'quoted'
                              ? 'bg-purple-500/10 text-purple-500 border-purple-500/30'
                              : lead.status === 'won'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                              : 'bg-red-500/10 text-red-500 border-red-500/30'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted / Survey</option>
                          <option value="won">Won Deal</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedLeadModal(lead)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="View Lead Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDownloadLeadPDF(lead)}
                          className="p-1.5 text-amber-400 hover:text-amber-300 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Download Quote PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete lead ${lead.id}?`)) deleteLead(lead.id);
                          }}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* ================= TAB 2: PRODUCTS CRUD ================= */}
      {activeTab === 'products' && (
        <div className="space-y-6">

          <div className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Manage Categories</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {cat.label}
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete category "${cat.label}"? Existing products keep their saved category value.`)) {
                        deleteCategory(cat.id);
                      }
                    }}
                    className="text-slate-400 hover:text-red-400 cursor-pointer"
                    title="Delete category"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('newCategory') as HTMLInputElement;
                addCategory(input.value);
                input.value = '';
              }}
              className="flex gap-2"
            >
              <input
                name="newCategory"
                type="text"
                placeholder="New category name (e.g. Solar Cameras)"
                className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 bg-[#0E3A5C] hover:bg-[#124974] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </form>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Inventory & Turnkey Bundles ({products.length})
            </h3>
            <button
              onClick={() => {
                setEditingProductId(null);
                setProductForm({
                  name: '',
                  brand: 'Hikvision',
                  modelNumber: 'DS-2CD',
                  category: 'dome',
                  price: 18000,
                  shortDescription: '',
                  description: '',
                  imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
                  isPackage: false,
                  isPriceOnQuote: false,
                  specs: { 'Warranty': '2-Year Official Replacement' }
                });
                setIsProductModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Hardware / Package</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 bg-slate-900 rounded-xl overflow-hidden mb-3">
                    <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                    {prod.badge && (
                      <span className="absolute top-2 left-2 bg-[#E65100] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {prod.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {prod.modelNumber}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{prod.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{prod.shortDescription}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-[#0E3A5C] dark:text-amber-400">
                    {formatPrice(prod.price, prod.isPriceOnQuote)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditProductClick(prod)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${prod.name}?`)) deleteProduct(prod.id);
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ================= TAB 3: REVIEWS MODERATION ================= */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Client Reviews ({reviews.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-slate-900 dark:text-white">{rev.authorName} ({rev.rating}★)</strong>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      (rev.status === 'approved' || (rev as any).approved) ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {(rev.status === 'approved' || (rev as any).approved) ? 'Approved' : 'Pending Moderation'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "{rev.comment}"
                  </p>

                  <div className="text-[11px] text-slate-400">
                    {rev.companyOrRole} • {rev.city} • {rev.serviceType}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-slate-500">{rev.date}</span>
                  <div className="flex items-center gap-2">
                    {rev.status !== 'approved' && !(rev as any).approved && (
                      <button
                        onClick={() => approveReview(rev.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold cursor-pointer"
                      >
                        Approve & Publish
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (confirm('Delete this review?')) deleteReview(rev.id);
                      }}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 4: SETTINGS & NTN LIVE EDITOR ================= */}
      {activeTab === 'settings' && (
        <div className="bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleSaveSettings} className="space-y-6 text-xs max-w-2xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Company Credentials & SLA Settings
              </h3>
              <p className="text-slate-500">
                Update FBR registration placeholder details, response SLAs, phone numbers, and operational statistics displayed across the site.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Years in Business
                </label>
                <input
                  type="number"
                  value={statsForm.yearsInBusiness}
                  onChange={(e) => setStatsForm({ ...statsForm, yearsInBusiness: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sites Completed
                </label>
                <input
                  type="number"
                  value={statsForm.sitesCompleted}
                  onChange={(e) => setStatsForm({ ...statsForm, sitesCompleted: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Karachi Resolution SLA (Hours)
                </label>
                <input
                  type="text"
                  value={statsForm.karachiResolutionHours}
                  onChange={(e) => setStatsForm({ ...statsForm, karachiResolutionHours: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  FBR NTN Registration
                </label>
                <input
                  type="text"
                  value={statsForm.ntnNumber}
                  onChange={(e) => setStatsForm({ ...statsForm, ntnNumber: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sales Tax STRN Number
                </label>
                <input
                  type="text"
                  value={statsForm.salesTaxNumber}
                  onChange={(e) => setStatsForm({ ...statsForm, salesTaxNumber: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Helpline
                </label>
                <input
                  type="text"
                  value={statsForm.primaryPhone}
                  onChange={(e) => setStatsForm({ ...statsForm, primaryPhone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Karachi Head Office Address
                </label>
                <input
                  type="text"
                  value={statsForm.companyAddress}
                  onChange={(e) => setStatsForm({ ...statsForm, companyAddress: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  General Contact Email
                </label>
                <input
                  type="email"
                  value={statsForm.email || ''}
                  onChange={(e) => setStatsForm({ ...statsForm, email: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Sales Email
                </label>
                <input
                  type="email"
                  value={statsForm.salesEmail || ''}
                  onChange={(e) => setStatsForm({ ...statsForm, salesEmail: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Standard Warranty Badge (shown site-wide on Home, Products page etc.)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2-Year Hardware Warranty"
                  value={statsForm.standardWarranty || ''}
                  onChange={(e) => setStatsForm({ ...statsForm, standardWarranty: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Changes</span>
            </button>
          </form>
        </div>
      )}

      {/* Product Edit / Add Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl bg-[#081827] text-white rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg text-white">
              {editingProductId ? 'Edit Hardware Product' : 'Add New Hardware / Package'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Product / Package Name *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Model Number *</label>
                  <input
                    type="text"
                    required
                    value={productForm.modelNumber}
                    onChange={(e) => setProductForm({ ...productForm, modelNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Warranty</label>
                  <input
                    type="text"
                    placeholder="e.g. 2-Year Official Replacement"
                    value={productForm.warranty || ''}
                    onChange={(e) => setProductForm({ ...productForm, warranty: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Price in PKR</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Short Description</label>
                <input
                  type="text"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Product Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    placeholder="Image URL (or upload a file below)"
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={imageUploading}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setImageUploading(true);
                      try {
                        const { url } = await uploadMediaFile(file);
                        setProductForm((prev) => ({ ...prev, imageUrl: url }));
                        showToast('Image uploaded to storage.');
                      } catch {
                        showToast('Image upload failed — check Appwrite Storage config.');
                      } finally {
                        setImageUploading(false);
                        e.target.value = '';
                      }
                    }}
                    className="text-[11px] text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-500 file:text-black file:text-xs file:font-bold file:cursor-pointer cursor-pointer"
                  />
                  {imageUploading && <span className="text-[11px] text-amber-400">Uploading...</span>}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isPackage}
                    onChange={(e) => setProductForm({ ...productForm, isPackage: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Mark as Turnkey Package</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isPriceOnQuote}
                    onChange={(e) => setProductForm({ ...productForm, isPriceOnQuote: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Price on Quote</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-700 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#E65100] hover:bg-[#D97706] text-white font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#081827] text-white rounded-3xl border border-slate-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-amber-500 font-bold">{selectedLeadModal.id}</span>
                <h3 className="font-bold text-lg text-white mt-1">{selectedLeadModal.customerName}</h3>
                <p className="text-slate-400">{selectedLeadModal.city} • {selectedLeadModal.phone}</p>
              </div>
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {selectedLeadModal.aiRecommendation && (
              <div className="p-4 bg-[#05111B] rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                  AI Architecture Spec: {selectedLeadModal.aiRecommendation.recommendedTier}
                </span>
                <p className="text-slate-300">{selectedLeadModal.aiRecommendation.summary}</p>
                <div className="text-amber-300 font-mono font-bold">
                  Estimated Budget: {selectedLeadModal.aiRecommendation.estimatedPriceRangePKR}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-bold text-slate-300 uppercase font-mono mb-2">Project Parameters</h4>
              <div className="grid grid-cols-2 gap-2 bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-300">
                <div>Property: <strong>{selectedLeadModal.propertyType}</strong></div>
                <div>Scale: <strong>{selectedLeadModal.cameraCountOrScale}</strong></div>
                <div>Area: <strong>{selectedLeadModal.estimatedAreaOrPoints}</strong></div>
                <div>Timeline: <strong>{selectedLeadModal.timeline}</strong></div>
              </div>
            </div>

            {selectedLeadModal.additionalNotes && (
              <div>
                <h4 className="font-bold text-slate-300 uppercase font-mono mb-1">Notes & Cart Items</h4>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 whitespace-pre-line">
                  {selectedLeadModal.additionalNotes}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => handleDownloadLeadPDF(selectedLeadModal)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E3A5C] text-white rounded-xl font-semibold cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Quote PDF</span>
              </button>
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
