import React from 'react';
import { 
  User, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Mail, 
  Terminal,
  Sparkles,
  Github,
  Linkedin,
  Instagram,
  MapPin
} from 'lucide-react';
import { profileData } from '../../data/profile';
import { socialsData } from '../../data/socials';

export function MobileHomeScreen({ onOpenApp }) {
  const apps = [
    { id: 'about', title: 'About Me', icon: User, gradient: 'from-blue-500 to-indigo-600' },
    { id: 'projects', title: 'Projects', icon: FolderGit2, gradient: 'from-indigo-500 to-purple-600', badge: 'New' },
    { id: 'skills', title: 'Skills', icon: Cpu, gradient: 'from-purple-500 to-pink-600' },
    { id: 'experience', title: 'Experience', icon: Briefcase, gradient: 'from-emerald-500 to-teal-600' },
    { id: 'education', title: 'Education', icon: GraduationCap, gradient: 'from-amber-500 to-orange-600' },
    { id: 'certifications', title: 'Certs', icon: Award, gradient: 'from-rose-500 to-red-600' },
    { id: 'resume', title: 'Resume.pdf', icon: FileText, gradient: 'from-red-500 to-pink-600' },
    { id: 'contact', title: 'Contact', icon: Mail, gradient: 'from-sky-500 to-blue-600' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, gradient: 'from-slate-700 to-slate-900' },
  ];

  return (
    <div className="flex-1 p-5 overflow-y-auto space-y-6 pb-24 select-none">
      {/* iOS Header Profile Widget */}
      <div className="p-5 bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-purple-600/20 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-purple-900/40 rounded-3xl border border-white/20 dark:border-white/15 shadow-xl text-center backdrop-blur-xl">
        <div className="relative w-20 h-20 mx-auto mb-2.5 rounded-full overflow-hidden border-2 border-blue-400 shadow-lg">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-1.5">
          <span>{profileData.name}</span>
          <Sparkles className="w-4 h-4 text-blue-500" />
        </h1>
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 mt-0.5">
          {profileData.role}
        </p>
        <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 leading-relaxed max-w-xs mx-auto">
          {profileData.headline}
        </p>
        <div className="mt-3 flex items-center justify-center space-x-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          <span>{profileData.location}</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">CS Engineer</span>
        </div>
      </div>

      {/* iOS App Icons Grid */}
      <div>
        <div className="px-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Portfolio Applications
        </div>
        <div className="grid grid-cols-4 gap-y-5 gap-x-3">
          {apps.map((app) => {
            const IconComp = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center group active:scale-90 transition-transform duration-150"
              >
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} text-white flex items-center justify-center shadow-lg border border-white/30 transform group-hover:scale-105 transition-transform`}>
                    <IconComp className="w-8 h-8 drop-shadow-sm" />
                  </div>
                  {app.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                      {app.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200 mt-1.5 truncate max-w-[72px] text-center drop-shadow-sm">
                  {app.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* iOS Social Shortcuts Widget */}
      <div>
        <div className="px-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
          Social Links
        </div>
        <div className="grid grid-cols-4 gap-3">
          <a
            href={socialsData.github.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/60 dark:bg-white/10 rounded-2xl border border-slate-300/60 dark:border-white/15 flex flex-col items-center text-xs text-sky-500 shadow-md active:scale-95 transition-transform"
          >
            <Github className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">GitHub</span>
          </a>
          <a
            href={socialsData.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/60 dark:bg-white/10 rounded-2xl border border-slate-300/60 dark:border-white/15 flex flex-col items-center text-xs text-blue-500 shadow-md active:scale-95 transition-transform"
          >
            <Linkedin className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">LinkedIn</span>
          </a>
          <a
            href={socialsData.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/60 dark:bg-white/10 rounded-2xl border border-slate-300/60 dark:border-white/15 flex flex-col items-center text-xs text-pink-500 shadow-md active:scale-95 transition-transform"
          >
            <Instagram className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Instagram</span>
          </a>
          <a
            href={socialsData.email.url}
            className="p-3 bg-white/60 dark:bg-white/10 rounded-2xl border border-slate-300/60 dark:border-white/15 flex flex-col items-center text-xs text-red-500 shadow-md active:scale-95 transition-transform"
          >
            <Mail className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
