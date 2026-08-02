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

// === 2. Data Dummy Portofolio Murid (>10 data untuk pengujian paginasi) ===
const portfolioData = [
  {
    id: 1,
    title: "Space Shooter",
    student: "Reval, Riskan, Rasid",
    desc: "Game Scratch",
    subject: "Informatika",
    topic: "Pemrograman Visual",
    grade: "VIII",
    icon: "fa-gamepad",
    link: "https://scratch.mit.edu/projects/1283815487",
    target: "_blank",
  },
  {
    id: 2,
    title: "Flappy Bird",
    student: "Meilan, Naura, Riza, Widia",
    desc: "Game Scratch",
    subject: "Informatika",
    topic: "Pemrograman Visual",
    grade: "VIII",
    icon: "fa-gamepad",
    link: "https://scratch.mit.edu/projects/1283814388",
    target: "_blank",
  },
  {
    id: 3,
    title: "Tendangan Bola",
    student: "Efri, Piola, Akila",
    desc: "Game Scratch",
    subject: "Informatika",
    topic: "Pemrograman Visual",
    grade: "VII",
    icon: "fa-gamepad",
    link: "https://scratch.mit.edu/projects/1283816237",
    target: "_blank",
  },
  {
    id: 4,
    title: "Portofolio 4",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 4",
    subject: "Informatika",
    topic: "Topik",
    grade: "VIII",
    icon: "fa-calculator",
    link: "#",
    target: "_self",
  },
  {
    id: 5,
    title: "Portofolio 5",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 5",
    subject: "Informatika",
    topic: "Topik",
    grade: "VII",
    icon: "fa-user-shield",
    link: "#",
    target: "_self",
  },
  {
    id: 6,
    title: "Portofolio 6",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 6",
    subject: "Koding dan Kecerdasan Artifisial",
    topic: "Topik",
    grade: "IX",
    icon: "fa-comments",
    link: "#",
    target: "_self",
  },
  {
    id: 7,
    title: "Portofolio 7",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 7",
    subject: "Informatika",
    topic: "Topik",
    grade: "VIII",
    icon: "fa-store",
    link: "#",
    target: "_self",
  },
  {
    id: 8,
    title: "Portofolio 8",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 8",
    subject: "Koding dan Kecerdasan Artifisial",
    topic: "Topik",
    grade: "VIII",
    icon: "fa-seedling",
    link: "#",
    target: "_self",
  },
  {
    id: 9,
    title: "Portofolio 9",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 9",
    subject: "Umum",
    topic: "Topik",
    grade: "IX",
    icon: "fa-palette",
    link: "#",
    target: "_self",
  },
  {
    id: 10,
    title: "Portofolio 10",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 10",
    subject: "Informatika",
    topic: "Topik",
    grade: "IX",
    icon: "fa-layer-group",
    link: "#",
    target: "_self",
  },
  {
    id: 11,
    title: "Portofolio 11",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 11",
    subject: "Umum",
    topic: "Topik",
    grade: "VII",
    icon: "fa-book-open",
    link: "#",
    target: "_self",
  },
  {
    id: 12,
    title: "Portofolio 12",
    student: "Nama Tim",
    desc: "Deskripsi portofolio 12",
    subject: "Koding dan Kecerdasan Artifisial",
    topic: "Topik",
    grade: "VIII",
    icon: "fa-brain",
    link: "#",
    target: "_self",
  },
];

// === 3. Variabel State Paginasi & Filter ===
let filteredData = [...portfolioData];
let currentPage = 1;
const itemsPerPage = 3; // Diubah menjadi 3 item per halaman

// Referensi Elemen DOM
const gridElement = document.getElementById("portfolio-grid");
const pageInfoElement = document.getElementById("page-info");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

const searchInput = document.getElementById("search-input");
const filterKelas = document.getElementById("filter-kelas");
const filterMapel = document.getElementById("filter-mapel");

// === 4. Fungsi Render (Membuat Kartu) ===
function renderPortfolio() {
  gridElement.innerHTML = ""; // Bersihkan isi grid

  // Logika Paginasi
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  if (currentItems.length === 0) {
    gridElement.innerHTML = `<div class="col-span-full text-center py-10"><p class="text-gray-500 dark:text-gray-400">Tidak ada portofolio yang cocok dengan pencarian.</p></div>`;
  }

  // Looping dan pembuatan HTML Kartu
  currentItems.forEach((item) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden";

    const iconClass = item.icon || "fa-award";

    card.innerHTML = `
                    <div class="h-40 bg-brand-accent/40 dark:bg-gray-800 flex items-center justify-center text-5xl text-brand-primary dark:text-brand-secondary relative">
                        <i class="fas ${iconClass}"></i>
                        <div class="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
                            Kelas ${item.grade}
                        </div>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2 leading-tight">${item.title}</h3>
                        <p class="text-sm font-semibold text-brand-secondary mb-4"><i class="fas fa-user-graduate mr-1"></i> ${item.student}</p>
                        <p class="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-grow leading-relaxed">${item.desc}</p>
                        
                        <div class="space-y-3 mb-8">
                            <div class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <i class="fas fa-book mt-0.5 text-brand-secondary w-5 text-center"></i>
                                <span>${item.subject}</span>
                            </div>
                            <div class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <i class="fas fa-tag mt-0.5 text-brand-secondary w-5 text-center"></i>
                                <span>${item.topic}</span>
                            </div>
                        </div>
                        
                        <a href="${item.link}" target="${item.target}" class="block w-full text-center py-3 bg-brand-accent/30 text-brand-primary dark:bg-gray-800 dark:text-brand-secondary rounded-xl font-semibold hover:bg-brand-primary hover:text-white dark:hover:bg-brand-secondary dark:hover:text-white transition">
                            Lihat Karya
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

  pageInfoElement.innerText = `Menampilkan ${startIndex}-${endIndex} dari ${totalItems} karya`;

  btnPrev.disabled = currentPage === 1;
  btnNext.disabled = currentPage >= totalPages || totalPages === 0;
}

// === 6. Fungsi Filter & Pencarian ===
function applyFilters() {
  const qSearch = searchInput.value.toLowerCase();
  const qKelas = filterKelas.value;
  const qMapel = filterMapel.value;

  filteredData = portfolioData.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(qSearch) ||
      item.desc.toLowerCase().includes(qSearch) ||
      item.student.toLowerCase().includes(qSearch);
    const matchKelas = qKelas === "Semua" || item.grade === qKelas;
    const matchMapel = qMapel === "Semua" || item.subject === qMapel;

    return matchSearch && matchKelas && matchMapel;
  });

  currentPage = 1; // Reset halaman ke 1 setiap kali filter diubah
  renderPortfolio();
}

// === 7. Event Listeners ===
searchInput.addEventListener("input", applyFilters);
filterKelas.addEventListener("change", applyFilters);
filterMapel.addEventListener("change", applyFilters);

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPortfolio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

btnNext.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPortfolio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Tampilkan data pertama kali saat halaman dimuat
renderPortfolio();
