/**
 * app.js — Main application initializer.
 * All content is rendered dynamically from data.js.
 */
import { roms, techFeatures, communityLinks, siteConfig, navigationLinks } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  initIntroSequence();
  renderNavigation();
  renderHero();
  renderTechnology();
  renderCarousel();
  renderROMDetails();
  renderGallery();
  renderCommunity();
  renderFooter();
});

function initIntroSequence() {
  const intro = document.getElementById("intro");
  const introLogo = document.getElementById("intro-logo");
  const heroImage = document.getElementById("hero-image-container");
  const bgVideo = document.getElementById("bg-video");

  if (bgVideo) bgVideo.play().catch(() => {});

  setTimeout(() => introLogo?.classList.add("is-visible"), 600);
  setTimeout(() => intro?.classList.add("is-hidden"), 1800);
  setTimeout(() => heroImage?.classList.add("is-visible"), 2000);
  setTimeout(() => intro?.remove(), 2500);
}

function renderNavigation() {
  const container = document.getElementById("nav-links");
  const template = document.getElementById("nav-link-template");
  navigationLinks.forEach(link => {
    const clone = template.content.cloneNode(true);
    const anchor = clone.querySelector("[data-link]");
    anchor.href = `#${link.id}`;
    anchor.textContent = link.label;
    container.appendChild(clone);
  });
}

function renderHero() {
  document.getElementById("hero-title").textContent = siteConfig.name;
  document.getElementById("hero-tagline").textContent = siteConfig.tagline;

  const pillsEl = document.getElementById("hero-pills");
  siteConfig.heroMetadata.forEach(text => {
    const pill = document.createElement("span");
    pill.className = "pill pill-text";
    pill.textContent = text;
    pillsEl.appendChild(pill);
  });

  const actionsEl = document.getElementById("hero-actions");
  const exploreBtn = document.createElement("button");
  exploreBtn.className = "btn btn--primary btn-text";
  exploreBtn.textContent = "Explore Variants";
  exploreBtn.addEventListener("click", () => {
    document.getElementById("variants")?.scrollIntoView({ behavior: "smooth" });
  });

  const communityBtn = document.createElement("button");
  communityBtn.className = "btn btn--secondary btn-text";
  communityBtn.textContent = "Community";
  communityBtn.addEventListener("click", () => {
    document.getElementById("community")?.scrollIntoView({ behavior: "smooth" });
  });

  actionsEl.appendChild(exploreBtn);
  actionsEl.appendChild(communityBtn);

  const featured = roms.find(r => r.id === siteConfig.featuredROM);
  if (featured) {
    const img = document.getElementById("hero-image");
    img.src = featured.thumbnail;
    img.alt = `${featured.name} — ${featured.description.substring(0, 120)}...`;
  }
}

function renderTechnology() {
  const container = document.getElementById("technology");
  const template = document.getElementById("tech-panel-template");

  techFeatures.forEach((feature, i) => {
    const clone = template.content.cloneNode(true);
    const panel = clone.querySelector("[data-panel]");
    const ambient = clone.querySelector("[data-ambient]");
    const title = clone.querySelector("[data-title]");
    const description = clone.querySelector("[data-description]");

    title.textContent = feature.title;
    description.textContent = feature.description;
    ambient.style.background = `radial-gradient(circle, ${feature.ambientColor}40 0%, transparent 70%)`;
    panel.dataset.index = i;

    const revealEl = clone.querySelector(".reveal");
    if (revealEl) revealEl.classList.add(`reveal--delay-${Math.min(i + 1, 5)}`);

    container.appendChild(clone);
  });
}

function renderCarousel() {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("carousel-dots");
  const template = document.getElementById("carousel-card-template");

  roms.forEach((rom, i) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector("[data-card]");
    const thumb = clone.querySelector("[data-thumbnail]");
    const name = clone.querySelector("[data-name]");
    const meta = clone.querySelector("[data-meta]");
    const badge = clone.querySelector("[data-badge]");

    thumb.src = rom.thumbnail;
    thumb.alt = `${rom.name} — Project Lain ROM thumbnail`;
    name.textContent = rom.name;
    badge.textContent = rom.statusBadge;

    if (rom.statusBadge === "BEST PERFORMANCE") badge.classList.add("badge--best");
    else if (rom.statusBadge === "PREVIEW BUILD") badge.classList.add("badge--preview");
    else badge.classList.add("badge--stable");

    [`Android ${rom.androidVersion}`, rom.baseFirmware].forEach(text => {
      const pill = document.createElement("span");
      pill.className = "pill pill-text";
      pill.textContent = text;
      meta.appendChild(pill);
    });

    card.dataset.romId = rom.id;
    track.appendChild(clone);

    card.addEventListener("click", () => {
      const detail = document.querySelector(`[data-rom-detail-id="${rom.id}"]`);
      if (detail) detail.scrollIntoView({ behavior: "smooth" });
    });

    const dot = document.createElement("button");
    dot.className = `carousel__dot${i === 0 ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `View ${rom.name}`);
    dot.setAttribute("role", "tab");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  });
}

function renderROMDetails() {
  const container = document.getElementById("rom-details");
  const template = document.getElementById("rom-detail-template");

  roms.forEach((rom, i) => {
    const clone = template.content.cloneNode(true);
    const section = clone.querySelector("[data-rom-detail]");
    const ambient = clone.querySelector("[data-ambient]");
    const grid = clone.querySelector("[data-grid]");
    const thumb = clone.querySelector("[data-thumbnail]");
    const name = clone.querySelector("[data-name]");
    const meta = clone.querySelector("[data-meta]");
    const description = clone.querySelector("[data-description]");
    const kernelContainer = clone.querySelector("[data-kernel]");
    const changelogContainer = clone.querySelector("[data-changelog]");
    const issuesContainer = clone.querySelector("[data-issues]");
    const creditsContainer = clone.querySelector("[data-credits]");
    const downloadBtn = clone.querySelector("[data-download-btn]");

    section.dataset.romDetailId = rom.id;
    section.id = `rom-${rom.id}`;

    if (i % 2 === 1) grid.classList.add("grid--reverse");

    ambient.style.background = `radial-gradient(circle, ${i % 2 === 0 ? "rgba(246,195,91,0.12)" : "rgba(143,24,32,0.12)"} 0%, transparent 70%)`;

    thumb.src = rom.thumbnail;
    thumb.alt = `${rom.name} — Project Lain ROM preview`;
    name.textContent = rom.name;

    [
      { label: "Device", value: rom.device },
      { label: "Android", value: `Android ${rom.androidVersion}` },
      { label: "Build Date", value: formatDate(rom.buildDate) },
      { label: "Base Firmware", value: rom.baseFirmware },
      { label: "System Type", value: rom.systemType },
    ].forEach(({ label, value }) => {
      const el = document.createElement("div");
      el.className = "rom-meta-item";
      el.innerHTML = `<span class="rom-meta-label">${label}</span><span class="rom-meta-value">${value}</span>`;
      meta.appendChild(el);
    });

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = rom.statusBadge;
    if (rom.statusBadge === "BEST PERFORMANCE") badge.classList.add("badge--best");
    else if (rom.statusBadge === "PREVIEW BUILD") badge.classList.add("badge--preview");
    else badge.classList.add("badge--stable");
    meta.appendChild(badge);

    description.textContent = rom.description;

    if (rom.kernelSupport) {
      const kEl = document.createElement("div");
      kEl.className = "kernel-support";
      kEl.innerHTML = `<span class="kernel-support__icon">&#9881;</span> ${rom.kernelSupport}`;
      kernelContainer.appendChild(kEl);
    }

    const changelogTitle = document.createElement("h3");
    changelogTitle.className = "rom-section-title";
    changelogTitle.textContent = "Changelog";
    changelogContainer.appendChild(changelogTitle);

    const changelist = document.createElement("ul");
    changelist.className = "changelog-list";
    rom.changelog.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      changelist.appendChild(li);
    });
    changelogContainer.appendChild(changelist);

    if (rom.knownIssues?.length) {
      const issuesTitle = document.createElement("h3");
      issuesTitle.className = "rom-section-title";
      issuesTitle.textContent = "Known Issues";
      issuesContainer.appendChild(issuesTitle);

      const issuesList = document.createElement("ul");
      issuesList.className = "issues-list";
      rom.knownIssues.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        issuesList.appendChild(li);
      });
      issuesContainer.appendChild(issuesList);
    }

    const creditsTitle = document.createElement("h3");
    creditsTitle.className = "rom-section-title";
    creditsTitle.textContent = "Credits";
    creditsContainer.appendChild(creditsTitle);

    const creditsList = document.createElement("ul");
    creditsList.className = "credits-list";
    rom.credits.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      creditsList.appendChild(li);
    });
    creditsContainer.appendChild(creditsList);

    downloadBtn.addEventListener("click", () => {
      window.dispatchEvent(new CustomEvent("openDownloadModal", { detail: { rom } }));
    });

    container.appendChild(clone);
  });
}

function renderGallery() {
  const track = document.getElementById("gallery-track");
  const template = document.getElementById("gallery-item-template");

  roms.forEach(rom => {
    rom.screenshots.forEach((screenshot, si) => {
      const clone = template.content.cloneNode(true);
      const item = clone.querySelector("[data-gallery-item]");
      const img = clone.querySelector("[data-screenshot]");

      img.src = screenshot;
      img.alt = `${rom.name} — screenshot ${si + 1}`;
      item.dataset.romId = rom.id;
      track.appendChild(clone);
    });
  });
}

function renderCommunity() {
  const container = document.getElementById("community-links");
  const template = document.getElementById("community-link-template");

  communityLinks.forEach(link => {
    const clone = template.content.cloneNode(true);
    const anchor = clone.querySelector("[data-link]");
    anchor.href = link.url;
    clone.querySelector("[data-name]").textContent = link.name;
    clone.querySelector("[data-description]").textContent = link.description;
    container.appendChild(clone);
  });
}

function renderFooter() {
  document.getElementById("footer-device").textContent = "Supported device: Galaxy S20 FE (r8q)";
  document.getElementById("footer-copyright").textContent = siteConfig.copyright;

  const linksEl = document.getElementById("footer-links");
  const template = document.getElementById("footer-link-template");

  [{ label: "Telegram Updates", url: siteConfig.telegramLink }].forEach(link => {
    const clone = template.content.cloneNode(true);
    const anchor = clone.querySelector("[data-link]");
    anchor.href = link.url;
    anchor.textContent = link.label;
    linksEl.appendChild(clone);
  });

  document.getElementById("back-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
