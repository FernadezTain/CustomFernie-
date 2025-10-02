const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон", arg: "def" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft1" },
  { file: "profile_banan.png", name: "Бананчики", arg: "banan" },
  { file: "profile_weather.png", name: "Облачка", arg: "weather" },
  { file: "IIIUHA3A_1.png", name: "IIIUHA3A - 1", arg: "IIIUHA3A_1" },
  { file: "Danivak50_1.png", name: "Danivak50 - 1", arg: "Danivak50_1" },
  { file: "comming.png", name: "Скоро...", arg: "coms" }
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const setBtn = document.getElementById("setBtn");
const closeBtn = document.getElementById("closeBtn");

let selectedArg = "";

// Заполнение галереи
function renderGallery() {
  gallery.innerHTML = "";
  backgrounds.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}" data-arg="${bg.arg}"><p>${bg.name}</p>`;
    gallery.appendChild(card);

    card.querySelector("img").addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;

      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");

      // Анимация увеличения
      const rect = overlayImage.getBoundingClientRect();
      const scaleX = (rect.width + 10) / rect.width;
      const scaleY = (rect.height + 10) / rect.height;
      const scale = Math.min(scaleX, scaleY);

      setTimeout(() => overlayImage.style.transform = `scale(${scale})`, 10);
    });
  });
}

// Открыть кастомизацию
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  setTimeout(() => openBtn.classList.add("hidden"), 400);

  // Заголовок теперь плавно сдвигается вверх
  title.style.transform = "translateY(-50px)";
  title.style.fontSize = "22px";

  renderGallery();
  gallery.classList.add("show");
  gallery.classList.remove("hidden");

  backBtn.classList.remove("hidden");
});

// Назад
backBtn.addEventListener("click", () => {
  gallery.classList.remove("show");
  setTimeout(() => gallery.classList.add("hidden"), 400);

  backBtn.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  setTimeout(() => openBtn.style.opacity = "1", 100);

  // Фикс: возвращаем скролл вверх на телефонах
  window.scrollTo({ top: 0, behavior: "smooth" });
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
