const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft" },
  { file: "profile_banan.png", name: "Бананчики" },
  { file: "profile_weather.png", name: "Облачка" }
];

let currentIndex = 0;
let selectedIndex = 0;

function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  backgrounds.forEach((bg, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}"><p>${bg.name}</p>`;
    card.addEventListener("click", () => openViewer(index));
    gallery.appendChild(card);
  });
}

function openViewer(index) {
  selectedIndex = index;
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");
  viewerImg.src = backgrounds[index].file;
  viewer.classList.remove("hidden");
}

function closeViewer() {
  document.getElementById("viewer").classList.add("hidden");
}

function prevViewer() {
  selectedIndex = (selectedIndex - 1 + backgrounds.length) % backgrounds.length;
  document.getElementById("viewerImg").src = backgrounds[selectedIndex].file;
}

function nextViewer() {
  selectedIndex = (selectedIndex + 1) % backgrounds.length;
  document.getElementById("viewerImg").src = backgrounds[selectedIndex].file;
}

function setViewer() {
  const bg = backgrounds[selectedIndex];
  const param = bg.file.includes("banan") ? "banan" :
                bg.file.includes("Minecraft") ? "minecraft" :
                bg.file.includes("weather") ? "weather" : "def";
  window.open(`https://t.me/FernieUIBot?start=custF_${param}`, "_blank");
}

document.getElementById("backBtn").addEventListener("click", closeViewer);
document.getElementById("collapseView").addEventListener("click", closeViewer);
document.getElementById("prevView").addEventListener("click", prevViewer);
document.getElementById("nextView").addEventListener("click", nextViewer);
document.getElementById("setView").addEventListener("click", setViewer);

renderGallery();
