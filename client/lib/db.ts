import type {
  Portfolio,
  Experience,
  Project,
  Skill,
  Education,
  BlogPost,
  Certificate,
  Achievement,
  ContactMessage,
} from './types';

// In-memory database (stores data during session)
// For production, replace with actual database

interface Database {
  portfolio: Portfolio;
  experiences: Experience[];
  projects: Project[];
  skills: Skill[];
  education: Education[];
  blogPosts: BlogPost[];
  certificates: Certificate[];
  achievements: Achievement[];
  messages: ContactMessage[];
}

// Default portfolio data
const defaultPortfolio: Portfolio = {
  name: 'Vishal Prajapati',
  title: 'Full-Stack Developer',
  bio: 'Computer Science undergraduate specializing in Full-Stack Web Development. Building innovative digital solutions with React.js, Node.js, and MongoDB. Actively seeking Software Engineer internship opportunities.',
  email: 'prajapativishal273212@gmail.com',
  phone: '+91 9219057144',
  location: 'Gorakhpur, UP, India',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
};

// Initialize database with default data
const db: Database = {
  portfolio: defaultPortfolio,
  experiences: [
    {
      id: '1',
      company: 'Currently Studying',
      position: 'Full-Stack Web Developer',
      startDate: '2024-01-01',
      endDate: '',
      isCurrently: true,
      description: 'Learning and practicing Full-Stack Web Development with React.js, Node.js, and MongoDB',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    },
  ],
  projects: [
    {
      id: '1',
      title: 'MediMap – AI Smart Pharmacy',
      description: 'Full-stack web application to locate nearby pharmacies and check medicine availability in real time with AI-powered recommendations.',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'AI APIs', 'REST APIs'],
      featured: true,
    },
    {
      id: '2',
      title: 'HireHub – Job Portal',
      description: 'Comprehensive job portal with login, signup, job listings, applications, and admin panel for managing postings.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT Auth'],
      featured: true,
    },
  ],
  skills: [
    {
      id: '1',
      category: 'Languages',
      skills: ['Java', 'C', 'JavaScript'],
    },
    {
      id: '2',
      category: 'Frontend',
      skills: ['React.js', 'HTML5', 'CSS3', 'Responsive Design'],
    },
    {
      id: '3',
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST APIs'],
    },
    {
      id: '4',
      category: 'Databases',
      skills: ['MongoDB', 'SQL (basic)'],
    },
    {
      id: '5',
      category: 'Core CS',
      skills: ['Data Structures', 'OOP', 'DBMS', 'Operating Systems'],
    },
    {
      id: '6',
      category: 'DevOps',
      skills: ['Git', 'GitHub'],
    },
  ],
  education: [
    {
      id: '1',
      school: 'Buddha Institute of Technology',
      degree: 'B.Tech',
      field: 'Computer Science and Engineering',
      startDate: '2023-01-01',
      endDate: '2027-12-31',
    },
  ],
  blogPosts: [],
  certificates: [
    {
      id: '1',
      title: 'Academic Merit Certificate',
      issuer: 'Buddha Institute of Technology',
      date: '2023-05-15',
      description: 'Securing 79.89% in First Year',
    },
    {
      id: '2',
      title: 'Robotic Process Automation (RPA)',
      issuer: 'NIELIT Gorakhpur',
      date: '2024-03-20',
      description: 'Successfully completed RPA training',
    },
  ],
  achievements: [
    {
      id: '1',
      title: 'Best Paper Award (RTSET-2025)',
      description: 'Awarded for presenting "Vehicle Parking Management System" at the 5th National Conference on Recent Trends in Science, Engineering and Technology',
      date: '2025-02-14',
      icon: 'award',
    },
  ],
  messages: [],
};

// Helper functions
export function getPortfolio(): Portfolio {
  return db.portfolio;
}

export function updatePortfolio(data: Partial<Portfolio>): Portfolio {
  db.portfolio = { ...db.portfolio, ...data };
  return db.portfolio;
}

export function getExperiences(): Experience[] {
  return db.experiences;
}

export function addExperience(experience: Experience): Experience {
  db.experiences.push(experience);
  return experience;
}

export function updateExperience(id: string, data: Partial<Experience>): Experience | null {
  const index = db.experiences.findIndex(e => e.id === id);
  if (index !== -1) {
    db.experiences[index] = { ...db.experiences[index], ...data };
    return db.experiences[index];
  }
  return null;
}

export function deleteExperience(id: string): boolean {
  const index = db.experiences.findIndex(e => e.id === id);
  if (index !== -1) {
    db.experiences.splice(index, 1);
    return true;
  }
  return false;
}

export function getProjects(): Project[] {
  return db.projects;
}

export function addProject(project: Project): Project {
  db.projects.push(project);
  return project;
}

export function updateProject(id: string, data: Partial<Project>): Project | null {
  const index = db.projects.findIndex(p => p.id === id);
  if (index !== -1) {
    db.projects[index] = { ...db.projects[index], ...data };
    return db.projects[index];
  }
  return null;
}

export function deleteProject(id: string): boolean {
  const index = db.projects.findIndex(p => p.id === id);
  if (index !== -1) {
    db.projects.splice(index, 1);
    return true;
  }
  return false;
}

export function getSkills(): Skill[] {
  return db.skills;
}

export function addSkill(skill: Skill): Skill {
  db.skills.push(skill);
  return skill;
}

export function getEducation(): Education[] {
  return db.education;
}

export function addEducation(education: Education): Education {
  db.education.push(education);
  return education;
}

export function getBlogPosts(): BlogPost[] {
  return db.blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return db.blogPosts.find(post => post.slug === slug);
}

export function addBlogPost(post: BlogPost): BlogPost {
  db.blogPosts.push(post);
  return post;
}

export function updateBlogPost(id: string, data: Partial<BlogPost>): BlogPost | null {
  const index = db.blogPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    db.blogPosts[index] = { ...db.blogPosts[index], ...data };
    return db.blogPosts[index];
  }
  return null;
}

export function deleteBlogPost(id: string): boolean {
  const index = db.blogPosts.findIndex(p => p.id === id);
  if (index !== -1) {
    db.blogPosts.splice(index, 1);
    return true;
  }
  return false;
}

export function getCertificates(): Certificate[] {
  return db.certificates;
}

export function addCertificate(certificate: Certificate): Certificate {
  db.certificates.push(certificate);
  return certificate;
}

export function getAchievements(): Achievement[] {
  return db.achievements;
}

export function addAchievement(achievement: Achievement): Achievement {
  db.achievements.push(achievement);
  return achievement;
}

export function getMessages(): ContactMessage[] {
  return db.messages;
}

export function addMessage(message: ContactMessage): ContactMessage {
  db.messages.push(message);
  return message;
}

export function markMessageAsRead(id: string): ContactMessage | null {
  const message = db.messages.find(m => m.id === id);
  if (message) {
    message.isRead = true;
    return message;
  }
  return null;
}
