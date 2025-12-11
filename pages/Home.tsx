import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, ShieldCheck } from 'lucide-react';
import { FEATURED_TEMPLATES } from '../constants';

export const Home: React.FC = () => {
  return (
    <div className="pb-24 px-4 pt-4 max-w-md mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">EditFlow</h1>
        <div className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
          <ShieldCheck size={12} />
          <span>Free & Safe</span>
        </div>
      </header>

      {/* Hero CTA */}
      <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 mb-8 text-white shadow-lg shadow-blue-500/20">
        <h2 className="text-xl font-bold mb-2">Create Viral Content</h2>
        <p className="text-blue-100 text-sm mb-4">Edit photos & videos with professional, community-made presets.</p>
        <Link to="/editor">
          <button className="bg-white text-primary font-bold py-2 px-6 rounded-full text-sm hover:bg-blue-50 transition-colors w-full sm:w-auto">
            Start Editing
          </button>
        </Link>
      </div>

      {/* Trending Templates */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <TrendingUp size={18} className="text-accent" /> Trending
          </h3>
          <Link to="/templates" className="text-sm text-slate-400">See All</Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {FEATURED_TEMPLATES.map(template => (
            <div key={template.id} className="min-w-[200px] bg-card rounded-xl overflow-hidden snap-center border border-slate-700">
              <img src={template.thumbnailUrl} alt={template.title} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h4 className="font-bold text-sm truncate">{template.title}</h4>
                <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                  <span>@{template.authorName}</span>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    {template.likes}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pathways */}
      <div>
        <h3 className="font-bold text-lg mb-4">Learning Pathways</h3>
        <Link to="/tutorials" className="block bg-card p-4 rounded-xl border border-slate-700 mb-3 hover:border-slate-600 transition-colors">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-200">Zero to Hero</h4>
              <p className="text-xs text-slate-400 mt-1">Master mobile editing in 5 lessons</p>
            </div>
            <ArrowRight size={20} className="text-slate-500" />
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[40%]"></div>
          </div>
        </Link>
      </div>
    </div>
  );
};