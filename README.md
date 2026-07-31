# Court Click — CTC (Certified True Copy) Admin Dashboard

Frontend machine test submission. Implements the "Certified True Copy" order
management screens using **Next.js (App Router)**, **TypeScript**, and
**Ant Design**.

## Tech Stack

- Next.js 15+ (App Router, `src/` directory)
- TypeScript
- Ant Design 5 (via `@ant-design/nextjs-registry` for SSR-safe styles)
- Plain CSS Modules for layout/spacing (kept separate from Ant Design's own
  component styling)
- Vitest + React Testing Library for unit tests

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to
`/orders`, the main dashboard screen.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
npm run test    # run unit tests (Vitest)
```

## What's implemented

**Orders dashboard** (`/orders`)
- Sidebar navigation (icon rail on desktop, bottom nav on mobile)
- Header with title, live count, share/filter icons, and search
- Section tabs (Orders / Clerks / Courts / Districts / Eligible Users) with a
  "Types" dropdown
- Orders table with all columns from the source design: User Info (with
  copy-to-clipboard for phone/address), Court Complex, Products, Order Date,
  Status (dropdown + colored badge), Order Details/E-sign, Tags/Note
  (removable colored chips), Clerk/Assign
- "Expanded view" toggle that reveals the eCopy/Upload column shown in one of
  the reference screenshots
- Fully responsive: the table becomes a stacked card list under 860px

**Modals**
- Order Details (simple, "Copy Details" version)
- Order Details (detailed, tabbed version with status timeline + Case &
  Customer / Address / Products / Digio eSign tabs)
- Filter Users (District / Court Establishment / Product / Test Users)
- Tags quick filter
- Choose Tag (select / edit / delete existing tags)
- Create New Tag (name + color swatches + live preview)
- Add Clerk (validated form: name, phone with country code, clerk ID)
- Assign Authorized Personnel (checkbox list + "More Clerks" dropdown +
  shortcut into Add Clerk)

**Other pages**
- `/clerks` — functional clerk list wired to the Add Clerk modal
- `/courts`, `/districts`, `/eligible-users` — simplified list pages. These
  tabs weren't shown in detail in the provided screenshots, so they reuse the
  same shell/table pattern with representative sample data rather than a
  pixel-matched layout.

## Known limitations / things to double-check before submitting

- This was built from a screenshot PDF, not a live Figma inspection, so exact
  pixel values (spacing, font sizes, hex colors) are a close reconstruction
  rather than values pulled directly from Figma. **Worth a side-by-side pass
  against the actual Figma file**, since UI accuracy is an explicit grading
  criterion.
- Data is in-memory mock data (`src/data/mockData.ts`) — there's no backend/API
  integration, since none was specified in the task doc.
- Dark mode and optimistic UI updates (listed as bonus items) were not
  implemented due to time constraints; state updates are synchronous/local so
  the UI already feels instant, but there's no real network layer to be
  "optimistic" against.

## Folder structure

```
src/
  app/                # routes (orders, clerks, courts, districts, eligible-users)
  components/
    layout/            # Sidebar, DashboardShell, PageHeader, SectionTabs, SimpleListPage
    orders/             # OrdersTable
    modals/             # all modal dialogs
    ui/                 # TagChip, StatusBadge (+ tests)
  data/                # mock data + tab definitions
  hooks/               # useMediaQuery
  theme/               # color tokens
  types/               # shared TypeScript types
```

## Deployment

Not deployed as part of this handoff — see the accompanying message for
recommended next steps (e.g. Vercel) to get a deployment URL for submission.
