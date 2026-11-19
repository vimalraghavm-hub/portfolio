import React, { useState } from 'react';
import { skillsData } from '../data/skills';
import { 
  Code2, 
  FileCode2, 
  FileJson, 
  Cpu, 
  Database, 
  Atom, 
  Palette, 
  Layout, 
  Layers, 
  Sparkles, 
  Server, 
  Network, 
  Box, 
  Zap, 
  Cloud, 
  HardDrive, 
  Table, 
  Brain, 
  Binary, 
  TrendingUp, 
  Eye, 
  GitBranch, 
  Github, 
  Terminal, 
  Code, 
  Container,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Smartphone
} from 'lucide-react';

const SKILL_ICONS = {
  Code2, FileCode2, FileJson, Cpu, Database, Atom, Palette, Layout, Layers, Sparkles,
  Server, Network, Box, Zap, Cloud, HardDrive, Table, Brain, Binary, TrendingUp,
  Eye, GitBranch, Github, Terminal, Code, Container, ShieldCheck, CheckCircle2,
  FileText, Smartphone
};

export function SkillsWindow() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Object.keys(skillsData)];

  return (
    <div className="flex flex-col h-full min-h-[480px] bg-slate-950 text-slate-100 font-sans select-none">
      {/* Category Filter Pills Bar */}
      <div className="p-3 bg-slate-900/90 border-b border-white/10 flex items-center space-x-2 overflow-x-auto shrink-0">
        <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow border border-blue-400/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Skills Content Grid */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950/80">
        {Object.entries(skillsData).map(([categoryName, skillsList]) => {
          if (selectedCategory !== 'All' && selectedCategory !== categoryName) {
            return null;
          }

          return (
            <div key={categoryName} className="space-y-3">
              <div className="flex items-center space-x-2 text-sm font-bold text-blue-400 border-b border-white/10 pb-1.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>{categoryName}</span>
                <span className="text-xs text-slate-400 font-normal">({skillsList.length} technologies)</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skillsList.map((skill) => {
                  const IconComp = SKILL_ICONS[skill.icon] || Code2;
                  return (
                    <div
                      key={skill.name}
                      className="p-3.5 bg-gradient-to-br from-white/10 to-white/5 hover:from-blue-600/20 hover:to-indigo-600/20 rounded-2xl border border-white/15 hover:border-blue-400/40 transition-all duration-200 shadow-md group flex items-center space-x-3 cursor-default"
                    >
                      <div className="p-2 bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white rounded-xl transition-colors shrink-0 border border-blue-400/20">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-white group-hover:text-blue-200 truncate">
                          {skill.name}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {skill.category || "Skill"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
