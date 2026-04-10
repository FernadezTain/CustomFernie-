// --- ДИАГНОСТИКА: Логирование загрузки файлов ---
console.log("🔍 НАЧАЛО ЗАГРУЗКИ ГАЛЕРЕИ");
console.log("📁 Текущий URL:", window.location.href);

// --- СИСТЕМА АВТОМАТИЧЕСКОЙ ЗАМЕНЫ GIF НА ВАЛИДНЫЕ ФАЙЛЫ ---
// Если gif_1.gif и gif_2.gif повреждены, они будут заменены на:
// 1. Первый найденный валидный формат
// 2. Или скрыты из галереи

const GIF_REPLACEMENTS = {
  "gif_1.gif": ["gif_1.png", "gif_1.jpg", "gif_1.jpeg", "gif_1.webp"],
  "gif_2.gif": ["gif_2.png", "gif_2.jpg", "gif_2.jpeg", "gif_2.webp"],
  "gif_3.gif": ["gif_3.png", "gif_3.jpg", "gif_3.jpeg", "gif_3.webp"],
  "gif_4.gif": ["gif_4.png", "gif_4.jpg", "gif_4.jpeg", "gif_4.webp"],
};

// --- 1. Данные для Галереи ---
let backgrounds = [
  // Бесплатные фоны
  { file: "profile_def.png", name: "Стандартный фон", arg: "def", category: ["standard", "free"], isGif: false },

  // Платные фоны
  { file: "lizka.png", name: "Lizka", arg: "lizka", category: ["custom", "photo", "paid"], isGif: false, price: 50000, buy_id: "456" },
  { file: "girl2.png", name: "Манифест одиночества", arg: "girl2", category: ["standard", "photo", "new", "free"], isGif: false },
  { file: "watergirl2.png", name: "Мгновение", arg: "watergirl2", category: ["standard", "photo", "new", "free"], isGif: false },
  { file: "watergirl.png", name: "Шёпот тумана", arg: "watergirl", category: ["standard", "photo", "new", "free"], isGif: false },
];

console.log("🎬 GIF файлы ДО проверки:", backgrounds.filter(bg => bg.isGif).map(bg => ({ name: bg.name, file: bg.file })));

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

// --- ФУНКЦИЯ ЗАМЕНЫ НЕВАЛИДНЫХ GIF ---
async function replaceInvalidGifs() {
  console.log("🔄 ПРОВЕРКА И ЗАМЕНА НЕВАЛИДНЫХ GIF ФАЙЛОВ:");
  
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
        // GIF невалиден - ищем альтернативу
        console.error(`❌ НЕВАЛИДНЫЙ GIF: ${bg.file}`);
        
        // Определяем что это на самом деле
        let realType = "НЕИЗВЕСТНО";
        // PNG: 137 80 78 71
        if (view[0] === 137 && view[1] === 80 && view[2] === 78 && view[3] === 71) {
          realType = "PNG";
        }
        // JPG: 255 216 255
        else if (view[0] === 255 && view[1] === 216 && view[2] === 255) {
          realType = "JPG";
        }
        // WebP: 82 73 70 70 (RIFF)
        else if (view[0] === 82 && view[1] === 73 && view[2] === 70) {
          realType = "RIFF/WebP";
        }
        
        console.log(`   На самом деле это: ${realType}`);
        console.log(`   Пытаюсь найти альтернативу...`);
        
        // Ищем альтернативные файлы
        let alternatives = GIF_REPLACEMENTS[bg.file] || [];
        let found = false;
        
        for (let altFile of alternatives) {
          try {
            const altResponse = await fetch(altFile, { method: 'HEAD' });
            if (altResponse.ok) {
              console.log(`✅ НАЙДЕНА ЗАМЕНА: ${altFile} вместо ${bg.file}`);
              bg.file = altFile;
              
              // Если это PNG или JPG, то это не GIF
              if (altFile.endsWith('.png') || altFile.endsWith('.jpg') || altFile.endsWith('.jpeg')) {
                bg.isGif = false;
              }
              
              found = true;
              break;
            }
          } catch (e) {
            // Файл не существует, пробуем следующий
          }
        }
        
        if (!found) {
          console.warn(`❌ ЗАМЕНА НЕ НАЙДЕНА для ${bg.file}`);
          console.log(`   Рекомендация: загрузите один из файлов:`);
          alternatives.forEach(alt => console.log(`   - ${alt}`));
          
          // Удаляем невалидный GIF из галереи
          backgrounds = backgrounds.filter(item => item.file !== bg.file);
          console.log(`   ⚠️ Файл удалён из галереи`);
        }
      }
    } catch (error) {
      console.error(`❌ ОШИБКА при проверке ${bg.file}:`, error);
    }
  }
  
  console.log("✅ ПРОВЕРКА ЗАВЕРШЕНА");
  console.log("🎬 GIF файлы ПОСЛЕ замены:", backgrounds.filter(bg => bg.isGif).map(bg => ({ name: bg.name, file: bg.file })));
}

// Запускаем замену при загрузке страницы
window.addEventListener('load', replaceInvalidGifs);

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
    
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${bg.file}" alt="${bg.name}" data-arg="${bg.arg}">
        ${gifBadge}
      </div>
      <p>${bg.name}</p>
    `;
    gallery.appendChild(card);
    setTimeout(() => card.classList.add("show"), 50);

    const imgElement = card.querySelector("img");
    
    imgElement.addEventListener("error", () => {
      console.error(`❌ ОШИБКА загрузки: ${bg.file}`);
      card.style.border = "2px solid red";
      card.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      imgElement.style.opacity = "0.3";
    });

    imgElement.addEventListener("load", () => {
      console.log(`✅ ЗАГРУЖЕНО: ${bg.file}`);
    });

    imgElement.addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;
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
console.log("🔧 Автоматическая система замены невалидных GIF активна");
console.log("Откройте DevTools (F12) → Console для диагностики");
