const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft" },
  { file: "profile_banan.png", name: "Бананчики" },
  { file: "profile_weather.png", name: "Облачка" }
];

const openGalleryBtn = document.getElementById("openGalleryBtn");
const overlay = document.getElementById("overlay");
const gallery = document.getElementById("gallery");
const selectedBgDiv = document.getElementById("selected-bg");
const overlayImg = document.getElementById("overlay-img");

let selectedBg = null;

openGalleryBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  renderGallery();
});

function renderGallery() {
  gallery.innerHTML = "";
  selectedBgDiv.style.display = "none";

  backgrounds.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}"><p>${bg.name}</p>`;
    card.addEventListener("click", () => showSelectedBg(bg));
    gallery.appendChild(card);
  });
}

function showSelectedBg(bg) {
  selectedBg = bg;
  overlayImg.src = bg.file;
  selectedBgDiv.style.display = "block";
}

document.getElementById("closeBtn").addEventListener("click", () => {
  selectedBgDiv.style.display = "none";
});

document.getElementById("setBtn").addEventListener("click", () => {
  if (selectedBg) {
    localStorage.setItem("selectedBackground", selectedBg.file);
    alert("Фон установлен: " + selectedBg.name);
    overlay.style.display = "none";
  }
});
