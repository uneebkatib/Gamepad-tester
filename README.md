{
  "framework": "nextjs",
  "buildCommand": "npm run build"
}# 🎮 GamepadTester.live

Professional gamepad testing platform with advanced diagnostics, compatibility checking, and troubleshooting guides.

## Features

- ⚡ **Real-time Detection** - Instantly detect and identify connected gamepads
- 🎯 **Button Mapping** - Visual display of all button inputs
- 📊 **Advanced Diagnostics** - Hardware info and performance metrics
- 🎮 **Vibration Testing** - Test rumble and haptic feedback
- 🔧 **Calibration Tools** - Optimize stick performance
- 📱 **Multi-Device Support** - Desktop, mobile, all modern browsers

## Tech Stack

- **Framework**: Next.js 14 (App Router, SSR/SSG)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State**: Zustand
- **Charts**: Recharts
- **3D Models**: Three.js (future)
- **SEO**: Next-SEO, Structured Data

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/uneebkatib/Gamepadtester.live.git
cd Gamepadtester.live

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Pages

- **Home** (`/`) - Landing page with features overview
- **Tester** (`/tester`) - Main gamepad testing interface
- **Diagnostics** (`/diagnostics`) - Advanced diagnostic tools
- **Compatibility** (`/compatibility`) - Controller compatibility database
- **Troubleshooting** (`/troubleshooting`) - Help and guides
- **About** (`/about`) - Project information

## Deployment to Vercel

### Option 1: Automatic Deployment via GitHub

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

### Option 2: Manual Deployment via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# For production:
vercel --prod
```

### Environment Variables

Set these in Vercel dashboard under Project Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://gamepadtester.live
```

## Build & Production

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate sitemap
npm run generate-sitemap
```

## SEO Optimization

- ✅ Sitemap.xml for search engines
- ✅ robots.txt configuration
- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Mobile responsive design
- ✅ Core Web Vitals optimized
- ✅ Dynamic metadata per page

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Score | 95+ |
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.05 |
| Total Bundle Size | < 150KB (gzipped) |

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── globals.css         # Global styles
│   ├── page.tsx            # Home page
│   ├── tester/
│   ├── diagnostics/
│   ├── compatibility/
│   ├── troubleshooting/
│   └── about/
├── components/             # Reusable React components
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── GamepadTester.tsx
│   ├── Diagnostics.tsx
│   └── ...
├── lib/                    # Utilities and hooks
│   ├── useGamepad.ts       # Gamepad API hook
│   ├── logger.ts           # Logging utility
│   └── strings.ts          # String utilities
├── public/                 # Static assets
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── scripts/                # Build scripts
│   └── generate-sitemap.js
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## Development Notes

- Uses the Web Gamepad API for controller detection
- All gamepad testing done client-side (privacy-first)
- No external API calls required
- Responsive design for all screen sizes
- Dark mode as default theme

## Future Enhancements

- 3D controller visualization (Three.js)
- Historical test data tracking
- Driver recommendation system
- Community feedback integration
- Advanced calibration tools
- Controller comparison feature
- Mobile app version

## License

MIT License - feel free to use for personal or commercial projects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please visit the [Troubleshooting](https://gamepadtester.live/troubleshooting) page or open an issue on GitHub.