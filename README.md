# Seismocore

A stunning Mars-themed research platform built with React, featuring a black background with rusty-orange accents.

## Features

### 🚀 Core Functionality
- **Responsive Sidebar Navigation**: Persistent left sidebar with Home, Dashboard, and Contributions sections
- **Mars Hero Background**: Full-bleed Mars landscape with parallax starfield effect
- **Random Mars Facts**: Dynamic fact shuffling from a curated database
- **Research Dashboard**: Overview of articles, contributions, and site activity
- **Contribution System**: Local submission system with form validation and localStorage persistence

### 🎨 Design System
- **Colors**: Black background (#000000) with rusty-orange accent (#D36427)
- **Typography**: Orbitron display font for headings, JetBrains Mono for body text
- **Components**: Glass-morphism cards with subtle glows and hover effects
- **Animations**: Smooth transitions and parallax starfield

### 📊 Dashboard Widgets
- Articles summary with tags and status
- Mars facts with preview shuffling
- Contributions pipeline with status tracking  
- Recent activity timeline
- Simple CSS bar charts for data visualization

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Customization

### Adding More Mars Facts
Edit `src/data/facts.js` to add new facts:
```javascript
{
  id: 19,
  fact: "Your new Mars fact here",
  category: "New Category"
}
```

### Replacing Hero Image
Replace `src/assets/mars_hero.jpg` with your own Mars landscape image. Recommended dimensions: 1920x1080 or larger.

### Extending Dashboard Data
Modify `src/data/dashboardData.js` to add new widgets or update statistics.

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Components**: Shadcn/ui with Mars-themed customizations
- **Routing**: React Router DOM
- **State**: Local state + localStorage for persistence
- **Icons**: Lucide React
- **Fonts**: Orbitron (display) + JetBrains Mono (body)

## File Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components
│   ├── layout/      # Layout components (Sidebar, App Layout)
│   └── ui/          # Shadcn UI components
├── data/           # Static data (facts, dashboard data)
├── hooks/          # Custom React hooks
├── pages/          # Main page components
├── utils/          # Utility functions (starfield animation)
└── lib/            # Library configurations
```

## Future Backend Integration

This project is designed for easy backend integration:

1. **Replace localStorage** with API calls in:
   - `src/pages/Contributions.tsx` (form submissions)
   - `src/data/dashboardData.js` (real-time statistics)

2. **Add authentication** via the existing sidebar structure

3. **Implement real-time updates** for dashboard widgets

4. **Connect external Mars data APIs** for live facts and research updates

## Performance Optimizations

- ✅ Lazy-loaded images with responsive srcsets
- ✅ Deferred non-critical scripts
- ✅ Optimized starfield animation (low CPU usage)
- ✅ Component-level state management
- ✅ Tailwind CSS purging for smaller bundles

## Accessibility

- WCAG AA contrast compliance on black background
- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly labels
- Focus ring indicators

## License

Built with Bolt AI - Open source ready for research collaboration.
