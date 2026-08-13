import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionHeading from './SectionHeading';
import Tilt3D from './Tilt3D';
import ProjectPreviewModal from './ProjectPreviewModal';

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <section id="projects" className="py-24 section-padding relative">
        <div className="container mx-auto">
          <SectionHeading
            eyebrow="Projects"
            title="Featured Work"
            description="A selection of projects that showcase my skills and problem-solving approach."
          />

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id + index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.08 }}
              >
                <Tilt3D
                  className="glass-card glow-border overflow-hidden flex flex-col h-full"
                  glowColor="rgba(0,229,255,0.25)"
                >
                  {/* Image floats back */}
                  <div
                    className="relative h-44 overflow-hidden group cursor-pointer"
                    style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="btn-primary text-xs flex items-center gap-1.5 shadow-xl">
                        <Eye size={14} /> Quick Preview
                      </span>
                    </div>
                  </div>

                  {/* Content pops forward */}
                  <div
                    className="p-5 flex flex-col flex-1"
                    style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
                  >
                    <h3
                      className="text-base font-semibold mb-2 transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>

                    {/* Tech tags float even more forward */}
                    <div
                      className="flex flex-wrap gap-1.5 mb-4"
                      style={{ transform: 'translateZ(8px)' }}
                    >
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs rounded-full"
                          style={{
                            border: '1px solid var(--accent)',
                            background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                            color: 'var(--accent)',
                            opacity: 0.85,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons at top Z layer */}
                    <div
                      className="flex flex-wrap gap-2 mt-auto"
                      style={{ transform: 'translateZ(14px)' }}
                    >
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 btn-primary text-xs px-3 py-1.5"
                      >
                        <Eye size={13} /> Live Preview
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 btn-secondary text-xs px-3 py-1.5"
                      >
                        <FaGithub size={13} /> GitHub
                      </a>
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Project Preview Modal */}
      <ProjectPreviewModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
}
