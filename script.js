const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон", arg: "def" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft1" },
  { file: "profile_banan.png", name: "Бананчики", arg: "banan" },
  { file: "profile_weather.png", name: "Облачка", arg: "weather" },
  { file: "roblox.png", name: "Скоро...", arg: "Roblox" }
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

  // Получаем текущие размеры картинки
  const rect = overlayImage.getBoundingClientRect();
  const scaleX = (rect.width + 10) / rect.width; // +10px ширина
  const scaleY = (rect.height + 10) / rect.height; // +10px высота
  const scale = Math.min(scaleX, scaleY);

  setTimeout(() => overlayImage.style.transform = `scale(${scale})`, 10);
});

  });
}

// Открыть кастомизацию
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  setTimeout(() => openBtn.classList.add("hidden"), 400);

  title.style.transform = "translateY(-180px)";
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
});

// Свернуть оверлей — вынесено из renderGallery
closeBtn.addEventListener("click", () => {
  overlayImage.style.transform = "scale(1)";
  setTimeout(() => overlay.classList.add("hidden"), 300);
});

// Установить фон — переход в бот
setBtn.addEventListener("click", () => {
  window.location.href = `https://t.me/FernieUIBot?start=CustF${selectedArg}`;
});
