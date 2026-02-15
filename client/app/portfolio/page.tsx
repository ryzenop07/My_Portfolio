'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useProjects } from '@/hooks/usePortfolioData';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PortfolioPage() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  const featuredProjects = projects?.filter((p) => p.featured) || [];
  const otherProjects = projects?.filter((p) => !p.featured) || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Portfolio</h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              A showcase of my recent projects and work
            </p>
          </motion.section>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-foreground">Featured Works</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {project.image && (
                      <div className="w-full h-48 bg-accent/10 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                      <p className="text-foreground/70">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-4">
                        {project.github && (
                          <Link href={project.github} target="_blank" className="flex-1">
                            <Button variant="outline" size="sm" className="gap-2 w-full border-gray-700 hover:bg-gray-800 text-gray-300">
                              <Github className="w-4 h-4" />
                              GitHub
                            </Button>
                          </Link>
                        )}
                        {project.link && (
                          <Link href={project.link} target="_blank" className="flex-1">
                            <Button variant="outline" size="sm" className="gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-600">
                              <ExternalLink className="w-4 h-4" />
                              Live
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-foreground">Other Projects</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-foreground/70 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {project.github && (
                        <Link href={project.github} target="_blank" className="flex-1">
                          <Button variant="ghost" size="sm" className="gap-2 w-full border border-gray-700 hover:bg-gray-800 text-gray-300">
                            <Github className="w-4 h-4" />
                            GitHub
                          </Button>
                        </Link>
                      )}
                      {project.link && (
                        <Link href={project.link} target="_blank" className="flex-1">
                          <Button variant="ghost" size="sm" className="gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {(!projects || projects.length === 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-foreground/60 text-lg">No projects added yet.</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
