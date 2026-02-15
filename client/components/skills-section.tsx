'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Skill } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.skill-card');

    // Animate section title
    gsap.fromTo(
      sectionRef.current.querySelector('.skills-title'),
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

    // Animate skill cards
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Add hover animation
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(card, { y: -5, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)', duration: 0.3 });

      card.addEventListener('mouseenter', () => hoverTl.play());
      card.addEventListener('mouseleave', () => hoverTl.reverse());
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-neutral-950 dark:via-blue-950/5 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="skills-title mb-16 text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-2">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">💪 MY SKILLS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Skills & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, idx) => {
            const colors = [
              { icon: '🎨', gradient: 'from-blue-500 via-blue-600 to-cyan-500', border: 'border-blue-500/20', hover: 'hover:border-blue-500/50' },
              { icon: '⚡', gradient: 'from-purple-500 via-purple-600 to-pink-500', border: 'border-purple-500/20', hover: 'hover:border-purple-500/50' },
              { icon: '🚀', gradient: 'from-orange-500 via-orange-600 to-red-500', border: 'border-orange-500/20', hover: 'hover:border-orange-500/50' },
              { icon: '💾', gradient: 'from-green-500 via-green-600 to-emerald-500', border: 'border-green-500/20', hover: 'hover:border-green-500/50' },
              { icon: '🔧', gradient: 'from-indigo-500 via-indigo-600 to-blue-500', border: 'border-indigo-500/20', hover: 'hover:border-indigo-500/50' },
              { icon: '📱', gradient: 'from-rose-500 via-rose-600 to-pink-500', border: 'border-rose-500/20', hover: 'hover:border-rose-500/50' },
            ];
            const color = colors[idx % colors.length];

            return (
              <div
                key={skill.id}
                className={`skill-card group bg-white dark:bg-gray-900 border ${color.border} ${color.hover} rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10 space-y-4">
                  {/* Icon with gradient background */}
                  <div className="flex items-center justify-between">
                    <div className={`text-4xl p-4 rounded-xl bg-gradient-to-br ${color.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {color.icon}
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skill.category}</h3>
                  
                  {skill.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{skill.description}</p>
                  )}
                  
                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skill.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-default border border-gray-200 dark:border-gray-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
