'use client';

import { Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export function ResumeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const generatePDF = () => {
    // Create a simple text-based resume download
    const resumeContent = `
VISHAL PRAJAPATI
Full-Stack Developer | Gorakhpur, UP, India
Email: prajapativishal273212@gmail.com | Phone: +91 9219057144

PROFESSIONAL SUMMARY
Computer Science undergraduate specializing in Full-Stack Web Development. Building innovative digital solutions with React.js, Node.js, and MongoDB. Actively seeking Software Engineer internship opportunities.

EXPERIENCE
Currently Studying - Full-Stack Web Developer
Focused on learning and practicing Full-Stack Web Development
- React.js, Node.js, Express.js, MongoDB, REST APIs

PROJECTS
MediMap – AI Smart Pharmacy
Full-stack web application to locate nearby pharmacies and check medicine availability in real time with AI-powered recommendations.
- Technologies: React.js, Node.js, MongoDB, AI APIs, REST APIs

HireHub – Job Portal
Comprehensive job portal with login, signup, job listings, applications, and admin panel
- Technologies: MongoDB, Express, React, Node.js, JWT Auth

TECHNICAL SKILLS
Languages: Java, C, JavaScript
Frontend: React.js, HTML5, CSS3, Responsive Design
Backend: Node.js, Express.js, REST APIs
Databases: MongoDB, SQL (basic)
Core CS: Data Structures, OOP, DBMS, Operating Systems
DevOps: Git, GitHub

EDUCATION
B.Tech in Computer Science and Engineering
Buddha Institute of Technology | 2023-2027

CERTIFICATES & ACHIEVEMENTS
- Academic Merit Certificate - Buddha Institute of Technology (2023)
- Robotic Process Automation (RPA) - NIELIT Gorakhpur (2024)
- Best Paper Award (RTSET-2025) - Vehicle Parking Management System
    `;

    // Create blob and download
    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Vishal_Prajapati_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200/30 dark:border-blue-900/30"
    >
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-500/10 rounded-lg">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Download Resume</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Get my complete CV with all experience and skills
            </p>
          </div>
        </div>
        <Button
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-lg px-6 py-2 font-medium transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
