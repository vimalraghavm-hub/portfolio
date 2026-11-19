import React, { useState, useRef, useEffect } from 'react';
import { profileData } from '../data/profile';
import { projectsData } from '../data/projects';

export function TerminalWindow({ onOpenWindow }) {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Last login: Thu Sep 24 23:17:17 on ttys001' },
    { type: 'output', content: 'Welcome to Vimal OS Terminal v2.4 (x86_64-apple-darwin22.0)' },
    { type: 'output', content: 'Type "help" or "neofetch" to get started.\n' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      const newHistory = [...history, { type: 'cmd', content: `vimal@macbook ~ % ${inputVal}` }];
      const lower = cmd.toLowerCase();

      if (lower === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      }

      if (lower === 'help') {
        newHistory.push({
          type: 'output',
          content: `Available commands:
  help      - Display available CLI commands
  neofetch  - Display system architecture specs
  about     - Open About Me window
  projects  - List portfolio projects
  skills    - List core skill tags
  clear     - Clear terminal buffer
  date      - Display system time
  matrix    - Easter egg code rain
  whoami    - Display user identity`
        });
      } else if (lower === 'neofetch') {
        newHistory.push({
          type: 'output',
          content: `
   /\\_\\_\\        vimal@macbook-pro.local
  / /\\ / /\\       -----------------------
 / / /\\ / /\\      OS: VimalOS Desktop v2.4 (macOS Sonoma inspired)
/ / /  / / /\\     Host: Portfolio Workstation
\\ \\/  / / / /     Kernel: React 18.3 + Tailwind 3.4
 \\/  / / / /      Uptime: 100% Continuous
  \\ / /\\/ /       Shell: zsh 5.9
   \\/\\_\\_/        CPU: CS Engineering Intelligence
                  Memory: Full Stack + AI/ML Stack
`
        });
      } else if (lower === 'about') {
        newHistory.push({ type: 'output', content: 'Opening About Me Window...' });
        onOpenWindow('about');
      } else if (lower === 'projects') {
        newHistory.push({
          type: 'output',
          content: projectsData.map(p => `• ${p.name}: ${p.shortDescription} (${p.technologies.join(', ')})`).join('\n')
        });
      } else if (lower === 'skills') {
        newHistory.push({
          type: 'output',
          content: 'Languages: Java, Python, JavaScript, SQL, PL/SQL\nWeb Dev: HTML, CSS, React, Django, Spring Boot, RESTful Services, Microservices\nFrameworks: Spring Core, Spring Data JPA, Hibernate, JUnit, Mockito, SLF4J\nAI / ML: NumPy, Pandas, TensorFlow, Ollama, Generative AI\nTools: Google Colab, Jupyter Notebook, Android Studio, Git, GitHub'
        });
      } else if (lower === 'date') {
        newHistory.push({ type: 'output', content: new Date().toString() });
      } else if (lower === 'whoami') {
        newHistory.push({ type: 'output', content: 'vimal_raghav_m (Computer Science Engineering Student | Full Stack Developer | AI/ML Enthusiast)' });
      } else if (lower === 'matrix') {
        newHistory.push({
          type: 'output',
          content: '01000011 01010011 00100000 01000101 01101110 01100111 01101001 01101110 01100101 01100101 01110010 01101001 01101110 01100111'
        });
      } else if (cmd !== '') {
        newHistory.push({ type: 'output', content: `zsh: command not found: ${cmd}. Type "help" for commands.` });
      }

      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <div className="p-4 h-full bg-slate-950 font-mono text-xs text-emerald-400 overflow-y-auto select-text">
      {history.map((item, idx) => (
        <div key={idx} className={item.type === 'cmd' ? 'text-white font-semibold' : 'whitespace-pre-wrap text-emerald-400/90'}>
          {item.content}
        </div>
      ))}
      <div className="flex items-center space-x-2 text-white font-semibold mt-1">
        <span className="text-blue-400">vimal@macbook ~ %</span>
        <input
          type="text"
          autoFocus
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none focus:outline-none text-emerald-300 w-full font-mono"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
