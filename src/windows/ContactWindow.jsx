import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Instagram, 
  CheckCircle2, 
  MessageSquare,
  Phone,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { socialsData } from '../data/socials';

export function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Open mail client with prefilled data
      const mailtoUrl = `mailto:${socialsData.email.address}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[480px] bg-slate-950 text-slate-100 font-sans select-text">
      {/* Sidebar Social & Contact Links */}
      <div className="w-full md:w-64 bg-slate-900/80 border-b md:border-b-0 md:border-r border-white/10 p-4 flex flex-col justify-between shrink-0 select-none space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 text-sm font-bold text-white mb-2">
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Connect & Reach</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Feel free to reach out directly via phone, email, or connect across my developer profiles.
          </p>

          <div className="space-y-2">
            {/* Click-to-Email + Copy */}
            <div className="flex items-center space-x-1">
              <a
                href={socialsData.email.url}
                className="flex-1 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-medium flex items-center space-x-2 transition-colors text-slate-200 truncate"
                title="Click to send email"
              >
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate">{socialsData.email.address}</span>
              </a>
              <button
                onClick={() => handleCopy(socialsData.email.address, 'email')}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Click-to-Call + Copy */}
            <div className="flex items-center space-x-1">
              <a
                href={socialsData.phone.url}
                className="flex-1 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-medium flex items-center space-x-2 transition-colors text-slate-200"
                title="Click to call"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{socialsData.phone.number}</span>
              </a>
              <button
                onClick={() => handleCopy(socialsData.phone.number, 'phone')}
                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-slate-300 hover:text-white transition-colors"
                title="Copy Phone"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* GitHub */}
            <a
              href={socialsData.github.url}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-medium flex items-center justify-between transition-colors text-slate-200"
            >
              <div className="flex items-center space-x-2 truncate">
                <Github className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">{socialsData.github.handle}</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
            </a>

            {/* LinkedIn */}
            <a
              href={socialsData.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-medium flex items-center justify-between transition-colors text-slate-200"
            >
              <div className="flex items-center space-x-2 truncate">
                <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">Vimal Raghav M</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
            </a>

            {/* Instagram */}
            <a
              href={socialsData.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-medium flex items-center justify-between transition-colors text-slate-200"
            >
              <div className="flex items-center space-x-2 truncate">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <span className="truncate">{socialsData.instagram.handle}</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
            </a>
          </div>
        </div>

        <div className="p-3 bg-blue-900/20 border border-blue-500/20 rounded-xl text-[11px] text-blue-300">
          📍 Salem, Tamil Nadu, India • Open to Global Collaborations & Roles
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isSubmitted ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-400/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Message Prepared!</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">
                Your email client has been launched with your message details addressed to <span className="text-blue-300 font-semibold">{socialsData.email.address}</span>.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const mailtoUrl = `mailto:${socialsData.email.address}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
                  window.location.href = mailtoUrl;
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow transition-colors"
              >
                Re-open Mail App
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors"
              >
                Send Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-white/10 pb-2">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span>Send a Direct Message</span>
              </h2>
              <p className="text-xs text-slate-400">
                Fill out the fields below to initiate an inquiry or collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Job Opportunity / Collaboration"
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Preparing Message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message via Email</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
