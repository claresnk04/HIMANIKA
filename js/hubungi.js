document.querySelectorAll('.toggle-contact').forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const persons = header.nextElementSibling;

    // Toggle smooth expand
    if (persons.classList.contains('show')) {
      persons.classList.remove('show');
    } else {
      persons.classList.add('show');
    }
  });
});

  // Toggle expand/collapse contact persons
  document.querySelectorAll('.toggle-contact').forEach(title => {
    title.addEventListener('click', () => {
      const persons = title.nextElementSibling;
      persons.classList.toggle('show');
      title.classList.toggle('active');
    });
  });