/* =========================================
   PORTFOLIO.JS — COMPLETE WITH ALL FEATURES

   SECTIONS IN THIS FILE:
   1.  Loading Screen
   2.  Scroll Reveal (all directions + stagger)
   3.  Parallax Banner
   4.  Horizontal Scroll Showcase
   5.  Project Modal (fullscreen preview + next/prev)
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
            setTimeout(() => {
                loader.remove();
            }, 800);
        }, 2200);
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
            const revealPoint = 120;

            if (elementTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 120);
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();


   
   
   
   
   
   
   
   
    /* =========================================
       3. PARALLAX BANNER
       — Image with class .parallax-img moves at half scroll speed
       — To change parallax strength: edit the 0.3 multiplier
       — To disable: delete this block
    ========================================= */

    const parallaxImg = document.querySelector('.parallax-img');

    function updateParallax() {
        if (!parallaxImg) return;
        const banner = parallaxImg.closest('.portfolio-banner');
        if (!banner) return;
        const bannerTop = banner.getBoundingClientRect().top;
        const offset = bannerTop * 0.3;
        parallaxImg.style.transform = `scale(1.08) translateY(${offset}px)`;
    }

    window.addEventListener('scroll', updateParallax);
    updateParallax();


   
   
   
   
   
   
   
   
   
    /* =========================================
       4. HORIZONTAL SCROLL SHOWCASE
       — Moves the card track LEFT as user scrolls DOWN
       — Only activates when the section is in view
       — To adjust scroll distance: change the scrollMultiplier value
       — To disable on mobile: handled below
    ========================================= */

    const horizontalTrack = document.getElementById('horizontalTrack');
const wrapper = horizontalTrack?.parentElement;

if (horizontalTrack && wrapper) {
    let isDown = false;
    let startX;
    let scrollLeft;

    wrapper.style.overflowX = 'auto';
    wrapper.style.cursor = 'grab';
    wrapper.style.scrollbarWidth = 'none';

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
        isDown = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeft - walk;
    });
}


   
   
   
   
   
   
   
   
   
   
    /* =========================================
       5. PROJECT MODAL — FULLSCREEN PREVIEW + NEXT/PREV
       — Opens when any .portfolio-card or .h-card is clicked
       — Supports multiple images via data-images attribute
       — Navigate with prev/next buttons or keyboard arrows
       — Close: X button, click outside, or Escape key
    ========================================= */

    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    let currentImages = [];
    let currentIndex = 0;

    function openModal(images, index, category, title) {
        currentImages = images;
        currentIndex = index;
        modalImg.src = images[index];
        modalImg.alt = title;
        modalCategory.textContent = category;
        modalTitle.textContent = title;
        modal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        updateModalNav();
    }

    function updateModalNav() {
        if (!modalPrev || !modalNext) return;
        modalPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
        modalNext.style.opacity = currentIndex === currentImages.length - 1 ? '0.3' : '1';
        // hide nav buttons if only one image
        const showNav = currentImages.length > 1;
        modalPrev.style.display = showNav ? 'flex' : 'none';
        modalNext.style.display = showNav ? 'flex' : 'none';
    }

    function closeModal() {
        modal.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                modalImg.src = currentImages[currentIndex];
                updateModalNav();
            }
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentIndex < currentImages.length - 1) {
                currentIndex++;
                modalImg.src = currentImages[currentIndex];
                updateModalNav();
            }
        });
    }

    document.querySelectorAll('.portfolio-card, .h-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const images = JSON.parse(card.dataset.images || '[]');

            // fallback: if no data-images, use the card's main img
            const allImages = images.length > 0
                ? images
                : [card.querySelector('img').src];

            let startIndex = 0;

            // if a thumbnail was clicked, open at that image
            if (e.target.closest('.card-thumbs img')) {
                const clickedSrc = e.target.src;
                const found = allImages.findIndex(i =>
                    clickedSrc.includes(i.split('/').pop())
                );
                startIndex = found >= 0 ? found : 0;
            }

            openModal(
                allImages,
                startIndex,
                card.dataset.category || '',
                card.dataset.title || ''
            );
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('modal-open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) {
            currentIndex++;
            modalImg.src = currentImages[currentIndex];
            updateModalNav();
        }
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            modalImg.src = currentImages[currentIndex];
            updateModalNav();
        }
    });


}); // end DOMContentLoaded