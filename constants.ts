import { Template, Tutorial, UserRole } from './types';

export const MOCK_USER = {
  id: 'u1',
  email: 'creator@editflow.app',
  displayName: 'Alex Creator',
  role: UserRole.USER,
  verified: true,
  photoUrl: 'https://picsum.photos/100/100'
};

export const DEFAULT_EDITOR_STATE = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sepia: 0,
  overlayText: ''
};

export const FEATURED_TEMPLATES: Template[] = [
  {
    id: 't1',
    title: 'Cyberpunk Glow',
    description: 'Neon blue and pink aesthetics for night shots.',
    thumbnailUrl: 'https://picsum.photos/400/300?random=1',
    authorId: 'u2',
    authorName: 'SarahEdits',
    tags: ['cyberpunk', 'neon', 'night'],
    likes: 1240,
    downloads: 500,
    difficulty: 'Intermediate',
    filters: { brightness: 110, contrast: 120, saturation: 150, sepia: 0, overlayText: '' },
    isPremium: false
  },
  {
    id: 't2',
    title: 'Vintage 90s',
    description: 'Warm, grainy look perfect for memories.',
    thumbnailUrl: 'https://picsum.photos/400/300?random=2',
    authorId: 'u3',
    authorName: 'RetroKing',
    tags: ['vintage', 'warm', 'memory'],
    likes: 890,
    downloads: 320,
    difficulty: 'Beginner',
    filters: { brightness: 90, contrast: 90, saturation: 80, sepia: 40, overlayText: '' },
    isPremium: false
  },
  {
    id: 't3',
    title: 'Cinematic Teal',
    description: 'The classic blockbuster movie look.',
    thumbnailUrl: 'https://picsum.photos/400/300?random=3',
    authorId: 'u4',
    authorName: 'CinemaPro',
    tags: ['cinematic', 'teal', 'movie'],
    likes: 3400,
    downloads: 1200,
    difficulty: 'Advanced',
    filters: { brightness: 100, contrast: 130, saturation: 110, sepia: 10, overlayText: '' },
    isPremium: false
  }
];

export const TUTORIALS: Tutorial[] = [
  {
    id: 'tut1',
    title: 'Getting Started with EditFlow',
    description: 'Learn the basic tools: Crop, Rotate, and Filters.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=10',
    progress: 100,
    duration: '5 min',
    level: 'Basic'
  },
  {
    id: 'tut2',
    title: 'Mastering Color Grading',
    description: 'Understand HSL, curves, and emotional color theory.',
    thumbnailUrl: 'https://picsum.photos/400/200?random=11',
    progress: 30,
    duration: '15 min',
    level: 'Advanced'
  }
];