import React from 'react';
import { certificationsData } from '../data/certifications';
import { Award, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';

export function CertificationsWindow() {
  return (
    <div className="p-6 h-full overflow-y-auto bg-slate-950 text-slate-100 font-sans select-text">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-400/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Professional Certifications</h2>
            <p className="text-xs text-slate-400">Verified specialization certificates and credentials</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/15 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-400/20">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-2 py-0.5 rounded">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-bold text-base text-white mb-1">{cert.title}</h3>
                <p className="text-xs font-semibold text-blue-400 mb-3">{cert.issuer}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-blue-500/15 text-blue-300 text-[10px] font-medium rounded-md border border-blue-400/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[10px]">ID: {cert.credentialId}</span>
                <span className="text-emerald-400 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
