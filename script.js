const backgrounds = [
  { file: "profile_def.png", name: "Стандартный фон", arg: "def", category: ["standard"] },
  { file: "profile_creeper_Minecraft.png", name: "Крипер Minecraft", arg: "minecraft1", category: ["standard"] },
  { file: "profile_banan.png", name: "Бананчики", arg: "banan", category: ["standard"] },
  { file: "profile_weather.png", name: "Облачка", arg: "weather", category: ["standard"] },
  { file: "IIIUHA3A_1.png", name: "IIIUHA3A - 1", arg: "IIIUHA3A_1", category: ["custom", "nature"] },
  { file: "Danivak50_1.png", name: "Danivak50 - 1", arg: "Danivak50_1", category: ["custom"] },
  { file: "Danivak50_2.png", name: "Danivak50 - 2", arg: "Danivak50_2", category: ["custom", "animals"] },
  { file: "profile_anime1.png", name: "Светлая мечта", arg: "profile_anime1", category: ["standard", "anime"] },
  { file: "profile_anime2.png", name: "В обьятиях неба", arg: "profile_anime2", category: ["standard", "anime"] },
  { file: "profile_wiongoffical_1.png", name: "wiongoffical - 1", arg: "wiongoffical_1", category: ["custom", "architecture"] },
];

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const gallery = document.getElementById("gallery");
const title = document.getElementById("title");

const overlay = document.getElementById("overlay");
const overlayImage = document.getElementById("overlayImage");
const setBtn = document.getElementById("setBtn");
const closeBtn = document.getElementById("closeBtn");

const filterContainer = document.getElementById("filterContainer");
const filterBtn = document.getElementById("filterBtn");
const filterOptions = document.getElementById("filterOptions");
const searchInput = document.getElementById("searchInput");

let selectedArg = "";
let currentCategory = "all";

// --- Галерея ---
function renderGallery() {
  gallery.innerHTML = "";
  const searchText = searchInput.value.toLowerCase().trim();
  const filtered = backgrounds.filter(bg => 
    (currentCategory === "all" || bg.category.includes(currentCategory)) &&
    bg.name.toLowerCase().includes(searchText)
  );

  if(filtered.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "Ничего не найдено :(";
    msg.className = "no-results";
    gallery.appendChild(msg);
    setTimeout(() => msg.classList.add("show"), 50);
    return;
  }

  filtered.forEach(bg => {
    const card = document.createElement("div");
    card.className = "card fade";
    card.innerHTML = `<img src="${bg.file}" alt="${bg.name}" data-arg="${bg.arg}"><p>${bg.name}</p>`;
    gallery.appendChild(card);
    setTimeout(() => card.classList.add("show"), 50);

    card.querySelector("img").addEventListener("click", () => {
      selectedArg = bg.arg;
      overlayImage.src = bg.file;
      overlayImage.style.transform = "scale(1)";
      overlay.classList.remove("hidden");
    });
  });
}

searchInput.addEventListener("input", renderGallery);

// --- Открытие кастомизации ---
openBtn.addEventListener("click", () => {
  openBtn.style.opacity = "0";
  openFarm.style.opacity = "0";

  setTimeout(() => {
    openBtn.classList.add("hidden");
    openFarm.classList.add("hidden");
  }, 400);

  if(window.innerWidth < 600) title.style.transform = "translateY(-80px)";
  else title.style.transform = "translateY(-180px)";
  title.style.fontSize = "22px";

  renderGallery();
  gallery.classList.add("show");
  gallery.classList.remove("hidden");

  backBtn.classList.remove("hidden");
  filterContainer.classList.remove("hidden");

  if(window.innerWidth < 600) searchInput.focus();
});

backBtn.addEventListener("click", () => {
  gallery.classList.remove("show");
  setTimeout(() => {
    gallery.classList.add("hidden");
    gallery.innerHTML = ""; // очищаем карточки
  }, 400);

  backBtn.classList.add("hidden");
  filterContainer.classList.add("hidden");

  title.style.transform = "translateY(0)";
  title.style.fontSize = "28px";

  openBtn.classList.remove("hidden");
  openFarm.classList.remove("hidden");
  setTimeout(() => {
    openBtn.style.opacity = "1";
    openFarm.style.opacity = "1";
  }, 100);

  window.scrollTo({ top: 0, behavior: "smooth" });
});

filterBtn.addEventListener("click", () => filterOptions.classList.toggle("show"));
document.querySelectorAll(".filter-option").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    filterOptions.classList.remove("show");
    renderGallery();
  });
});

closeBtn.addEventListener("click", () => {
  overlayImage.style.transform = "scale(1)";
  setTimeout(() => overlay.classList.add("hidden"), 300);
});

setBtn.addEventListener("click", () => {
  window.location.href = `https://t.me/FernieUIBot?start=CustF${selectedArg}`;
});

const applyFarm = document.getElementById("applyFarm");

applyFarm.addEventListener("click", () => {
  const arg = `AFarm_${current}`;
  window.location.href = `https://t.me/FernieUIBot?start=CustF${arg}`;
});


// --- Авто-Добыча ---
const openFarm = document.getElementById("openFarm");
const farmMenu = document.getElementById("farmMenu");
const closeFarm = document.getElementById("closeFarm");
const farmValue = document.getElementById("farmValue");
const sliderFill = document.getElementById("sliderFill");
const sliderSteps = document.getElementById("sliderSteps");

const steps = 10;
let current = 1;
let isDragging = false;

for(let i=1;i<=steps;i++){
  const step = document.createElement("span");
  step.textContent = i;
  if(i===current) step.classList.add("active");
  sliderSteps.appendChild(step);
}

function setStep(val, animate=true){
  if(val<1) val=1;
  if(val>steps) val=steps;
  current = val;
  farmValue.textContent = val;
  const percent = (val/steps)*100;
  sliderFill.style.transition = animate ? "width 0.2s ease" : "none";
  sliderFill.style.width = percent + "%";
  [...sliderSteps.children].forEach((child, idx)=>{
    child.classList.toggle("active", idx+1===val);
  });
}

function getStepFromPointer(e){
  const track = sliderFill.parentElement;
  const rect = track.getBoundingClientRect();
  const x = e.clientX ?? (e.touches ? e.touches[0].clientX : 0);
  const relativeX = x - rect.left;
  const stepWidth = rect.width/steps;
  return Math.ceil(relativeX/stepWidth);
}

function updateSlider(e){ setStep(getStepFromPointer(e), false); }

sliderFill.parentElement.addEventListener("mousedown", e=>{ isDragging=true; updateSlider(e); });
sliderFill.parentElement.addEventListener("touchstart", e=>{ isDragging=true; updateSlider(e); }, {passive:true});
window.addEventListener("mousemove", e=>{ if(isDragging) updateSlider(e); });
window.addEventListener("touchmove", e=>{ if(isDragging) updateSlider(e); }, {passive:true});
window.addEventListener("mouseup", ()=>{ if(isDragging){ isDragging=false; setStep(current,true); }});
window.addEventListener("touchend", ()=>{ if(isDragging){ isDragging=false; setStep(current,true); }});

setStep(current,true);

// --- Анимация меню Авто-Добычи ---
openFarm.addEventListener("click", ()=>{
  openBtn.classList.add("fade-out");
  openFarm.classList.add("fade-out");
  setTimeout(()=>{
    openBtn.classList.add("hidden");
    openFarm.classList.add("hidden");
  },400);

  farmMenu.classList.remove("hidden","hide");
  farmMenu.classList.add("show");
});

closeFarm.addEventListener("click", ()=>{
  farmMenu.classList.remove("show");
  farmMenu.classList.add("hide");

  setTimeout(()=>{
    farmMenu.classList.add("hidden");
    openBtn.classList.remove("hidden","fade-out");
    openFarm.classList.remove("hidden","fade-out");
    openBtn.classList.add("fade-in");
    openFarm.classList.add("fade-in");
    setTimeout(()=>{
      openBtn.classList.remove("fade-in");
      openFarm.classList.remove("fade-in");
    },400);
  },400);
});
