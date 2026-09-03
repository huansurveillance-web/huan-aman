import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  Filter, 
  Clock, 
  ShieldCheck, 
  ThumbsUp,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Reviews: React.FC = () => {
  const { 
    approvedReviews, 
    averageRating, 
    totalReviewsCount, 
    ratingBreakdown, 
    submitReview,
    showToast 
  } = useApp();

  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [authorName, setAuthorName] = useState<string>('');
  const [companyOrRole, setCompanyOrRole] = useState<string>('');
  const [city, setCity] = useState<string>('Karachi');
  const [serviceType, setServiceType] = useState<string>('CCTV Camera Installation');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const filteredReviews = (approvedReviews || []).filter(rev => {
    if (selectedRatingFilter !== 'all' && Math.round(rev.rating) !== selectedRatingFilter) {
      return false;
    }
    return true;
  });

  const handleSubmitReviewForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !comment) {
      showToast('Please fill in your name and feedback.');
      return;
    }

    submitReview({
      authorName,
      companyOrRole: companyOrRole || 'Verified Customer',
      city,
      serviceType,
      rating,
      comment
    });

    // Reset form
    setAuthorName('');
    setCompanyOrRole('');
    setComment('');
    setShowSubmitModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Reviews Header Banner */}
      <div className="bg-[#081827] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
              Verified Client Feedback
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Customer Satisfaction & Reviews
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Read real feedback from corporate procurement heads, factory managers, retail chains, and homeowners across Karachi and Pakistan.
            </p>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl shadow transition-colors cursor-pointer shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Submit Your Review</span>
          </button>
        </div>
      </div>

      {/* Aggregate Rating Scoreboard & Star Breakdown */}
      <div className="bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Overall Score (4 cols) */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-2 lg:border-r lg:border-slate-200 dark:lg:border-slate-800 lg:pr-8">
            <div className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white font-mono">
              {averageRating}
            </div>
            <div className="flex items-center justify-center lg:justify-start text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-500">
              Based on <strong>{totalReviewsCount}</strong> verified client installations & AMC contracts across Pakistan.
            </p>
          </div>

          {/* Star Rating Breakdown Bars (8 cols) */}
          <div className="lg:col-span-8 space-y-2 text-xs">
            {ratingBreakdown.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedRatingFilter(selectedRatingFilter === item.stars ? 'all' : item.stars)}
                  className="w-12 text-left font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-500 cursor-pointer"
                >
                  {item.stars} Stars
                </button>
                <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 font-mono">
                  {item.count}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter:
          </span>
          <button
            onClick={() => setSelectedRatingFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
              selectedRatingFilter === 'all'
                ? 'bg-[#0E3A5C] text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Reviews ({approvedReviews.length})
          </button>
          {[5, 4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => setSelectedRatingFilter(stars)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1 ${
                selectedRatingFilter === stars
                  ? 'bg-[#0E3A5C] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{stars} Stars</span>
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredReviews.length} Reviews
        </span>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-[#081827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-400 dark:hover:border-slate-700 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-400">{rev.date}</span>
              </div>

              <div className="text-[11px] font-mono text-amber-500 font-semibold uppercase">
                Service: {rev.serviceType}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {rev.authorName}
                </h4>
                <p className="text-[11px] text-slate-500">{rev.companyOrRole}</p>
                <p className="text-[10px] text-slate-400 font-mono">{rev.city}</p>
              </div>

              {rev.verified && (
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded">
                  <UserCheck className="w-3 h-3" />
                  Verified Client
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-[#081827] text-white rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
                Client Experience
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Submit Your Review</h3>
              <p className="text-xs text-slate-400">
                Help fellow businesses and homeowners in Pakistan evaluate our engineering and service SLA.
              </p>
            </div>

            <form onSubmit={handleSubmitReviewForm} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Salman Farooqui"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Company or Role
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Head of IT / Resident"
                    value={companyOrRole}
                    onChange={(e) => setCompanyOrRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Karachi (Clifton) / Lahore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Service Executed
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option>CCTV Camera Installation</option>
                    <option>Fiber Optic Long-Range Backbone</option>
                    <option>Command Center & Video Wall</option>
                    <option>Structured Network Cabling</option>
                    <option>Biometric Access Control</option>
                    <option>Annual Maintenance Contract (AMC)</option>
                  </select>
                </div>
              </div>

              {/* Star Rating Select */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-mono font-bold text-amber-400 text-sm">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Comment Body */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Your Written Feedback *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding cable neatness, camera image clarity, Karachi 24-36hr service speed, or staff professionalism..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#E65100] hover:bg-[#D97706] text-white font-bold uppercase tracking-wider px-6 py-2.5 rounded-xl shadow cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Review</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Reviews;
