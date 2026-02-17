# Eventum — лендинг для ивент-индустрии (Next.js + Strapi)

---

## Скриншоты веб-сайта

Ниже представлены скриншоты интерфейса:

[![Watch demo](screenshots/screen1.webp)](screenshots/video.mp4)
![Screenshot 2](screenshots/screen2.webp)
![Screenshot 3](screenshots/screen3.webp)
![Screenshot 4](screenshots/screen4.webp)
![Screenshot 5](screenshots/screen5.webp)
![Screenshot 6](screenshots/screen6.webp)
![Screenshot 6](screenshots/screen8.webp)
![Screenshot 6](screenshots/screen9.webp)
![Screenshot 6](screenshots/screen9.webp)

---

Демо-проект лендинга для **ивент-индустрии** с динамическим управлением контентом через **Strapi CMS**.

Проект выполнен в рамках **тестового задания на позицию Middle+ Fullstack разработчика**  
с фокусом на:
- семантику и архитектуру кода
- UX-логику и интерактивность
- визуальную составляющую и анимации
- удобную и масштабируемую Strapi-админку

---

## Реализованный функционал

### Секции лендинга
- **Hero** — интерактивный Three.js liquid-градиент, GSAP-анимации, CTA
- **О компании** — анимированная статистика (NumberTicker)
- **Проекты** — горизонтальный слайдер, 3D-карточки, динамические страницы проектов
- **Партнёры** — бесконечная бегущая строка с progressive blur
- **Контакты** — интерактивная карта 2GIS, форма с валидацией, соцсети
- **Футер** — динамические группы ссылок из Strapi

### Страницы проектов
- Динамические маршруты: `/projects/[slug]`
- Галерея, расширенное описание, метаданные
- Плавные переходы и анимации

---

## Технологический стек

### Frontend
- **Next.js 16 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** — скролл- и entrance-анимации
- **Three.js** — интерактивный фон
- **Framer Motion**
- **React Hook Form + Zod**
- SEO: Metadata API, JSON-LD

### Backend
- **Strapi 5.33.4**
- SQLite (локально)
- Bootstrap-инициализация данных при первом запуске
- Полностью настроенные Public API-права

---

## Архитектура Strapi

### Single Types
- `homepage` — Hero-секция и SEO
- `about` — описание компании и статистика
- `contact-info` — контакты, соцсети, координаты карты, опции формы
- `footer` — структура футера и ссылки

### Collection Types
- `project` — проекты / кейсы с галереями и страницами-углублениями
- `partner` — партнёры и клиенты
- `contact-submission` — заявки из формы обратной связи со статусами

### Компоненты
Переиспользуемые shared-компоненты:
- статистика
- соцсети
- опции услуг
- группы ссылок футера

**Весь контент управляется через Strapi без изменений кода.**

---

## Работа с изображениями

Используется **гибридный подход**:

- **Media-поля** — стандартные загрузки через Strapi-админку
- **Path-поля** — строки с путями к статичным изображениям (для bootstrap-данных)

Логика на фронтенде:

    const imageUrl = project.image?.url || project.imagePath;

---

## Известные проблемы

### Windows: ошибка при загрузке изображений в Strapi 5

При загрузке изображений через Media Library в Strapi 5 на Windows может возникать ошибка: EPERM: operation not permitted, unlink ...


Это **известная проблема Strapi 5**, связанная с особенностями файловой системы Windows  
(Windows Defender / file locking) и **не является ошибкой проекта**.

**Важно:**
- файл при этом **успешно загружается**
- необходимо **закрыть модальное окно загрузки**
- затем выбрать уже загруженное изображение из **Media Library**

После этого медиа корректно сохраняется и используется в проекте.

На Linux и production-окружениях данная проблема не воспроизводится.

---

## ▶️ Запуск проекта

### Backend (Strapi)

```bash
cd eventum-backend
npm install
npm run develop
```

### Frontend (Next)

```bash
cd eventum-frontend
npm install
npm run dev
```
