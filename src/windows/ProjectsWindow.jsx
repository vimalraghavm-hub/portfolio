import React, { useState } from 'react';
import { projectsData, projectCategories } from '../data/projects';
import { 
  Folder, 
  Grid, 
  List, 
  Search, 
  ChevronRight, 
  Github, 
  ExternalLink, 
  Sparkles, 
  Code2, 
  Layers,
  ArrowLeft,
  ArrowRight,
  Info
} from 'lucide-react';
import { ProjectDetailModal } from './ProjectDetailModal';

export function ProjectsWindow({ initialData }) {
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectModal, setActiveProjectModal] = useState(
    initialData?.selectedProject || null
  );

  // Filter projects by category and search term
  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory =
      selectedCategory === "All Projects" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full min-h-[500px] bg-slate-950 text-slate-100 font-sans select-none">
      {/* Finder Toolbar */}
      <div className="h-12 bg-slate-900/90 border-b border-white/10 px-4 flex items-center justify-between shrink-0">
        {/* Nav Controls & Breadcrumbs */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-slate-400">
            <button className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Breadcrumb Path */}
          <div className="flex items-center space-x-1 text-xs text-slate-300 font-medium">
            <span className="text-slate-400">Desktop</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-blue-400 font-semibold">Projects</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-white">{selectedCategory}</span>
          </div>
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center space-x-3">
          {/* Search Box */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 bg-white/5 border border-white/15 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 w-44 transition-all"
            />
          </div>

          {/* View Toggles */}
          <div className="flex items-center p-0.5 bg-white/5 border border-white/15 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded ${
                viewMode === "grid" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded ${
                viewMode === "list" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Finder Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Finder Sidebar */}
        <div className="w-48 bg-slate-900/70 border-r border-white/10 p-3 shrink-0 flex flex-col justify-between">
          <div>
            <div className="px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Categories
            </div>
            <div className="space-y-1">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-2 transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Folder className="w-3.5 h-3.5 text-blue-400" />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-blue-900/30 border border-blue-500/20 rounded-xl text-xs text-blue-300">
            <span className="font-bold block text-white mb-1">💡 Finder Hint</span>
            Click any project card to inspect detailed architecture & highlights.
          </div>
        </div>

        {/* Finder Main Content */}
        <div className="flex-1 p-5 overflow-y-auto bg-slate-950/80">
          {filteredProjects.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs">
              <Folder className="w-12 h-12 text-slate-600 mb-2 opacity-50" />
              <p>No projects match your filter query.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProjectModal(project)}
                  className="group relative bg-white/5 hover:bg-white/10 rounded-2xl border border-white/15 overflow-hidden transition-all duration-200 hover:border-blue-400/40 hover:shadow-xl cursor-pointer flex flex-col justify-between"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md border border-white/20 text-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors mb-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-2 mb-3">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-blue-500/15 border border-blue-400/20 text-blue-300 text-[10px] font-medium rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                        <button className="text-blue-400 group-hover:text-blue-300 font-semibold flex items-center space-x-1">
                          <Info className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                        <div className="flex items-center space-x-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-slate-300 hover:text-white transition-colors"
                              title="GitHub Repository"
                            >
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
                              title="Live Demo"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProjectModal(project)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/15 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{project.name}</h4>
                      <p className="text-xs text-slate-300">{project.shortDescription}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <span className="text-xs text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/20">
                      {project.category}
                    </span>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg">
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Detail Modal Overlay */}
      {activeProjectModal && (
        <ProjectDetailModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </div>
  );
}
