// Chuyển đổi hiển thị của menu thả xuống
const toggleDropdown = (dropdown, menu, isOpen) => {
    dropdown.classList.toggle("open", isOpen);
    menu.style.height = isOpen ? `${menu.scrollHeight}px` : 0;
  };
  // Đóng tất cả menu thả xuống đang mở
  const closeAllDropdowns = () => {
    document.querySelectorAll(".dropdown-container.open").forEach((openDropdown) => {
      toggleDropdown(openDropdown, openDropdown.querySelector(".dropdown-menu"), false);
    });
  };
  // Gắn sự kiện nhấn cho các nút mở menu
  document.querySelectorAll(".dropdown-toggle").forEach((dropdownToggle) => {
    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = dropdownToggle.closest(".dropdown-container");
      const menu = dropdown.querySelector(".dropdown-menu");
      const isOpen = dropdown.classList.contains("open");
      closeAllDropdowns(); // Đóng mọi menu đang mở
      toggleDropdown(dropdown, menu, !isOpen); // Bật tắt hiển thị menu hiện tại
    });
  });
  // Gắn sự kiện nhấn cho nút thu gọn thanh bên
  document.querySelectorAll(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      closeAllDropdowns(); // Đóng mọi menu đang mở
      document.querySelector(".sidebar").classList.toggle("collapsed"); // Thay đổi trạng thái thu gọn của thanh bên
    });
  });
  // Tự động thu gọn thanh bên trên màn hình nhỏ
  if (window.innerWidth <= 1024) document.querySelector(".sidebar").classList.add("collapsed");

  // Chức năng tìm kiếm
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
          
          // Hiển thị hoặc ẩn mục điều hướng chính
          item.style.display = isMatch ? 'block' : 'none';
          
          // Nếu là mục có menu thả xuống, kiểm tra thêm các liên kết con
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
      
      // Khi ô tìm kiếm trống, hiển thị tất cả mục
      if (searchTerm === '') {
        navItems.forEach(item => {
          item.style.display = 'block';
        });
      }
    });
    
    // Ngăn biểu mẫu gửi đi
    document.querySelector('.search-form').addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }