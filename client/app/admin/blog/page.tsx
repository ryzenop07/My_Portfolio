'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlogPosts } from '@/hooks/usePortfolioData';

export default function AdminBlogPage() {
  const router = useRouter();
  const { data: posts } = useBlogPosts();
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
          <h1 className="text-3xl font-bold text-foreground">Manage Blog Posts</h1>
          <p className="text-foreground/60 mt-2">Coming soon: Create and manage blog posts</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="text-foreground/70 mt-2">{post.excerpt}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-foreground/60">No blog posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
