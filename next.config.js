const fs = require('fs');
const path = require('path');

// Auto-generate XML sitemap and sync assets on load
try {
  require('./scripts/generate-sitemap');
} catch (err) {
  console.error('[Sitemap Generator] Error running generator:', err);
}

const copyFiles = () => {
  // Skip in CI/CD environments like Cloudflare Pages
  if (process.env.CF_PAGES || process.env.CI) {
    return;
  }

  const brainDir = 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d';
  const artifactsDir = path.join(brainDir, 'artifacts');
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  const filesToCopy = [
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\controller_stick_drift_fix_1780758154046.png',
      dest: path.join(__dirname, 'public', 'controller-stick-drift-fix.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\calibration_lab_1780753142653.png',
      dest: path.join(__dirname, 'public', 'calibration-lab.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\potentiometer_close_up_1780753708432.png',
      dest: path.join(__dirname, 'public', 'potentiometer-close-up.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\hall_effect_sensor_1780753724729.png',
      dest: path.join(__dirname, 'public', 'hall-effect-sensor.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\diagnostic_cleaning_1780753741936.png',
      dest: path.join(__dirname, 'public', 'diagnostic-cleaning.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\hall_effect_soldering_install_1780754942423.png',
      dest: path.join(__dirname, 'public', 'hall-effect-install.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\wireless_latency_benchmark_1780754953965.png',
      dest: path.join(__dirname, 'public', 'wireless-latency-benchmark.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\dualsense_haptic_browser_test_1780754965886.png',
      dest: path.join(__dirname, 'public', 'dualsense-haptic-test.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\5212aa4b-d1a9-4892-ad1d-16d0452d0bb7\\carbon_track_microscope_1780754978036.png',
      dest: path.join(__dirname, 'public', 'carbon-track-microscope.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\marcus_vance_portrait_1780742587637.png',
      dest: path.join(__dirname, 'public', 'marcus-vance.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\marcus_vance_portrait_1780742587637.png',
      dest: path.join(__dirname, 'public', 'marcus-vance.jpg')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\sarah_chen_portrait_1780742605950.png',
      dest: path.join(__dirname, 'public', 'sarah-chen.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\sarah_chen_portrait_1780742605950.png',
      dest: path.join(__dirname, 'public', 'sarah-chen.jpg')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\alex_mercer_portrait_1780742624231.png',
      dest: path.join(__dirname, 'public', 'alex-mercer.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\alex_mercer_portrait_1780742624231.png',
      dest: path.join(__dirname, 'public', 'alex-mercer.jpg')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\marcus_workshop_1780742937800.png',
      dest: path.join(__dirname, 'public', 'marcus-workshop.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\marcus_workshop_1780742937800.png',
      dest: path.join(__dirname, 'public', 'marcus-workshop.jpg')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\sarah_workshop_1780742957658.png',
      dest: path.join(__dirname, 'public', 'sarah-workshop.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\sarah_workshop_1780742957658.png',
      dest: path.join(__dirname, 'public', 'sarah-workshop.jpg')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\alex_workshop_1780742976150.png',
      dest: path.join(__dirname, 'public', 'alex-workshop.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\alex_workshop_1780742976150.png',
      dest: path.join(__dirname, 'public', 'alex-workshop.jpg')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\about_page_top_1780744390096.png',
      dest: path.join(artifactsDir, 'about_page_top.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\about_page_team_1780744400053.png',
      dest: path.join(artifactsDir, 'about_page_team.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\privacy_page_1780744409270.png',
      dest: path.join(artifactsDir, 'privacy_page.png')
    },
    {
      src: 'C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\8c71c136-8ba5-4cb3-9a0a-53e289fee56d\\contact_success_1780744470827.png',
      dest: path.join(artifactsDir, 'contact_success.png')
    }
  ];

  filesToCopy.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      try {
        fs.copyFileSync(src, dest);
        console.log(`[Asset Copier] Successfully copied ${src} to ${dest}`);
      } catch (err) {
        console.error(`[Asset Copier] Error copying ${src}:`, err);
      }
    } else {
      console.warn(`[Asset Copier] Source file not found: ${src}`);
    }
  });
};

copyFiles();

const cleanUnwantedRoutes = () => {
  const routesToDelete = [
    path.join(__dirname, 'app', 'compatibility'),
    path.join(__dirname, 'app', 'blog', 'slug')
  ];

  routesToDelete.forEach((routePath) => {
    if (fs.existsSync(routePath)) {
      try {
        fs.rmSync(routePath, { recursive: true, force: true });
        console.log(`[Cleaner] Successfully deleted ${routePath}`);
      } catch (err) {
        console.error(`[Cleaner] Error deleting ${routePath}:`, err);
      }
    }
  });
};

cleanUnwantedRoutes();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["recharts"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
  redirects: async () => [
    {
      source: "/index.html",
      destination: "/",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
