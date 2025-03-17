document.addEventListener('DOMContentLoaded', function() {
  const projectsGrid = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.querySelector('.close-modal');
  
  // Filter projects
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Show/hide projects based on filter
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Handle project detail view
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-details')) {
      e.preventDefault();
      const projectId = e.target.getAttribute('data-project-id');
      openProjectModal(projectId);
    }
  });
  
  // Open project modal
  function openProjectModal(projectId) {
    // Fetch project details from API
    fetch(`/api/project/${projectId}`)
      .then(response => response.json())
      .then(data => {
        // Populate modal with project details
        modalBody.innerHTML = `
          <div class="project-detail">
            <div class="project-detail-header">
              <h2>${data.title}</h2>
              <p class="project-date">${data.date}</p>
            </div>
            
            <div class="project-showcase">
              <img src="${data.image}" alt="${data.title}">
            </div>
            
            <div class="project-description">
              ${data.description}
            </div>
            
            <div class="project-features">
              <h3>Key Features</h3>
              <ul>
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            
            <div class="tech-stack-detail">
              <h3>Technologies Used</h3>
              <div class="tech-tags">
                ${data.technologies.map(tech => `<span>${tech}</span>`).join('')}
              </div>
            </div>
            
            <div class="project-links-detail">
              ${data.demo ? `<a href="${data.demo}" target="_blank" class="btn primary-btn">Live Demo</a>` : ''}
              ${data.github ? `<a href="${data.github}" target="_blank" class="btn secondary-btn">GitHub Repository</a>` : ''}
            </div>
          </div>
        `;
        
        // Show modal
        modal.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching project details:', error);
        modalBody.innerHTML = '<p>Error loading project details. Please try again.</p>';
        modal.style.display = 'block';
      });
  }
  
  // Close modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Load projects from API (or can be static if preferred)
  function loadProjects() {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        projectsGrid.innerHTML = '';
        
        data.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.classList.add('project-card');
          projectCard.setAttribute('data-category', project.category);
          
          projectCard.innerHTML = `
          <div class="project-card-inner">
            <div class="project-img">
              <img src="${project.thumbnail}" alt="${project.title}">
            </div>
            <div class="project-info">
              <h3>${project.title}</h3>
              <p>${project.shortDescription}</p>
              <div class="tech-stack">
                ${project.technologies.slice(0, 3).map(tech => `<span>${tech}</span>`).join('')}
                ${project.technologies.length > 3 ? `<span>+${project.technologies.length - 3}</span>` : ''}
              </div>
              <div class="project-links">
                <a href="#" class="view-details" data-project-id="${project.id}">View Details</a>
                ${project.demo ? `<a href="${project.demo}" target="_blank" class="demo-link">Demo</a>` : ''}
                ${project.github ? `<a href="${project.github}" target="_blank" class="github-link">GitHub</a>` : ''}
              </div>
            </div>
          </div>
        `;
        
        projectsGrid.appendChild(projectCard);
      });
    })
    .catch(error => {
      console.error('Error loading projects:', error);
      projectsGrid.innerHTML = '<p>Error loading projects. Please refresh the page to try again.</p>';
    });
}

// Initialize the page
loadProjects();
});