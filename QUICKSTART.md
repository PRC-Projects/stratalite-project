# Quick Start Guide

## Setup Instructions (5 minutes)

### Step 1: Extract the Project
```bash
# If you have the .tar.gz file
tar -xzf stratalite-project.tar.gz
cd stratalite-project

# Or if you already have the folder
cd stratalite-project
```

### Step 2: Install Dependencies
```bash
npm install
```
This will take 2-3 minutes to complete.

### Step 3: Run the Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: **http://localhost:3000**

## What You'll See

### Landing Page (/)
- Beautiful hero section
- Feature highlights
- Category showcase
- Call-to-action buttons

### Dashboard (/dashboard)
- Statistics cards
- Current projects
- Pending invoices
- Recent activities sidebar

## Navigation

### Main Menu (Left Sidebar)
- **Dashboard** - Overview and statistics
- **Project** - All your projects with status tabs
- **Workstreams** - Messaging system
- **Calendar** - Meeting scheduler
- **Proposal Sent** - Submitted proposals
- **Notifications** - Activity updates
- **Articles** - Resources (placeholder)
- **MY Favourites** - Bookmarked items (placeholder)
- **Contacts** - Contact management (placeholder)

### Top Header
- Search bar
- Post Project button
- Notifications icon
- Messages icon
- User profile dropdown

## Key Features to Explore

### 1. Projects Page (`/dashboard/projects`)
- Click through different tabs:
  - **New Project** - Recently posted projects
  - **Applied** - Projects you've bid on
  - **Awarded** - Won projects with milestone tracking
  - **Declined/Dispute** - Empty states shown

### 2. Calendar Page (`/dashboard/calendar`)
- Interactive calendar
- Click dates to select
- View scheduled meetings
- Create reminders

### 3. Messaging (`/dashboard/workstreams`)
- Contact list
- Real-time chat interface
- Online status indicators
- Message history

### 4. Profile (`/dashboard/profile`)
- Edit personal information
- Manage skills
- Set hourly rate
- View active/completed orders

### 5. Proposals (`/dashboard/proposals`)
- View project details
- Submit new proposals
- Set milestones
- View competing proposals

## Customization Tips

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --primary: 199 89% 48%;  /* Change this for main color */
}
```

### Add/Remove Menu Items
Edit `components/layout/sidebar.tsx`:
```typescript
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  // Add your items here
]
```

### Modify User Info
Edit `components/layout/header.tsx`:
```typescript
<Header userName="Your Name" userRole="Your Role" />
```

## Building for Production

```bash
# Create optimized build
npm run build

# Run production server
npm start
```

## Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Check Node version (should be 18+)
node --version

# Update if needed
nvm install 18
nvm use 18
```

## File Structure Overview

```
stratalite-project/
├── app/                      # Next.js App Router
│   ├── (dashboard)/         # Dashboard pages (grouped route)
│   ├── page.tsx             # Landing page
│   └── layout.tsx           # Root layout
├── components/
│   ├── layout/              # Sidebar, Header
│   └── ui/                  # Reusable UI components
├── lib/                     # Utilities
└── package.json             # Dependencies
```

## Next Steps

1. **Add Backend:** Integrate with your API
2. **Authentication:** Add login/signup
3. **Database:** Connect to PostgreSQL/MongoDB
4. **Real-time:** Add WebSocket for live updates
5. **Payments:** Integrate Stripe/PayPal

## Deployment

### Vercel (Easiest)
1. Push to GitHub
2. Import project on Vercel
3. Deploy with one click

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted with Docker

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Common Questions

**Q: Can I use this in production?**
A: This is a UI implementation. Add backend API, authentication, and database for production use.

**Q: How do I add new pages?**
A: Create files in `app/(dashboard)/your-page/page.tsx`

**Q: Can I remove TypeScript?**
A: Yes, but not recommended. Rename `.tsx` to `.jsx` and remove types.

**Q: How do I change the logo?**
A: Edit the logo section in `components/layout/sidebar.tsx`

**Q: Is it responsive?**
A: Yes! It works on mobile, tablet, and desktop.

---

**Enjoy building with Stratalite! 🚀**
