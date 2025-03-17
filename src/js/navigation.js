document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer components
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');

  if (headerContainer) {
    fetch('/static/components/header.html')
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
        highlightCurrentPage();
      })
      .catch(error => console.error('Error loading header:', error));
  }
  
  if (footerContainer) {
    fetch('/static/components/footer.html')
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error('Error loading footer:', error));
  }
  
  // Highlight current page in navigation
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