import React from 'react';
import { 
  Folder, 
  FileText, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  User, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Terminal,
  ExternalLink
} from 'lucide-react';

const ICON_MAP = {
  about: User,
  projects: FolderGit2,
  skills: Cpu,
  experience: Briefcase,
  education: GraduationCap,
  certifications: Award,
  resume: FileText,
  contact: Mail,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  terminal: Terminal
};

export function DesktopIcon({
  id,
  title,
  type = 'folder',
  iconKey,
  isSelected,
  onSelect,
  onOpen,
  badge
}) {
  const IconComponent = ICON_MAP[iconKey] || Folder;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    onOpen(id);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 cursor-pointer w-24 text-center select-none ${
        isSelected
          ? 'desktop-icon-selected scale-105'
          : 'hover:bg-white/15 dark:hover:bg-white/10 hover:backdrop-blur-md'
      }`}
    >
      {/* Icon Container with macOS style 3D depth */}
      <div className="relative mb-1.5 flex items-center justify-center">
        {type === 'folder' && (
          <div className="relative transform transition-transform group-hover:scale-105 duration-200">
            <Folder className="w-14 h-14 text-blue-500 fill-blue-500/25 dark:fill-blue-500/30 drop-shadow-md stroke-[1.5]" />
            <div className="absolute inset-0 flex items-center justify-center pt-2">
              <IconComponent className="w-6 h-6 text-slate-800 dark:text-white drop-shadow-sm" />
            </div>
          </div>
        )}

        {type === 'file' && (
          <div className="relative p-2.5 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl shadow-lg border border-white/50 dark:border-white/20 transform transition-transform group-hover:scale-105 duration-200">
            <FileText className="w-9 h-9 text-red-500 stroke-[1.5]" />
          </div>
        )}

        {type === 'social' && (
          <div className="relative p-3 bg-gradient-to-b from-white/80 to-slate-100 dark:from-slate-800/80 dark:to-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-300/60 dark:border-white/20 shadow-lg transform transition-transform group-hover:scale-105 duration-200">
            <IconComponent className="w-7 h-7 text-blue-600 dark:text-sky-400" />
            <ExternalLink className="absolute bottom-1 right-1 w-3 h-3 text-slate-400" />
          </div>
        )}

        {badge && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
            {badge}
          </span>
        )}
      </div>

      {/* Label with clean readability across light/dark themes */}
      <span className={`text-xs font-medium tracking-tight px-2 py-0.5 rounded-md transition-colors text-slate-900 dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)] ${
        isSelected ? 'bg-blue-600 text-white font-semibold shadow-sm' : 'group-hover:text-blue-600 dark:group-hover:text-white'
      }`}>
        {title}
      </span>
    </div>
  );
}
