function toggleLPJ(card){
  const details = card.querySelector('.lpj-details');
  if(details.style.display === 'block'){
    details.style.display = 'none';
  } else {
    details.style.display = 'block';
  }
}

// Toggle LPJ card
function toggleLPJ(header){
  const details = header.nextElementSibling;
  if(details.style.display === 'block'){
    details.style.display = 'none';
  } else {
    details.style.display = 'block';
  }
}

// Modal Foto
function openModal(img){
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  modal.style.display = 'flex';
  modalImg.src = img.src;
}

function closeModal(){
  document.getElementById('photoModal').style.display = 'none';
}
