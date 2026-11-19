import React, { useState } from 'react';
import { useClock } from '../hooks/useClock';
import { 
  User, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText, 
  Mail, 
  Terminal as TerminalIcon,
  X,
  Sparkles,
  Search,
  Sliders,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';
import { AboutWindow } from '../windows/AboutWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { EducationWindow } from '../windows/EducationWindow';
import { CertificationsWindow } from '../windows/CertificationsWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { TerminalWindow } from '../windows/TerminalWindow';
import { profileData } from '../data/profile';
import { socialsData } from '../data/socials';

export function MobileAdapter({ soundEnabled, setSoundEnabled }) {
  const { timeString, dateString } = useClock();
  const [activeApp, setActiveApp] = useState(null);

  const apps = [
    { id: 'about', title: 'About Me', icon: User, color: 'bg-blue-500', component: AboutWindow },
    { id: 'projects', title: 'Projects', icon: FolderGit2, color: 'bg-indigo-500', component: ProjectsWindow },
    { id: 'skills', title: 'Skills', icon: Cpu, color: 'bg-purple-500', component: SkillsWindow },
    { id: 'experience', title: 'Experience', icon: Briefcase, color: 'bg-emerald-500', component: ExperienceWindow },
    { id: 'education', title: 'Education', icon: GraduationCap, color: 'bg-amber-500', component: EducationWindow },
    { id: 'certifications', title: 'Certifications', icon: Award, color: 'bg-rose-500', component: CertificationsWindow },
    { id: 'resume', title: 'Resume.pdf', icon: FileText, color: 'bg-red-500', component: ResumeWindow },
    { id: 'contact', title: 'Contact', icon: Mail, color: 'bg-sky-500', component: ContactWindow },
    { id: 'terminal', title: 'Terminal', icon: TerminalIcon, color: 'bg-slate-700', component: TerminalWindow },
  ];

  const CurrentComponent = activeApp ? apps.find(a => a.id === activeApp)?.component : null;

  return (
    <div className="md:hidden fixed inset-0 w-full h-full bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden z-50">
      {/* Mobile Top Bar */}
      <div className="h-10 px-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs font-semibold shrink-0">
        <div className="flex items-center space-x-1.5 text-blue-400">
          <Sparkles className="w-4 h-4 fill-current" />
          <span className="text-white">VimalOS</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span>{dateString}</span>
          <span className="text-white font-bold">{timeString}</span>
        </div>
      </div>

      {/* Main Home Screen Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Profile Card Header */}
        <div className="p-5 mb-6 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900/80 rounded-3xl border border-white/15 shadow-xl text-center">
          <img
            src={profileData.avatar}
            alt={profileData.name}
            className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-blue-400 object-cover shadow"
          />
          <h1 className="text-lg font-bold text-white">{profileData.name}</h1>
          <p className="text-xs text-blue-300 font-medium">{profileData.role}</p>
          <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
            {profileData.headline}
          </p>
        </div>

        {/* Mobile App Grid */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Applications & Folders
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {apps.map((app) => {
            const IconComp = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => setActiveApp(app.id)}
                className="flex flex-col items-center group text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${app.color} text-white flex items-center justify-center shadow-lg transform active:scale-95 transition-transform mb-1.5 border border-white/20`}>
                  <IconComp className="w-7 h-7" />
                </div>
                <span className="text-xs font-medium text-slate-200 group-hover:text-white truncate max-w-[80px]">
                  {app.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Social Shortcuts */}
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
          Social Links
        </h2>
        <div className="grid grid-cols-4 gap-3">
          <a
            href={socialsData.github.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center text-xs text-sky-400"
          >
            <Github className="w-6 h-6 mb-1" />
            <span className="text-[10px] text-slate-300">GitHub</span>
          </a>
          <a
            href={socialsData.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center text-xs text-blue-400"
          >
            <Linkedin className="w-6 h-6 mb-1" />
            <span className="text-[10px] text-slate-300">LinkedIn</span>
          </a>
          <a
            href={socialsData.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center text-xs text-pink-400"
          >
            <Instagram className="w-6 h-6 mb-1" />
            <span className="text-[10px] text-slate-300">Instagram</span>
          </a>
          <a
            href={socialsData.email.url}
            className="p-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center text-xs text-red-400"
          >
            <Mail className="w-6 h-6 mb-1" />
            <span className="text-[10px] text-slate-300">Email</span>
          </a>
        </div>
      </div>

      {/* Full-Screen Mobile Window Overlay */}
      {activeApp && CurrentComponent && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
          {/* Header Bar */}
          <div className="h-12 px-4 bg-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
            <span className="text-sm font-bold text-white">
              {apps.find(a => a.id === activeApp)?.title}
            </span>
            <button
              onClick={() => setActiveApp(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-red-600 text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto">
            <CurrentComponent onOpenWindow={(id) => setActiveApp(id)} />
          </div>
        </div>
      )}
    </div>
  );
}
