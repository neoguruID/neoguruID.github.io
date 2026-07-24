// ================= MANAGER LAYAR & UI UTAMA =================
function showScreen(screenId) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// ================= ANIMASI BRIEFING BYTE =================
let briefingDialogs = [];
let currentBriefingStep = 0;
let typingTimer = null;
let spawnTimeConfig = 10; // Variabel penyimpan level waktu

function selectLevel(time) {
  spawnTimeConfig = time;

  // Dialog dinamis menyesuaikan tingkat kesulitan (waktu)
  briefingDialogs = [
    "Halo Agent! Saya **BYTE**, AI Badan Siber Nasional. Kita punya situasi DARURAT! 🚨\n\nMalware jahat baru saja mengunci database negara.",
    "Hacker meninggalkan **himpunan data mentah** dan 4 teka-teki logika yang terhubung dengan gembok 4-digit.",
    `⚠️ **PERINGATAN KRITIS!** ⚠️\nMalware ini sangat agresif. Dia akan terus menyuntikkan **1 Data Sampah (CORRUPT)** ke dalam tabel **setiap ${spawnTimeConfig} detik**! Makin lama kamu berpikir, makin banyak data sampah yang menumpuk.`,
    "**TUGASMU:**\n1. Gunakan 4 pilar **Berpikir Komputasional**.\n2. Gunakan kemampuan *Abstraksi* untuk mengabaikan data korup tersebut.\n3. Temukan 4 angka kodenya!\n\nSiap masuk ke Workstation?",
  ];

  startBriefing();
}

function startBriefing() {
  currentBriefingStep = 0;
  const overlay = document.getElementById("briefingOverlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("flex");
  showBriefingStep(currentBriefingStep);
}

function showBriefingStep(step) {
  const btnNext = document.getElementById("btnNextBriefing");
  const indicator = document.getElementById("stepIndicator");

  indicator.innerText = `Langkah ${step + 1} dari ${briefingDialogs.length}`;

  if (step === briefingDialogs.length - 1) {
    btnNext.innerText = "🚀 MASUK WORKSTATION";
    btnNext.className =
      "bg-cyber-green text-black px-5 py-2 rounded font-bold hover:bg-white transition-colors";
  } else {
    btnNext.innerText = "Lanjut ➡️";
    btnNext.className =
      "bg-cyber-accent text-black px-5 py-2 rounded font-bold hover:bg-white transition-colors";
  }

  typeWriter(briefingDialogs[step], "briefingText");
}

function typeWriter(text, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";
  let i = 0;
  let formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<b class="text-cyber-accent">$1</b>')
    .replace(/\n/g, "<br>");

  if (typingTimer) clearInterval(typingTimer);
  let tempStr = "";
  typingTimer = setInterval(() => {
    if (i < formattedText.length) {
      if (formattedText[i] === "<") {
        let tag = "";
        while (formattedText[i] !== ">" && i < formattedText.length) {
          tag += formattedText[i];
          i++;
        }
        tag += ">";
        i++;
        tempStr += tag;
      } else {
        tempStr += formattedText[i];
        i++;
      }
      container.innerHTML = tempStr;
    } else {
      clearInterval(typingTimer);
    }
  }, 25); // Kecepatan ketik
}

function nextBriefingStep() {
  if (currentBriefingStep < briefingDialogs.length - 1) {
    currentBriefingStep++;
    showBriefingStep(currentBriefingStep);
  } else {
    const overlay = document.getElementById("briefingOverlay");
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
    initGameSession();
  }
}

// ================= SISTEM DATABASE & SPAWNER =================
let originalData = [];
let CORRECT_CODE = [];

function generateMissionData() {
  // 1. Randomize Digit 1 (0-4) dan Threshold Harga
  const q1Options = [
    { price: 1000000, ans: "4" },
    { price: 3000000, ans: "3" },
    { price: 4000000, ans: "2" },
    { price: 5000000, ans: "1" },
    { price: 8000000, ans: "0" },
  ];
  const selectedQ1 = q1Options[Math.floor(Math.random() * q1Options.length)];

  // 2. Randomize Digit 2 (1-9) -> Total stok Aksesori
  const ans2 = Math.floor(Math.random() * 9) + 1;
  const stokP07 = Math.floor(ans2 / 2); // Pecah stok ke 2 barang aksesoris
  const stokP08 = ans2 - stokP07;

  // 3. Randomize Digit 3 (2-7) -> Seri HP Sumsang
  const ans3 = Math.floor(Math.random() * 6) + 2;

  // 4. Randomize Digit 4 (1-9) -> Stok barang termahal ke-2
  const ans4 = Math.floor(Math.random() * 9) + 1;

  // Set Kode Benar untuk sesi ini
  CORRECT_CODE = [
    selectedQ1.ans,
    ans2.toString(),
    ans3.toString(),
    ans4.toString(),
  ];

  // Update Tabel Data Utama
  originalData = [
    {
      id: "P01",
      nama: "HP Sumsang A1",
      kategori: "Smartphone",
      harga: 2500000,
      stok: 5,
      status: "VALID",
    },
    {
      id: "P02",
      nama: "Laptop Polio B2",
      kategori: "Laptop",
      harga: 6500000,
      stok: ans4,
      status: "VALID",
    }, // Stok urutan ke-2
    {
      id: "P03",
      nama: "HP Sumsang A" + ans3,
      kategori: "Smartphone",
      harga: 4200000,
      stok: 4,
      status: "VALID",
    }, // Seri random
    {
      id: "P04",
      nama: "ERR_NULL_0x",
      kategori: "Smartphone",
      harga: 0,
      stok: 99,
      status: "CORRUPT",
    },
    {
      id: "P05",
      nama: "Tablet Pear C3",
      kategori: "Tablet",
      harga: 3500000,
      stok: 6,
      status: "VALID",
    },
    {
      id: "P06",
      nama: "HP Sumsang A8",
      kategori: "Smartphone",
      harga: 7500000,
      stok: 2,
      status: "VALID",
    }, // Pengecoh > 5jt
    {
      id: "P07",
      nama: "Charger Ori D4",
      kategori: "Aksesori",
      harga: 150000,
      stok: stokP07,
      status: "VALID",
    }, // Dipecah
    {
      id: "P08",
      nama: "Headset Bass D8",
      kategori: "Aksesori",
      harga: 250000,
      stok: stokP08,
      status: "VALID",
    }, // Dipecah
    {
      id: "P09",
      nama: "MALWARE_SPAM",
      kategori: "Aksesori",
      harga: 999000,
      stok: 0,
      status: "CORRUPT",
    },
    {
      id: "P10",
      nama: "HP Xioami Z2",
      kategori: "Smartphone",
      harga: 3800000,
      stok: 7,
      status: "VALID",
    },
  ];

  // Ubah teks Quest 1 sesuai random threshold
  document.getElementById("quest1Text").innerHTML =
    `Berapa jumlah produk <b class="text-cyber-green">VALID</b> kategori <b>Smartphone</b> yang harganya di atas <b>Rp ${selectedQ1.price.toLocaleString("id-ID")}</b>?`;

  // Console log untuk bocoran guru saat testing :D
  console.log(`[SYS-ADMIN] Jawaban sesi ini: ${CORRECT_CODE.join("")}`);
}

let rawData = [];

let countdownInterval = null;
let countdown = 10;

function initGameSession() {
  generateMissionData(); // Generate data dan kode baru
  rawData = JSON.parse(JSON.stringify(originalData)); // Reset data
  resetFilters();
  showScreen("screenGameplay");

  // Putar Background Music saat masuk workstation
  const bgm = document.getElementById("bgMusic");
  bgm.volume = 0.3; // Mengatur volume agar tidak terlalu bising (0.0 s/d 1.0)
  bgm.play().catch((e) => console.log("Audio dicegah oleh browser"));

  // Hentikan spawner lama jika ada, lalu mulai siklus 1 detik baru
  if (countdownInterval) clearInterval(countdownInterval);
  countdown = spawnTimeConfig; // Menggunakan waktu sesuai level yang dipilih
  updateCountdownUI();
  countdownInterval = setInterval(gameLoop, 1000);
}

function gameLoop() {
  countdown--;
  updateCountdownUI();

  if (countdown <= 0) {
    spawnCorruptData();
    triggerRedFlash(); // Panggil efek kilatan merah

    // Putar suara alert (SFX) saat data corrupt disuntikkan
    const alertSfx = document.getElementById("alertSound");
    alertSfx.volume = 0.6;
    alertSfx.currentTime = 0; // Reset ke detik ke-0 agar suara tidak tumpang tindih
    alertSfx.play().catch((e) => console.log("Audio dicegah oleh browser"));

    countdown = spawnTimeConfig; // Reset ke batas waktu level yang dipilih
    setTimeout(updateCountdownUI, 1000);
  }
}

function updateCountdownUI() {
  const timerEl = document.getElementById("injectionCountdown");
  timerEl.innerText = countdown + "s";

  // Beri efek getar (ping) jika waktu sisa 3 detik atau kurang
  if (countdown <= 3 && countdown > 0) {
    timerEl.classList.add("text-white", "animate-pulse");
  } else {
    timerEl.classList.remove("text-white", "animate-pulse");
  }
}

function triggerRedFlash() {
  const overlay = document.getElementById("redFlashOverlay");
  overlay.classList.remove("opacity-0");
  overlay.classList.add("opacity-100");

  setTimeout(() => {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");
  }, 600); // Pudar setelah 0.6 detik
}

// Logika injeksi malware data
function spawnCorruptData() {
  const categories = ["Smartphone", "Laptop", "Tablet", "Aksesori"];
  const names = [
    "TROJAN_X",
    "RANSOM_W",
    "WORM_0x",
    "SQL_INJECT",
    "CORRUPT_SEC",
  ];
  const randomCat = categories[Math.floor(Math.random() * categories.length)];
  const randomName =
    names[Math.floor(Math.random() * names.length)] +
    "_" +
    Math.floor(Math.random() * 999);

  const newCorrupt = {
    id: "ERR" + Math.floor(Math.random() * 1000),
    nama: randomName,
    kategori: randomCat,
    harga: Math.floor(Math.random() * 9000000) + 100000,
    stok: Math.floor(Math.random() * 50),
    status: "CORRUPT",
  };

  rawData.push(newCorrupt);
  applyFilters(); // Render ulang dengan data baru

  // Efek visual peringatan di header
  const headerAlert = document.querySelector("header p");
  headerAlert.classList.remove("text-cyber-red");
  headerAlert.classList.add("text-white", "bg-cyber-red", "px-2");
  setTimeout(() => {
    headerAlert.classList.add("text-cyber-red");
    headerAlert.classList.remove("text-white", "bg-cyber-red", "px-2");
  }, 1000);
}

// ================= KONTROL DATA (FILTER & RENDER) =================
function renderTable(dataToRender) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  dataToRender.forEach((item) => {
    const tr = document.createElement("tr");
    // Jika corrupt, tambahkan class CSS visual, siswa harus memfilternya secara mental
    if (item.status === "CORRUPT") {
      tr.className = "corrupted-row hover:bg-black/40 transition-colors";
    } else {
      tr.className = "hover:bg-[#1f2937]/50 transition-colors";
    }

    tr.innerHTML = `
                    <td class="p-2 border-b border-cyber-border">${item.id}</td>
                    <td class="p-2 border-b border-cyber-border">${item.nama}</td>
                    <td class="p-2 border-b border-cyber-border">${item.kategori}</td>
                    <td class="p-2 border-b border-cyber-border">Rp ${item.harga.toLocaleString("id-ID")}</td>
                    <td class="p-2 border-b border-cyber-border">${item.stok}</td>
                    <td class="p-2 border-b border-cyber-border text-center">
                        ${
                          item.status === "VALID"
                            ? '<span class="text-cyber-green bg-cyber-green/10 px-2 py-1 rounded text-xs">VALID</span>'
                            : '<span class="text-cyber-red bg-cyber-red/10 px-2 py-1 rounded text-xs">CORRUPT</span>'
                        }
                    </td>
                `;
    tbody.appendChild(tr);
  });
  document.getElementById("rowCount").innerText = `${dataToRender.length} Data`;
}

function applyFilters() {
  const kat = document.getElementById("filterKategori").value;
  // Hanya filter kategori yang ada. Filter status sudah dihapus dari UI.
  const filteredData = rawData.filter(
    (item) => kat === "ALL" || item.kategori === kat,
  );
  renderTable(filteredData);
}

function sortDataByHarga() {
  const kat = document.getElementById("filterKategori").value;
  let currentView = rawData.filter(
    (item) => kat === "ALL" || item.kategori === kat,
  );

  // Urutkan dari termahal
  currentView.sort((a, b) => b.harga - a.harga);
  renderTable(currentView);
}

function resetFilters() {
  document.getElementById("filterKategori").value = "ALL";
  renderTable(rawData);
}

// ================= KONSOL BRANKAS =================
const inputs = document.querySelectorAll(".digit-input");
inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    // Hanya boleh angka
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });
  // Navigasi backspace
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

function unlockVault() {
  const userCode = [
    document.getElementById("d1").value,
    document.getElementById("d2").value,
    document.getElementById("d3").value,
    document.getElementById("d4").value,
  ];

  const fb = document.getElementById("vaultFeedback");

  if (userCode.includes("")) {
    fb.innerText = "Masukkan 4 digit kode!";
    fb.classList.remove("hidden");
    return;
  }

  let isCorrect = userCode.every((val, index) => val === CORRECT_CODE[index]);

  if (isCorrect) {
    fb.classList.add("hidden");
    if (countdownInterval) clearInterval(countdownInterval); // Matikan spawner
    document.getElementById("winModal").style.display = "flex";
  } else {
    fb.innerText = "Akses Ditolak! Analisis ulang data yang valid.";
    fb.classList.remove("hidden");
    // Efek getar salah
    const container =
      document.querySelector(".lock-container") ||
      document.querySelector(".flex.justify-center.gap-2");
    container.classList.add("animate-bounce");
    setTimeout(() => container.classList.remove("animate-bounce"), 500);
  }
}

// ================= KELUAR & RESET =================
function confirmExit() {
  // Gunakan custom modal alih-alih confirm() bawaan browser
  const fb = document.getElementById("vaultFeedback");
  fb.innerHTML = `Keluar? <button onclick="endSession()" class="text-white underline ml-2">Ya</button> <button onclick="document.getElementById('vaultFeedback').classList.add('hidden')" class="text-white underline ml-2">Batal</button>`;
  fb.classList.remove("hidden");
}

function endSession() {
  if (countdownInterval) clearInterval(countdownInterval);
  document.getElementById("vaultFeedback").classList.add("hidden");
  resetGameAndMenu();
}

function resetGameAndMenu() {
  document.getElementById("winModal").style.display = "none";

  // Hentikan musik saat kembali ke menu utama
  const bgm = document.getElementById("bgMusic");
  bgm.pause();
  bgm.currentTime = 0;

  document.getElementById("d1").value = "";
  document.getElementById("d2").value = "";
  document.getElementById("d3").value = "";
  document.getElementById("d4").value = "";
  document.getElementById("filterKategori").value = "ALL";
  showScreen("screenMainMenu");
}
