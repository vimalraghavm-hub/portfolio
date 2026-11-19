import React from 'react';
import { X, Github, ExternalLink, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden font-sans text-slate-100 flex flex-col max-h-[85vh]">
        {/* Top Header Bar */}
        <div className="h-12 px-4 bg-slate-950/80 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-xs text-blue-400 font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Project Specification</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-red-600 hover:text-white transition-colors text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Banner Image */}
          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-950 border border-white/10">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 drop-shadow">{project.title || project.name}</h2>
            </div>
          </div>

          {/* Full Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Overview
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          {project.highlights && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Key Features & Technical Accomplishments
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tech Stack & Libraries
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400 font-mono">
            Status: <span className="text-emerald-400 font-semibold">{project.status} ({project.date})</span>
          </div>
          <div className="flex items-center space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/15 flex items-center space-x-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg flex items-center space-x-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Application</span>
              </a>
            ) : (
              <span className="px-3 py-2 bg-white/5 text-slate-400 text-xs font-medium rounded-xl border border-white/10 flex items-center space-x-1.5 cursor-default">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Demo Coming Soon</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
