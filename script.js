// --- ДИАГНОСТИКА: Логирование загрузки файлов ---
console.log("🔍 НАЧАЛО ЗАГРУЗКИ ГАЛЕРЕИ");
console.log("📁 Текущий URL:", window.location.href);

// --- 1. Данные для Галереи ---
const backgrounds = [
  // Бесплатные фоны
  { file: "profile_def.png", name: "Стандартный фон", arg: "def", category: ["standard", "free"], isGif: false },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft1", category: ["standard", "free"], isGif: false },
  { file: "profile_banan.png", name: "Бананчики", arg: "banan", category: ["standard", "free"], isGif: false },
  { file: "profile_weather.png", name: "Облачка", arg: "weather", category: ["standard", "free"], isGif: false },
  { file: "IIIUHA3A_1.png", name: "IIIUHA3A - 1", arg: "IIIUHA3A_1", category: ["custom", "nature", "free"], isGif: false },
  { file: "Danivak50_1.png", name: "Danivak50 - 1", arg: "Danivak50_1", category: ["custom", "free"], isGif: false },
  { file: "Danivak50_2.png", name: "Danivak50 - 2", arg: "Danivak50_2", category: ["custom", "animals", "free"], isGif: false },
  { file: "Danivak50_3.png", name: "Danivak50 - 3", arg: "Danivak50_3", category: ["custom", "animals", "free"], isGif: false },
  { file: "Danivak50_4.png", name: "Danivak50 - 4", arg: "Danivak50_4", category: ["custom", "animals", "free"], isGif: false },
  { file: "Danivak50_5.png", name: "Danivak50 - 5", arg: "Danivak50_5", category: ["custom", "animals", "free"], isGif: false },
  { file: "profile_anime1.png", name: "Светлая мечта", arg: "profile_anime1", category: ["standard", "anime", "free"], isGif: false },
  { file: "profile_anime2.png", name: "В обьятиях неба", arg: "profile_anime2", category: ["standard", "anime", "free"], isGif: false },
  { file: "profile_anime3.png", name: "Хранительница ночи", arg: "profile_anime3", category: ["standard", "anime", "free"], isGif: false },
  { file: "profile_anime4.png", name: "Секреты Фосада", arg: "profile_anime4", category: ["standard", "anime", "free"], isGif: false },
  
  // 🎬 GIF ФОНЫ
  // ВАЖНО: Если эти файлы повреждены, скрипт автоматически:
  // 1. Попытается найти .png версию (gif_1.png, gif_2.png)
  // 2. Если нет - показывает карточку с предупреждением
  // 3. Помечает как "Требует обновления"
  
  { file: "gif_1.gif", name: "Анимированный фон - 1", arg: "gif_1", category: ["new", "free"], isGif: true },
  { file: "gif_2.gif", name: "Анимированный фон - 2", arg: "gif_2", category: ["new", "free"], isGif: true },
  
  // Платные фоны
  { file: "lizka_1.png", name: "Lizka", arg: "lizka_1", price: 17000, category: ["custom", "paid"], isGif: false },
  { file: "lizka_2.png", name: "Lizka - 2", arg: "lizka_2", price: 30000, category: ["custom", "paid"], isGif: false },
  { file: "KO3AA_1.png", name: "KO3AA - 1", arg: "KO3AA_1", price: 10000, category: ["standard", "anime", "paid"], isGif: false },
  { file: "lizka_3.png", name: "Lizka - 3", arg: "lizka_3", price: 50000, category: ["custom", "paid"], isGif: false },
  { file: "lizka_4.png", name: "Lizka - 4", arg: "lizka_4", category: ["custom", "free"], isGif: false },
  { file: "wiongoffical_1.png", name: "wiongoffical - 1", arg: "wiongoffical_1", price: 15000, category: ["standard", "anime", "paid"], isGif: false },
  { file: "profile_anime5.png", name: "Осколки тьмы", arg: "profile_anime5", price: 20000, category: ["standard", "anime", "paid"], isGif: false },
  { file: "MajesticRPRainEMS.png", name: "MajesticRP | EMS | Дождливая ночь", arg: "MajesticRPRainEMS", price: 25000, category: ["standard", "paid"], isGif: false },
  { file: "MajesticRPSnowEMS.png", name: "MajesticRP | EMS | Снежная ночь", arg: "MajesticRPSnowEMS", price: 30000, category: ["standard", "paid"], isGif: false },
];

console.log("🎬 GIF файлы в массиве:", backgrounds.filter(bg => bg.isGif).map(bg => ({ name: bg.name, file: bg.file })));

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

// --- СИСТЕМА АВТОМАТИЧЕСКОЙ ПОДМЕНЫ ФАЙЛОВ ---
const fallbackFiles = new Map(); // Сохраняем альтернативные файлы

// Функция для поиска альтернативного файла
async function findAlternativeFile(fileName) {
  const baseName = fileName.split('.')[0];
  const alternatives = [
    `${baseName}.png`,  // Если GIF не работает, пробуем PNG
    `${baseName}.jpg`,
    `${baseName}.jpeg`,
    `${baseName}.webp`,
  ];

  for (let altFile of alternatives) {
    try {
      const response = await fetch(altFile, { method: 'HEAD' });
      if (response.ok) {
        console.log(`✅ НАЙДЕН АЛЬТЕРНАТИВНЫЙ ФАЙЛ: ${altFile} для ${fileName}`);
        fallbackFiles.set(fileName, altFile);
        return altFile;
      }
    } catch (e) {
      // Файл не существует, пробуем следующий
    }
  }
  
  console.warn(`❌ НЕ НАЙДЕНА АЛЬТЕРНАТИВА для ${fileName}`);
  return null;
}

// Проверка и подмена файлов при загрузке
window.addEventListener('load', async () => {
  console.log("🔄 ПРОВЕРКА ВАЛИДНОСТИ ФАЙЛОВ:");
  
  for (let bg of backgrounds.filter(b => b.isGif)) {
    try {
      const response = await fetch(bg.file);
      const buffer = await response.arrayBuffer();
      const view = new Uint8Array(buffer);
      
      // Проверяем магические байты GIF (71, 73, 70 = "GIF")
      const isValidGif = view[0] === 71 && view[1] === 73 && view[2] === 70;
      
      if (isValidGif) {
        console.log(`✅ ВАЛИДНЫЙ GIF: ${bg.file}`);
      } else {
        console.error(`❌ НЕВАЛИДНЫЙ GIF: ${bg.file} (Тип: ${String.fromCharCode(view[0], view[1], view[2])})`);
        
        // Ищем альтернативу
        const alternative = await findAlternativeFile(bg.file);
        if (alternative) {
          console.log(`✅ ИСПОЛЬЗУЮ АЛЬТЕРНАТИВУ: ${alternative}`);
        }
      }
    } catch (error) {
      console.error(`❌ ОШИБКА проверки: ${bg.file}`, error);
    }
  }
});

// --- Галерея ---
function renderGallery() {
  gallery.innerHTML = "";
  const searchText = searchInput.value.toLowerCase().trim();
  const filtered = backgrounds.filter(bg =>
    (currentCategory === "all" || bg.category.includes(currentCategory)) &&
    bg.name.toLowerCase().includes(searchText)
  );

  if (filtered.length === 0) {
    gallery.style.display = "flex";
    gallery.style.justifyContent = "center";
    gallery.style.alignItems = "center";
    gallery.style.minHeight = "200px";

    const msg = document.createElement("p");
    msg.textContent = "Ничего не найдено :(";
    msg.className = "no-results";
    gallery.appendChild(msg);
    setTimeout(() => msg.classList.add("show"), 50);
    return;
  }

  gallery.style.display = "grid";
  gallery.style.gridTemplateColumns = "repeat(auto-fill, minmax(200px, 1fr))";
  gallery.style.gap = "20px";

  filtered.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card fade";
    
    const gifBadge = bg.isGif ? '<span class="gif-badge">GIF</span>' : '';
    
    // Используем сохранённый альтернативный файл или оригинальный
    const fileToUse = fallbackFiles.get(bg.file) || bg.file;
    
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${fileToUse}" alt="${bg.name}" data-arg="${bg.arg}" data-original="${bg.file}">
        ${gifBadge}
      </div>
      <p>${bg.name}</p>
    `;
    gallery.appendChild(card);
    setTimeout(() => card.classList.add("show"), 50);

    const imgElement = card.querySelector("img");
    
    // Обработчик ошибки - пытаемся найти альтернативу
    imgElement.addEventListener("error", async (e) => {
      const originalFile = imgElement.getAttribute("data-original");
      console.error(`❌ ОШИБКА загрузки: ${fileToUse} (оригинал: ${originalFile})`);
      
      // Если это альтернативный файл и он не работает
      if (fileToUse !== originalFile) {
        console.log(`⚠️ Альтернативный файл ${fileToUse} тоже не работает`);
      } else {
        // Пробуем найти альтернативу
        const alternative = await findAlternativeFile(originalFile);
        if (alternative) {
          console.log(`🔄 ПОВТОРНАЯ ПОПЫТКА с ${alternative}`);
          imgElement.src = alternative;
          fallbackFiles.set(originalFile, alternative);
          return;
        }
      }
      
      // Если ничего не сработало - показываем заглушку
      card.style.border = "2px solid red";
      card.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      imgElement.style.backgroundColor = "#333";
      imgElement.style.opacity = "0.3";
      
      const warning = document.createElement("div");
      warning.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #ff0000;
        font-size: 11px;
        text-align: center;
        z-index: 5;
        pointer-events: none;
        width: 80%;
      `;
      warning.innerHTML = `⚠️ Требует<br>обновления`;
      card.querySelector(".card-image-wrapper").appendChild(warning);
    });

    imgElement.addEventListener("load", () => {
      console.log(`✅ ЗАГРУЖЕНО: ${fileToUse}`);
    });

    imgElement.addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = fileToUse;
      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");

      let infoHTML = `<h3>${bg.name}</h3><hr>`;
      
      if (bg.isGif) {
        infoHTML += `<p><b>🎬 Тип:</b> Анимированный GIF</p>`;
      }
      
      if ("price" in bg && bg.price > 0) {
        infoHTML += `
          <p><b>💰 Цена:</b> ${bg.price.toLocaleString("ru-RU")} 🌱</p>
          <p><b>💳 Способ оплаты:</b> Семена</p>
        `;
      }
      
      overlayInfo.innerHTML = infoHTML;
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
  filterOptions.classList.add("hidden"); 
  filterOptions.classList.remove("show");

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
  filterOptions.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  setTimeout(() => { openBtn.style.opacity = "1"; }, 100);

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- ОБРАБОТЧИК КНОПКИ ФИЛЬТРА ---
filterBtn.addEventListener("click", () => {
    filterOptions.classList.toggle("hidden");
    filterOptions.classList.toggle("show", !filterOptions.classList.contains("hidden"));
});

document.querySelectorAll(".filter-option").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    filterOptions.classList.add("hidden"); 
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
    window.location.href = `https://t.me/FernieXBot?start=CustF${selectedArg}`;
  }
});

// --- Инициализация частиц ---
tsParticles.load("tsparticles", {
  fpsLimit: 60,
  particles: {
    number: { value: 50, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.3, width: 1 },
    move: { enable: true, speed: 1.5, outModes: { default: "out" } }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" }, onClick: { enable: true, mode: "push" } },
    modes: { repulse: { distance: 100 }, push: { quantity: 4 } }
  },
  detectRetina: true
});

// --- Запуск при загрузке ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ PAGE LOADED - Галерея готова к использованию");
});

console.log("🎉 JavaScript загружен успешно!");
console.log("ℹ️ Автоматическая система подмены файлов активна");
console.log("Откройте DevTools (F12) → Console для диагностики");
