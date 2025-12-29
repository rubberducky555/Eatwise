console.log("✅ Dashboard JS loaded");

/* ===== Navigation ===== */
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll(".view").forEach(v => {
      v.classList.remove("active");
      if (v.id === btn.dataset.view) v.classList.add("active");
    });
  });
});

/* ===== Dark Mode ===== */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* ===== Drag & Drop ===== */
const dropZone = document.getElementById("dropZone");
const fileInput = dropZone.querySelector("input");

dropZone.onclick = () => fileInput.click();

dropZone.ondragover = e => {
  e.preventDefault();
  dropZone.classList.add("drag");
};

dropZone.ondragleave = () => dropZone.classList.remove("drag");

dropZone.ondrop = e => {
  e.preventDefault();
  dropZone.classList.remove("drag");
  alert("🍎 Image uploaded! EatBot is analyzing (mock)");
};
// ===== SAFE PROFILE LOAD =====
try {
  const user = JSON.parse(localStorage.getItem("eatwiseUser"));

  if (user) {
    const nameEl = document.getElementById("profileName");
    const ageEl = document.getElementById("profileAge");

    if (nameEl) nameEl.textContent = user.name || "User";
    if (ageEl) ageEl.textContent = user.age ? `${user.age} yrs` : "";
  }
} catch (e) {
  console.warn("Profile load skipped");
}