# Eventum Backend - Структура Strapi 5

## Обзор

Backend построен на **Strapi 5.33.4** с SQLite базой данных. Все данные автоматически заполняются при первом запуске через bootstrap функцию.

---

## Content Types

### Single Types (Единичные типы)

Используются для уникальных страниц/секций, которые существуют в единственном экземпляре.

| Тип | API ID | Описание |
|-----|--------|----------|
| **Homepage** | `api::homepage.homepage` | Главный экран (Hero секция) |
| **About** | `api::about.about` | Секция "О компании" со статистикой |
| **Contact Info** | `api::contact-info.contact-info` | Контактная информация, соц.сети, опции формы |
| **Footer** | `api::footer.footer` | Футер с группами ссылок |

### Collection Types (Коллекции)

Используются для множественных записей одного типа.

| Тип | API ID | Описание |
|-----|--------|----------|
| **Project** | `api::project.project` | Проекты/кейсы компании |
| **Partner** | `api::partner.partner` | Партнёры и клиенты |
| **Contact Submission** | `api::contact-submission.contact-submission` | Заявки из контактной формы |

---

## Детальная структура полей

### Homepage

```
heroTitle: string (required)      - Заголовок "Eventum"
heroSubtitle: string              - Подзаголовок
heroDescription: text             - Описание
heroButtonText: string            - Текст кнопки CTA
seoTitle: string                  - SEO заголовок
seoDescription: text              - SEO описание
```

### About

```
title: string (required)          - Заголовок секции
description: text                 - Описание компании
statistics: component[]           - Массив статистики (repeatable)
  └── shared.statistic:
      ├── value: integer          - Числовое значение (1200)
      ├── prefix: string          - Префикс (+)
      ├── suffix: string          - Суффикс (Million)
      └── label: string           - Подпись
```

### Contact Info

```
email: email (required)           - Email компании
phone: string                     - Телефон
address: text                     - Адрес
latitude: float                   - Широта для карты
longitude: float                  - Долгота для карты
socialLinks: component[]          - Соц.сети (repeatable)
  └── shared.social-link:
      ├── platform: string        - vk, telegram, instagram
      └── url: string             - URL профиля
serviceOptions: component[]       - Опции формы (repeatable)
  └── shared.service-option:
      ├── serviceId: string       - ID услуги (venue, artists, etc.)
      └── label: string           - Отображаемое название
```

### Footer

```
copyright: string                 - Копирайт текст
linkGroups: component[]           - Группы ссылок (repeatable)
  └── shared.link-group:
      ├── title: string           - Название группы
      └── links: component[]      - Ссылки в группе
          └── shared.link:
              ├── label: string   - Текст ссылки
              └── url: string     - URL
```

### Project

```
title: string (required)          - Название проекта
slug: string (unique, required)   - URL-slug
category: string                  - Категория
description: text                 - Краткое описание
detailedDescription: richtext     - Полное описание (для страницы проекта)
client: string                    - Название клиента
date: string                      - Год/дата
color: string                     - CSS градиент (from-red-600 to-indigo-700)
order: integer                    - Порядок сортировки

# Изображения (гибридный подход)
image: media                      - Медиа файл (опционально, для админки)
imagePath: string                 - Путь к изображению (/projects/redbull.avif)
logo: media                       - Логотип клиента (опционально)
logoPath: string                  - Путь к логотипу
gallery: media[]                  - Галерея (опционально)
galleryPaths: json                - JSON массив путей к изображениям
```

### Partner

```
name: string (required)           - Название партнёра
logo: media                       - Логотип (опционально)
logoPath: string                  - Путь к логотипу
url: string                       - Сайт партнёра
order: integer                    - Порядок сортировки
```

### Contact Submission

```
email: email (required)           - Email отправителя
services: json                    - Выбранные услуги (массив)
message: text                     - Сообщение
status: enum                      - new, processed, archived
```

---

## Components (Компоненты)

Расположены в `src/components/shared/`:

| Компонент | Файл | Использование |
|-----------|------|---------------|
| Statistic | `statistic.json` | About.statistics |
| Social Link | `social-link.json` | ContactInfo.socialLinks |
| Service Option | `service-option.json` | ContactInfo.serviceOptions |
| Link | `link.json` | Footer.linkGroups.links |
| Link Group | `link-group.json` | Footer.linkGroups |

---

## Bootstrap (Начальные данные)

Файл: `src/index.ts`

При первом запуске автоматически создаются:
- 1 Homepage
- 1 About (с 3 статистиками)
- 1 Contact Info (с 3 соц.сетями и 5 опциями услуг)
- 1 Footer (с 4 группами ссылок)
- 6 Projects (реальные кейсы)
- 6 Partners (клиенты из проектов)

**Важно:** Все данные создаются со статусом `published` (не draft).

### Проверка существующих данных

```typescript
const existingProjects = await strapi.documents('api::project.project').findMany();
if (existingProjects.length > 0) {
  console.log('Data already exists, skipping bootstrap seed');
  return;
}
```

### Публикация данных (Strapi 5)

```typescript
await strapi.documents('api::homepage.homepage').create({
  data: { ... },
  status: 'published',  // НЕ publishedAt: new Date()
});
```

---

## Работа с изображениями

### Гибридный подход

Для изображений используется двойная система:

1. **Path-поля** (`imagePath`, `logoPath`, `galleryPaths`) - строки с путями к файлам в `public/` на фронтенде. Используются для bootstrap данных.

2. **Media-поля** (`image`, `logo`, `gallery`) - стандартные Strapi media поля для загрузки через админку.

### Логика на фронтенде

```typescript
// Приоритет: media > path
const imageUrl = project.image?.url || project.imagePath;
```

### Структура путей

```
/projects/
├── redbull.avif
├── vk.jpg
├── mercedes.jpg
├── ...
├── logo/
│   ├── redbull-logo.svg
│   ├── vk-logo.svg
│   └── ...
└── gallery/
    ├── redbull-images/
    ├── vkfest-images/
    └── ...
```

---

## API Endpoints

После настройки прав доступа в Settings > Users & Permissions:

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/homepage` | Данные главной страницы |
| GET | `/api/about` | Секция "О компании" |
| GET | `/api/contact-info` | Контактная информация |
| GET | `/api/footer` | Данные футера |
| GET | `/api/projects` | Список проектов |
| GET | `/api/projects/:id` | Конкретный проект |
| GET | `/api/partners` | Список партнёров |
| POST | `/api/contact-submissions` | Отправка заявки |

### Populate для вложенных данных

```
GET /api/about?populate=statistics
GET /api/contact-info?populate[0]=socialLinks&populate[1]=serviceOptions
GET /api/footer?populate[linkGroups][populate]=links
GET /api/projects?populate=*
```

---

## Запуск

```bash
cd eventum-backend
npm install
npm run develop
```

Админка: http://localhost:1337/admin

### Сброс данных

```powershell
Remove-Item -Recurse -Force .tmp -ErrorAction SilentlyContinue
Remove-Item -Force .\data\data.db -ErrorAction SilentlyContinue
npm run develop
```

---

## Права доступа (Public API)

**Автоматически настраиваются при bootstrap!**

При первом запуске автоматически выдаются права для Public роли:

| Content Type | find | findOne | create |
|--------------|------|---------|--------|
| Homepage | ✅ | - | - |
| About | ✅ | - | - |
| Contact Info | ✅ | - | - |
| Footer | ✅ | - | - |
| Project | ✅ | ✅ | - |
| Partner | ✅ | ✅ | - |
| Contact Submission | - | - | ✅ |

Ручная настройка не требуется. При необходимости можно изменить в админке:
Settings > Users & Permissions > Roles > Public

---

## Known Issues (Известные проблемы)

### Windows: ошибка при загрузке медиа

При загрузке изображений через админку на Windows может появляться ошибка:
```
EPERM: operation not permitted, unlink '...\strapi-upload-...'
```

**Это [известный баг Strapi 5](https://github.com/strapi/strapi/issues/24023)**, не связанный с кодом проекта.

**Важно:** Файл успешно загружается, несмотря на ошибку. Достаточно обновить страницу (F5).

**На продакшене (Linux) этой проблемы нет** — баг проявляется только при локальной разработке на Windows из-за особенностей блокировки файлов (Windows Defender, индексатор).
