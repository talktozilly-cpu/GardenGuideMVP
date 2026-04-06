# Molbak's Garden Guide — Prototype

Mobile-first clickable demo (Next.js App Router + Tailwind-free CSS).

## Run locally

```bash
cd garden-app
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Push the `garden-app/` directory to Vercel — it autodetects Next.js.

## Swap users

To switch the demo to a new user (e.g. `zilly-garden-data.json`):

1. Drop the new JSON file into `data/`
2. Drop the new photos into `public/photos/`
3. Edit one line in `data/index.ts`:

   ```ts
   import data from "./morten-garden-data.json"; // ← change this path
   ```

That's it.

## Structure

- `app/page.tsx` — Dashboard
- `app/space/[id]/page.tsx` — Garden space detail
- `app/plant/[id]/page.tsx` — Plant detail
- `app/assessment/page.tsx` — Full assessment
- `data/index.ts` — Single source for the active user data
- `components/` — PlantCard, BackNav, CoachButton, CameraIcons
- `app/globals.css` — All design tokens + components (light + dark mode)
