'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useBlogPosts } from '@/hooks/usePortfolioData';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Tag } from 'lucide-react';

export default function BlogPage() {
  const { data: posts, isLoading } = useBlogPosts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Blog</h1>
            <p className="text-lg text-foreground/70">
              Thoughts, stories, and ideas about web development and technology
            </p>
          </motion.section>

          {/* Blog Posts */}
          {posts && posts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              {posts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border-l-4 border-accent pl-6 pb-8 hover:shadow-md transition-all duration-300"
                >
                  {post.image && (
                    <div className="mb-4 w-full h-40 rounded-lg overflow-hidden bg-accent/10">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold text-foreground hover:text-accent transition-colors mb-2">
                      {post.title}
                    </h2>
                  </Link>

                  <div className="flex flex-wrap gap-4 mb-3 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-4 leading-relaxed">{post.excerpt}</p>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-foreground/60 text-lg">No blog posts yet. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
