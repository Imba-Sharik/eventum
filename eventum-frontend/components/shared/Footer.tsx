import FooterSection from '@/components/ui/footer'
import type { Footer as FooterData } from '@/lib/types'

interface FooterProps {
  data?: FooterData
}

export default function Footer({ data }: FooterProps) {
  // Трансформируем данные из Strapi в формат FooterSection
  const links = data?.linkGroups?.map((group) => ({
    group: group.title,
    items: group.links?.map((link) => ({
      title: link.label,
      href: link.url,
    })) ?? [],
  }))

  return <FooterSection links={links} />
}