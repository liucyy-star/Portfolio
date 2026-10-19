# Jordan Blake — Product Designer Portfolio

A Next.js (App Router) portfolio site with three case studies.

## Structure

```
app/
  layout.tsx        Root layout — loads fonts via next/font, sets metadata
  page.tsx           The page itself — assembles the components below
  globals.css        All styling
components/
  CursorBlob.tsx      Cursor dot that adopts each card's accent color
  RotatingWord.tsx    The cycling word in the hero headline
  CaseStudyCard.tsx   One expandable case-study card
lib/
  case-studies.ts     Case study content, kept separate from presentation
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy for the three case studies lives in `lib/case-studies.ts` —
edit the objects there and every card updates automatically. No need
to touch the components.

## Build

```bash
npm run build
npm start
```
