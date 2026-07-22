// Dark Mode Logic
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
const themeIcon = document.getElementById("theme-icon");
const themeIconMobile = document.getElementById("theme-icon-mobile");

// Check for saved user preference, if any, on load of the website
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  updateIcons(true);
} else {
  document.documentElement.classList.remove("dark");
  updateIcons(false);
}

function updateIcons(isDark) {
  if (isDark) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    themeIconMobile.classList.remove("fa-moon");
    themeIconMobile.classList.add("fa-sun");
  } else {
    themeIcon.classList.add("fa-moon");
    themeIcon.classList.remove("fa-sun");
    themeIconMobile.classList.add("fa-moon");
    themeIconMobile.classList.remove("fa-sun");
  }
}

function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
    updateIcons(false);
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
    updateIcons(true);
  }
}

themeToggleBtn.addEventListener("click", toggleTheme);
themeToggleBtnMobile.addEventListener("click", toggleTheme);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu on click of a link
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// SCRIPT FOR PERANGKAT
// Interactive Mapel Selection Logic (Accordion Style)
function toggleKategori(id) {
  const elemenTarget = document.getElementById(id);

  // Opsional: Tutup semua sub-menu yang lain saat satu dibuka
  const semuaId = ["kat-informatika", "kat-koding", "kat-lainnya"];
  semuaId.forEach((katId) => {
    if (katId !== id) {
      document.getElementById(katId).classList.add("hidden");
    }
  });

  // Toggle (buka/tutup) sub-menu yang diklik
  elemenTarget.classList.toggle("hidden");
}
