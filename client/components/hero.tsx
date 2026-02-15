'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { Portfolio } from '@/lib/types';

interface HeroProps {
  portfolio: Portfolio;
}

export function Hero({ portfolio }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'Web Developer',
    'React Developer',
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, titles]);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !imageRef.current) return;

    // Create GSAP timeline
    const tl = gsap.timeline();

    // Animate greeting text
    tl.fromTo(
      '.hero-greeting',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    // Animate name
    tl.fromTo(
      '.hero-name',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // Animate title
    tl.fromTo(
      '.hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    // Animate bio
    tl.fromTo(
      '.hero-bio',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    // Animate stats
    tl.fromTo(
      '.hero-stats',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    // Animate buttons
    tl.fromTo(
      '.hero-buttons button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
      '-=0.4'
    );

    // Animate image with floating effect
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    );

    // Add floating animation to image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div ref={textRef} className="space-y-6">
            <div className="hero-greeting">
              <p className="text-lg font-medium text-foreground/70">Hi! I Am</p>
            </div>

            <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {portfolio.name}
            </h1>

            <h2 className="hero-title text-3xl md:text-4xl font-bold text-blue-500 dark:text-blue-400 min-h-[3rem]">
              {displayText}
              <span className="animate-pulse">|</span>
            </h2>

            <p className="hero-bio text-base md:text-lg text-foreground/70 leading-relaxed max-w-lg font-light">
              {portfolio.bio}
            </p>

            {/* Experience Stats */}
            <div className="hero-stats bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 w-fit">
              <p className="text-sm text-foreground/60 font-medium">Currently Seeking</p>
              <p className="text-lg font-semibold text-foreground">Software Engineer / Web Developer Intern</p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons flex flex-wrap gap-4 pt-4">
              <Link href="/about">
                <Button 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-base font-medium hover:bg-foreground hover:text-background transition-all duration-300"
                >
                  Explore My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  className="rounded-full px-8 py-6 text-base font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image - Circular Profile */}
          <div className="flex justify-center md:justify-end">
            <div
              ref={imageRef}
              className="w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm flex items-center justify-center overflow-hidden shadow-2xl"
            >
              {portfolio.profileImage ? (
                <img
                  src={portfolio.profileImage}
                  alt={portfolio.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="text-7xl">👨‍💻</div>
                    <p className="text-sm font-medium text-foreground/70">Add Profile Photo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
