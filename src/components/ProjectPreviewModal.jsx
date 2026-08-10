import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, RotateCw, Monitor, Smartphone, Tablet } from 'lucide-react';

export default function ProjectPreviewModal({ isOpen, onClose, project }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [loading, setLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  if (!project) return null;

  const liveUrl = project.demoUrl || project.liveUrl || project.githubUrl;

  const handleRefresh = () => {
    setLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const getContainerWidth = () => {
    switch (device) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-5xl';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className={`w-full ${getContainerWidth()} bg-[#0f172a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300`}
            style={{ height: '80vh' }}
          >
            {/* Header Controls Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b] border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 font-bold text-sm text-white truncate max-w-[200px] md:max-w-xs">
                  {project.title}
                </span>
              </div>

              {/* Device Frame Switcher */}
              <div className="flex items-center gap-1 bg-[#0f172a] p-1 rounded-xl border border-gray-800">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                    device === 'desktop' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor size={14} />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setDevice('tablet')}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                    device === 'tablet' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet size={14} />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                    device === 'mobile' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone size={14} />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  title="Reload Preview"
                >
                  <RotateCw size={15} />
                </button>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-gray-800 transition-colors flex items-center gap-1 text-xs"
                  title="Open in new tab"
                >
                  <ExternalLink size={15} />
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Iframe Body */}
            <div className="relative flex-1 bg-black/40 overflow-hidden flex items-center justify-center p-2">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a] z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-400">Loading live preview...</span>
                  </div>
                </div>
              )}

              {liveUrl ? (
                <iframe
                  key={iframeKey}
                  src={liveUrl}
                  title={project.title}
                  onLoad={() => setLoading(false)}
                  className="w-full h-full rounded-xl border border-gray-800 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : (
                <div className="text-center p-6 text-gray-400">
                  <p>Live demo URL not configured for this project.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
