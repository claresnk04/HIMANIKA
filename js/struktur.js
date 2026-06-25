document.addEventListener("DOMContentLoaded", () => {
  // Fetch JSON data
  fetch('data/struktur.json')
    .then(res => {
      if (!res.ok) throw new Error("Gagal load JSON");
      return res.json();
    })
    .then(data => renderStruktur(data))
    .catch(err => {
      const container = document.getElementById('struktur-container');
      container.innerHTML = "<p>Data struktur gagal dimuat</p>";
      console.error(err);
    });

  // Initialize stagger animations
  initStagger();
});

/* ===============================
RENDER FUNCTIONS
=============================== */
function card(person) {
  return `
    <article class="card stagger-item">
      <img src="${person.foto || 'logo/Logo_himanika_hitam.png'}" alt="${person.nama}" onerror="this.src='logo/Logo_himanika_hitam.png'">
      <h5>${person.jabatan}</h5>
      <h4>${person.nama}</h4>
      ${person.info ? `<p>${person.info}</p>` : ''}
    </article>
  `;
}

function renderLevel(people, title = '') {
  if (title) {
    return `
      <h3 class="subjudul">${title}</h3>
      <div class="struktur-level stagger-container">
        ${people.map(card).join('')}
      </div>
    `;
  }
  return `
    <div class="struktur-level stagger-container">
      ${people.map(card).join('')}
    </div>
  `;
}

function renderStruktur(data) {
  const container = document.getElementById('struktur-container');

  // Clear container
  container.innerHTML = '';

  // Pembina
  container.innerHTML += renderLevel(data.pembina.anggota, data.pembina.judul);

  // Pengurus Inti
  container.innerHTML += renderLevel(data.inti.anggota, data.inti.judul);

  // Sekretariat
  container.innerHTML += renderLevel(data.sekretariat.anggota, data.sekretariat.judul);

  // Ketua Bidang
  container.innerHTML += renderLevel(data.ketuaBidang.anggota, data.ketuaBidang.judul);

  // Bidang
  data.bidang.forEach(bidang => {
    container.innerHTML += `<h3 class="subjudul">${bidang.nama}</h3>`;
    bidang.departemen.forEach(dep => {
      container.innerHTML += `<h4 class="subjudul departemen-nama" data-departemen="${dep.nama}" style="cursor: pointer; color: #2563eb;">${dep.nama} </h4>`;

      // Create program kerja container
      const programContainer = document.createElement('div');
      programContainer.className = 'program-kerja-container';
      programContainer.id = `program-${dep.nama.replace(/\s+/g, '-').toLowerCase()}`;
      programContainer.style.display = 'none';
      container.appendChild(programContainer);

      // Separate Kepala Departemen from staff
      const kepala = dep.anggota.filter(p => p.jabatan === 'Kepala Departemen');
      const staff = dep.anggota.filter(p => p.jabatan !== 'Kepala Departemen');
      if (kepala.length > 0) {
        container.innerHTML += `
          <div class="struktur-level stagger-container">
            ${kepala.map(card).join('')}
          </div>
        `;
      }
      if (staff.length > 0) {
        container.innerHTML += `
          <div class="struktur-level stagger-container">
            ${staff.map(card).join('')}
          </div>
        `;
      }
    });
  });

  // BSO
  container.innerHTML += renderLevel(data.bso.anggota, data.bso.judul);

  // DPO
  container.innerHTML += renderLevel(data.dpo.anggota, data.dpo.judul);

  // Initialize stagger animations after rendering
  initStagger();

  // Add click event listeners for department names
  document.querySelectorAll('.departemen-nama').forEach(el => {
    el.addEventListener('click', function() {
      const depName = this.dataset.departemen;
      const programContainer = document.getElementById(`program-${depName.replace(/\s+/g, '-').toLowerCase()}`);

      if (programContainer) {
        if (programContainer.style.display === 'none' || programContainer.style.display === '') {
          // Find the department data
          const bidang = data.bidang.find(b => b.departemen.some(d => d.nama === depName));
          const dep = bidang.departemen.find(d => d.nama === depName);
          // Populate program kerja if needed
          programContainer.innerHTML = `<p>Program Kerja untuk ${depName} akan ditampilkan di sini.</p>`;
          programContainer.style.display = 'block';
        } else {
          programContainer.style.display = 'none';
        }
      }
    });
  });
}

/* ===============================
STAGGER ANIMATION
=============================== */
function initStagger() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".stagger-item")
        .forEach((el, i) => {
          setTimeout(() => el.classList.add("show"), i * 120);
        });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".stagger-container")
    .forEach(el => observer.observe(el));
}



