const backgrounds = [
  // Бесплатные фоны
  { file: "profile_def.png", name: "Стандартный фон", arg: "def", category: ["standard", "free"] },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft1", category: ["standard", "free"] },
  { file: "profile_banan.png", name: "Бананчики", arg: "banan", category: ["standard", "free"] },
  { file: "profile_weather.png", name: "Облачка", arg: "weather", category: ["standard", "free"] },
  { file: "IIIUHA3A_1.png", name: "IIIUHA3A - 1", arg: "IIIUHA3A_1", category: ["custom", "nature", "free"] },
  { file: "Danivak50_1.png", name: "Danivak50 - 1", arg: "Danivak50_1", category: ["custom", "free"] },
  { file: "Danivak50_2.png", name: "Danivak50 - 2", arg: "Danivak50_2", category: ["custom", "animals", "free"] },
  { file: "Danivak50_3.png", name: "Danivak50 - 3", arg: "Danivak50_3", category: ["custom", "animals", "free"] },
  { file: "Danivak50_4.png", name: "Danivak50 - 4", arg: "Danivak50_4", category: ["custom", "animals", "free"] },
  { file: "Danivak50_5.png", name: "Danivak50 - 5", arg: "Danivak50_5", category: ["custom", "animals", "free"] },
  { file: "profile_anime1.png", name: "Светлая мечта", arg: "profile_anime1", category: ["standard", "anime", "free"] },
  { file: "profile_anime2.png", name: "В обьятиях неба", arg: "profile_anime2", category: ["standard", "anime", "free"] },
  { file: "profile_anime3.png", name: "Хранительница ночи", arg: "profile_anime3", category: ["standard", "anime", "free"] },
  { file: "profile_anime4.png", name: "Секреты Фосада", arg: "profile_anime4", category: ["standard", "anime", "free"] },
  { file: "profile_weather.png", name: "Облачка", arg: "weather", category: ["standard", "free"] },
  
  // Платные фоны
  { file: "lizka_1.png", name: "Lizka", arg: "lizka_1", price: 17000, category: ["standard", "paid"] },
  { file: "lizka_2.png", name: "Lizka - 2", arg: "lizka_2", price: 30000, category: ["standard", "paid"] },
  { file: "KO3AA_1.png", name: "KO3AA - 1", arg: "KO3AA_1", price: 10000, category: ["standard", "anime", "paid"] },
  { file: "lizka_3.png", name: "Lizka - 3", arg: "lizka_3", price: 50000, category: ["standard", "paid"] },
  { file: "wiongoffical_1.png", name: "wiongoffical - 1", arg: "wiongoffical_1", price: 15000, category: ["standard", "anime", "paid"] },
  { file: "profile_anime5.png", name: "Осколки тьмы", arg: "profile_anime5", category: ["standard", "anime", "paid"] },
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const overlayInfo = document.getElementById("overlayInfo");
const setBtn = document.getElementById("setBtn");
const closeBtn = document.getElementById("closeBtn");

const filterContainer = document.getElementById("filterContainer");
const filterBtn = document.getElementById("filterBtn");
const filterOptions = document.getElementById("filterOptions");
const searchInput = document.getElementById("searchInput");

let selectedArg = "";
let currentCategory = "all";

// --- Галерея ---
function renderGallery() {
  gallery.innerHTML = "";
  const searchText = searchInput.value.toLowerCase().trim();
  const filtered = backgrounds.filter(bg =>
    (currentCategory === "all" || bg.category.includes(currentCategory)) &&
    bg.name.toLowerCase().includes(searchText)
  );

  if (filtered.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Ничего не найдено :(";
    msg.className = "no-results";
    gallery.appendChild(msg);
    setTimeout(() => msg.classList.add("show"), 50);
    return;
  }

  filtered.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card fade";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}" data-arg="${bg.arg}"><p>${bg.name}</p>`;
    gallery.appendChild(card);
    setTimeout(() => card.classList.add("show"), 50);

    card.querySelector("img").addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;
      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");

      // --- Инфо-блок ---
      if ("price" in bg && bg.price > 0) {
        overlayInfo.innerHTML = `
          <h3>${bg.name}</h3>
          <hr>
          <p><b>💰 Цена:</b> ${bg.price.toLocaleString("ru-RU")} 🌱</p>
          <p><b>💳 Способ оплаты:</b> Семена</p>
        `;
      } else {
        overlayInfo.innerHTML = `<h3>${bg.name}</h3>`;
      }
      overlayInfo.classList.remove("hidden");
      setTimeout(() => overlayInfo.classList.add("show"), 50);
    });
  });
}

searchInput.addEventListener("input", renderGallery);

// --- Открытие кастомизации ---
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  setTimeout(() => openBtn.classList.add("hidden"), 400);

  if (window.innerWidth < 600) title.style.transform = "translateY(-80px)";
  else title.style.transform = "translateY(-180px)";
  title.style.fontSize = "22px";

  renderGallery();
  gallery.classList.add("show");
  gallery.classList.remove("hidden");

  backBtn.classList.remove("hidden");
  filterContainer.classList.remove("hidden");

  if (window.innerWidth < 600) searchInput.focus();
});

backBtn.addEventListener("click", () => {
  gallery.classList.remove("show");
  setTimeout(() => {
    gallery.classList.add("hidden");
    gallery.innerHTML = "";
  }, 400);

  backBtn.classList.add("hidden");
  filterContainer.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  setTimeout(() => { openBtn.style.opacity = "1"; }, 100);

  window.scrollTo({ top: 0, behavior: "smooth" });
});

filterBtn.addEventListener("click", () => filterOptions.classList.toggle("show"));
document.querySelectorAll(".filter-option").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    filterOptions.classList.remove("show");
    renderGallery();
  });
});

// --- Закрытие оверлея ---
closeBtn.addEventListener("click", () => {
  overlayImage.style.transform = "scale(1)";
  overlayInfo.classList.remove("show");
  setTimeout(() => {
    overlay.classList.add("hidden");
    overlayInfo.classList.add("hidden");
    overlayInfo.innerHTML = "";
  }, 300);
});

// --- Установка фона ---
setBtn.addEventListener("click", () => {
  if (selectedArg) {
    window.location.href = `https://t.me/FernieUIBot?start=CustF${selectedArg}`;
  }
});
