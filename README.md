# Wheedle Technologies — Next.js Frontend

Fully migrated from React.js (Vite) to **Next.js 15 App Router**.

---

## 📁 Project Structure

```
wheedle-nextjs/
├── app/                         # Next.js App Router
│   ├── layout.js                # Root HTML layout + global fonts
│   ├── globals.css              # Global Tailwind + custom CSS
│   ├── page.js                  # / Home page (SSR)
│   ├── LandingPageClient.jsx    # Home page client component
│   ├── about-us/                # /about-us
│   ├── blog/                    # /blog + /blog/[slug]
│   ├── career/                  # /career
│   ├── our-services/            # /our-services
│   ├── our-service/[serviceKey] # /our-service/:slug (static params)
│   ├── privacy-policy/          # /privacy-policy
│   ├── terms-conditions/        # /terms-conditions
│   ├── admin/
│   │   ├── login/               # /admin/login
│   │   └── dashboard/           # /admin/dashboard (auth-protected)
│   └── not-found.js             # 404 page
│
├── components/                  # All React components ('use client')
│   ├── Header.jsx               # Navigation with services dropdown
│   ├── Footer.jsx               # Footer with links
│   ├── Hero.jsx                 # Landing hero (API-driven)
│   ├── WhebotPage.jsx           # AI chatbot with Socket.IO
│   ├── ContactModal.jsx         # Reusable contact form modal
│   ├── Newsletter.jsx           # Newsletter subscribe section
│   ├── Preloader.jsx            # Animated loading screen
│   ├── PageWrapper.jsx          # Cursor + bot wrapper for inner pages
│   ├── Blog_preview.jsx         # Blog detail view
│   ├── Form.jsx                 # Career application form
│   ├── CurrentOpenings.jsx      # Job listings
│   └── admin/                   # Admin panel components
│       ├── AdminDashboard.jsx   # Full admin dashboard + live chat
│       ├── AdminPostBlog.jsx
│       ├── AdminJobForm.jsx
│       ├── AdminPostTestimonial.jsx
│       ├── AdminPostHero.jsx
│       ├── AdminProfilePopup.jsx
│       ├── Toast.jsx
│       ├── ViewAllBlogs.jsx
│       ├── ViewAllJobs.jsx
│       ├── ViewAllTestimonials.jsx
│       ├── ViewAllLeads.jsx
│       ├── ViewAllContacts.jsx
│       ├── ViewAllFormLeads.jsx
│       ├── ViewAllPartners.jsx
│       ├── ViewAllSteps.jsx
│       ├── AddNewPartner.jsx
│       └── AdminAddStep.jsx
│
├── lib/                         # Data, config, utilities
│   ├── api.js                   # API base URL (env-driven)
│   ├── ServicesData.jsx         # Static services data
│   ├── LogosData.js             # Public image paths
│   └── blogs.js                 # Static blog data
│
├── public/                      # Static assets (images, SVGs, logos)
├── .env.local                   # Local dev environment variables
├── .env.production              # Production environment variables
├── next.config.js               # Next.js config (image domains)
├── tailwind.config.js           # Tailwind CSS config
└── postcss.config.js            # PostCSS config
```

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure environment
Edit `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/py/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🌐 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, testimonials |
| `/about-us` | About the company |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |
| `/our-services` | Services overview |
| `/our-service/[serviceKey]` | Individual service page |
| `/career` | Careers + job openings + application form |
| `/privacy-policy` | Privacy policy |
| `/terms-conditions` | Terms and conditions |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Full admin panel (auth-protected) |

---

## 🔒 Admin Panel

- Visit `/admin/login` → enter credentials → redirects to `/admin/dashboard`
- Dashboard includes: Hero editor, Partners, Steps, Jobs, Blogs, Testimonials, Applications, Newsletter Leads, Form Leads, and Live Chat
- JWT token stored in `localStorage` under `adminToken`

---

## 🤖 Live Chat (WheBot + Socket.IO)

- WheBot runs as a fixed bottom-right chat widget on all public pages
- Uses Socket.IO to connect to the NestJS backend
- Admin can reply to live chats from `/admin/dashboard` → "Live Chats" panel
- Connection URL controlled by `NEXT_PUBLIC_SOCKET_URL`

---

## 🚢 Deployment Notes

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```
Set env vars in Vercel dashboard.

### Self-hosted (PM2)
```bash
npm run build
pm2 start npm --name "wheedle-next" -- start
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ⚙️ Key Migration Changes

| Before (React/Vite) | After (Next.js 15) |
|---------------------|---------------------|
| `react-router-dom` | `next/link` + `usePathname` |
| `<Link to="...">` | `<Link href="...">` |
| `useNavigate()` | `useRouter()` from `next/navigation` |
| `react-helmet` | `export const metadata = {}` per page |
| `vite.config.js` | `next.config.js` |
| `VITE_*` env vars | `NEXT_PUBLIC_*` env vars |
| `/src/config/api.js` | `/lib/api.js` |
| `/src/jsondata/` | `/lib/` |
| Client-side routing | App Router with SSR/SSG |
| `index.html` entry | `app/layout.js` root layout |
"# wheedle_frontend_next" 
