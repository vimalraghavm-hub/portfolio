import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Folder, FileText, Cpu, User, Briefcase, Command, ArrowRight, X } from 'lucide-react';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { socialsData } from '../data/socials';

export function SpotlightSearch({ isOpen, onClose, onOpenWindow }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const searchResults = [];

  if (query.trim() !== '') {
    const q = query.toLowerCase();

    // App sections search
    const apps = [
      { id: 'about', name: 'About Me Application', type: 'App', icon: User },
      { id: 'projects', name: 'Projects Finder', type: 'App', icon: Folder },
      { id: 'skills', name: 'Skills Matrix', type: 'App', icon: Cpu },
      { id: 'experience', name: 'Work Experience', type: 'App', icon: Briefcase },
      { id: 'resume', name: 'Resume.pdf Document', type: 'Document', icon: FileText },
      { id: 'contact', name: 'Contact Application', type: 'App', icon: User },
      { id: 'terminal', name: 'Terminal Shell', type: 'App', icon: Command },
    ];

    apps.forEach(app => {
      if (app.name.toLowerCase().includes(q)) {
        searchResults.push({
          id: app.id,
          title: app.name,
          subtitle: `Launch ${app.name}`,
          type: app.type,
          icon: app.icon,
          action: () => {
            onOpenWindow(app.id);
            onClose();
          }
        });
      }
    });

    // Projects search
    projectsData.forEach(p => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      ) {
        searchResults.push({
          id: `project-${p.id}`,
          title: p.name,
          subtitle: `Project (${p.technologies.join(', ')})`,
          type: 'Project',
          icon: Folder,
          action: () => {
            onOpenWindow('projects', { selectedProject: p });
            onClose();
          }
        });
      }
    });

    // Skills search
    Object.entries(skillsData).forEach(([cat, list]) => {
      list.forEach(skill => {
        if (skill.name.toLowerCase().includes(q)) {
          searchResults.push({
            id: `skill-${skill.name}`,
            title: skill.name,
            subtitle: `Skill in ${cat} (${skill.level})`,
            type: 'Skill',
            icon: Cpu,
            action: () => {
              onOpenWindow('skills');
              onClose();
            }
          });
        }
      });
    });

    // Socials search
    Object.entries(socialsData).forEach(([key, soc]) => {
      if (soc.name.toLowerCase().includes(q) || key.toLowerCase().includes(q)) {
        searchResults.push({
          id: `social-${key}`,
          title: soc.name,
          subtitle: `External Link (${soc.handle || soc.address})`,
          type: 'Social',
          icon: ExternalLinkIcon,
          action: () => {
            window.open(soc.url, '_blank');
            onClose();
          }
        });
      }
    });
  }

  function ExternalLinkIcon(props) {
    return <ArrowRight {...props} />;
  }

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-28 px-4 bg-black/40 dark:bg-black/65 backdrop-blur-md"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()} // Click inside search overlay does NOT close it
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl border border-slate-300/60 dark:border-white/20 shadow-2xl overflow-hidden font-sans text-slate-900 dark:text-slate-100"
        >
          {/* Header Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-300/40 dark:border-white/10">
            <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search portfolio (e.g. TailorPOS, React, Resume, Skills)..."
              className="w-full bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Results / Suggestions */}
          <div className="max-h-80 overflow-y-auto p-2">
            {query.trim() === '' ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                <Command className="w-8 h-8 opacity-40 mx-auto mb-2" />
                <p className="font-medium">Type to search projects, skills, education, or applications.</p>
                <div className="flex items-center justify-center space-x-2 mt-3 text-xs opacity-70">
                  <span className="bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded font-mono">Shift + K</span>
                  <span>to toggle search anytime</span>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                No matching portfolio items found for "{query}".
              </div>
            ) : (
              searchResults.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full p-3 rounded-xl hover:bg-blue-600/10 dark:hover:bg-blue-600/30 flex items-center justify-between text-left transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-black/5 dark:bg-white/10 rounded-lg text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300">
                          {item.title}
                        </div>
                        <div className="text-xs opacity-70 truncate max-w-sm">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
                      <span>Open</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
