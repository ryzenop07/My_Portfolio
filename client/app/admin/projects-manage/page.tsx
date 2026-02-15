'use client';

import { useState } from 'react';
import { useProjects } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Edit2 } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  featured: boolean;
  image?: string;
  link?: string;
  github?: string;
}

export default function ProjectsManagePage() {
  const { data: projects = [] } = useProjects();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      setFormData({ title: '', description: '', technologies: [], featured: false });
      setIsAdding(false);
      setEditingId(null);
      window.location.reload();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <Button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
              setFormData({ title: '', description: '', technologies: [], featured: false });
            }}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border mb-8">
            <div className="space-y-4">
              <Input
                placeholder="Project Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <Input
                placeholder="Technologies (comma separated)"
                value={(formData.technologies || []).join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technologies: e.target.value.split(',').map((t) => t.trim()),
                  })
                }
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingId ? 'Update' : 'Add'} Project
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ title: '', description: '', technologies: [], featured: false });
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border shadow-light">
              <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-foreground/70 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span key={tech} className="badge-primary">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(project)}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:bg-red-50 gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
