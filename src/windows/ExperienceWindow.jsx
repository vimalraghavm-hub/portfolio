import React from 'react';
import { experienceData } from '../data/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export function ExperienceWindow() {
  return (
    <div className="p-6 h-full overflow-y-auto bg-slate-950 text-slate-100 font-sans select-text">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-400/30">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Work & Leadership Experience</h2>
            <p className="text-xs text-slate-400">Professional internships and student tech leadership roles</p>
          </div>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/15">
          {experienceData.map((exp) => (
            <div key={exp.id} className="relative pl-8 group">
              {/* Timeline Dot */}
              <div className="absolute left-1 top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:scale-125 transition-transform" />

              <div className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/15 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-semibold text-blue-400">{exp.company}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {exp.period}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-400/20 text-[10px]">
                      {exp.type}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3">{exp.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
