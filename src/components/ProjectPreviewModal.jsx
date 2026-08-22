import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code2 } from 'lucide-react';

export default function ProjectPreviewModal({ isOpen, onClose, project }) {
  if (!project) return null;

  const liveUrl = project.demoUrl || project.liveUrl;
  const githubUrl = project.githubUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-lg bg-[#0f172a] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1e293b] border-b border-gray-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 font-bold text-sm text-white truncate max-w-[200px] md:max-w-xs">
                  {project.title}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col items-center gap-5 text-center">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full rounded-xl border border-gray-800 object-cover max-h-48"
                />
              )}
              <p className="text-gray-400 text-sm">{project.description}</p>

              <div className="flex gap-3 flex-wrap justify-center">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-sm hover:bg-cyan-400 transition-colors"
                  >
                    <ExternalLink size={15} />
                    Open Live Demo
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 font-semibold text-sm hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                  >
                    <Code2 size={15} />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
