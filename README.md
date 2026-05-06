# Portfolio Website

Personal portfolio website for Hamadullah showcasing experience, skills, projects, and contact details.

[![Live Site](https://img.shields.io/badge/Live%20Site-hamadullah.me-0f766e?style=for-the-badge)](https://hamadullah.me)

## Features

- Single-page layout with sections: Hero, About, Experience, Skills, Projects, Contact
- Responsive UI built with Vite + React + TypeScript
- Tailwind CSS styling with shadcn/ui components

## Tech Stack

- Vite, React 18, TypeScript
- Tailwind CSS, shadcn/ui, Radix UI
- React Router, React Hook Form, Zod

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run lint` - Lint
- `npm run test` - Run tests
- `npm run test:watch` - Watch tests

## Project Structure

```
src/
	components/     UI sections and shared components
	pages/          Route-level pages
	hooks/          Custom hooks
	lib/            Utility helpers
	assets/         Images and static assets
```

## Deployment

Build the project and deploy the `dist/` folder to your static hosting provider (Netlify, Vercel, GitHub Pages, etc.).
