import type {
  HomepageResponse,
  AboutResponse,
  ContactInfoResponse,
  FooterResponse,
  ProjectsResponse,
  PartnersResponse,
  Project,
  Partner,
  ProjectData,
  PartnerData,
  ContactSubmission,
  StrapiResponse,
} from './types';

// ============================================
// КОНФИГУРАЦИЯ
// ============================================

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// ============================================
// БАЗОВЫЙ FETCH
// ============================================

async function fetchStrapi<T>(
  endpoint: string,
  options?: {
    populate?: string | string[];
    revalidate?: number;
  }
): Promise<T> {
  const { populate, revalidate = 0 } = options || {};

  // Строим URL с параметрами populate
  const url = new URL(`${STRAPI_URL}/api${endpoint}`);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((p, i) => url.searchParams.append(`populate[${i}]`, p));
    } else if (populate === '*') {
      url.searchParams.append('populate', '*');
    } else {
      url.searchParams.append('populate', populate);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    // Сетевая ошибка (сервер недоступен)
    if (error instanceof TypeError) {
      throw new Error('Сервер контента недоступен');
    }
    throw error;
  }
}

// ============================================
// NORMALIZERS
// ============================================

function normalizeProject(project: Project): ProjectData {
  return {
    id: project.id,
    slug: project.slug,
    category: project.category,
    title: project.title,
    description: project.description,
    detailedDescription: project.detailedDescription,
    date: project.date,
    client: project.client,
    // Приоритет: media > path (Strapi URL относительный — добавляем базовый URL)
    image: project.image?.url
      ? `${STRAPI_URL}${project.image.url}`
      : project.imagePath,
    logo: project.logo?.url
      ? `${STRAPI_URL}${project.logo.url}`
      : project.logoPath,
    gallery: project.gallery?.map(g => `${STRAPI_URL}${g.url}`) || project.galleryPaths || [],
  };
}

function normalizePartner(partner: Partner): PartnerData {
  return {
    id: partner.id,
    name: partner.name,
    // Strapi media URL относительный — добавляем базовый URL
    logo: partner.logo?.url
      ? `${STRAPI_URL}${partner.logo.url}`
      : partner.logoPath,
    url: partner.url,
  };
}

// ============================================
// API FUNCTIONS
// ============================================

// Homepage
export async function getHomepage() {
  const response = await fetchStrapi<HomepageResponse>('/homepage');
  return response.data;
}

// About
export async function getAbout() {
  const response = await fetchStrapi<AboutResponse>('/about', {
    populate: ['statistics'],
  });
  return response.data;
}

// Contact Info
export async function getContactInfo() {
  const response = await fetchStrapi<ContactInfoResponse>('/contact-info', {
    populate: ['socialLinks', 'serviceOptions'],
  });
  return response.data;
}

// Footer
export async function getFooter() {
  const response = await fetchStrapi<FooterResponse>('/footer', {
    populate: 'linkGroups.links',
  });
  return response.data;
}

// Projects
export async function getProjects(): Promise<ProjectData[]> {
  const response = await fetchStrapi<ProjectsResponse>(
    '/projects?sort=order:asc',
    { populate: '*' }
  );
  return response.data?.map(normalizeProject) ?? [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: '*',
  });

  const response = await fetchStrapi<ProjectsResponse>(`/projects?${params}`);

  if (!response.data?.length) {
    return null;
  }

  return normalizeProject(response.data[0]);
}

// Partners
export async function getPartners(): Promise<PartnerData[]> {
  const response = await fetchStrapi<PartnersResponse>(
    '/partners?sort=order:asc',
    { populate: '*' }
  );
  return response.data?.map(normalizePartner) ?? [];
}

// ============================================
// CONTACT FORM SUBMISSION
// ============================================

export interface ContactFormData {
  email: string;
  services: string[];
  message?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<StrapiResponse<ContactSubmission>> {
  const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error?.message || 'Failed to submit contact form');
  }

  return res.json();
}
