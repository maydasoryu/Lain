/* =============================================
   PROJECT LAIN — DATA
   ============================================= */

export const metaPills = [
  { label: 'Android 14–16' },
  { label: 'Hyper+ Engine' },
  { label: 'Ryzen Kernel' },
  { label: 'One UI Optimized' }
];

export const techFeatures = [
  {
    title: 'Hyper+ Optimization System',
    description: 'Our proprietary optimization framework goes beyond standard Android performance tuning. Hyper+ intelligently manages system resources, predicting your needs and preallocating power where it matters most.'
  },
  {
    title: 'Ryzen Kernel Integration',
    description: 'Custom-built from the ground up for maximum efficiency on the Snapdragon 865. The Ryzen kernel implements advanced scheduler algorithms that prioritize foreground tasks.'
  },
  {
    title: 'Surgical Debloat',
    description: 'Every Samsung bloatware and redundant service has been carefully removed without compromising system stability. More storage, more memory, more freedom.'
  },
  {
    title: 'Enhanced One UI Smoothness',
    description: 'One UI has never felt this fluid. We have deep-dived into every animation, transition, and interaction to ensure 120Hz smoothness across the entire interface.'
  },
  {
    title: 'Long-Term Stability',
    description: 'Performance means nothing without reliability. PROJECT LAIN builds are tested extensively across different usage patterns. Monthly security updates and quarterly feature updates.'
  }
];

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
    description: 'The pinnacle of performance optimization. Project Aether represents the culmination of extensive kernel engineering and system-level optimizations.',
    changelog: [
      'Initial release of Hyper+ Engine v2.0',
      'Ryzen Kernel v6.1 integration',
      'GPU boost optimization for gaming',
      'Memory management improvements',
      'Thermal throttling refinements'
    ],
    knownIssues: [
      'DC Dimming may cause slight color shift',
      'High refresh rate toggle requires reboot'
    ],
    credits: ['Nihil', 'Ryzen', 'Phantom'],
    kernelSupport: 'Ryzen Kernel v6.1+',
    priceBRL: 8,
    priceUSD: 2,
    thumbnail: '/assets/thumbnails/project-aether.png',
    screenshots: [
      '/assets/screenshots/aether-1.jpg',
      '/assets/screenshots/aether-2.jpg'
    ]
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
    description: 'A refined balance of performance and battery life. Project Velvet delivers smooth daily usage with optimized power consumption.',
    changelog: [
      'Zen Kernel v4.2 implementation',
      'Adaptive battery optimization',
      'App launching speed improved 25%',
      'Notification handling latency reduced',
      'Camera app startup time reduced 30%'
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
    ]
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
    description: 'An enhanced variant of Velvet with extended customization options and microG support for a degoogled experience.',
    changelog: [
      'MicroG integration for Google-free experience',
      'Extended theming engine with 50+ accent colors',
      'Icon shape customization system',
      'Navbar gesture customization',
      'App lock with biometric support'
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
    ]
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
    description: 'Built for raw power. Project Sakana squeezes every drop of performance from the Snapdragon 865, delivering the fastest possible experience.',
    changelog: [
      'Snapdragon Performance Governor implementation',
      'CPU cluster management optimization',
      'Adreno 650 GPU overclock support',
      'Thermal ceiling raised for sustained performance',
      'Touch response latency reduced to 10ms'
    ],
    knownIssues: [
      'Battery life may be reduced under heavy gaming',
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
    ]
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
    description: 'A glimpse into the future. Project Aquiles introduces next-generation architecture concepts and experimental features.',
    changelog: [
      'Next-Gen Memory Architecture implementation',
      'Predictive app preloading system',
      'AI-based resource allocation engine',
      'Beta camera computational photography',
      'ML-based adaptive refresh rate'
    ],
    knownIssues: [
      'Occasional app crashes due to experimental features',
      'Battery calibration may be inaccurate',
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
    ]
  }
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