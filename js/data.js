export const roms = [
  {
    id: "aether", name: "Project Aether", device: "Galaxy S20 FE (r8q)",
    androidVersion: "14", buildDate: "2025-01-15", baseFirmware: "G780FXXS9HWA2",
    systemType: "Debloated, Optimized", statusBadge: "STABLE",
    description: "Project Aether is the foundational ROM of the Lain collection. Built for users who demand a clean, stable, and lightweight One UI experience without sacrificing core functionality. Every system app has been surgically evaluated, with only essential services retained. The result is a ROM that breathes — responsive, uncluttered, and engineered for daily reliability.",
    changelog: ["Initial stable release based on Android 14", "Full debloat of Samsung and carrier bloatware", "Optimized memory management for 6GB/8GB variants", "Custom thermal profile for sustained performance", "Enhanced battery calibration routines", "System-wide animation speed adjustments", "Updated security patch level to January 2025"],
    knownIssues: ["Minor fingerprint sensor delay on cold boot (resolves after first unlock)"],
    credits: ["Lead Developer: Nihil", "Testing: Lain Community", "Kernel Base: Samsung Open Source"],
    kernelSupport: "Ryzen Kernel v3.2+", priceBRL: 8, priceUSD: 2,
    thumbnail: "assets/thumbnails/project-aether.png",
    screenshots: ["assets/screenshots/aether-1.png", "assets/screenshots/aether-2.png"],
    telegramLink: "https://t.me/nihilupdates",
  },
  {
    id: "velvet", name: "Project Velvet", device: "Galaxy S20 FE (r8q)",
    androidVersion: "15", buildDate: "2025-03-22", baseFirmware: "G780FXXS9JXC4",
    systemType: "Debloated, Enhanced One UI, Optimized", statusBadge: "STABLE",
    description: "Project Velvet represents the refined evolution of the Lain experience. Building upon Aether's foundation, Velvet introduces deeper One UI customizations, enhanced smoothness profiles, and a meticulously tuned system stack. This ROM is designed for users who want the complete Samsung experience — polished, not bloated. Every transition, every animation, every interaction has been calibrated for fluidity.",
    changelog: ["Android 15 base with One UI 7.0 framework", "Enhanced system animation curves for butter-smooth transitions", "Advanced memory management with adaptive swapping", "Custom GPU scheduler for improved rendering performance", "Refined debloat with optional Samsung service restoration", "Improved Doze mode for extended battery life", "System-wide dark mode enhancements", "Updated security patch level to March 2025", "Per-app battery optimization profiles", "Custom notification management system"],
    knownIssues: ["Samsung Pay may require re-authentication after flashing", "VoLTE may need manual reconfiguration on some carriers"],
    credits: ["Lead Developer: Nihil", "Testing: Lain Community", "Kernel Base: Samsung Open Source", "Animation Framework: Lain R&D"],
    kernelSupport: "Ryzen Kernel v4.0+", priceBRL: 8, priceUSD: 2,
    thumbnail: "assets/thumbnails/project-velvet.png",
    screenshots: ["assets/screenshots/velvet-1.png", "assets/screenshots/velvet-2.png"],
    telegramLink: "https://t.me/nihilupdates",
  },
  {
    id: "velvet-revanced", name: "Project Velvet ReVanced", device: "Galaxy S20 FE (r8q)",
    androidVersion: "15", buildDate: "2025-04-10", baseFirmware: "G780FXXS9JXC4",
    systemType: "Debloated, Enhanced One UI, ReVanced Integrated, Optimized", statusBadge: "STABLE",
    description: "Project Velvet ReVanced takes the Velvet experience further by integrating ReVanced patches directly into the system framework. This variant is crafted for users who want a complete, ad-free, privacy-focused experience out of the box. System-level ReVanced integration ensures seamless operation of patched applications without the need for separate installations. It is Velvet, elevated.",
    changelog: ["All Project Velvet features included", "System-level ReVanced integration", "Pre-patched YouTube, YouTube Music, and Reddit", "Ad-blocking at the DNS and system service level", "Privacy-hardened Google Play Services configuration", "Custom hosts file for additional ad blocking", "Optimized ReVanced patch compatibility layer", "Updated security patch level to April 2025"],
    knownIssues: ["Some banking applications may detect root — use with caution", "ReVanced patches may require manual update after system updates"],
    credits: ["Lead Developer: Nihil", "Testing: Lain Community", "ReVanced Patches: ReVanced Team", "Kernel Base: Samsung Open Source"],
    kernelSupport: "Ryzen Kernel v4.0+", priceBRL: 8, priceUSD: 2,
    thumbnail: "assets/thumbnails/project-velvet-revanced.png",
    screenshots: ["assets/screenshots/velvet-revanced-1.png", "assets/screenshots/velvet-revanced-2.png"],
    telegramLink: "https://t.me/nihilupdates",
  },
  {
    id: "sakana", name: "Project Sakana", device: "Galaxy S20 FE (r8q)",
    androidVersion: "16", buildDate: "2025-06-01", baseFirmware: "G780FXXUAKPD1",
    systemType: "Debloated, Hyper+ Optimized, Ryzen Kernel, One UI Optimized", statusBadge: "BEST PERFORMANCE",
    description: "Project Sakana is the pinnacle of the Lain collection. Engineered with the Hyper+ Optimization System and Ryzen Kernel integration, Sakana delivers the absolute peak of Galaxy S20 FE performance. Every subsystem has been stripped, tuned, and rebuilt for speed. This is not a ROM — it is a surgical recalibration of what the S20 FE can achieve. If performance is your only metric, Sakana is your answer.",
    changelog: ["Android 16 base with One UI 8.0 framework", "Hyper+ Optimization System v2.0", "Ryzen Kernel v5.1 integration with custom governors", "Aggressive system debloat — minimal footprint", "Custom I/O scheduler for storage optimization", "Advanced CPU frequency scaling with performance bias", "GPU overclocking profiles (stable and experimental)", "Memory compression with zRam tuning", "Network stack optimization for reduced latency", "Custom thermal throttling curves", "Per-app performance profiles", "Updated security patch level to June 2025", "System-level animation overrides for maximum responsiveness", "Enhanced audio processing pipeline", "Battery optimization without performance compromise"],
    knownIssues: ["Battery life may be reduced under sustained heavy load", "Some Samsung features intentionally removed — not a full One UI experience", "Experimental GPU profiles may cause instability — use at own risk"],
    credits: ["Lead Developer: Nihil", "Testing: Lain Community", "Kernel Base: Samsung Open Source", "Hyper+ System: Lain R&D", "Ryzen Kernel Team"],
    kernelSupport: "Ryzen Kernel v5.1+", priceBRL: 8, priceUSD: 2,
    thumbnail: "assets/thumbnails/project-sakana.png",
    screenshots: ["assets/screenshots/sakana-1.png", "assets/screenshots/sakana-2.png"],
    telegramLink: "https://t.me/nihilupdates",
  },
  {
    id: "aquiles", name: "Project Aquiles", device: "Galaxy S20 FE (r8q)",
    androidVersion: "16", buildDate: "2025-06-15", baseFirmware: "G780FXXUAKPD1",
    systemType: "Debloated, Hyper+ Optimized, Ryzen Kernel, One UI Optimized", statusBadge: "PREVIEW BUILD",
    description: "Project Aquiles is the latest evolution in the Lain lineage — a preview of what's next. Building on everything Sakana achieved, Aquiles introduces the next generation of Hyper+ optimization and refined kernel tuning. This is a preview build: it works, it performs, but it is still being shaped. For those who want to experience the cutting edge before it's finalized, Aquiles is your gateway.",
    changelog: ["Android 16 base with latest One UI framework", "Hyper+ Optimization System v2.1 (preview)", "Ryzen Kernel v5.2 (preview) with refined governors", "Further debloat refinement from Sakana baseline", "Improved I/O scheduler with read-ahead tuning", "Enhanced CPU frequency scaling algorithms", "Refined thermal profiles for better sustained performance", "Updated security patch level to June 2025", "Experimental per-app resource allocation", "New animation engine with variable refresh rate support"],
    knownIssues: ["Preview build — may contain unresolved bugs", "Some features may change or be removed before stable release", "Not recommended as a daily driver for critical use", "Battery optimization still being calibrated"],
    credits: ["Lead Developer: Nihil", "Testing: Lain Community", "Kernel Base: Samsung Open Source", "Hyper+ System: Lain R&D", "Ryzen Kernel Team"],
    kernelSupport: "Ryzen Kernel v5.2+", priceBRL: 8, priceUSD: 2,
    thumbnail: "assets/thumbnails/project-aquiles.png",
    screenshots: ["assets/screenshots/aquiles-1.png", "assets/screenshots/aquiles-2.png"],
    telegramLink: "https://t.me/nihilupdates",
  },
];

export const techFeatures = [
  { id: "hyper", title: "Hyper+ Optimization System", description: "A proprietary optimization framework that reimagines how Android manages resources. Hyper+ analyzes usage patterns, prioritizes active processes, and reallocates system memory in real time. The result is an interface that responds before you finish the gesture — fluid, predictable, and fast.", ambientColor: "#F6C35B" },
  { id: "ryzen", title: "Ryzen Kernel Integration", description: "Built on a custom-tuned Linux kernel, Ryzen Kernel integration provides deep hardware-level optimization. Custom CPU governors, I/O schedulers, and memory management routines work in concert to extract every ounce of performance from the Exynos and Snapdragon variants of the S20 FE.", ambientColor: "#8F1820" },
  { id: "debloat", title: "Surgical Debloat", description: "Not all bloat is created equal. Our surgical approach evaluates every pre-installed service, package, and daemon. Only what serves a purpose remains. What's removed isn't just deleted — the system is restructured to operate without it, eliminating dependency chains and reducing overhead at the architectural level.", ambientColor: "#F6C35B" },
  { id: "smoothness", title: "Enhanced One UI Smoothness", description: "Samsung's One UI is beautiful — but it can be faster. We've recalibrated animation curves, reduced transition delays, and optimized rendering pipelines. Every scroll, every swipe, every app launch feels lighter. This isn't about removing Samsung's design language; it's about perfecting it.", ambientColor: "#8F1820" },
  { id: "stability", title: "Long-Term Stability", description: "Performance means nothing without reliability. Every Lain ROM is engineered for sustained stability — not just on day one, but months into use. Memory leak prevention, thermal management, and automated system housekeeping ensure your device performs consistently over time. This is engineering you can trust.", ambientColor: "#F6C35B" },
];

export const communityLinks = [
  { name: "Nihil Updates", url: "https://t.me/nihilupdates", description: "Official update channel — release announcements, changelogs, and build notifications." },
  { name: "Nihil Development", url: "https://t.me/nihildev", description: "Development channel — behind-the-scenes progress, testing builds, and technical discussions." },
  { name: "Project Access Information", url: "https://t.me/nihilupdates", description: "How to obtain and install Project Lain ROMs. Step-by-step guidance for new users." },
];

export const navigationLinks = [
  { id: "technology", label: "Technology" },
  { id: "variants", label: "Variants" },
  { id: "gallery", label: "Gallery" },
  { id: "community", label: "Community" },
];

export const siteConfig = {
  name: "PROJECT LAIN",
  tagline: "Performance-focused One UI experiences engineered exclusively for Galaxy S20 FE (r8q).",
  heroMetadata: ["Android 14–16", "Hyper+ Engine", "Ryzen Kernel", "One UI Optimized"],
  featuredROM: "sakana",
  telegramLink: "https://t.me/nihilupdates",
  copyright: "© 2025 Project Lain. All rights reserved.",
};
