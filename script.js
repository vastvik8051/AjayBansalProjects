// navbar scroll
const navar = document.querySelector('.navbar')

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});







// scrollLine
window.addEventListener('scroll', () => {
  const progressBar = document.querySelector('.scroll-progress');
  
  // Calculate total scrollable height of the page
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Get the current scroll position
  const scrolledDistance = window.scrollY;
  
  // Calculate the percentage scrolled (prevent division by zero if page is not scrollable)
  const scrollPercent = totalHeight > 0 ? (scrolledDistance / totalHeight) * 100 : 0;
  
  // Update the width of the progress bar
  progressBar.style.width = `${scrollPercent}%`;
});








// stats 
const startCounting = (counterElement) => {
    const target = +counterElement.getAttribute('data-target');
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        
        // Calculate progress as a fraction between 0 and 1
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Calculate the current value based on progress
        const currentValue = Math.floor(progress * target);
        
        counterElement.innerText = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            counterElement.innerText = target; // Ensure it finishes exactly on target
        }
    };

    requestAnimationFrame(updateNumber);
};

//  Create an Intersection Observer to trigger when section is in view
const statsSection = document.querySelector('.stats-section');
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger the count for each number element
            counters.forEach(counter => startCounting(counter));
            // Stop observing so the animation only runs once
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3 // Starts the counter when 30% of the section is visible
});

observer.observe(statsSection);


