'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/usePortfolioData';
import { Trash2, Edit2, Plus } from 'lucide-react';
import type { Project } from '@/lib/types';

export default function AdminProjectsPage() {
  const router = useRouter();
  const { data: projects, isLoading } = useProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    featured: false,
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const techs = e.target.value.split(',').map((t) => t.trim());
    setFormData((prev) => ({ ...prev, technologies: techs }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        }),
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          technologies: [],
          featured: false,
        });
        setShowForm(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

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
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Projects</h1>
            <p className="text-foreground/60 mt-2">Add and manage your portfolio projects</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {/* Add Project Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-lg p-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title || ''}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                required
              />
              <input
                type="text"
                name="link"
                placeholder="Project Link (optional)"
                value={formData.link || ''}
                onChange={handleInputChange}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground resize-none"
              required
            />

            <input
              type="text"
              placeholder="Technologies (comma separated)"
              value={formData.technologies?.join(', ') || ''}
              onChange={handleTechChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-foreground">Featured Project</span>
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Save Project</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.form>
        )}

        {/* Projects List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-lg p-6 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-foreground/70 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-foreground/60 py-8">No projects yet. Add one to get started!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
