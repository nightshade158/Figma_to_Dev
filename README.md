# Candidate Profile Unlock System

A full-stack web application for browsing, unlocking, and viewing detailed candidate profiles. Built with **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## Overview

The system includes:

1. **Profiles List Page** – Displays candidate cards with filtering/sorting.
2. **Unlock Modal** – Confirms profile unlock with credit visualization.
3. **Profile Detail Page** – Shows full profile details post-unlock.

---

## Features

* Responsive profile grid with filtering.
* Modal-based profile unlock flow.
* Persistent unlocks via Supabase.
* Dark theme with blue accents.
* Fully typed and responsive UI.

---

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **Database:** Supabase (PostgreSQL)
* **Icons:** Lucide React

---

## Setup

1. Create `.env` file:

   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_ANON_KEY=your_key
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run development server:

   ```bash
   npm run dev
   ```
4. Build for production:

   ```bash
   npm run build && npm run preview
   ```

---

## Structure

```
src/
├── components/      # ProfileCard, UnlockModal
├── pages/           # ProfilesListPage, ProfileDetailPage
├── lib/             # supabase.ts, api.ts
├── types/           # profile.ts
├── App.tsx
└── index.css
```

---

## User Flow

* **Browse:** View and filter candidate cards.
* **Unlock:** Confirm unlock, record action, redirect to details.
* **View:** Access detailed profile if unlocked; otherwise show lock message.

---

## Database Schema

**profiles**
Stores candidate data such as id, name, title, score, about, skills, education, work history, and contact info.

**unlocked_profiles**
Tracks unlocked profile IDs and timestamps.

---

## API Methods (`lib/api.ts`)

* `getProfiles()`
* `getProfileById(id)`
* `getUnlockedProfiles()`
* `unlockProfile(id)`
* `isProfileUnlocked(id)`

---

## Security

* RLS enabled on all tables.
* Public read on profiles.
* Insert-only for unlocked_profiles.

---

## Assumptions to strictly satify only task requirements 

* No authentication.
* Credit system visual only.
* 8 mock profiles preloaded.
* Responsive across all screen sizes.

---

## Error Handling

* Network and invalid ID errors handled gracefully.
* Redirects for locked or missing profiles.

---

## Performance

* Code-splitting and lazy loading.
* Optimized Supabase queries.
* Lightweight Tailwind-based UI.

---

## Styling

* Dark background with blue accents.
* Bold headers, clean typography, smooth transitions.
* Accessible contrast ratios.

---

## Deployment

* **Frontend:** Bolt environment.
* **Database:** Supabase Cloud.

---

## Future Enhancements

* Add authentication and credit deduction.
* Advanced search and filtering.
* Real-time collaboration, analytics, and ATS integration.

---

## License

MIT License.
