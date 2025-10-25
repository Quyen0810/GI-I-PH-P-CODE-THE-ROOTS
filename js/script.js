// Toggle the visibility of a dropdown menu
const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
  };
  // Close all open dropdowns
  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
      toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
    });
  };
  // Attach click event to all dropdown toggles
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = dropdownToggle.closest(".dropdown-container");
      const menu = dropdown.querySelector(".dropdown-menu");
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns(); // Close all open dropdowns
      toggleDropdown(dropdown, menu, !isOpen); // Toggle current dropdown visibility
    });
  });
  // Attach click event to sidebar toggle buttons
  document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      closeAllDropdowns(); // Close all open dropdowns
      document.querySelector(".sidebar").classList.toggle("collapsed"); // Toggle collapsed class on sidebar
    });
  });
  // Collapse sidebar by default on small screens
  if (window.innerWidth <= 1024) document.querySelector(".sidebar").classList.add("collapsed");

  // Search functionality
  const searchInput = document.querySelector('.search-form input');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      navItems.forEach(item => {
        const navLink = item.querySelector('.nav-link');
        const navLabel = item.querySelector('.nav-label');
        const dropdownLinks = item.querySelectorAll('.dropdown-link');
        
        if (navLabel) {
          const labelText = navLabel.textContent.toLowerCase();
          const isMatch = labelText.includes(searchTerm);
          
          // Show/hide main nav item
          item.style.display = isMatch ? 'block' : 'none';
          
          // If it's a dropdown container, also check dropdown links
          if (item.classList.contains('dropdown-container')) {
            const dropdownMenu = item.querySelector('.dropdown-menu');
            if (dropdownMenu) {
              dropdownLinks.forEach(link => {
                const linkText = link.textContent.toLowerCase();
                const linkMatch = linkText.includes(searchTerm);
                link.closest('.nav-item').style.display = linkMatch ? 'block' : 'none';
              });
            }
          }
        }
      });
      
      // If search is empty, show all items
      if (searchTerm === '') {
        navItems.forEach(item => {
          item.style.display = 'block';
        });
      }
    });
    
    // Prevent form submission
    document.querySelector('.search-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }