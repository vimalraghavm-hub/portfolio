import React from 'react';
import { educationData } from '../data/education';
import { GraduationCap, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export function EducationWindow() {
  return (
    <div className="p-6 h-full overflow-y-auto bg-slate-950 text-slate-100 font-sans select-text">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-400/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Academic Qualifications</h2>
            <p className="text-xs text-slate-400">Computer Science Engineering Degree details and coursework</p>
          </div>
        </div>

        {educationData.map((edu) => (
          <div key={edu.id} className="p-6 bg-white/5 rounded-2xl border border-white/15 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                <p className="text-xs font-semibold text-blue-400">{edu.field}</p>
                <p className="text-xs text-slate-300 mt-0.5">{edu.institution}</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold rounded-lg block mb-1">
                  {edu.grade}
                </span>
                <span className="text-xs font-mono text-slate-400">{edu.period}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>Relevant Coursework & Modules</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {edu.relevantCoursework.map((course, i) => (
                  <div key={i} className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-200 flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
