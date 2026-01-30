import LogoCloud from "@/components/ui/logo-cloud";
import type { PartnerData } from "@/lib/types";

interface PartnersProps {
  partners: PartnerData[];
}

export default function Partners({ partners }: PartnersProps) {
  const partnerLogos = partners
    .filter((partner) => partner.logo)
    .map((partner) => ({
      src: partner.logo,
      alt: `${partner.name} logo`,
    }));

  return <LogoCloud id="partners" logos={partnerLogos} title="Мы работаем с ведущими брендами и организациями" />;
}
