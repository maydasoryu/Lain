/**
 * modal.js — Download modal with region selection and Telegram redirect.
 */
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("download-modal");
  const modalClose = document.getElementById("modal-close");
  const pageContent = document.getElementById("page-content");
  const stepRegion = document.getElementById("modal-step-region");
  const stepPayment = document.getElementById("modal-step-payment");
  const modalRomName = document.getElementById("modal-rom-name");
  const priceBrl = document.getElementById("price-brl");
  const priceUsd = document.getElementById("price-usd");
  const regionOptions = document.querySelectorAll(".region-option");
  const telegramBtn = document.getElementById("telegram-btn");

  let currentRom = null;

  window.addEventListener("openDownloadModal", (e) => {
    currentRom = e.detail.rom;
    openModal();
  });

  function openModal() {
    if (!currentRom) return;
    stepRegion.classList.remove("is-hidden");
    stepPayment.classList.remove("is-visible");
    modalRomName.textContent = currentRom.name;
    priceBrl.textContent = `R$${currentRom.priceBRL}`;
    priceUsd.textContent = `$${currentRom.priceUSD}`;
    regionOptions.forEach((opt) => opt.setAttribute("aria-checked", "false"));
    modal.classList.add("is-visible");
    pageContent.classList.add("is-blurred");
    document.body.style.overflow = "hidden";
    setTimeout(() => modalClose.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove("is-visible");
    pageContent.classList.remove("is-blurred");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("is-visible")) closeModal(); });

  regionOptions.forEach((option) => {
    option.addEventListener("click", () => {
      regionOptions.forEach((opt) => opt.setAttribute("aria-checked", "false"));
      option.setAttribute("aria-checked", "true");
      stepRegion.classList.add("is-hidden");
      stepPayment.classList.add("is-visible");
      telegramBtn.href = currentRom.telegramLink;
    });
  });

  // Focus trap
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Prevent background scroll
  modal.addEventListener("wheel", e => e.preventDefault());
  modal.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
});
