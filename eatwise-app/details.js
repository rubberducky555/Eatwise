console.log("details.js loaded ✅");

// -------------------------
// Disease chips (multi-select)
// -------------------------
const chips = document.querySelectorAll(".chip");
let selectedDiseases = [];

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    const disease = chip.innerText;

    chip.classList.toggle("active");

    if (selectedDiseases.includes(disease)) {
      selectedDiseases = selectedDiseases.filter(d => d !== disease);
    } else {
      selectedDiseases.push(disease);
    }
  });
});

// -------------------------
// Pregnancy toggle (female only)
// -------------------------
const genderSelect = document.querySelector("select");

const pregnancyField = document.createElement("div");
pregnancyField.innerHTML = `
  <label>Are you pregnant?</label>
  <select id="pregnant">
    <option value="no">No</option>
    <option value="yes">Yes</option>
  </select>
`;
pregnancyField.style.display = "none";
genderSelect.parentElement.appendChild(pregnancyField);

genderSelect.addEventListener("change", () => {
  pregnancyField.style.display =
    genderSelect.value === "Female" ? "block" : "none";
});

// -------------------------
// FORM SUBMIT → REDIRECT
// -------------------------
const form = document.getElementById("detailsForm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page reload

  // Collect values
  const name = form.querySelector('input[placeholder="Your full name"]').value;
  const age = form.querySelector('input[placeholder="Years"]').value;
  const gender = genderSelect.value;
  const height = form.querySelector('input[placeholder="cm"]').value;
  const weight = form.querySelector('input[placeholder="kg"]').value;
  const pregnant =
    document.getElementById("pregnant")?.value || "no";

  const userProfile = {
    name,
    age,
    gender,
    height,
    weight,
    pregnant,
    diseases: selectedDiseases
  };

  console.log("User profile saved ✅", userProfile);

  // (Optional) save locally for now
  localStorage.setItem("eatwiseProfile", JSON.stringify(userProfile));

  // ✅ REDIRECT TO DASHBOARD
  window.location.href = "dashboard.html";
});
