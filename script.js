const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft" },
  { file: "profile_banan.png", name: "Бананчики" },
  { file: "profile_weather.png", name: "Облачка" }
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");
const sideButtons = document.getElementById("sideButtons");
const setBtn = document.getElementById("setBtn");
const collapseBtn = document.getElementById("collapseBtn");

function renderGallery() {
  gallery.innerHTML = "";
  backgrounds.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}"><p>${bg.name}</p>`;
    gallery.appendChild(card);

    // Клик по фото
    card.querySelector("img").addEventListener("click", () => {
      enlargeImage(bg.file);
    });
  });
}

function enlargeImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.className = "enlarged-img";
  document.body.appendChild(img);

  sideButtons.classList.add("show");
  sideButtons.classList.remove("hidden");

  // Клик по увеличенному фото для сворачивания
  img.addEventListener("click", () => {
    img.remove();
    sideButtons.classList.remove("show");
    sideButtons.classList.add("hidden");
  });
}

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

backBtn.addEventListener("click", () => {
  gallery.classList.remove("show");
  setTimeout(() => gallery.classList.add("hidden"), 400);

  backBtn.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  setTimeout(() => openBtn.style.opacity = "1", 100);

  sideButtons.classList.remove("show");
});
