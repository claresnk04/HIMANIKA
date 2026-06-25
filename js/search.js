document.addEventListener("DOMContentLoaded", function () {

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

