'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50/30 dark:from-black dark:to-blue-950/20 border-t border-blue-200/30 dark:border-blue-500/20 mt-20 overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-bold group">
              <span className="text-blue-500 group-hover:rotate-180 transition-transform duration-500">&lt;/&gt;</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Vishal</span>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed font-light">
              Building innovative solutions with React, Node.js, and MongoDB
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:prajapativishal273212@gmail.com"
                className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-blue-500 transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="mailto:prajapativishal273212@gmail.com" className="hover:text-blue-500 transition-colors duration-300">
                  prajapativishal273212@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919219057144" className="hover:text-blue-500 transition-colors duration-300">
                  +91 9219057144
                </a>
              </li>
              <li className="text-foreground/70">
                Gorakhpur, UP, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-200/30 dark:border-blue-500/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/70 flex items-center gap-2">
            &copy; {currentYear} Made with <Heart className={`w-4 h-4 text-red-500 ${isHovered ? 'animate-ping' : ''}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} /> by Vishal Prajapati
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-blue-500 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
