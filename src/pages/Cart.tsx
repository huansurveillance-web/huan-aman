import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Wrench, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Clock,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const Cart: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    toggleInstallation, 
    clearCart, 
    cartTotal, 
    formatPrice, 
    submitQuoteLead, 
    navigate,
    showToast 
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi (24-36hr SLA)');
  const [siteAddress, setSiteAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmitCartQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !email) {
      showToast('Please provide your name, phone number, and email.');
      return;
    }

    const itemsSummary = (cart || []).map(item => ({
      name: `${item.product.name} ${item.includeInstallation ? '(Turnkey Installed)' : '(Hardware Only)'}`,
      quantity: item.quantity,
      price: item.product.isPriceOnQuote ? 0 : ((Number(item.product.price) || 0) * (Number(item.quantity) || 1))
    }));

    const hardwareLines = cart.map(item => 
      `${item.quantity}x ${item.product.name} [${item.product.modelNumber}] ${item.product.isPriceOnQuote ? '(Custom Quote Required)' : ''} ${item.includeInstallation ? '+ Certified On-site Installation' : ''}`
    );

    const leadId = submitQuoteLead({
      customerName,
      email,
      phone,
      city,
      address: siteAddress,
      serviceCategory: 'cctv',
      propertyType: 'Cart Quotation Order',
      estimatedAreaOrPoints: `${cart.length} Catalog Items Selected`,
      cameraCountOrScale: `${cart.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0)} Total Units`,
      budgetTier: 'standard',
      indoorOutdoorRequirement: 'Cart Custom Hardware Selection',
      timeline: 'Direct Quote / Checkout',
      additionalNotes: `Cart Items:\n${hardwareLines.join('\n')}\n\nClient Notes: ${notes}`,
      cartItemsSummary: itemsSummary,
      aiRecommendation: {
        summary: `Custom hardware quotation containing ${cart.length} specialized surveillance products/bundles.`,
        suggestedHardware: hardwareLines,
        infrastructurePlan: 'Standard cabling & installation for selected components.',
        recommendedTier: 'Custom Cart Solution',
        estimatedPriceRangePKR: cartTotal > 0 ? formatPrice(cartTotal) : 'Formal Custom Quotation Required',
        specialNotes: 'Includes Karachi 24–36hr resolution guarantee and 2-year warranty.'
      }
    });

    setSubmittedLeadId(leadId);
    clearCart();

    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {
      // ignore
    }
  };

  if (submittedLeadId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500">
            Quotation Order Submitted
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Thank You, {customerName}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Your quotation reference number is <strong className="text-amber-500 font-mono">{submittedLeadId}</strong>. Our technical team has reserved your hardware and will contact you within 2 hours to confirm delivery & installation timing.
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 bg-[#0E3A5C] text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Your Quote Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Browse our commercial cameras, turnkey bundles, and fiber optic gear to build your custom quotation.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 bg-[#0E3A5C] hover:bg-[#134a74] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Browse Products & Packages
          </button>
          <button
            onClick={() => navigate('quote')}
            className="px-6 py-3 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
          >
            Use AI Quote Wizard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      
      <div>
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
          Inquiry & Quotation Basket
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Review Selected Security Hardware & Packages
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-xl object-cover bg-slate-900 shrink-0"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 block">
                    Model: {item.product.modelNumber}
                  </span>

                  <div className="text-sm font-black text-[#0E3A5C] dark:text-amber-400 font-mono pt-1">
                    {item.product.isPriceOnQuote 
                      ? 'Quote Required' 
                      : formatPrice((Number(item.product.price) || 0) * (Number(item.quantity) || 1))}
                  </div>
                </div>
              </div>

              {/* Toggles & Quantity */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.includeInstallation}
                    onChange={() => toggleInstallation(item.product.id)}
                    className="accent-[#E65100] w-4 h-4 rounded cursor-pointer"
                  />
                  <span className="flex items-center gap-1 font-medium">
                    <Wrench className="w-3.5 h-3.5 text-amber-500" />
                    Include Certified Installation
                  </span>
                </label>

                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-mono font-bold text-xs text-slate-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => navigate('products')}
              className="text-xs text-[#0E3A5C] dark:text-amber-400 font-semibold hover:underline cursor-pointer"
            >
              + Add More Hardware / Bundles
            </button>
            <button
              onClick={clearCart}
              className="text-xs text-slate-400 hover:text-red-500 cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Right: Checkout & Official Quote Request Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="space-y-1 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Request Formal Quotation & Site Survey
            </h3>
            <p className="text-xs text-slate-500">
              Submit your cart for final pricing approval and on-site scheduling.
            </p>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Hardware Subtotal:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {cartTotal > 0 ? formatPrice(cartTotal) : 'Quote Required'}
              </span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>On-Site Survey:</span>
              <span className="font-semibold text-emerald-500">FREE in Karachi</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Karachi Resolution SLA:</span>
              <span className="text-amber-500 font-medium">24–36 Hours Guaranteed</span>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Estimated Total:</span>
              <span className="text-xl font-black text-[#0E3A5C] dark:text-amber-400 font-mono">
                {cartTotal > 0 ? formatPrice(cartTotal) : 'Quote Required'}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitCartQuote} className="space-y-4 text-xs">
            
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="E.g., Farhan Zaidi"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                City / Location
              </label>
              <input
                type="text"
                placeholder="Karachi / Lahore / Islamabad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Premises Address / Installation Site
              </label>
              <input
                type="text"
                placeholder="Plot/Shop address"
                value={siteAddress}
                onChange={(e) => setSiteAddress(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit Formal Quotation Request</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Cart;
