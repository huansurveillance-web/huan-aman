import React from 'react';
import { BookOpen, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AdSenseUnit from '../components/AdSenseUnit';

export const Blog: React.FC = () => {
  const { blogPosts, navigate } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-[#081827] border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
            Knowledge & Security Insights
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Surveillance Engineering Blog & Guides
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Practical technical insights on single-mode optical fiber backbones, command center video walls, and security best practices in Pakistan.
          </p>
        </div>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {(blogPosts || []).map((post) => (
          <article
            key={post.id}
            onClick={() => navigate('blog-post', post.id)}
            className="bg-white dark:bg-[#081827] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#0E3A5C] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                {post.author.split(',')[0]}
              </span>
              <span className="text-[#0E3A5C] dark:text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Google AdSense Section Placement */}
      <AdSenseUnit slotId="huan-blog-banner-slot-1" format="banner" />

    </div>
  );
};

export const BlogPostView: React.FC = () => {
  const { blogPosts, pageParam, navigate } = useApp();

  const post = (blogPosts || []).find(p => p.id === pageParam || p.slug === pageParam) || (blogPosts && blogPosts[0]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Article Not Found</h2>
        <button
          onClick={() => navigate('blog')}
          className="px-4 py-2 bg-[#0E3A5C] text-white rounded-lg text-xs"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Back to Blog */}
      <button
        onClick={() => navigate('blog')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span>Back to Blog Articles</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E65100]">
          {post.category}
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-200 dark:border-slate-800 py-3">
          <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
            <User className="w-4 h-4 text-amber-500" />
            <span>{post.author}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl bg-slate-900 overflow-hidden border border-slate-700/80 h-72 sm:h-96">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-200 text-sm leading-relaxed space-y-4 whitespace-pre-line">
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && (
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800">
          <Tag className="w-4 h-4 text-slate-400" />
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Google AdSense In-Article Slot */}
      <AdSenseUnit slotId="huan-blog-in-article-slot-2" format="in-article" />

      {/* CTA Box */}
      <div className="p-8 bg-[#081827] rounded-3xl border border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-lg">Planning a project based on these principles?</h3>
          <p className="text-xs text-slate-400">
            Let HUAN Surveillance engineers calculate your exact hardware bill of materials.
          </p>
        </div>
        <button
          onClick={() => navigate('quote')}
          className="px-6 py-3 bg-[#E65100] hover:bg-[#D97706] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Get AI System Quote
        </button>
      </div>

    </div>
  );
};
