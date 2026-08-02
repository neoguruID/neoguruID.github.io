// === 1. Logika Dark Mode & Menu Mobile ===
const themeToggleBtn = document.getElementById("theme-toggle");
const themeToggleBtnMobile = document.getElementById("theme-toggle-mobile");
const themeIcon = document.getElementById("theme-icon");
const themeIconMobile = document.getElementById("theme-icon-mobile");

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

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// === 2. Data Dummy Media Pembelajaran (Dibuat >10 data untuk test paginasi) ===
const mediaData = [
  {
    id: 1,
    title: "Gelang Algoritma",
    desc: "Simulasi algoritma dengan bantuan visualisasi gelang.",
    subject: "Informatika",
    topic: "Berpikir Komputasional",
    grade: "VII",
    icon: "fa-robot",
    link: "AlgoritmaGelang/MP_algoritma_gelang.html",
    target: "_blank",
  },
  {
    id: 2,
    title: "Cyber Detective",
    desc: "Permainan edukatif untuk mengasah kemampuan berpikir komputasional dan analisis data.",
    subject: "Informatika",
    topic: "Berpikir Komputasional",
    grade: "VIII",
    icon: "fa-robot",
    link: "CyberDetectiveGame/cyber_detective_game.html",
    target: "_blank",
  },
  {
    id: 3,
    title: "Media 3",
    desc: "Deskripsi media pembelajaran ke-3 untuk pengujian paginasi.",
    subject: "Informatika",
    topic: "Topik",
    grade: "IX",
    icon: "fa-database",
    link: "#",
    target: "_self",
  },
  {
    id: 4,
    title: "Media 4",
    desc: "Deskripsi media pembelajaran ke-4 untuk pengujian paginasi.",
    subject: "Informatika",
    topic: "Topik",
    grade: "VII",
    icon: "fa-microchip",
    link: "#",
    target: "_self",
  },
  {
    id: 5,
    title: "Media 5",
    desc: "Deskripsi media pembelajaran ke-5 untuk pengujian paginasi.",
    subject: "Koding dan Kecerdasan Artifisial",
    topic: "Topik",
    grade: "IX",
    icon: "fa-brain",
    link: "#",
    target: "_self",
  },
  {
    id: 6,
    title: "Media 6",
    desc: "Deskripsi media pembelajaran ke-6 untuk pengujian paginasi.",
    subject: "Informatika",
    topic: "Topik",
    grade: "Umum",
    icon: "fa-shield-alt",
    link: "#",
    target: "_self",
  },
  {
    id: 7,
    title: "Media 7",
    desc: "Deskripsi media pembelajaran ke-7 untuk pengujian paginasi.",
    subject: "Informatika",
    topic: "Topik",
    grade: "VIII",
    icon: "fa-sort-amount-down",
    link: "#",
    target: "_self",
  },
  {
    id: 8,
    title: "Media 8",
    desc: "Deskripsi media pembelajaran ke-8 untuk pengujian paginasi.",
    subject: "Informatika",
    topic: "Topik",
    grade: "VII",
    icon: "fa-binary",
    link: "#",
    target: "_self",
  },
  {
    id: 9,
    title: "Media 9",
    desc: "Deskripsi media pembelajaran ke-9 untuk pengujian paginasi.",
    subject: "Koding dan Kecerdasan Artifisial",
    topic: "Topik",
    grade: "VIII",
    icon: "fa-cat",
    link: "#",
    target: "_self",
  },
  {
    id: 10,
    title: "Media 10",
    desc: "Deskripsi media pembelajaran ke-10 untuk pengujian paginasi.",
    subject: "Informatika",
    topic: "Topik",
    grade: "VII",
    icon: "fa-cloud",
    link: "#",
    target: "_self",
  },
  {
    id: 11,
    title: "Media 11",
    desc: "Deskripsi media pembelajaran ke-11 untuk pengujian paginasi.",
    subject: "Koding dan Kecerdasan Artifisial",
    topic: "Topik",
    grade: "IX",
    icon: "fa-terminal",
    link: "#",
    target: "_self",
  },
  {
    id: 12,
    title: "Media 12",
    desc: "Deskripsi media pembelajaran ke-12 untuk pengujian paginasi.",
    subject: "Umum",
    topic: "Topik Umum",
    grade: "Umum",
    icon: "fa-map-marked-alt",
    link: "#",
    target: "_self",
  },
  {
    id: 13,
    title: "Media 13",
    desc: "Deskripsi media pembelajaran ke-13 untuk pengujian paginasi.",
    subject: "Umum",
    topic: "Topik Umum",
    grade: "Umum",
    icon: "fa-map-marked-alt",
    link: "#",
    target: "_self",
  },
];

// === 3. Variabel State Paginasi & Filter ===
let filteredData = [...mediaData];
let currentPage = 1;
const itemsPerPage = 8;

// Referensi Elemen DOM
const gridElement = document.getElementById("media-grid");
const pageInfoElement = document.getElementById("page-info");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

const searchInput = document.getElementById("search-input");
const filterKelas = document.getElementById("filter-kelas");
const filterMapel = document.getElementById("filter-mapel");

// === 4. Fungsi Render (Membuat Kartu) ===
function renderMedia() {
  gridElement.innerHTML = ""; // Bersihkan isi grid

  // Logika Paginasi
  const startIndex = (currentPage - 1) * itemsPerPage; //0
  const endIndex = startIndex + itemsPerPage; //8
  const currentItems = filteredData.slice(startIndex, endIndex);

  if (currentItems.length === 0) {
    gridElement.innerHTML = `<div class="col-span-full text-center py-10"><p class="text-gray-500 dark:text-gray-400">Tidak ada media yang cocok dengan pencarian.</p></div>`;
  }

  // Looping dan pembuatan HTML Kartu
  currentItems.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden";

    // Gunakan fontawesome default jika item.icon kosong
    const iconClass = item.icon || "fa-gamepad";

    card.innerHTML = `
                    <div class="h-32 bg-brand-accent/40 dark:bg-gray-800 flex items-center justify-center text-4xl text-brand-primary dark:text-brand-secondary relative">
                        <i class="fas ${iconClass}"></i>
                        <div class="absolute top-3 right-3 bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm">
                            Kelas ${item.grade}
                        </div>
                    </div>
                    <div class="p-5 flex flex-col flex-grow">
                        <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2 leading-tight">${item.title}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-5 line-clamp-3 flex-grow">${item.desc}</p>
                        
                        <div class="space-y-2 mb-6">
                            <div class="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                <i class="fas fa-book mt-0.5 text-brand-secondary w-4 text-center"></i>
                                <span>${item.subject}</span>
                            </div>
                            <div class="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                <i class="fas fa-layer-group mt-0.5 text-brand-secondary w-4 text-center"></i>
                                <span>${item.topic}</span>
                            </div>
                        </div>
                        
                        <a href="${item.link}" target="${item.target}" class="block w-full text-center py-2.5 bg-brand-accent/30 text-brand-primary dark:bg-gray-800 dark:text-brand-secondary rounded-xl text-sm font-semibold hover:bg-brand-primary hover:text-white dark:hover:bg-brand-secondary dark:hover:text-white transition">
                            Buka Media
                        </a>
                    </div>
                `;
    gridElement.appendChild(card);
  });

  updatePaginationControls();
}

// === 5. Fungsi Update Paginasi ===
function updatePaginationControls() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const totalItems = filteredData.length;
  const startIndex =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  pageInfoElement.innerText = `Menampilkan ${startIndex}-${endIndex} dari ${totalItems} media`;

  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage >= totalPages || totalPages === 0;
}

// === 6. Fungsi Filter & Pencarian ===
function applyFilters() {
  const qSearch = searchInput.value.toLowerCase();
  const qKelas = filterKelas.value;
  const qMapel = filterMapel.value;

  filteredData = mediaData.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(qSearch) ||
      item.desc.toLowerCase().includes(qSearch);
    const matchKelas = qKelas === "Semua" || item.grade === qKelas;
    const matchMapel = qMapel === "Semua" || item.subject === qMapel;

    return matchSearch && matchKelas && matchMapel;
  });

  currentPage = 1; // Reset halaman ke 1 setiap kali filter diubah
  renderMedia();
}

// === 7. Event Listeners ===
searchInput.addEventListener("input", applyFilters);
filterKelas.addEventListener("change", applyFilters);
filterMapel.addEventListener("change", applyFilters);

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderMedia();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

btnNext.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderMedia();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Tampilkan data pertama kali saat halaman dimuat
renderMedia();
