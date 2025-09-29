const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон" },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft" },
  { file: "profile_banan.png", name: "Бананчики" },
  { file: "profile_weather.png", name: "Облачка" }
];


let currentIndex = 0;
let selectedBg = null;

function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  // показываем 4 фона подряд
  const visible = backgrounds.slice(currentIndex, currentIndex + 4);
  visible.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}"><p>${bg.name}</p>`;
    card.addEventListener("click", () => {
      selectedBg = bg;
      document.getElementById("selected").textContent = "Выбрано: " + bg.name;
    });
    gallery.appendChild(card);
  });
}

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderGallery();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentIndex < backgrounds.length - 4) {
    currentIndex += 1;
    renderGallery();
  }
});

document.getElementById("saveBtn").addEventListener("click", () => {
  if (selectedBg) {
    localStorage.setItem("selectedBackground", selectedBg.file);
    alert("Фон установлен: " + selectedBg.name);
  } else {
    alert("Сначала выберите фон!");
  }
});

// при загрузке
renderGallery();
