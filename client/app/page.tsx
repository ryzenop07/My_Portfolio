'use client';

import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SkillsSection } from '@/components/skills-section';
import { ProjectsSection } from '@/components/projects-section';
import { usePortfolio, useSkills, useProjects } from '@/hooks/usePortfolioData';

export default function HomePage() {
  const { data: portfolio, isLoading } = usePortfolio();
  const { data: skills } = useSkills();
  const { data: projects } = useProjects();

  if (isLoading || !portfolio) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Hero portfolio={portfolio} />
      
      {projects && projects.length > 0 && <ProjectsSection projects={projects} />}
      
      {skills && skills.length > 0 && <SkillsSection skills={skills} />}

      <Footer />
    </>
  );
}
