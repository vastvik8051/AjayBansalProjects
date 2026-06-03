/* =========================================
   PORTFOLIO.JS — COMPLETE WITH ALL FEATURES

   SECTIONS IN THIS FILE:
   1.  Loading Screen
   2.  Scroll Reveal (all directions + stagger)
   3.  Parallax Banner
   4.  Horizontal Scroll Showcase (drag to scroll)
   5.  Filter Buttons
========================================= */


window.addEventListener('DOMContentLoaded', () => {


    /* =========================================
       1. LOADING SCREEN
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
       2. SCROLL REVEAL
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
       4. HORIZONTAL SCROLL SHOWCASE — DRAG TO SCROLL
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
       5. FILTER BUTTONS
    ========================================= */

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            document.querySelectorAll('.portfolio-card').forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = (card.dataset.category || '').toLowerCase();
                    card.style.display = category.includes(filter) ? 'block' : 'none';
                }
            });
        });
    });


}); // end DOMContentLoaded