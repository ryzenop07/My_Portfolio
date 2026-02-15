'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import { getCertificates, addCertificate, updateCertificate, deleteCertificate } from '@/lib/db';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  certificateUrl?: string;
}

export default function CertificatesManagePage() {
  const [certificates, setCertificates] = useState<Certificate[]>(getCertificates());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: '',
    issuer: '',
    date: '',
    description: '',
    certificateUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const updated = updateCertificate(editingId, formData as any);
      if (updated) {
        setCertificates(getCertificates());
      }
    } else {
      const newCert = {
        id: Date.now().toString(),
        title: formData.title || '',
        issuer: formData.issuer || '',
        date: formData.date || '',
        description: formData.description,
        certificateUrl: formData.certificateUrl,
      };
      addCertificate(newCert);
      setCertificates(getCertificates());
    }
    
    setFormData({ title: '', issuer: '', date: '', description: '', certificateUrl: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      deleteCertificate(id);
      setCertificates(getCertificates());
    }
  };

  const handleEdit = (cert: Certificate) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsAdding(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Certificates</h1>
          <Button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
              setFormData({ title: '', issuer: '', date: '', description: '', certificateUrl: '' });
            }}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Certificate
          </Button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border mb-8">
            <div className="space-y-4">
              <Input
                placeholder="Certificate Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="Issuing Organization"
                value={formData.issuer || ''}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                required
              />
              <Input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <Textarea
                placeholder="Description (optional)"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Input
                placeholder="Certificate URL (optional)"
                value={formData.certificateUrl || ''}
                onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {editingId ? 'Update' : 'Add'} Certificate
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ title: '', issuer: '', date: '', description: '', certificateUrl: '' });
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
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-neutral-900 p-6 rounded-lg border shadow-light"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{cert.title}</h3>
                  <p className="text-blue-600 font-medium">{cert.issuer}</p>
                </div>
                <span className="badge-primary">
                  {new Date(cert.date).toLocaleDateString()}
                </span>
              </div>
              {cert.description && (
                <p className="text-sm text-foreground/70 mb-3">{cert.description}</p>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => handleEdit(cert)}
                  size="sm"
                  variant="outline"
                  className="gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(cert.id)}
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
