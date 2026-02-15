'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LogOut, FileText, Briefcase, AlertCircle } from 'lucide-react';
import { usePortfolio, useMessages, useProjects } from '@/hooks/usePortfolioData';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { data: portfolio } = usePortfolio();
  const { data: messages } = useMessages();
  const { data: projects } = useProjects();

  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  const unreadMessages = messages?.filter((m) => !m.isRead).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="border-b border-blue-500/20 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, {portfolio?.name}!</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 border-gray-700 hover:bg-gray-800 text-gray-300">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Blog Posts</p>
                <p className="text-3xl font-bold text-white">0</p>
              </div>
              <FileText className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Projects</p>
                <p className="text-3xl font-bold text-white">{projects?.length || 0}</p>
              </div>
              <Briefcase className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 ${
              unreadMessages > 0 
                ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/40 hover:border-orange-500/60' 
                : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Unread Messages</p>
                <p className="text-3xl font-bold text-white">{unreadMessages}</p>
              </div>
              <AlertCircle className={`w-8 h-8 opacity-50 ${
                unreadMessages > 0 ? 'text-orange-400' : 'text-green-400'
              }`} />
            </div>
          </motion.div>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portfolio Management */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 space-y-4 hover:border-blue-500/30 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-white">Portfolio Management</h2>
            <p className="text-gray-400">Manage your portfolio information and content</p>
            <div className="space-y-2">
              <Link href="/admin/portfolio" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Edit Portfolio Info
                </Button>
              </Link>
              <Link href="/admin/experiences-manage" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Manage Experiences
                </Button>
              </Link>
              <Link href="/admin/projects-manage" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Manage Projects
                </Button>
              </Link>
              <Link href="/admin/skills" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Manage Skills
                </Button>
              </Link>
            </div>
          </motion.section>

          {/* Content Management */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 space-y-4 hover:border-purple-500/30 transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-white">Content Management</h2>
            <p className="text-gray-400">Manage blog posts and other content</p>
            <div className="space-y-2">
              <Link href="/admin/blog" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Manage Blog Posts
                </Button>
              </Link>
              <Link href="/admin/messages" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  View Messages {unreadMessages > 0 && `(${unreadMessages})`}
                </Button>
              </Link>
              <Link href="/admin/certificates-manage" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Manage Certificates
                </Button>
              </Link>
              <Link href="/admin/achievements" className="block">
                <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                  Manage Achievements
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
