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