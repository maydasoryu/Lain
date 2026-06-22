/* =============================================
   PROJECT LAIN — DATA
   ============================================= */

export const projectData = {
  name: 'PROJECT LAIN',
  tagline: 'Performance-focused One UI experiences engineered exclusively for Galaxy S20 FE (r8q).',
  device: 'Galaxy S20 FE (r8q)',
  telegramLink: 'https://t.me/nihilupdates',
  social: {
    updates: 'https://t.me/nihilupdates',
    development: 'https://t.me/nihilupdates',
    community: 'https://t.me/nihilupdates'
  },
  pricing: {
    brazil: { currency: 'R$', amount: '8' },
    usa: { currency: '$', amount: '2' }
  }
};

export const roms = [
  {
    id: 'project-aether',
    name: 'Project Aether',
    device: 'Galaxy S20 FE (r8q)',
    androidVersion: 'Android 16',
    buildDate: '2026-06-15',
    baseFirmware: 'One UI 8',
    systemType: 'Hyper+ Engine / Ryzen Kernel',
    statusBadge: { type: 'stable', label: 'STABLE' },
    description: 'The pinnacle of performance optimization. Project Aether represents the culmination of extensive kernel engineering and system-level optimizations, delivering unprecedented speed and responsiveness on the Galaxy S20 FE.',
    changelog: [
      'Initial release of Hyper+ Engine v2.0',
      'Ryzen Kernel v6.1 integration with advanced scheduler',
      'GPU boost optimization for gaming performance',
      'Memory management improvements reducing lag by 40%',
      'Thermal throttling algorithm refinements',
      'Boot animation updated with cinematic intro',
      'Pre-installed performance monitoring tools',
      'Advanced power profiles with smart switching',
      'Kernel samepage merging (KSM) optimizations',
      'IO scheduler tuned for flash storage'
    ],
    knownIssues: [
      'DC Dimming may cause slight color shift in certain apps',
      'High refresh rate toggle requires reboot to take effect'
    ],
    credits: ['Nihil', 'Ryzen', 'Phantom'],
    kernelSupport: 'Ryzen Kernel v6.1+',
    priceBRL: 8,
    priceUSD: 2,
    thumbnail: '/assets/thumbnails/project-aether.png',
    screenshots: [
      '/assets/screenshots/aether-1.jpg',
      '/assets/screenshots/aether-2.jpg'
    ],
    telegramLink: 'https://t.me/nihilupdates'
  },
  {
    id: 'project-velvet',
    name: 'Project Velvet',
    device: 'Galaxy S20 FE (r8q)',
    androidVersion: 'Android 15',
    buildDate: '2026-05-20',
    baseFirmware: 'One UI 7',
    systemType: 'Standard / Zen Kernel',
    statusBadge: { type: 'stable', label: 'STABLE' },
    description: 'A refined balance of performance and battery life. Project Velvet delivers smooth daily usage with optimized power consumption, making it ideal for users who prioritize endurance alongside capability.',
    changelog: [
      'Zen Kernel v4.2 implementation with efficiency governor',
      'Adaptive battery optimization extended to 72 hours',
      'App launching speed improved by 25%',
      'Notification handling latency reduced',
      'Lock screen gesture responsiveness enhanced',
      'Bluetooth audio codec prioritization',
      'Wi-Fi 6E handshake optimization',
      'Camera app startup time reduced by 30%',
      'Gallery image loading acceleration',
      'System UI framework optimizations'
    ],
    knownIssues: [],
    credits: ['Nihil', 'Zen'],
    kernelSupport: 'Zen Kernel v4.2+',
    priceBRL: 8,
    priceUSD: 2,
    thumbnail: '/assets/thumbnails/project-velvet.png',
    screenshots: [
      '/assets/screenshots/velvet-1.jpg',
      '/assets/screenshots/velvet-2.jpg'
    ],
    telegramLink: 'https://t.me/nihilupdates'
  },
  {
    id: 'project-velvet-revanced',
    name: 'Project Velvet Revanced',
    device: 'Galaxy S20 FE (r8q)',
    androidVersion: 'Android 15',
    buildDate: '2026-06-01',
    baseFirmware: 'One UI 7',
    systemType: 'Revanced Extended / Zen Kernel',
    statusBadge: { type: 'beta', label: 'BETA' },
    description: 'An enhanced variant of Velvet with extended customization options and microG support. Built for users who prefer a degoogled experience without sacrificing the refined One UI feel.',
    changelog: [
      'MicroG integration for Google-free experience',
      'Extended theming engine with 50+ accent colors',
      'Icon shape customization system',
      'Rounded corner radius controls',
      'Navbar gesture customization',
      'Status bar clock position options',
      'Quick settings tile expansion',
      'Advanced power menu modifications',
      'App lock with biometric support',
      'Scheduled dark mode with automatic triggers'
    ],
    knownIssues: [
      'Google Pay may not function without Play Services',
      'Some banking apps require additional configuration'
    ],
    credits: ['Nihil', 'Zen', 'Revanced Team'],
    kernelSupport: 'Zen Kernel v4.2+',
    priceBRL: 8,
    priceUSD: 2,
    thumbnail: '/assets/thumbnails/project-velvet-revanced.png',
    screenshots: [
      '/assets/screenshots/velvet-revanced-1.jpg',
      '/assets/screenshots/velvet-revanced-2.jpg'
    ],
    telegramLink: 'https://t.me/nihilupdates'
  },
  {
    id: 'project-sakana',
    name: 'Project Sakana',
    device: 'Galaxy S20 FE (r8q)',
    androidVersion: 'Android 14',
    buildDate: '2026-04-10',
    baseFirmware: 'One UI 6',
    systemType: 'Hyper+ Engine / Snapdragon Optimized',
    statusBadge: { type: 'stable', label: 'BEST PERFORMANCE' },
    description: 'Built for raw power. Project Sakana squeezes every drop of performance from the Snapdragon 865, delivering the fastest possible experience on the Galaxy S20 FE. The definitive choice for enthusiasts.',
    changelog: [
      'Snapdragon Performance Governor implementation',
      'CPU cluster management optimization',
      'Adreno 650 GPU overclock support',
      'Thermal ceiling raised for sustained performance',
      'Minimum brightness lowered to 1 nit',
      'Adaptive HBM (High Brightness Mode) tuning',
      'Display color accuracy calibration',
      'Touch response latency reduced to 10ms',
      'Audio DSP latency optimization',
      'SBC/aptX LL Bluetooth profile support'
    ],
    knownIssues: [
      'Battery life may be reduced under heavy gaming loads',
      'Device may run warmer during extended sessions'
    ],
    credits: ['Nihil', 'Sakana', 'Snapdragon'],
    kernelSupport: 'Snapdragon Kernel v5.0+',
    priceBRL: 8,
    priceUSD: 2,
    thumbnail: '/assets/thumbnails/project-sakana.png',
    screenshots: [
      '/assets/screenshots/sakana-1.jpg',
      '/assets/screenshots/sakana-2.jpg'
    ],
    telegramLink: 'https://t.me/nihilupdates'
  },
  {
    id: 'project-aquiles',
    name: 'Project Aquiles',
    device: 'Galaxy S20 FE (r8q)',
    androidVersion: 'Android 16',
    buildDate: '2026-06-20',
    baseFirmware: 'One UI 8',
    systemType: 'Next-Gen Architecture / Experimental',
    statusBadge: { type: 'preview', label: 'PREVIEW BUILD' },
    description: 'A glimpse into the future. Project Aquiles introduces next-generation architecture concepts and experimental features not yet ready for production. For adventurous users who want to test the bleeding edge.',
    changelog: [
      'Next-Gen Memory Architecture implementation',
      'Predictive app preloading system',
      'AI-based resource allocation engine',
      'Experimental filesystem optimizations',
      'Dynamic kernel module loading',
      'Advanced power state management',
      'Beta camera computational photography',
      'Real-time HDR video processing',
      'ML-based adaptive refresh rate',
      'Experimental 5G CA (Carrier Aggregation) tuning'
    ],
    knownIssues: [
      'Occasional app crashes due to experimental features',
      'Battery calibration may be inaccurate',
      'Some Samsung Health features unavailable',
      'Samsung Pay not supported in preview builds'
    ],
    credits: ['Nihil', 'Aquiles', 'Future Labs'],
    kernelSupport: 'Aquiles Kernel v1.0+',
    priceBRL: 8,
    priceUSD: 2,
    thumbnail: '/assets/thumbnails/project-aquiles.png',
    screenshots: [
      '/assets/screenshots/aquiles-1.jpg',
      '/assets/screenshots/aquiles-2.jpg'
    ],
    telegramLink: 'https://t.me/nihilupdates'
  }
];

export const techFeatures = [
  {
    id: 'hyper-plus',
    title: 'Hyper+ Optimization System',
    description: 'Our proprietary optimization framework goes beyond standard Android performance tuning. Hyper+ intelligently manages system resources, predicting your needs and preallocating power where it matters most. Experience instant app launches, buttery smooth scrolling, and responsive touch that feels telepathic.'
  },
  {
    id: 'ryzen-kernel',
    title: 'Ryzen Kernel Integration',
    description: 'Custom-built from the ground up for maximum efficiency on the Snapdragon 865. The Ryzen kernel implements advanced scheduler algorithms that prioritize foreground tasks while maintaining power efficiency in the background. Your device stays fast, cool, and enduring.'
  },
  {
    id: 'surgical-debloat',
    title: 'Surgical Debloat',
    description: 'Every Samsung bloatware and redundant service has been carefully removed without compromising system stability. We preserve the essential One UI experience while eliminating the hidden processes that slow down your device. More storage, more memory, more freedom.'
  },
  {
    id: 'one-ui-smoothness',
    title: 'Enhanced One UI Smoothness',
    description: 'One UI has never felt this fluid. We have deep-dived into every animation, transition, and interaction to ensure 120Hz smoothness across the entire interface. From the lock screen to app switching, every frame is crafted for perfection.'
  },
  {
    id: 'stability',
    title: 'Long-Term Stability',
    description: 'Performance means nothing without reliability. PROJECT LAIN builds are tested extensively across different usage patterns, temperature conditions, and network environments. Monthly security updates and quarterly feature updates ensure your device remains secure and up-to-date.'
  }
];

export const metaPills = [
  { label: 'Android 14–16', color: 'gold' },
  { label: 'Hyper+ Engine', color: 'gold' },
  { label: 'Ryzen Kernel', color: 'gold' },
  { label: 'One UI Optimized', color: 'gold' }
];

export const communityLinks = [
  {
    title: 'Nihil Updates',
    description: 'Official announcements and release news',
    link: 'https://t.me/nihilupdates'
  },
  {
    title: 'Nihil Development',
    description: 'Development channel and beta testing',
    link: 'https://t.me/nihilupdates'
  },
  {
    title: 'Project Access',
    description: 'Purchase and download information',
    link: 'https://t.me/nihilupdates'
  }
];