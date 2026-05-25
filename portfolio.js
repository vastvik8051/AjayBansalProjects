/* =========================================
   PORTFOLIO.JS — COMPLETE WITH ALL FEATURES

   SECTIONS IN THIS FILE:
   1.  Loading Screen
   2.  Scroll Reveal (all directions + stagger)
   3.  Parallax Banner
   4.  Horizontal Scroll Showcase
   5.  Project Modal (fullscreen preview)
========================================= */


window.addEventListener('DOMContentLoaded', () => {


    /* =========================================
       1. LOADING SCREEN
       — Waits 2.2s then fades out
       — To change delay: edit the setTimeout value (in ms)
       — To disable entirely: delete this block + remove .loader from HTML
    ========================================= */

    const loader = document.getElementById('loader');

    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader-hidden');

            // Fully remove from DOM after fade completes
            setTimeout(() => {
                loader.remove();
            }, 800);

        }, 2200); // Total loading screen time in ms
    }


    /* =========================================
       2. SCROLL REVEAL — ALL DIRECTIONS + STAGGER
       — Watches: .reveal  .reveal-left  .reveal-right  .reveal-zoom
       — Adds .active class when element scrolls into view
       — Stagger: each element delays by index * 120ms
       — To change trigger point: edit revealPoint (px from bottom of viewport)
       — To change stagger speed: edit the index * 120 value
    ========================================= */

    const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
    );

    function revealOnScroll() {
        reveals.forEach((element, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 120; // px from bottom of viewport to trigger

            if (elementTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 120); // stagger delay
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // run once on load for elements already in view


    /* =========================================
       3. PARALLAX BANNER
       — Image with class .parallax-img moves at half scroll speed
       — Creates depth: image moves slower than the page
       — To change parallax strength: edit the 0.3 multiplier (lower = subtler)
       — To disable: delete this block
    ========================================= */

    const parallaxImg = document.querySelector('.parallax-img');

    function updateParallax() {
        if (!parallaxImg) return;

        const banner = parallaxImg.closest('.portfolio-banner');
        if (!banner) return;

        const bannerTop = banner.getBoundingClientRect().top;
        const offset = bannerTop * 0.3; // 0.3 = parallax strength

        parallaxImg.style.transform = `scale(1.08) translateY(${offset}px)`;
    }

    window.addEventListener('scroll', updateParallax);
    updateParallax();


    /* =========================================
       4. HORIZONTAL SCROLL SHOWCASE
       — Moves the card track LEFT as user scrolls DOWN
       — Only activates when the section is in view
       — To adjust scroll distance: change the scrollMultiplier value
       — To disable on mobile: the media query at bottom handles this
    ========================================= */

    const horizontalSection = document.getElementById('horizontalSection');
    const horizontalTrack = document.getElementById('horizontalTrack');

    function adjustHorizontalScroll() {
        if (!horizontalSection || !horizontalTrack) return;

        // Disable on small screens
        if (window.innerWidth < 768) {
            horizontalTrack.style.transform = 'translateX(0)';
            return;
        }

        const sectionTop = horizontalSection.getBoundingClientRect().top;
        const sectionHeight = horizontalSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Only move when section is in view
        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {

            // How far through the section we've scrolled (0 to 1)
            const progress = (windowHeight - sectionTop) / (sectionHeight + windowHeight);

            // Total scrollable width of the track
            const trackWidth = horizontalTrack.scrollWidth - horizontalTrack.offsetWidth;

            // scrollMultiplier controls how far cards travel
            // increase for more scroll, decrease for less
            const scrollMultiplier = 1.2;

            const translateX = Math.min(progress * trackWidth * scrollMultiplier, trackWidth);

            horizontalTrack.style.transform = `translateX(-${translateX}px)`;
        }
    }

    window.addEventListener('scroll', adjustHorizontalScroll);
    adjustHorizontalScroll();


    /* =========================================
       5. PROJECT MODAL — FULLSCREEN PREVIEW
       — Opens when any .portfolio-card or .h-card is clicked
       — Reads data-category and data-title from the card
       — Reads the img src from the card's first <img>
       — Close: X button, click outside image, or Escape key
    ========================================= */

    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');

    // Open modal when any card is clicked
    document.querySelectorAll('.portfolio-card, .h-card').forEach(card => {
        card.addEventListener('click', () => {

            // Get data from card attributes
            const imgSrc = card.querySelector('img').src;
            const category = card.dataset.category || '';
            const title = card.dataset.title || '';

            // Populate modal
            modalImg.src = imgSrc;
            modalImg.alt = title;
            modalCategory.textContent = category;
            modalTitle.textContent = title;

            // Show modal
            modal.classList.add('modal-open');
            document.body.style.overflow = 'hidden'; // prevent background scroll
        });
    });

    // Close on X button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on clicking outside the image (on dark background)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    function closeModal() {
        modal.classList.remove('modal-open');
        document.body.style.overflow = ''; // restore scroll
    }


}); // end DOMContentLoaded