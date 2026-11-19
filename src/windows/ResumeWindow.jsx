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
  MapPin,
  Maximize2,
  Minimize2,
  CheckCircle2,
  FileCheck
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

  const handleFitWidth = () => {
    setZoomLevel(115);
  };

  const handleFitPage = () => {
    setZoomLevel(100);
  };

  return (
    <div className="flex flex-col h-full bg-[#16181f] text-slate-100 font-sans select-none">
      {/* =================================================== */}
      {/* FIXED MACOS PREVIEW TOOLBAR                         */}
      {/* =================================================== */}
      <div className="h-12 bg-slate-900/95 border-b border-white/10 px-3 sm:px-5 flex items-center justify-between shrink-0 z-20 backdrop-blur-xl shadow-sm">
        {/* Left: Document Identity & Page Indicator */}
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
            <FileText className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-200 tracking-wide truncate max-w-[150px] sm:max-w-none">
                Vimal Raghav — Resume.pdf
              </span>
              <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-medium">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>Verified</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
              Page 1 of 1 • 138 KB
            </span>
          </div>
        </div>

        {/* Center: View Switcher & Zoom Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Dual Mode Switcher */}
          <div className="flex items-center bg-slate-800/80 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode('document')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'document'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Interactive Document View"
            >
              Doc View
            </button>
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                viewMode === 'pdf'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Original PDF Embed"
            >
              Official PDF
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center space-x-1 bg-slate-800/80 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setZoomLevel((prev) => Math.max(60, prev - 10))}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Zoom Out (-10%)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1.5 min-w-[42px] text-center text-slate-300">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(160, prev + 10))}
              className="p-1 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Zoom In (+10%)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fit Width & Fit Page */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-800/80 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={handleFitWidth}
              className={`px-2 py-1 text-[11px] rounded transition-colors flex items-center space-x-1 ${
                zoomLevel === 115 ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Fit to Width"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Fit Width</span>
            </button>
            <button
              onClick={handleFitPage}
              className={`px-2 py-1 text-[11px] rounded transition-colors flex items-center space-x-1 ${
                zoomLevel === 100 ? 'bg-white/20 text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Fit to Page (100%)"
            >
              <FileCheck className="w-3 h-3" />
              <span>100%</span>
            </button>
          </div>
        </div>

        {/* Right: Actions (Open in Tab & Download) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleOpenNewTab}
            className="p-1.5 sm:px-2.5 sm:py-1 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 text-xs font-medium rounded-lg border border-white/15 flex items-center space-x-1.5 transition-colors shadow-sm"
            title="Open original PDF in browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Tab</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md flex items-center space-x-1.5 transition-all hover:shadow-blue-500/25 active:scale-95"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* =================================================== */}
      {/* INDEPENDENT SCROLLABLE PREVIEW VIEWPORT            */}
      {/* =================================================== */}
      <div className="flex-1 overflow-auto bg-[#181a22] dark:bg-[#12141a] p-4 sm:p-8 flex justify-center items-start">
        {viewMode === 'pdf' ? (
          /* Native Embedded PDF View */
          <div
            style={{ 
              transform: `scale(${zoomLevel / 100})`, 
              transformOrigin: 'top center',
              transition: 'transform 200ms ease-out'
            }}
            className="w-full max-w-[820px] min-h-[960px] bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col"
          >
            <iframe
              src={`${resumePath}#toolbar=0&navpanes=0`}
              title="Vimal Raghav Resume PDF Document"
              className="w-full h-full min-h-[960px] border-none flex-1"
            />
          </div>
        ) : (
          /* Interactive High-Fidelity Paper Document Canvas */
          <div
            style={{ 
              transform: `scale(${zoomLevel / 100})`, 
              transformOrigin: 'top center',
              transition: 'transform 200ms ease-out'
            }}
            className="w-full max-w-[820px] min-h-[1050px] bg-white text-slate-900 rounded-sm p-8 sm:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.08)] select-text font-sans space-y-6"
          >
            {/* Header: Name, Role, Contacts */}
            <div className="border-b-2 border-slate-900 pb-5 text-center">
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight uppercase">
                {profileData.name}
              </h1>
              <p className="text-sm font-semibold text-blue-600 tracking-wide mt-1">
                {profileData.role}
              </p>

              {/* Contact bar */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600 font-medium">
                <a 
                  href={socialsData.email.url} 
                  className="hover:text-blue-600 flex items-center space-x-1 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{socialsData.email.address}</span>
                </a>
                <span>•</span>
                <a 
                  href={socialsData.phone.url} 
                  className="hover:text-blue-600 flex items-center space-x-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{socialsData.phone.number}</span>
                </a>
                <span>•</span>
                <span className="flex items-center space-x-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Chennai, India</span>
                </span>
                <span>•</span>
                <a 
                  href={socialsData.linkedin.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-blue-600 underline font-semibold transition-colors"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a 
                  href={socialsData.github.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-blue-600 underline font-semibold transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center space-x-1.5">
                <span>Professional Summary</span>
              </h2>
              <p className="text-[13px] text-slate-700 leading-relaxed text-justify">
                {profileData.fullBio || profileData.shortDescription}
              </p>
            </div>

            {/* Technical Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span>Technical Skills</span>
              </h2>
              <div className="space-y-1.5 text-xs text-slate-800">
                {Object.entries(skillsData).map(([category, items]) => (
                  <div key={category} className="flex flex-col sm:flex-row sm:items-baseline">
                    <span className="font-bold sm:w-44 text-slate-900 shrink-0">
                      {category}:
                    </span>
                    <span className="text-slate-700 leading-snug">
                      {items.map(item => item.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-3 flex items-center space-x-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Key Projects</span>
              </h2>
              <div className="space-y-3.5">
                {projectsData.map((project) => (
                  <div key={project.id} className="text-xs space-y-1">
                    <div className="flex justify-between items-baseline font-bold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-[13px]">{project.title || project.name}</span>
                        {project.badge && (
                          <span className="text-[9px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.2 rounded">
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 font-normal">
                        {project.date}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-[12px]">
                      {project.shortDescription}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800">Technologies: </span>
                      {project.technologies.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Leadership */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Experience & Leadership</span>
              </h2>
              <div className="space-y-3">
                {experienceData.map((exp) => (
                  <div key={exp.id} className="text-xs space-y-1">
                    <div className="flex justify-between items-start font-bold text-slate-900">
                      <div>
                        <span className="text-[13px]">{exp.role}</span>
                        <span className="text-slate-600 font-normal"> — {exp.company || exp.organization}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 font-normal shrink-0">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-slate-700 text-[12px] leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center space-x-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>Education</span>
              </h2>
              <div className="space-y-2.5">
                {educationData.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-slate-900 text-[13px]">{edu.degree}</span>
                      <p className="text-slate-600">{edu.institution}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-blue-700">{edu.grade}</span>
                      <p className="text-[11px] font-mono text-slate-500">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 mb-2.5 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>Certifications & Credentials</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {certificationsData.map((cert) => (
                  <div key={cert.id} className="border border-slate-200 rounded p-2 bg-slate-50/50">
                    <span className="font-bold text-slate-900 block leading-tight">{cert.title}</span>
                    <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                      <span>{cert.issuer}</span>
                      <span className="font-mono">{cert.date}</span>
                    </div>
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
