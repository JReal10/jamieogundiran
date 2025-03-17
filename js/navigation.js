document.addEventListener('DOMContentLoaded', function () {
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');

  const basePath = window.location.hostname.includes('github.io')
    ? '/portfolio_static_website'
    : '';

  if (headerContainer) {
    fetch(`${basePath}/components/header.html`)
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
        highlightCurrentPage();
      })
      .catch(error => console.error('Error loading header:', error));
  }

  if (footerContainer) {
    fetch(`${basePath}/components/footer.html`)
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }

  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
      if (currentPath.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });
  }
});
