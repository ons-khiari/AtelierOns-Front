# 📚 AtelierOns Bookstore Frontend

A modern, responsive Next.js bookstore frontend built for browsing, shopping, and managing orders with a rich product experience. This repo is production-ready for client-side interactions and integration with headless API backends.

---

## 🚀 Key Features

- 📚 Browse books by category, trending, and search keywords
- 🔍 Live search + autocomplete suggestions
- 🛒 Add/remove/update cart items with quantity controls
- ❤️ Favorites and wishlist support
- 🔐 Login/register with auth session context
- 💳 Checkout flow with order summary and confirmation
- 🧾 Order history for authenticated users
- 📦 Stock availability indicators and sold-out states
- 🌍 Fully responsive UI for mobile, tablet, desktop
- ⚡ Fast page transitions & skeleton loading states

---

## 🏗️ Tech Stack

- Framework: Next.js 14+ (app router) with Server Components
- UI: React + TypeScript with Tailwind CSS
- State: React Context API (`cart`, `auth`, `favorites`, `backstock`)
- Data: local mocked database + backend API integration points
- Styling: Tailwind + custom CSS variables
- Routing: Next.js file-based routes (nested `app/` structure)
- Accessibility: semantic HTML + aria-friendly controls

---

## 📁 Project Structure

- `app/`
  - `page.tsx`: home page
  - `about/`, `account/`, `products/[id]/`, `checkout/`, etc.
  - `admin/`: admin dashboard sections (`orders`, `products`, `customers`, etc.)
- `components/`: reusable UI modules (`header`, `footer`, `product-card`, `cart`, etc.)
- `components/ui/`: design system primitives (`button`, `dialog`, `dropdown`, `input`, `toast`, etc.)
- `lib/`: context providers and mock data (`cart-context`, `products-database`, `auth-context`, etc.)
- `hooks/`: custom hooks (`use-mobile`, `use-toast`)
- `public/images/`: static product & UI assets
- `styles/`: global and utility styles

---

## ⚙️ Setup and Run

1. Clone repository
   - `git clone https://github.com/ons-khiari/AtelierOns-Front.git`
2. `cd AtelierOns-Front`
3. Install dependencies
   - `pnpm install` (or `npm install` / `yarn install`)
4. Run:
   - `pnpm dev` (or `npm run dev`)
5. Open in browser:
   - `http://localhost:3000`

---

## 🌐 Environment Variables

Create `.env.local` at repo root if you add custom API backends:

- `NEXT_PUBLIC_API_URL=https://your-api.example.com`

> The app is scaffolded with local dummy data in `lib/products-database.ts` so it works out-of-the-box without env vars.

---

## 🔌 API / Data Integration

- `/lib/products-database.ts`: product catalog dataset
- `/lib/bundles-database.ts`: bundle and frequently bought together data
- `/lib/*-context.tsx`: request-backed mutations and query hooks can be added here
- Add API calls using `fetch` or `axios` in components/pages under `app/` or `lib/`.

---

## 🖼️ Screenshots

Below are a few key pages. These are rendered directly in Markdown (not only shown as examples).

![Homepage screenshot](public/screenshots/homepage.png)

![Products page screenshot](public/screenshots/products-page.png)

![Cart page screenshot](public/screenshots/cart-page.png)

> Optional: add just a few curated screens, not every view, to keep README lightweight.

---

## 🧪 Testing and Quality

- Lint: `pnpm lint` (if configured)
- Format: `pnpm prettier --write .`
- Static checks: `pnpm typecheck` (if TypeScript strict mode active)

---

## 📈 Roadmap / Improvements

- [ ] Payment gateway (Stripe, PayPal)
- [ ] Inventory management + CSV import/export
- [ ] Real backend integration (REST / GraphQL)
- [ ] Pagination, filters, sorting
- [ ] Dark mode + theme switcher
- [ ] i18n support
- [ ] Accessibility audit and improved keyboard navigation

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feat/<name>`
3. Commit with descriptive message
4. Push branch and open PR

> Please include issue link and testing steps in PR description.

---

## 📝 License

`MIT`
