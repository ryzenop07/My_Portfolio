'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const projectCards = containerRef.current.querySelectorAll('.project-card');

    // Animate section title
    gsap.fromTo(
      sectionRef.current.querySelector('.projects-title'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    // Animate project cards with stagger
    projectCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, rotateY: -10 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Add 3D hover effect
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(
        card,
        {
          y: -10,
          boxShadow: '0 20px 60px rgba(59, 130, 246, 0.2)',
          duration: 0.4,
        },
        0
      );
      hoverTl.to(
        card.querySelector('.project-image'),
        { scale: 1.05, duration: 0.4 },
        0
      );

      card.addEventListener('mouseenter', () => hoverTl.play());
      card.addEventListener('mouseleave', () => hoverTl.reverse());
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="projects-title mb-16 text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-2">
            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">🚀 MY WORK</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building innovative solutions with modern web technologies
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, idx) => {
            const gradients = [
              { bg: 'from-blue-500 to-cyan-500', border: 'border-blue-500/20', hover: 'hover:border-blue-500/50' },
              { bg: 'from-purple-500 to-pink-500', border: 'border-purple-500/20', hover: 'hover:border-purple-500/50' },
              { bg: 'from-orange-500 to-red-500', border: 'border-orange-500/20', hover: 'hover:border-orange-500/50' },
            ];
            const gradient = gradients[idx % gradients.length];
            
            return (
              <div
                key={project.id}
                className={`project-card group bg-white dark:bg-gray-900 border ${gradient.border} ${gradient.hover} rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
                style={{ perspective: '1000px' }}
              >
                {/* Project Image/Thumbnail */}
                <div className={`project-image relative w-full h-56 bg-gradient-to-br ${gradient.bg} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative text-8xl opacity-90 group-hover:scale-110 transition-transform duration-500">💼</div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="flex-1">
                        <button className="w-full px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm group/btn">
                          <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                          Code
                        </button>
                      </Link>
                    )}
                    {project.link && (
                      <Link href={project.link} target="_blank" className="flex-1">
                        <button className={`w-full px-4 py-2.5 rounded-xl bg-gradient-to-r ${gradient.bg} hover:shadow-lg text-white transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm group/btn`}>
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                          Live
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link href="/portfolio">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105">
              View All Projects →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
