import React, { useState } from 'react';
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  FileText, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Award,
  Phone,
  Mail,
  Eye
} from 'lucide-react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';
import { educationData } from '../data/education';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';
import { socialsData } from '../data/socials';

export function ResumeWindow({ resumePath = "/resume/Vimal-Raghav-Resume.pdf" }) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('document'); // 'document' | 'pdf'

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = "Vimal-Raghav-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(resumePath, '_blank');
  };

  return (
    <div className="flex flex-col h-full min-h-[520px] bg-slate-950 text-slate-100 font-sans select-none">
      {/* PDF Toolbar */}
      <div className="h-12 bg-slate-900/90 border-b border-white/10 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <FileText className="w-4 h-4 text-red-400" />
          <span className="truncate max-w-[180px] sm:max-w-none">Vimal-Raghav-Resume.pdf</span>
          <span className="text-[10px] bg-white/10 text-slate-400 px-2 py-0.5 rounded">
            Verified
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode('document')}
              className={`px-2 py-1 rounded ${viewMode === 'document' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              Doc View
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-2 py-1 rounded ${viewMode === 'pdf' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'}`}
            >
              PDF Viewer
            </button>
          </div>

          {/* Zoom controls for document view */}
          {viewMode === 'document' && (
            <div className="hidden sm:flex items-center space-x-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(70, prev - 10))}
                className="p-1 text-slate-300 hover:text-white rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-slate-300">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((prev) => Math.min(140, prev + 10))}
                className="p-1 text-slate-300 hover:text-white rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Open In New Tab */}
          <button
            onClick={handleOpenNewTab}
            className="p-1.5 sm:px-2.5 sm:py-1 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium rounded-lg border border-white/15 flex items-center space-x-1 transition-colors"
            title="Open PDF in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Tab</span>
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-900/60 flex justify-center">
        {viewMode === 'pdf' ? (
          <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 flex flex-col">
            <iframe
              src={resumePath}
              title="Vimal Raghav Resume PDF"
              className="w-full h-full flex-1 border-none rounded-xl"
            />
          </div>
        ) : (
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-slate-950 text-slate-100 p-6 sm:p-8 rounded-2xl border border-white/20 shadow-2xl space-y-6 transition-transform duration-200 select-text"
          >
            {/* Resume Header */}
            <div className="border-b border-white/15 pb-4 text-center">
              <h1 className="text-2xl font-bold text-white tracking-tight">{profileData.name}</h1>
              <p className="text-xs font-semibold text-blue-400 mt-1">{profileData.role}</p>
              <div className="flex flex-wrap justify-center items-center gap-3 mt-3 text-[11px] text-slate-300">
                <a href={socialsData.email.url} className="hover:text-blue-400 flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-red-400" />
                  <span>{socialsData.email.address}</span>
                </a>
                <span>•</span>
                <a href={socialsData.phone.url} className="hover:text-emerald-400 flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{socialsData.phone.number}</span>
                </a>
                <span>•</span>
                <a href={socialsData.linkedin.url} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                  linkedin.com/in/{socialsData.linkedin.handle}
                </a>
                <span>•</span>
                <a href={socialsData.github.url} target="_blank" rel="noreferrer" className="hover:text-sky-400">
                  github.com/{socialsData.github.handle.replace('@', '')}
                </a>
              </div>
            </div>

            {/* Profile Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 border-b border-white/10 pb-1">
                Profile
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {profileData.shortDescription}
              </p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </h2>
              <div className="space-y-3">
                {educationData.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-white">{edu.degree}</span>
                      <p className="text-slate-400">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-emerald-400">{edu.grade}</span>
                      <p className="font-mono text-[10px] text-slate-400">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>Key Skills</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(skillsData).map(([cat, list]) => (
                  <div key={cat} className="space-y-0.5">
                    <span className="font-semibold text-slate-300">{cat}:</span>
                    <p className="text-slate-400 text-[11px]">{list.map(s => s.name).join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Projects</span>
              </h2>
              <div className="space-y-3">
                {projectsData.map((project) => (
                  <div key={project.id} className="text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{project.title || project.name}</span>
                      <span className="font-mono text-slate-400 text-[10px]">{project.date}</span>
                    </div>
                    <p className="text-slate-300 leading-normal">{project.shortDescription}</p>
                    <p className="text-[11px] text-blue-300 font-mono">
                      Tech: {project.technologies.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Training */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Certifications & Training</span>
              </h2>
              <div className="space-y-2 text-xs">
                {certificationsData.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-white">{cert.title}</span>
                      <p className="text-slate-400 text-[11px]">{cert.issuer}</p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
                      {cert.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
