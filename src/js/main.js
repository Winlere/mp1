/* Your JS here. */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");
  const sections = document.querySelectorAll("[id]");

  function handleNavbarResize() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  function updateActiveNavItem() {
    const scrollPosition = window.scrollY + navbar.offsetHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight >= documentHeight - 10) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const lastLink = navLinks[navLinks.length - 1];
      if (lastLink) {
        lastLink.classList.add("active");
      }
      return;
    }

    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  // Function to handle smooth scrolling for navigation links
  function handleSmoothScrolling() {
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - navbar.offsetHeight;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Combined scroll handler
  function handleScroll() {
    handleNavbarResize();
    updateActiveNavItem();
  }

  window.addEventListener("scroll", handleScroll);
  handleSmoothScrolling();

  handleScroll();
});

// Cover Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".cover-carousel .carousel-track");
  const items = document.querySelectorAll(".cover-carousel .carousel-item");
  const prevBtn = document.querySelector(".cover-carousel .prev");
  const nextBtn = document.querySelector(".cover-carousel .next");
  const indicators = document.querySelectorAll(".cover-carousel .indicator");
  
  let currentIndex = 0;
  const totalSlides = items.length;
  
  function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update active item
    items.forEach((item, index) => {
      item.classList.toggle("active", index === currentIndex);
    });
    
    // Update active indicator
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
  
  function goToSlide(slideIndex) {
    currentIndex = slideIndex;
    updateCarousel();
  }
  
  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  
  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });
  
  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });
  
  // Auto-play functionality
  let autoPlayInterval;
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }
  
  // Start auto-play
  startAutoPlay();
  
  // Pause auto-play on hover
  const carousel = document.querySelector(".cover-carousel");
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);
  
  // Initialize carousel
  updateCarousel();
});