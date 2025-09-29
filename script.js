const backgrounds = [
  { file: "backgrounds/profile.png", name: "Стандартный фон" },
  { file: "backgrounds/profile_creeper_Minecraft.png", name: "Крипер Minecraft" },
  { file: "backgrounds/profile_banan.png", name: "Бананчики" },
  { file: "backgrounds/profile_weather.png", name: "Облачка" }
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

// Заполнение галереи
function renderGallery() {
  gallery.innerHTML = "";
  backgrounds.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}"><p>${bg.name}</p>`;
    gallery.appendChild(card);
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
