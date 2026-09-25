# FL Movie App

A modern movie landing page built with Next.js and React.

## Features

- Responsive movie homepage
- Hero section with promotional content
- Movie card layout
- Tailwind-based styling
- Built with the App Router

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
```

## Environment Variables

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Then update the values as needed.

## GitHub Notes

- Keep `.env.local` uncommitted
- Share only required project files in the repository
- The default `.gitignore` already excludes build artifacts and environment files

## Project Structure

```bash
app/
  components/
  globals.css
  layout.tsx
  page.tsx
public/
constants.ts
```
