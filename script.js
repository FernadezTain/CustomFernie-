const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft" },
  { file: "profile_banan.png", name: "Бананчики" },
  { file: "profile_weather.png", name: "Облачка" }
];

const gallery = document.getElementById("gallery");
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");
const overlayName = document.getElementById("overlay-name");

let selectedBg = null;

function renderGallery() {
  gallery.innerHTML = "";
  backgrounds.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}"><p>${bg.name}</p>`;
    card.addEventListener("click", () => showOverlay(bg));
    gallery.appendChild(card);
  });
}

function showOverlay(bg) {
  selectedBg = bg;
  overlayImg.src = bg.file;
  overlayName.textContent = bg.name;
  overlay.style.display = "flex";
}

document.getElementById("closeBtn").addEventListener("click", () => {
  overlay.style.display = "none";
});

document.getElementById("setBtn").addEventListener("click", () => {
  if (selectedBg) {
    localStorage.setItem("selectedBackground", selectedBg.file);
    alert("Фон установлен: " + selectedBg.name);
    overlay.style.display = "none";
  }
});

renderGallery();
