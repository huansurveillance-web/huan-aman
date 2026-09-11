import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_BLOG_POSTS,
  INITIAL_CATEGORIES,
  INITIAL_COMPANY_STATS,
  INITIAL_LEADS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_SERVICES,
} from '../data/initialData';
import { BlogPost, CartItem, Category, CompanyStats, Product, QuoteLead, Review } from '../types';
import { ID } from '../lib/appwrite';
import {
  adminLogin,
  adminLogout,
  blogApi,
  categoriesApi,
  companyStatsApi,
  getCurrentAdmin,
  leadsApi,
  productsApi,
  reviewsApi,
  sendLeadToBackupSheet,
} from '../services/appwriteService';

interface AppContextType {
  // Navigation
  currentPage: string;
  pageParam: string | null;
  navigate: (page: string, param?: string | null) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Categories
  categories: Category[];
  addCategory: (label: string) => void;
  deleteCategory: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, includeInstallation?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleInstallation: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Reviews
  reviews: Review[];
  approvedReviews: Review[];
  averageRating: number;
  totalReviewsCount: number;
  ratingBreakdown: { stars: number; count: number; percentage: number }[];
  submitReview: (review: Omit<Review, 'id' | 'date' | 'verified' | 'status'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Company Stats & Profile
  companyStats: CompanyStats;
  updateCompanyStats: (stats: Partial<CompanyStats>) => void;

  // Leads & AI Quotes
  leads: QuoteLead[];
  quoteLeads: QuoteLead[];
  submitQuoteLead: (lead: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => string;
  updateLeadStatus: (id: string, status: QuoteLead['status'], notes?: string) => void;
  deleteLead: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminCheckingSession: boolean;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;

  // Blog
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Services
  services: typeof INITIAL_SERVICES;

  // Utilities
  formatPrice: (amount: number, isPriceOnQuote?: boolean) => string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | null>(null);

  const navigate = (page: string, param: string | null = null) => {
    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const hash = param ? `#/${page}/${param}` : `#/${page}`;
    window.location.hash = hash;
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        setPageParam(null);
        return;
      }
      const parts = hash.split('/');
      setCurrentPage(parts[0] || 'home');
      setPageParam(parts[1] || null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ---------- Data (Appwrite-backed, seeded with sample data until first load resolves) ----------
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [companyStats, setCompanyStats] = useState<CompanyStats>(INITIAL_COMPANY_STATS);
  const [quoteLeads, setQuoteLeads] = useState<QuoteLead[]>(INITIAL_LEADS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);

  // Cart stays in the browser only — it's a per-visitor session, not shared data.
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('huan_cart');
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('huan_cart', JSON.stringify(cart));
  }, [cart]);

  // Load real data from Appwrite once on mount.
  useEffect(() => {
    productsApi.list().then((data) => { if (data.length) setProducts(data); }).catch(() => {});
    categoriesApi.list().then((data) => { if (data.length) setCategories(data); }).catch(() => {});
    reviewsApi.list().then((data) => { if (data.length) setReviews(data); }).catch(() => {});
    blogApi.list().then((data) => { if (data.length) setBlogPosts(data); }).catch(() => {});
    leadsApi.list().then((data) => setQuoteLeads(data)).catch(() => {});
    companyStatsApi.get().then((data) => { if (data) setCompanyStats({ ...INITIAL_COMPANY_STATS, ...data }); }).catch(() => {});
  }, []);

  // ---------- Admin Auth (Appwrite session-based) ----------
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminCheckingSession, setAdminCheckingSession] = useState(true);

  useEffect(() => {
    getCurrentAdmin()
      .then((user) => setIsAdminLoggedIn(!!user))
      .finally(() => setAdminCheckingSession(false));
  }, []);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    try {
      await adminLogin(email, password);
      setIsAdminLoggedIn(true);
      showToast('Admin authenticated successfully.');
      return true;
    } catch {
      return false;
    }
  };

  const logoutAdmin = () => {
    adminLogout().finally(() => {
      setIsAdminLoggedIn(false);
      showToast('Admin signed out.');
    });
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ---------- Product Actions ----------
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = ID.unique();
    const newProduct: Product = { ...product, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog.`);
    productsApi.create(newId, product).catch(() => showToast('Warning: product saved locally but failed to sync.'));
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Product updated successfully.');
    productsApi.update(id, updated).catch(() => showToast('Warning: update failed to sync.'));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog.');
    productsApi.remove(id).catch(() => {});
  };

  // ---------- Category Actions ----------
  const addCategory = (label: string) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    const value = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (categories.some((c) => c.value === value)) {
      showToast('This category already exists.');
      return;
    }
    const newId = ID.unique();
    const newCategory: Category = { id: newId, value, label: trimmed };
    setCategories((prev) => [...prev, newCategory]);
    showToast(`Category "${trimmed}" added.`);
    categoriesApi.create(newId, { value, label: trimmed }).catch(() => showToast('Warning: category failed to sync.'));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category removed.');
    categoriesApi.remove(id).catch(() => {});
  };

  // ---------- Cart Actions (local only) ----------
  const addToCart = (product: Product, quantity = 1, includeInstallation = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, includeInstallation }];
    });
    showToast(`Added ${product.name} to inquiry basket.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
  };

  const toggleInstallation = (productId: string) => {
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, includeInstallation: !item.includeInstallation } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      if (item.product?.isPriceOnQuote) return total;
      const price = Number(item.product?.price) || 0;
      const qty = Math.max(0, Number(item.quantity) || 0);
      return total + price * qty;
    }, 0);
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + Math.max(0, Number(item.quantity) || 0), 0), [cart]);

  // ---------- Reviews ----------
  const approvedReviews = useMemo(() => {
    if (!Array.isArray(reviews)) return [];
    return reviews.filter((r) => r.status === 'approved' || (r as any).approved === true);
  }, [reviews]);

  const totalReviewsCount = approvedReviews.length;

  const averageRating = useMemo(() => {
    if (!Array.isArray(approvedReviews) || approvedReviews.length === 0) return 4.9;
    const sum = approvedReviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    return Number((sum / approvedReviews.length).toFixed(1));
  }, [approvedReviews]);

  const ratingBreakdown = useMemo(() => {
    if (!Array.isArray(approvedReviews) || approvedReviews.length === 0) {
      return [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, percentage: 0 }));
    }
    return [5, 4, 3, 2, 1].map((stars) => {
      const match = approvedReviews.filter((r) => Math.round(r.rating || 5) === stars).length;
      return { stars, count: match, percentage: approvedReviews.length ? Math.round((match / approvedReviews.length) * 100) : 0 };
    });
  }, [approvedReviews]);

  const submitReview = (reviewData: Omit<Review, 'id' | 'date' | 'verified' | 'status'>) => {
    const newId = ID.unique();
    const newRev: Review = {
      ...reviewData,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      status: 'approved',
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your verified review has been published.');
    const { id, ...payload } = newRev;
    reviewsApi.create(newId, payload).catch(() => {});
  };

  const approveReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
    showToast('Review approved.');
    reviewsApi.update(id, { status: 'approved' }).catch(() => {});
  };

  const rejectReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
    showToast('Review rejected.');
    reviewsApi.update(id, { status: 'rejected' }).catch(() => {});
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted.');
    reviewsApi.remove(id).catch(() => {});
  };

  // ---------- Company Stats ----------
  const updateCompanyStats = (updated: Partial<CompanyStats>) => {
    setCompanyStats((prev) => ({ ...prev, ...updated }));
    showToast('Company track record & trust stats updated.');
    companyStatsApi.upsert(updated).catch(() => {});
  };

  // ---------- Quote Leads ----------
  const submitQuoteLead = (leadData: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>): string => {
    const newId = `HUAN-QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: QuoteLead = {
      ...leadData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setQuoteLeads((prev) => [newLead, ...prev]);

    const { id, ...payload } = newLead;
    leadsApi.create(newId, payload).catch(() => {});
    sendLeadToBackupSheet({
      name: newLead.customerName,
      phone: newLead.phone,
      email: newLead.email,
      quoteDetails: {
        id: newLead.id,
        city: newLead.city,
        serviceCategory: newLead.serviceCategory,
        propertyType: newLead.propertyType,
        budgetTier: newLead.budgetTier,
        aiRecommendation: newLead.aiRecommendation,
      },
    });

    return newId;
  };

  const updateLeadStatus = (id: string, status: QuoteLead['status'], notes?: string) => {
    setQuoteLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status, notes: notes || l.notes } : l)));
    showToast(`Lead ${id} status updated to "${status}".`);
    leadsApi.update(id, { status, notes }).catch(() => {});
  };

  const deleteLead = (id: string) => {
    setQuoteLeads((prev) => prev.filter((l) => l.id !== id));
    showToast('Lead entry removed.');
    leadsApi.remove(id).catch(() => {});
  };

  // ---------- Blog ----------
  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newId = ID.unique();
    const newPost: BlogPost = { ...post, id: newId };
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast('Article published.');
    blogApi.create(newId, post).catch(() => {});
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...post } : p)));
    showToast('Article updated.');
    blogApi.update(id, post).catch(() => {});
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Article deleted.');
    blogApi.remove(id).catch(() => {});
  };

  const formatPrice = (amount: number, isPriceOnQuote?: boolean) => {
    if (isPriceOnQuote) return 'Quote Required';
    if (!Number.isFinite(amount) || isNaN(amount) || amount <= 0) return 'Quote Required';
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        pageParam,
        navigate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        addCategory,
        deleteCategory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleInstallation,
        clearCart,
        cartTotal,
        cartCount,
        reviews,
        approvedReviews,
        averageRating,
        totalReviewsCount,
        ratingBreakdown,
        submitReview,
        approveReview,
        rejectReview,
        deleteReview,
        companyStats,
        updateCompanyStats,
        leads: quoteLeads,
        quoteLeads,
        submitQuoteLead,
        updateLeadStatus,
        deleteLead,
        isAdminLoggedIn,
        adminCheckingSession,
        loginAdmin,
        logoutAdmin,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        services: INITIAL_SERVICES,
        formatPrice,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
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
