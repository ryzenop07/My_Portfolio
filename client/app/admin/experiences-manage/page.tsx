'use client';

import { useState } from 'react';
import { useExperiences } from '@/hooks/usePortfolioData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Edit2 } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrently: boolean;
  description: string;
  technologies: string[];
}

export default function ExperiencesManagePage() {
  const { data: experiences = [] } = useExperiences();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrently: false,
    description: '',
    technologies: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        await fetch('/api/experiences-crud', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData }),
        });
      } else {
        await fetch('/api/experiences-crud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      setFormData({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrently: false,
        description: '',
        technologies: [],
      });
      setIsAdding(false);
      setEditingId(null);
      window.location.reload();
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await fetch(`/api/experiences-crud?id=${id}`, { method: 'DELETE' });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Experiences</h1>
          <Button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
              setFormData({
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                isCurrently: false,
                description: '',
                technologies: [],
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border mb-8">
            <div className="space-y-4">
              <Input
                placeholder="Company Name"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
              <Input
                placeholder="Position"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={formData.startDate || ''}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
                <Input
                  type="date"
                  value={formData.endDate || ''}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.isCurrently}
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isCurrently || false}
                  onChange={(e) => setFormData({ ...formData, isCurrently: e.target.checked })}
                />
                <span>Currently working here</span>
              </label>
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
                  {editingId ? 'Update' : 'Add'} Experience
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white dark:bg-neutral-900 p-6 rounded-lg border shadow-light"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                </div>
                <span className="badge-success">
                  {exp.isCurrently ? 'Current' : 'Past'}
                </span>
              </div>
              <p className="text-sm text-foreground/70 mb-3">{exp.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="badge-primary">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(exp)}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(exp.id)}
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
