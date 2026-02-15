'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useMessages } from '@/hooks/usePortfolioData';
import { Mail, Calendar } from 'lucide-react';

export default function AdminMessagesPage() {
  const router = useRouter();
  const { data: messages, isLoading } = useMessages();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

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
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-foreground/60 mt-2">View and manage messages from your contact form</p>
        </div>

        {/* Messages List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Messages Column */}
            <div className="md:col-span-1 space-y-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">Messages</h2>
              {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <motion.button
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedMessage(msg.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedMessage === msg.id
                        ? 'bg-accent/10 border-accent'
                        : 'bg-card border-border hover:border-accent/50'
                    } ${!msg.isRead ? 'font-semibold' : ''}`}
                  >
                    <p className="truncate text-foreground">{msg.subject}</p>
                    <p className="text-sm text-foreground/60 truncate">{msg.name}</p>
                  </motion.button>
                ))
              ) : (
                <p className="text-center text-foreground/60 py-8">No messages yet</p>
              )}
            </div>

            {/* Message Details */}
            <div className="md:col-span-2">
              {selectedMessage && messages ? (
                (() => {
                  const msg = messages.find((m) => m.id === selectedMessage);
                  return msg ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-lg p-6 space-y-6"
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-foreground/60">From</label>
                          <p className="text-foreground font-semibold">{msg.name}</p>
                        </div>

                        <div>
                          <label className="text-sm text-foreground/60 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </label>
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-accent hover:underline"
                          >
                            {msg.email}
                          </a>
                        </div>

                        <div>
                          <label className="text-sm text-foreground/60 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Date
                          </label>
                          <p className="text-foreground">
                            {new Date(msg.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {msg.subject}
                        </h3>
                        <p className="text-foreground/70 whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => window.location.href = `mailto:${msg.email}`}
                          className="gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Reply via Email
                        </Button>
                      </div>
                    </motion.div>
                  ) : null;
                })()
              ) : (
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <p className="text-foreground/60">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
