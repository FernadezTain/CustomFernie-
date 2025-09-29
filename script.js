const backgrounds = [
    { file: "backgrounds/profile_def.png", name: "Стандартный фон", arg: "def" },
    { file: "backgrounds/profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft" },
    { file: "backgrounds/profile_banan.png", name: "Бананчики", arg: "banan" },
    { file: "backgrounds/profile_weather.png", name: "Облачка", arg: "weather" }
];

let currentIndex = 0;

const customizeBtn = document.getElementById("customize-btn");
const gallery = document.getElementById("gallery");
const photoView = document.getElementById("photo-view");
const selectedPhoto = document.getElementById("selected-photo");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const collapseBtn = document.getElementById("collapse-btn");
const backBtn = document.getElementById("back-btn");
const setBtn = document.getElementById("set-btn");
const mainTitle = document.getElementById("main-title");

customizeBtn.addEventListener("click", () => {
    customizeBtn.classList.add("hidden");
    gallery.classList.remove("hidden");
});

function renderGallery() {
    gallery.innerHTML = "";
    backgrounds.forEach((bg, index) => {
        const div = document.createElement("div");
        div.classList.add("photo-item");
        div.innerHTML = `<img src="${bg.file}" alt="${bg.name}">`;
        div.addEventListener("click", () => openPhoto(index));
        gallery.appendChild(div);
    });
}

function openPhoto(index) {
    currentIndex = index;
    mainTitle.style.transform = "translateY(-50px)";
    gallery.classList.add("hidden");
    photoView.classList.remove("hidden");
    selectedPhoto.src = backgrounds[index].file;
}

function closePhoto() {
    photoView.classList.add("hidden");
    gallery.classList.remove("hidden");
    mainTitle.style.transform = "translateY(0)";
}

function changePhoto(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = backgrounds.length - 1;
    if (currentIndex >= backgrounds.length) currentIndex = 0;
    selectedPhoto.src = backgrounds[currentIndex].file;
}

function setPhoto() {
    const arg = backgrounds[currentIndex].arg;
    window.open(`https://t.me/FernieUIBot?start=custF_${arg}`, "_blank");
}

prevBtn.addEventListener("click", () => changePhoto(-1));
nextBtn.addEventListener("click", () => changePhoto(1));
collapseBtn.addEventListener("click", closePhoto);
backBtn.addEventListener("click", () => {
    gallery.classList.add("hidden");
    customizeBtn.classList.remove("hidden");
    mainTitle.style.transform = "translateY(0)";
});
setBtn.addEventListener("click", setPhoto);

renderGallery();
