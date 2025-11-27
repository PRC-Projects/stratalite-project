# Stratalite - Freelance Project Management Platform

A modern, full-featured freelance project management platform built with Next.js 14, TypeScript, and Shadcn UI.

## Features

- 🎨 **Modern UI Design** - Clean and professional interface based on Figma designs
- 📊 **Dashboard** - Comprehensive overview of projects, earnings, and activities
- 📅 **Calendar** - Schedule and manage meetings with integrated reminders
- 💼 **Project Management** - Track projects across different stages (New, Applied, Awarded, etc.)
- 💬 **Messaging System** - Real-time chat interface for client communication
- 📝 **Proposals** - Create and manage project proposals with milestone tracking
- 👤 **Profile Management** - Detailed profile with skills, experience, and rates
- 🔔 **Notifications** - Stay updated with project activities
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI (Radix UI)
- **Icons:** Lucide React
- **Date Management:** date-fns

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Extract the project files**

2. **Navigate to the project directory:**
   ```bash
   cd stratalite-project
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
stratalite-project/
├── app/
│   ├── (dashboard)/          # Dashboard routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── projects/         # Projects management
│   │   ├── calendar/         # Calendar & meetings
│   │   ├── workstreams/      # Messaging system
│   │   ├── proposals/        # Proposal management
│   │   ├── profile/          # User profile
│   │   ├── notifications/    # Notifications
│   │   ├── clients/          # Client management
│   │   └── layout.tsx        # Dashboard layout
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── layout/               # Layout components
│   │   ├── sidebar.tsx       # Sidebar navigation
│   │   └── header.tsx        # Top header
│   └── ui/                   # UI components (Shadcn)
├── lib/
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Pages Overview

### Landing Page (`/`)
- Hero section with call-to-action
- Feature highlights
- Category showcase
- Newsletter subscription
- Footer with links

### Dashboard Pages

1. **Dashboard** (`/dashboard`)
   - Project statistics
   - Current projects overview
   - Pending invoices
   - Recent activities
   - Upcoming meetings

2. **Projects** (`/projects`)
   - Tabbed interface (New, Bookmarks, Applied, Awarded, Declined, Dispute)
   - Project cards with details
   - Milestone tracking for awarded projects
   - Empty states for no data

3. **Calendar** (`/calendar`)
   - Monthly calendar view
   - Event scheduling
   - Meeting reminders
   - Recently added events

4. **Workstreams** (`/workstreams`)
   - Contact list with online status
   - Real-time messaging interface
   - File sharing support
   - Search and sort functionality

5. **Proposals** (`/proposals`)
   - Project details view
   - Proposal submission form
   - Milestone planning
   - Client information
   - Competitor proposals view

6. **Profile** (`/profile`)
   - Profile image management
   - Skills and expertise
   - Hourly rate settings
   - Experience and education
   - Active/completed orders overview

7. **Clients** (`/clients`)
   - Client list table
   - Search and filter
   - Status tracking
   - Pagination

8. **Notifications** (`/notifications`)
   - Activity feed
   - Read/unread status
   - Time stamps

## Customization

### Colors

The color scheme can be customized in `app/globals.css`:

```css
:root {
  --primary: 199 89% 48%;        /* Main blue color */
  --secondary: 210 40% 96.1%;    /* Light gray */
  /* ... other colors */
}
```

### Components

All UI components are located in `components/ui/` and can be customized using Tailwind CSS classes.

### Navigation

To modify the sidebar navigation, edit `components/layout/sidebar.tsx`:

```typescript
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  // Add or modify menu items here
]
```

## Building for Production

1. **Create a production build:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

The application will be optimized and ready for deployment.

## Deployment

This Next.js application can be deployed to various platforms:

- **Vercel** (Recommended): Connect your Git repository for automatic deployments
- **Netlify**: Use the Next.js build plugin
- **Docker**: Create a Dockerfile for containerized deployment
- **Self-hosted**: Use PM2 or similar process managers

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a UI-only implementation based on Figma designs. To add functionality:

1. Implement backend API integration
2. Add state management (Redux, Zustand, etc.)
3. Implement authentication
4. Add real-time features with WebSockets
5. Integrate payment processing

## License

This project is for demonstration purposes.

## Support

For issues and questions:
- Check the Next.js documentation: https://nextjs.org/docs
- Review Shadcn UI docs: https://ui.shadcn.com
- Tailwind CSS reference: https://tailwindcss.com/docs

## Acknowledgments

- UI Design from provided Figma files
- Built with Next.js and Shadcn UI
- Icons by Lucide React
