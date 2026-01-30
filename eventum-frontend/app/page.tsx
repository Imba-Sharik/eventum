import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Partners from "@/components/sections/Partners";
import Contacts from "@/components/sections/Contacts";
import {
  getHomepage,
  getAbout,
  getProjects,
  getPartners,
  getContactInfo,
} from "@/lib/strapi";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eventum",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://eventum.ru",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://eventum.ru"}/logo.svg`,
  description:
    "Организация мероприятий премиум-класса: корпоративы, конференции, фестивали, презентации",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Russian", "English"],
  },
};

export default async function Home() {
  // Параллельная загрузка всех данных
  const [homepage, about, projects, partners, contactInfo] = await Promise.all([
    getHomepage(),
    getAbout(),
    getProjects(),
    getPartners(),
    getContactInfo(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero data={homepage} />
      <About data={about} />
      <Projects projects={projects} />
      <Partners partners={partners} />
      <Contacts data={contactInfo} />
    </>
  );
}
