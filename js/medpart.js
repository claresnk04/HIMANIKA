
// ================= SCROLL REVEAL =================
const revealElements = document.querySelectorAll('.media-partner-section, .partner-info, .partner-offer, .partner-requirements, .partner-contact');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150; // offset before appearing

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('reveal');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // reveal on load
