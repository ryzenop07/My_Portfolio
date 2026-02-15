'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useExperiences } from '@/hooks/usePortfolioData';
import type { Experience } from '@/lib/types';

export default function AdminExperiencesPage() {
  const router = useRouter();
  const { data: experiences } = useExperiences();
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
          <h1 className="text-3xl font-bold text-foreground">Manage Experiences</h1>
          <p className="text-foreground/60 mt-2">Coming soon: Manage your work experiences</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {experiences && experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground">{exp.position}</h3>
                <p className="text-accent">{exp.company}</p>
                <p className="text-sm text-foreground/60 mt-2">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-foreground/60">No experiences yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
