// ============================================
// БАЗОВЫЕ ТИПЫ STRAPI
// ============================================

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export type StrapiItem<T> = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
} & T;

// ============================================
// КОМПОНЕНТЫ
// ============================================

export interface Statistic {
  id: number;
  value: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

export interface ServiceOption {
  id: number;
  serviceId: string;
  label: string;
}

export interface Link {
  id: number;
  label: string;
  url: string;
}

export interface LinkGroup {
  id: number;
  title: string;
  links: Link[];
}

// ============================================
// ТИПЫ КОНТЕНТА
// ============================================

// Главная страница
export interface HomepageAttributes {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  seoTitle: string;
  seoDescription: string;
}

export type Homepage = StrapiItem<HomepageAttributes>;

// О компании
export interface AboutAttributes {
  title: string;
  description: string;
  statistics: Statistic[];
}

export type About = StrapiItem<AboutAttributes>;

// Контактная информация
export interface ContactInfoAttributes {
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  socialLinks: SocialLink[];
  serviceOptions: ServiceOption[];
}

export type ContactInfo = StrapiItem<ContactInfoAttributes>;

// Футер
export interface FooterAttributes {
  copyright: string;
  linkGroups: LinkGroup[];
}

export type Footer = StrapiItem<FooterAttributes>;

// Проект
export interface ProjectAttributes {
  title: string;
  slug: string;
  category: string;
  description: string;
  detailedDescription: string;
  client: string;
  date: string;
  order: number;
  // Пути к изображениям (для bootstrap данных)
  imagePath: string;
  logoPath: string;
  galleryPaths: string[];
  // Медиа поля (для загрузки через админку)
  image?: StrapiMedia;
  logo?: StrapiMedia;
  gallery?: StrapiMedia[];
}

export type Project = StrapiItem<ProjectAttributes>;

// Партнёр
export interface PartnerAttributes {
  name: string;
  logoPath: string;
  url?: string;
  order: number;
  logo?: StrapiMedia;
}

export type Partner = StrapiItem<PartnerAttributes>;

// Заявка из формы
export interface ContactSubmissionAttributes {
  email: string;
  services: string[];
  message?: string;
  status: 'new' | 'processed' | 'archived';
}

export type ContactSubmission = StrapiItem<ContactSubmissionAttributes>;

// ============================================
// МЕДИА
// ============================================

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  url: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// ============================================
// ТИПЫ ОТВЕТОВ API
// ============================================

export type HomepageResponse = StrapiResponse<Homepage>;
export type AboutResponse = StrapiResponse<About>;
export type ContactInfoResponse = StrapiResponse<ContactInfo>;
export type FooterResponse = StrapiResponse<Footer>;
export type ProjectResponse = StrapiResponse<Project>;
export type ProjectsResponse = StrapiResponse<Project[]>;
export type PartnerResponse = StrapiResponse<Partner>;
export type PartnersResponse = StrapiResponse<Partner[]>;

// ============================================
// НОРМАЛИЗОВАННЫЕ ТИПЫ ДЛЯ ФРОНТЕНДА
// ============================================

// Нормализованный проект для компонентов
export interface ProjectData {
  id: number;
  slug: string;
  category: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  logo: string;
  gallery: string[];
  date: string;
  client: string;
}

// Нормализованный партнёр для компонентов
export interface PartnerData {
  id: number;
  name: string;
  logo: string;
  url?: string;
}
