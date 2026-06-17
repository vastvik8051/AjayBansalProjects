document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".portfolio-gallery .gallery-grid img");

  const revealImage = (img) => {
    img.style.opacity = "1";
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const img = entry.target;

      img.loading = "lazy";
      img.decoding = "async";

      // start hidden only if not already loaded
      if (!img.complete) {
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease";
      } else {
        img.style.opacity = "1";
      }

      img.onload = () => {
        revealImage(img);
      };

      obs.unobserve(img);
    });
  }, {
    rootMargin: "200px"
  });

  images.forEach(img => observer.observe(img));
});