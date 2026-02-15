'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSkills } from '@/hooks/usePortfolioData';

export default function AdminSkillsPage() {
  const router = useRouter();
  const { data: skills } = useSkills();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Skills</h1>
          <p className="text-foreground/60 mt-2">Coming soon: Manage your technical skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills && skills.length > 0 ? (
            skills.map((skillGroup) => (
              <div key={skillGroup.id} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-foreground/60">No skills yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
