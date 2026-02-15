import useSWR from 'swr';
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
} from '@/lib/types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePortfolio() {
  const { data, error, isLoading } = useSWR<Portfolio>('/api/portfolio', fetcher);
  return { data, error, isLoading };
}

export function useExperiences() {
  const { data, error, isLoading } = useSWR<Experience[]>('/api/experiences', fetcher);
  return { data, error, isLoading };
}

export function useProjects() {
  const { data, error, isLoading } = useSWR<Project[]>('/api/projects', fetcher);
  return { data, error, isLoading };
}

export function useSkills() {
  const { data, error, isLoading } = useSWR<Skill[]>('/api/skills', fetcher);
  return { data, error, isLoading };
}

export function useBlogPosts() {
  const { data, error, isLoading } = useSWR<BlogPost[]>('/api/blog', fetcher);
  return { data, error, isLoading };
}

export function useMessages() {
  const { data, error, isLoading } = useSWR<ContactMessage[]>('/api/messages', fetcher);
  return { data, error, isLoading };
}
