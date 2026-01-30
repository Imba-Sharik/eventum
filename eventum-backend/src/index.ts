import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Проверяем, есть ли уже данные
    const existingProjects = await strapi.documents('api::project.project').findMany();

    if (existingProjects.length > 0) {
      console.log('📦 Data already exists, skipping bootstrap seed');
      return;
    }

    console.log('🌱 Seeding initial data...');

    // ============================================
    // HOMEPAGE (Hero Section)
    // ============================================
    await strapi.documents('api::homepage.homepage').create({
      data: {
        heroTitle: 'Eventum',
        heroSubtitle: 'Создаем события, которые запоминаются',
        heroDescription: 'Профессиональная организация мероприятий любого масштаба',
        heroButtonText: 'Обсудить проект',
        seoTitle: 'Eventum - Ивент агентство премиум-класса',
        seoDescription: 'Организация мероприятий премиум-класса: корпоративы, концерты, конференции, фестивали. Полный цикл event-продакшна.',
      },
      status: 'published',
    });
    console.log('✅ Homepage created');

    // ============================================
    // ABOUT
    // ============================================
    await strapi.documents('api::about.about').create({
      data: {
        title: 'Мы создаём события, которые работают',
        description: 'Ивент-продакшн полного цикла. Объединяем креатив, технологии и операционную работу, чтобы превращать сложные идеи в выверенные живые события.',
        statistics: [
          { value: 1200, prefix: '+', suffix: '', label: 'Проведенных мероприятий' },
          { value: 22, prefix: '', suffix: 'Million', label: 'Пользователей' },
          { value: 500, prefix: '+', suffix: '', label: 'Партнёрских артистов' },
        ],
      },
      status: 'published',
    });
    console.log('✅ About created');

    // ============================================
    // CONTACT INFO
    // ============================================
    await strapi.documents('api::contact-info.contact-info').create({
      data: {
        email: 'info@eventum.com',
        phone: '+7 (495) 123-45-67',
        address: 'Москва, Автозаводская, улица Ленинская Слобода, 19',
        latitude: 55.708583,
        longitude: 37.653291,
        socialLinks: [
          { platform: 'vk', url: 'https://vk.com/eventum' },
          { platform: 'telegram', url: 'https://t.me/eventum' },
          { platform: 'instagram', url: 'https://instagram.com/eventum' },
        ],
        serviceOptions: [
          { serviceId: 'venue', label: 'Помещение' },
          { serviceId: 'artists', label: 'Артисты' },
          { serviceId: 'equipment', label: 'Оборудование' },
          { serviceId: 'catering', label: 'Кейтеринг' },
          { serviceId: 'full', label: 'Полная организация' },
        ],
      },
      status: 'published',
    });
    console.log('✅ Contact Info created');

    // ============================================
    // FOOTER
    // ============================================
    await strapi.documents('api::footer.footer').create({
      data: {
        copyright: '© Eventum',
        linkGroups: [
          {
            title: 'Услуги',
            links: [
              { label: 'Корпоративные мероприятия', url: '/under-development' },
              { label: 'Концерты и шоу', url: '/under-development' },
              { label: 'Конференции', url: '/under-development' },
              { label: 'Выставки', url: '/under-development' },
              { label: 'Частные мероприятия', url: '/under-development' },
            ],
          },
          {
            title: 'Проекты',
            links: [
              { label: 'Все проекты', url: '/under-development' },
              { label: 'Портфолио', url: '/under-development' },
              { label: 'Кейсы', url: '/under-development' },
            ],
          },
          {
            title: 'Компания',
            links: [
              { label: 'О нас', url: '/under-development' },
              { label: 'Команда', url: '/under-development' },
              { label: 'Партнеры', url: '/under-development' },
              { label: 'Карьера', url: '/under-development' },
              { label: 'Блог', url: '/under-development' },
            ],
          },
          {
            title: 'Контакты',
            links: [
              { label: 'Связаться с нами', url: '/under-development' },
              { label: 'Консультация', url: '/under-development' },
              { label: 'Политика конфиденциальности', url: '/under-development' },
              { label: 'Условия использования', url: '/under-development' },
            ],
          },
        ],
      },
      status: 'published',
    });
    console.log('✅ Footer created');

    // ============================================
    // PROJECTS
    // ============================================
    const projectsData = [
      {
        title: 'Red Bull X-Fighters на Красной Площади',
        slug: 'redbull-x-fighters',
        category: 'Спортивное мероприятие',
        description: 'Уникальное шоу фристайл-мотокросса на главной площади страны напротив Кремля с участием лучших райдеров мира',
        detailedDescription: 'Организация беспрецедентного спортивного шоу Red Bull X-Fighters на Красной Площади в Москве. Первое в истории мероприятие экстремального спорта такого масштаба в самом сердце столицы напротив Кремля. Построили уникальную трассу с трамплинами высотой до 20 метров, оборудованную специальными системами безопасности. В соревнованиях приняли участие 12 лучших райдеров планеты по фристайл-мотокроссу. Полная координация с городскими властями, службами безопасности, организация трибун на 15 000 зрителей. Техническое оснащение включало профессиональную звуковую систему, гигантские LED-экраны для трансляций, специальное освещение для вечернего шоу. Мероприятие освещали 100+ СМИ из 30 стран мира.',
        imagePath: '/projects/redbull.avif',
        logoPath: '/projects/logo/redbull-logo.svg',
        galleryPaths: [
          '/projects/gallery/redbull-images/x-fighters-kremlin.avif',
          '/projects/gallery/redbull-images/redbull-xfighters-promo.jpg',
          '/projects/gallery/redbull-images/redbull-xfighters-action-1.jpg',
          '/projects/gallery/redbull-images/redbull-xfighters-action-2.jpg',
        ],
        date: '2024',
        client: 'Red Bull',
        order: 1,
      },
      {
        title: 'VK Fest 2025',
        slug: 'vk-fest-2025',
        category: 'Музыкальный фестиваль',
        description: 'Крупнейший российский музыкальный фестиваль с участием топовых артистов страны и мировых звезд',
        detailedDescription: 'Организация масштабного музыкального фестиваля VK Fest 2025 — одного из крупнейших музыкальных событий России. Двухдневное мероприятие с участием более 100 артистов на 5 сценах различных музыкальных направлений: от поп-музыки и рока до электроники и хип-хопа. Построили главную сцену площадью 800 кв.м с LED-экранами 200 кв.м, три тематические сцены, электронную сцену и камерную площадку для акустических выступлений. Организовали интерактивные зоны с VR-аттракционами, фуд-корт на 50+ точек питания, зоны отдыха и развлечений. Обеспечили полное техническое оснащение мирового уровня: звуковые системы L-Acoustics, световое шоу, спецэффекты. Посещаемость составила более 200 000 человек за два дня.',
        imagePath: '/projects/vk.jpg',
        logoPath: '/projects/logo/vk-logo.svg',
        galleryPaths: [
          '/projects/gallery/vkfest-images/vkfest-main.jpg',
          '/projects/gallery/vkfest-images/vkfest-crowd.jpg',
          '/projects/gallery/vkfest-images/vkfest-stage.webp',
          '/projects/gallery/vkfest-images/vkfest-night.jpeg',
          '/projects/gallery/vkfest-images/vkfest-scene.jpg',
        ],
        date: '2025',
        client: 'VK',
        order: 2,
      },
      {
        title: 'Mercedes-Benz FashionWeek Russia',
        slug: 'mercedes-benz-fashionweek-russia',
        category: 'Fashion-показ',
        description: 'Престижная неделя моды при поддержке Mercedes-Benz с участием ведущих российских и международных дизайнеров',
        detailedDescription: 'Организация престижной недели моды Mercedes-Benz FashionWeek Russia. 5 дней показов, 30+ коллекций от топовых российских и международных дизайнеров. Создали премиум атмосферу бренда Mercedes-Benz через световой дизайн, проекционные инсталляции и фирменные элементы автопроизводителя. Построили главный подиум 40х20м с интеграцией новых моделей Mercedes в показы. Организовали VIP-зоны, закрытые презентации, afterparty в стиле бренда. Полное медиа-сопровождение с онлайн-трансляциями для 50+ стран. Мероприятие посетило более 10 000 гостей, включая звезд, блогеров и представителей fashion-индустрии.',
        imagePath: '/projects/mercedes.jpg',
        logoPath: '/projects/logo/Mercedes-Benz-logo.svg',
        galleryPaths: [
          '/projects/gallery/mercedes-images/mercedes-model.jpg',
          '/projects/gallery/mercedes-images/mercedes-fashion-logo.png',
          '/projects/gallery/mercedes-images/mercedes-runway.jpg',
          '/projects/gallery/mercedes-images/mercedes-show.jpeg',
          '/projects/gallery/mercedes-images/mercedes-event.jpg',
          '/projects/gallery/mercedes-images/mercedes-guests.jpg',
        ],
        date: '2023',
        client: 'Mercedes-Benz Russia',
        order: 3,
      },
      {
        title: 'YaC 2025 AI Edition',
        slug: 'yac-2025-ai-edition',
        category: 'Tech-конференция',
        description: 'Крупнейшая технологическая конференция Яндекса, посвященная искусственному интеллекту и его применению в продуктах',
        detailedDescription: 'Организация масштабной технологической конференции YaC 2025 AI Edition — ежегодного флагманского мероприятия Яндекса для разработчиков, инженеров и специалистов в области искусственного интеллекта. Специальное издание конференции посвящено передовым технологиям ИИ, машинному обучению и нейросетям. Мероприятие включало главную сцену с докладами топ-менеджеров и ведущих специалистов Яндекса, 8 параллельных технических секций, workshop-зоны для практических занятий, demo-зону новых AI-продуктов. Организовали современное пространство для 5000+ участников.',
        imagePath: '/projects/yandex.jpg',
        logoPath: '/projects/logo/yandex-logo.svg',
        galleryPaths: [
          '/projects/gallery/yandex-images/yandex-venue.jpeg',
          '/projects/gallery/yandex-images/yandex-conference.jpeg',
          '/projects/gallery/yandex-images/yandex-stage.webp',
        ],
        date: '2025',
        client: 'Яндекс',
        order: 4,
      },
      {
        title: 'ВЭФ 2025',
        slug: 'vef-2025',
        category: 'Экономический форум',
        description: 'Восточный экономический форум — крупнейшая международная площадка для диалога между представителями бизнеса и власти',
        detailedDescription: 'Организация Восточного экономического форума 2025 во Владивостоке — ключевого международного мероприятия для обсуждения вопросов развития экономики Дальнего Востока и расширения международного сотрудничества в Азиатско-Тихоокеанском регионе. Форум объединил более 7000 участников из 60 стран мира, включая глав государств, премьер-министров, представителей крупнейших компаний и инвесторов. Организовали работу 3 основных площадок: пленарные заседания в главном зале на 3000 человек, 70+ деловых сессий и круглых столов, выставочную зону с презентациями инвестиционных проектов.',
        imagePath: '/projects/forum.jpg',
        logoPath: '/projects/logo/forum-logo.jpeg',
        galleryPaths: [
          '/projects/gallery/forum-images/forum-hall.png',
          '/projects/gallery/forum-images/forum-audience.jpg',
          '/projects/gallery/forum-images/forum-panel.jpg',
          '/projects/gallery/forum-images/forum-speakers.jpg',
          '/projects/gallery/forum-images/forum-results.webp',
        ],
        date: '2025',
        client: 'Фонд Росконгресс',
        order: 5,
      },
      {
        title: 'Летний балетный интенсив RMB 2025',
        slug: 'rmb-ballet-intensive-2025',
        category: 'Образовательное мероприятие',
        description: 'Международная образовательная программа от Russian Masters Ballet для профессионального развития танцовщиков',
        detailedDescription: 'Организация летнего балетного интенсива Russian Masters Ballet 2025 — престижной международной образовательной программы для профессиональных танцовщиков и студентов балетных школ. Двухнедельный интенсив объединил более 150 участников из 25 стран мира для совершенствования техники классического и современного балета. Программа включала мастер-классы от звезд мировых балетных театров, ежедневные тренировки по классическому танцу, репетиции вариаций из классического репертуара.',
        imagePath: '/projects/ballet.jpg',
        logoPath: '/projects/logo/rmb-logo.svg',
        galleryPaths: [
          '/projects/gallery/ballet-images/ballet-performance-1.webp',
          '/projects/gallery/ballet-images/ballet-dancers-1.jpg',
          '/projects/gallery/ballet-images/ballet-dancers-2.jpg',
          '/projects/gallery/ballet-images/ballet-stage.jpeg',
        ],
        date: '2025',
        client: 'Russian Masters Ballet',
        order: 6,
      },
    ];

    for (const project of projectsData) {
      await strapi.documents('api::project.project').create({
        data: project,
        status: 'published',
      });
    }
    console.log('✅ Projects created (6)');

    // ============================================
    // PARTNERS (из клиентов проектов)
    // ============================================
    const partnersData = [
      { name: 'Red Bull', logoPath: '/projects/logo/redbull-logo.svg', order: 1 },
      { name: 'VK', logoPath: '/projects/logo/vk-logo.svg', order: 2 },
      { name: 'Mercedes-Benz', logoPath: '/projects/logo/Mercedes-Benz-logo.svg', order: 3 },
      { name: 'Яндекс', logoPath: '/projects/logo/yandex-logo.svg', order: 4 },
      { name: 'Фонд Росконгресс', logoPath: '/projects/logo/forum-logo.jpeg', order: 5 },
      { name: 'Russian Masters Ballet', logoPath: '/projects/logo/rmb-logo.svg', order: 6 },
    ];

    for (const partner of partnersData) {
      await strapi.documents('api::partner.partner').create({
        data: partner,
        status: 'published',
      });
    }
    console.log('✅ Partners created (6)');

    // ============================================
    // PUBLIC API PERMISSIONS
    // ============================================
    console.log('🔐 Setting up public API permissions...');

    // Получаем Public роль
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      // Permissions для чтения (find, findOne)
      const readPermissions = [
        { action: 'api::homepage.homepage.find' },
        { action: 'api::about.about.find' },
        { action: 'api::contact-info.contact-info.find' },
        { action: 'api::footer.footer.find' },
        { action: 'api::project.project.find' },
        { action: 'api::project.project.findOne' },
        { action: 'api::partner.partner.find' },
        { action: 'api::partner.partner.findOne' },
      ];

      // Permission для создания заявок
      const createPermissions = [
        { action: 'api::contact-submission.contact-submission.create' },
      ];

      const allPermissions = [...readPermissions, ...createPermissions];

      for (const permission of allPermissions) {
        // Проверяем, существует ли уже такой permission
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action: permission.action,
              role: publicRole.id,
            },
          });

        if (!existingPermission) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: permission.action,
              role: publicRole.id,
            },
          });
        }
      }

      console.log('✅ Public API permissions configured');
    }

    console.log('🎉 Bootstrap seed completed!');
  },
};
