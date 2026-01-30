import Link from 'next/link'

const defaultLinks = [
    {
        group: 'Услуги',
        items: [
            {
                title: 'Корпоративные мероприятия',
                href: '/under-development',
            },
            {
                title: 'Концерты и шоу',
                href: '/under-development',
            },
            {
                title: 'Конференции',
                href: '/under-development',
            },
            {
                title: 'Выставки',
                href: '/under-development',
            },
            {
                title: 'Частные мероприятия',
                href: '/under-development',
            },
        ],
    },
    {
        group: 'Проекты',
        items: [
            {
                title: 'Все проекты',
                href: '/under-development',
            },
            {
                title: 'Портфолио',
                href: '/under-development',
            },
            {
                title: 'Кейсы',
                href: '/under-development',
            },
        ],
    },
    {
        group: 'Компания',
        items: [
            {
                title: 'О нас',
                href: '/under-development',
            },
            {
                title: 'Команда',
                href: '/under-development',
            },
            {
                title: 'Партнеры',
                href: '/under-development',
            },
            {
                title: 'Карьера',
                href: '/under-development',
            },
            {
                title: 'Блог',
                href: '/under-development',
            },
        ],
    },
    {
        group: 'Контакты',
        items: [
            {
                title: 'Связаться с нами',
                href: '/under-development',
            },
            {
                title: 'Консультация',
                href: '/under-development',
            },
            {
                title: 'Политика конфиденциальности',
                href: '/under-development',
            },
            {
                title: 'Условия использования',
                href: '/under-development',
            },
        ],
    },
]

interface FooterSectionProps {
    companyName?: string
    description?: string
    links?: Array<{
        group: string
        items: Array<{
            title: string
            href: string
        }>
    }>
}

export default function FooterSection({
    companyName = 'Eventum',
    description,
    links = defaultLinks,
}: FooterSectionProps = {}) {
    return (
        <footer className="relative pt-8 md:pt-12 pb-4 md:pb-12 bg-white">
            <div className="container mx-auto px-4 max-w-7xl border-t border-gray-200 pt-8 md:pt-12">
                <div className="grid gap-12 md:grid-cols-5">
                    <div className="order-2 md:order-1 md:col-span-2 flex flex-col justify-between">
                        <div>
                            <span className="text-3xl font-bold text-black font-bebas tracking-wider">
                                EVENTUM
                            </span>
                            {description && (
                                <p className="text-muted-foreground mt-4 text-sm max-w-xs">
                                    {description}
                                </p>
                            )}
                        </div>
                        <span className="text-muted-foreground text-sm mt-8 md:mt-0">
                            © {new Date().getFullYear()} {companyName}. Все права защищены
                        </span>
                    </div>

                    <div className="order-1 md:order-2 grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="space-y-4 text-sm">
                                <span className="block font-medium">{link.group}</span>
                                {link.items.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="text-muted-foreground hover:text-primary block duration-150">
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
