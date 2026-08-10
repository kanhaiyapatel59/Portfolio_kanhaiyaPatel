import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import portfolioData from '../data/portfolioData';

export default function TerminalModal({ isOpen, onClose, toggleTheme, isLight }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Welcome to Kanhaiya Patel\'s Interactive Developer CLI! 🚀\nType "help" to see available commands.'
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const { profile, skills } = portfolioData;
  const projects = portfolioData.projects;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (!trimmed) return;

      const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }];
      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.toLowerCase().split(' ');
      const cmd = parts[0];
      const arg = parts[1];

      switch (cmd) {
        case 'help':
          newHistory.push({
            type: 'system',
            text: `Available Commands:
  • help           - Show this manual
  • whoami / about - Display developer summary
  • skills         - List tech stack & frameworks
  • projects       - View portfolio projects
  • github         - Open GitHub profile
  • theme [dark|light] - Switch site theme
  • contact        - Jump to contact section
  • sudo hire      - Trigger recruiter surprise 🎉
  • clear          - Clear terminal output`
          });
          break;

        case 'whoami':
        case 'about':
          newHistory.push({
            type: 'system',
            text: `${profile.name} - ${profile.title}\n📍 ${profile.location}\n\n${profile.bio}`
          });
          break;

        case 'skills': {
          const skillsList = skills.map((s) => `  • ${s.name} (${s.category})`).join('\n');
          newHistory.push({
            type: 'system',
            text: `Tech Stack & Expertise:\n${skillsList}`
          });
          break;
        }

        case 'projects': {
          const projList = projects.map((p) => `  [${p.id}] ${p.title}\n      Tech: ${p.techStack.join(', ')}`).join('\n\n');
          newHistory.push({
            type: 'system',
            text: `Featured Projects:\n${projList}`
          });
          break;
        }

        case 'github':
          window.open(profile.github || 'https://github.com/kanhaiyapatel59', '_blank');
          newHistory.push({
            type: 'system',
            text: 'Opening GitHub profile: https://github.com/kanhaiyapatel59...'
          });
          break;

        case 'theme':
          if (arg === 'light' || arg === 'dark') {
            if ((arg === 'light' && !isLight) || (arg === 'dark' && isLight)) {
              toggleTheme();
            }
            newHistory.push({ type: 'system', text: `Theme switched to ${arg} mode!` });
          } else {
            toggleTheme();
            newHistory.push({ type: 'system', text: 'Theme toggled!' });
          }
          break;

        case 'contact':
          onClose();
          setTimeout(() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
          newHistory.push({ type: 'system', text: 'Navigating to Contact section...' });
          break;

        case 'sudo':
          if (arg === 'hire') {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
            newHistory.push({
              type: 'success',
              text: `🎉 CONGRATULATIONS! You unlocked the secret hire command!\nLet's build something extraordinary together. Email me at ${profile.email}!`
            });
          } else {
            newHistory.push({
              type: 'error',
              text: `sudo: ${arg || 'command'}: command not found. Try "sudo hire"`
            });
          }
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        default:
          newHistory.push({
            type: 'error',
            text: `Command not found: "${trimmed}". Type "help" for command list.`
          });
          break;
      }

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < cmdHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-2xl bg-[#0d1117] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden text-gray-200 font-mono text-sm"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                <span className="ml-3 text-xs text-gray-400 font-sans flex items-center gap-1.5">
                  <TerminalIcon size={14} className="text-cyan-400" />
                  kanhaiya@dev-portfolio:~
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-96 overflow-y-auto space-y-3 bg-[#0d1117]/95">
              {history.map((item, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {item.type === 'user' ? (
                    <span className="text-cyan-400 font-bold">{item.text}</span>
                  ) : item.type === 'success' ? (
                    <span className="text-green-400 font-bold">{item.text}</span>
                  ) : item.type === 'error' ? (
                    <span className="text-red-400">{item.text}</span>
                  ) : (
                    <span className="text-gray-300">{item.text}</span>
                  )}
                </div>
              ))}

              {/* Terminal Input Line */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-cyan-400 font-bold">kanhaiya@dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent outline-none text-white font-mono caret-cyan-400"
                  placeholder="Type a command (e.g. help, skills, sudo hire)..."
                />
                <CornerDownLeft size={14} className="text-gray-600" />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
