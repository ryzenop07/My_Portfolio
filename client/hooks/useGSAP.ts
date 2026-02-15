'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPAnimation(callback: (ctx: gsap.Context) => void, dependencies: any[] = []) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(ctx.current!);
    });

    return () => {
      ctx.current?.revert();
    };
  }, dependencies);
}

export function useScrollTrigger(callback: (trigger: ScrollTrigger) => void, selector: string) {
  useGSAPAnimation((ctx) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      onEnter: () => callback(trigger),
    });

    return () => trigger.kill();
  }, [selector]);
}

export { gsap, ScrollTrigger };
