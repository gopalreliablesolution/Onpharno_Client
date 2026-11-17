# ONPHARNO Client (Frontend & Admin Panel)

Frontend and dynamic admin panel for ONPHARNO (`onpharno.com`), a premium B2B pharmaceutical and nutraceutical manufacturing platform.

## Features
- **Public Website**:
  - Premium healthcare aesthetic with responsive layouts, mega menus, sticky navigation, and animated components.
  - Interactive dosage form displays (Liquid-filled hard capsules, capsule-in-capsule, pellets-in-capsule).
  - Product catalog with dual filtering by Health Category & Dosage Form.
  - Dynamic CMS driven entirely by the backend REST API.
  - Floating WhatsApp action button & quick enquiry modals.
- **Admin Panel** (`/admin`):
  - Protected JWT-based administration system for managing Banners, CMS Sections, Products, Categories, Menus, Team, Facilities, Enquiries, Media, and Site Settings.
- **Tech Stack**:
  - React 18, Vite, React Router v6
  - Tailwind CSS + Custom Brand Theme (#D85430, #A83030, #FAF6F2, #0F172A)
  - Framer Motion, Axios, React Hook Form + Zod, TanStack Query
  - Lucide React, React Hot Toast, React Helmet Async

## Setup
```bash
npm install
npm run dev
```
Development server will run at `http://localhost:5173`.
