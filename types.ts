export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  role: UserRole;
  verified: boolean;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  authorId: string;
  authorName: string;
  tags: string[];
  likes: number;
  downloads: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  filters: EditorState; // The preset data
  isPremium: boolean; // Always false for this app
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  progress: number; // 0-100
  duration: string;
  level: 'Basic' | 'Advanced';
}

export interface EditorState {
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  overlayText: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  rating: number;
}