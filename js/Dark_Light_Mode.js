document.addEventListener("DOMContentLoaded", function () {

  /* ========== DARK MODE ========== */
  const toggle = document.getElementById("darkToggle");
  const logoImage = document.querySelector(".logo-image");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark");
      if (toggle) toggle.textContent = "☀️";
      if (logoImage) logoImage.src = "logo/Logo_himanika_putih.png";
    } else {
      document.body.classList.remove("dark");
      if (toggle) toggle.textContent = "🌙";
      if (logoImage) logoImage.src = "logo/Logo_himanika_hitam.png";
    }
  }

  // cek saat halaman dibuka
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  // toggle klik
  if (toggle) {
    toggle.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";

      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }

  /* ========== SEARCH ========== */
  const searchInput = document.getElementById("searchInput");
  const searchableElements = document.querySelectorAll(".searchable");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const keyword = this.value.toLowerCase().trim();
      let firstMatch = null;

      searchableElements.forEach(section => {
        const text = section.innerText.toLowerCase();

        if (keyword === "" || text.includes(keyword)) {
          section.style.display = "";
          if (!firstMatch && keyword !== "") {
            firstMatch = section;
          }
        } else {
          section.style.display = "none";
        }
      });

      if (firstMatch) {
        firstMatch.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

});
