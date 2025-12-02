import { LucideIcon, Code, Palette, Microscope, Heart, Rocket, Award, Users, BookOpen, Newspaper } from 'lucide-react';

// --- Types ---

export enum UserRole {
  STUDENT = 'Студент',
  MENTOR = 'Ментор',
  ADMIN = 'Админ'
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  faculty?: string;
  graduationYear?: number;
  skills: string[];
  interests: string[];
  bio?: string;
  status: 'active' | 'open_to_work' | 'busy';
  badges: Badge[];
  points: number;
  completedCourses: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    behance?: string;
    telegram?: string;
  };
  skillStats: { subject: string; A: number; fullMark: number }[]; // For Radar Chart
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'IT' | 'Дизайн' | 'Наука' | 'Социальное' | 'Медиа';
  status: 'Идея' | 'В работе' | 'Завершен';
  authorId: string;
  authorName: string;
  tags: string[];
  likes: number;
  image: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorName: string;
  text: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  type: 'Хакатон' | 'Воркшоп' | 'Митап' | 'Лекция';
  description: string;
  participants: number;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'Новичок' | 'Средний' | 'Продвинутый';
  duration: string;
  tags: string[];
  image: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  author: string;
  date: string;
  image: string;
}

// --- Mock Data ---

export const BADGES: Badge[] = [
  { id: 'b1', name: 'Первый Шаг', icon: '🚀', description: 'Создал первый проект' },
  { id: 'b2', name: 'Командный Игрок', icon: '🤝', description: 'Вступил в команду' },
  { id: 'b3', name: 'Герой Хакатона', icon: '🏆', description: 'Победил в хакатоне' },
  { id: 'b4', name: 'Душа Компании', icon: '🦋', description: 'Активен в сообществе' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'EcoCampus App',
    description: 'Мобильное приложение для отслеживания и сокращения отходов на территории университета.',
    category: 'IT',
    status: 'В работе',
    authorId: 'u2',
    authorName: 'Алексей Чен',
    tags: ['React Native', 'Экология', 'Mobile'],
    likes: 24,
    image: 'https://picsum.photos/400/300?random=1',
    comments: [
      { id: 'c1', authorName: 'Мария И.', text: 'Отличная инициатива!', date: '2023-10-12' }
    ]
  },
  {
    id: 'p2',
    title: 'Инсталляция "Свет Знаний"',
    description: 'Интерактивная световая скульптура для главного холла.',
    category: 'Дизайн',
    status: 'Завершен',
    authorId: 'u3',
    authorName: 'Мария Родригес',
    tags: ['Арт', 'Arduino', 'Свет'],
    likes: 56,
    image: 'https://picsum.photos/400/300?random=2',
    comments: []
  },
  {
    id: 'p3',
    title: 'AI Study Buddy',
    description: 'Использование LLM для помощи студентам в конспектировании лекций.',
    category: 'Наука',
    status: 'Идея',
    authorId: 'u4',
    authorName: 'Джеймс Смит',
    tags: ['AI', 'Python', 'Образование'],
    likes: 12,
    image: 'https://picsum.photos/400/300?random=3',
    comments: []
  }
];

export const EVENTS: Event[] = [
  { id: 'e1', title: 'Global Game Jam', date: '2023-11-15', type: 'Хакатон', description: '48 часов на создание игры.', participants: 120, image: 'https://picsum.photos/400/200?random=10' },
  { id: 'e2', title: 'Основы UX/UI', date: '2023-11-20', type: 'Воркшоп', description: 'Изучаем основы Figma.', participants: 45, image: 'https://picsum.photos/400/200?random=11' },
  { id: 'e3', title: 'Вечер Питчинга Стартапов', date: '2023-12-05', type: 'Митап', description: 'Представь свою идею инвесторам.', participants: 80, image: 'https://picsum.photos/400/200?random=12' },
];

export const COURSES: Course[] = [
  { id: 'c1', title: 'Введение в Дизайн-мышление', level: 'Новичок', duration: '2 часа', tags: ['Дизайн', 'Soft Skills'], image: 'https://picsum.photos/300/200?random=20' },
  { id: 'c2', title: 'React для Начинающих', level: 'Средний', duration: '5 часов', tags: ['IT', 'Dev'], image: 'https://picsum.photos/300/200?random=21' },
  { id: 'c3', title: 'Ораторское Искусство', level: 'Новичок', duration: '1 час', tags: ['Soft Skills', 'Лидерство'], image: 'https://picsum.photos/300/200?random=22' },
];

export const NEWS: Article[] = [
  { id: 'n1', title: 'Университет выиграл грант на инновации', category: 'Новости', summary: 'Наш кампус-инкубатор был отмечен на национальном уровне.', author: 'Админ', date: '1 нояб 2023', image: 'https://picsum.photos/300/200?random=30' },
  { id: 'n2', title: 'Интервью: Сара Джонс', category: 'Интервью', summary: 'Как Сара запустила стартап прямо из общежития.', author: 'Медиа Команда', date: '28 окт 2023', image: 'https://picsum.photos/300/200?random=31' },
];

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'IT': Code,
  'Дизайн': Palette,
  'Наука': Microscope,
  'Социальное': Heart,
  'Медиа': Newspaper,
};