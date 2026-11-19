import React, { useState } from 'react';
import { profileData } from '../data/profile';
import { 
  User, 
  GraduationCap, 
  Sparkles, 
  Target, 
  MapPin, 
  BookOpen, 
  Layers, 
  Mail 
} from 'lucide-react';

export function AboutWindow({ onOpenWindow }) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'focus', label: 'Education & Focus', icon: Target },
    { id: 'stats', label: 'Highlights & Stats', icon: Sparkles }
  ];

  return (
    <div className="flex h-full min-h-[480px] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans select-text transition-colors duration-300">
      {/* macOS Sidebar */}
      <div className="w-52 bg-slate-200/60 dark:bg-slate-900/80 border-r border-slate-300/60 dark:border-white/10 p-3 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* User Profile Card */}
          <div className="p-3 mb-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-slate-300/50 dark:border-white/10 text-center shadow-sm">
            <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-blue-500/50 shadow-md">
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{profileData.name}</h3>
            <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium leading-tight mt-0.5">
              {profileData.role}
            </p>
            <div className="mt-2 flex items-center justify-center text-[10px] opacity-70">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{profileData.location}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-2 text-[10px] font-semibold opacity-60 uppercase tracking-wider mb-1">
              Navigation
            </div>
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-2.5 transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'hover:bg-black/5 dark:hover:bg-white/10'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Action Footer */}
        <div className="space-y-1.5 pt-3 border-t border-slate-300/60 dark:border-white/10">
          <button
            onClick={() => onOpenWindow('contact')}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Me</span>
          </button>
          <button
            onClick={() => onOpenWindow('resume')}
            className="w-full py-1.5 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-medium rounded-xl border border-slate-300/50 dark:border-white/10 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View Resume</span>
          </button>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* Header Banner */}
            <div className="p-5 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-purple-900/40 rounded-2xl border border-blue-500/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32 text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Hello, I'm {profileData.name}
              </h2>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-300 mb-3">
                {profileData.headline}
              </p>
              <p className="text-xs opacity-90 leading-relaxed max-w-2xl">
                {profileData.shortDescription}
              </p>
            </div>

            {/* Biography */}
            <div className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-slate-300/40 dark:border-white/10 space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <span>Biography & Background</span>
              </h3>
              {profileData.bio.map((paragraph, i) => (
                <p key={i} className="text-xs opacity-85 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Competencies Tags */}
            <div className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-slate-300/40 dark:border-white/10 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center space-x-2">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Primary Competencies</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "Python", "JavaScript", "SQL & PL/SQL", "React", "Django", "Spring Boot", "RESTful Microservices", "Spring Data JPA & Hibernate", "TensorFlow", "Ollama & GenAI", "NumPy & Pandas", "Docker", "Git & GitHub"].map((tag) => (
                  <span
                    key={tag}
                    onClick={() => onOpenWindow('skills')}
                    className="px-2.5 py-1 bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-400/30 text-xs font-semibold rounded-lg hover:bg-blue-500/25 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'focus' && (
          <div className="space-y-5">
            <div className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-slate-300/40 dark:border-white/10 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                <span>Education Status</span>
              </h3>
              <div className="text-xs space-y-1">
                <p className="font-semibold">{profileData.educationSummary}</p>
                <p className="opacity-70">Specializing in Software Development & Artificial Intelligence</p>
              </div>
              <button
                onClick={() => onOpenWindow('education')}
                className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                View Complete Academic Details →
              </button>
            </div>

            <div className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-slate-300/40 dark:border-white/10 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center space-x-2">
                <Target className="w-4 h-4 text-amber-500" />
                <span>Current Focus Areas</span>
              </h3>
              <ul className="space-y-2">
                {profileData.currentFocus.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs opacity-90">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Portfolio Metric Highlights</h3>
            <div className="grid grid-cols-2 gap-4">
              {profileData.stats.map((stat, i) => (
                <div key={i} className="p-5 bg-black/5 dark:bg-white/5 rounded-2xl border border-slate-300/40 dark:border-white/10 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-xs font-medium opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
