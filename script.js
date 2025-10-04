const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон", arg: "def", category: ["standard"] },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft1", category: ["standard"] },
  { file: "profile_banan.png", name: "Бананчики", arg: "banan", category: ["standard"] },
  { file: "profile_weather.png", name: "Облачка", arg: "weather", category: ["standard"] },
  { file: "IIIUHA3A_1.png", name: "IIIUHA3A - 1", arg: "IIIUHA3A_1", category: ["custom", "nature"] },
  { file: "Danivak50_1.png", name: "Danivak50 - 1", arg: "Danivak50_1", category: ["custom"] },
  { file: "Danivak50_2.png", name: "Danivak50 - 2", arg: "Danivak50_2", category: ["custom", "animals"] },
  { file: "profile_anime1.png", name: "Светлая мечта", arg: "profile_anime1", category: ["standard", "anime"] },
  { file: "profile_anime2.png", name: "В обьятиях неба", arg: "profile_anime2", category: ["standard", "anime"] },
  { file: "profile_wiongoffical_1.png", name: "wiongoffical - 1", arg: "wiongoffical_1", category: ["custom", "architecture"] },
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const setBtn = document.getElementById("setBtn");
const closeBtn = document.getElementById("closeBtn");

const filterContainer = document.getElementById("filterContainer");
const filterBtn = document.getElementById("filterBtn");
const filterOptions = document.getElementById("filterOptions");

// Используем существующий input из HTML
const searchInput = document.getElementById("searchInput");

let selectedArg = "";
let currentCategory = "all";

// Рендер галереи с фильтром и поиском
function renderGallery() {
  gallery.innerHTML = "";

  const searchText = searchInput.value.toLowerCase().trim();

  const filtered = backgrounds.filter(bg => {
    const matchCategory = currentCategory === "all" || bg.category.includes(currentCategory);
    const matchSearch = bg.name.toLowerCase().includes(searchText);
    return matchCategory && matchSearch;
  });

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
    });
  });
}

// Фильтрация по вводу текста
searchInput.addEventListener("input", () => {
  renderGallery();
});

// Открыть кастомизацию
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  setTimeout(() => openBtn.classList.add("hidden"), 400);

  if (window.innerWidth < 600) {
    title.style.transform = "translateY(-80px)";
  } else {
    title.style.transform = "translateY(-180px)";
  }
  title.style.fontSize = "22px";

  renderGallery();
  gallery.classList.add("show");
  gallery.classList.remove("hidden");

  backBtn.classList.remove("hidden");
  filterContainer.classList.remove("hidden");

  // Автофокус на мобильных
  if (window.innerWidth < 600) {
    searchInput.focus();
  }
});

// Назад
backBtn.addEventListener("click", () => {
  gallery.classList.remove("show");
  setTimeout(() => gallery.classList.add("hidden"), 400);

  backBtn.classList.add("hidden");
  filterContainer.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  setTimeout(() => openBtn.style.opacity = "1", 100);

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Кнопка фильтра
filterBtn.addEventListener("click", () => {
  filterOptions.classList.toggle("show");
});

// Клик по категории
document.querySelectorAll(".filter-option").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    filterOptions.classList.remove("show");
    renderGallery();
  });
});

// Закрыть оверлей
closeBtn.addEventListener("click", () => {
  overlayImage.style.transform = "scale(1)";
  setTimeout(() => overlay.classList.add("hidden"), 300);
});

// Установить фон — переход в бот
setBtn.addEventListener("click", () => {
  window.location.href = `https://t.me/FernieUIBot?start=CustF${selectedArg}`;
});

// === Автодобыча ===
const openFarm = document.getElementById("openFarm");
const farmMenu = document.getElementById("farmMenu");
const closeFarm = document.getElementById("closeFarm");
const farmSlider = document.getElementById("farmSlider");
const farmValue = document.getElementById("farmValue");

// Функция обновления с анимацией или без
function setSliderValue(val, animate = true) {
  farmValue.textContent = val;
  const percent = ((val - farmSlider.min) / (farmSlider.max - farmSlider.min)) * 100;
  farmSlider.style.transition = animate ? "background-size 0.3s ease" : "none";
  farmSlider.style.backgroundSize = percent + "% 100%";
}

// Во время движения мышкой/пальцем — обновляем без анимации
farmSlider.addEventListener("input", () => {
  setSliderValue(farmSlider.value, false);
});

// Когда отпустили — снапим к ближайшему числу и анимируем
farmSlider.addEventListener("change", () => {
  const rounded = Math.round(farmSlider.value);
  farmSlider.value = rounded;
  setSliderValue(rounded, true);
});

// Первичная инициализация
setSliderValue(farmSlider.value);

// === Меню автодобычи ===
openFarm.addEventListener("click", () => {
  farmMenu.classList.remove("hidden");
});

closeFarm.addEventListener("click", () => {
  farmMenu.classList.add("hidden");
});

// === Интеграция с меню фонов ===
openBtn.addEventListener("click", () => {
  openFarm.classList.add("hidden");
});

backBtn.addEventListener("click", () => {
  openFarm.classList.remove("hidden");
});

