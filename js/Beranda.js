document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".oa-wrapper");
  if (!wrapper) return;

  const scroll = wrapper.querySelector(".oa-scroll");
  const btnLeft = wrapper.querySelector(".oa-nav.left");
  const btnRight = wrapper.querySelector(".oa-nav.right");

  if (!scroll || !btnLeft || !btnRight) {
    console.error("OA ELEMENT TIDAK KETEMU");
    return;
  }

  /* ================= DUPLIKASI ================= */
  scroll.innerHTML += scroll.innerHTML;
  const cards = scroll.querySelectorAll(".oa-card");

  /* ================= PANAH ================= */
  btnLeft.addEventListener("click", () => {
    pauseAuto();
    scroll.scrollBy({ left: -300, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    pauseAuto();
    scroll.scrollBy({ left: 300, behavior: "smooth" });
  });

  /* ================= HIGHLIGHT ================= */
  function updateActive() {
    const center = scroll.scrollLeft + scroll.offsetWidth / 2;
    let closest = null;
    let min = Infinity;

    cards.forEach(card => {
      const c = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.abs(center - c);
      if (d < min) {
        min = d;
        closest = card;
      }
    });

    cards.forEach(c => c.classList.remove("active"));
    closest?.classList.add("active");
  }

  scroll.addEventListener("scroll", updateActive);
  updateActive();

  /* ================= AUTO SCROLL ================= */
  let auto = true;
  const speed = 0.6;

  function loop() {
    if (auto) scroll.scrollLeft += speed;

    if (scroll.scrollLeft >= scroll.scrollWidth / 2) {
      scroll.scrollLeft = 0;
    }

    requestAnimationFrame(loop);
  }
  loop();

  function pauseAuto() {
    auto = false;
    clearTimeout(pauseAuto.t);
    pauseAuto.t = setTimeout(() => auto = true, 1200);
  }

  /* ================= PAUSE SAAT INTERAKSI ================= */
  ["mousedown","touchstart","wheel"].forEach(e =>
    scroll.addEventListener(e, pauseAuto)
  );
});
