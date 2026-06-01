/* =========================================
   PORTFOLIO.JS — COMPLETE WITH ALL FEATURES

   SECTIONS IN THIS FILE:
   1.  Loading Screen
   2.  Scroll Reveal (all directions + stagger)
   3.  Parallax Banner
   4.  Horizontal Scroll Showcase (drag to scroll)
   5.  Project Modal (fullscreen preview + next/prev)
   6.  Filter Buttons
========================================= */


window.addEventListener('DOMContentLoaded', () => {
    // DOMContentLoaded means: "wait until the entire HTML page has loaded
    // before running any of this JS code". Everything goes inside here.


    /* =========================================
       1. LOADING SCREEN
       — Waits 2.2s then fades out
       — To change delay: edit the setTimeout value (in ms)
       — To disable entirely: delete this block + remove .loader from HTML
    ========================================= */

    const loader = document.getElementById('loader');
    // getElementById finds the HTML element with id="loader"

    if (loader) {
        // if the loader exists on this page, run this
        setTimeout(() => {
            // setTimeout waits X milliseconds before running the code inside
            loader.classList.add('loader-hidden');
            // adds the CSS class 'loader-hidden' which fades it out

            setTimeout(() => {
                loader.remove();
                // fully removes the loader from the page after fade completes
            }, 800); // wait 800ms for fade animation to finish

        }, 2200); // wait 2200ms (2.2 seconds) before starting fade
    }


    /* =========================================
       2. SCROLL REVEAL — ALL DIRECTIONS + STAGGER
       — Watches: .reveal  .reveal-left  .reveal-right  .reveal-zoom
       — Adds .active class when element scrolls into view
       — Stagger: each element delays by index * 120ms
       — To change trigger point: edit revealPoint (px from bottom of viewport)
       — To change stagger speed: edit the index * 120 value
    ========================================= */

    // grab every element that has any reveal class
    const reveals = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
    );

    function revealOnScroll() {
        reveals.forEach((element, index) => {
            // forEach loops through every reveal element one by one
            // 'index' is the position of the element in the list (0, 1, 2...)

            const windowHeight = window.innerHeight;
            // how tall the visible screen area is in pixels

            const elementTop = element.getBoundingClientRect().top;
            // how far from the top of the screen this element currently is

            const revealPoint = 120;
            // element triggers when it's 120px from the bottom of the screen

            if (elementTop < windowHeight - revealPoint) {
                // if the element has scrolled into view...
                setTimeout(() => {
                    element.classList.add('active');
                    // add 'active' class — CSS then animates it into view
                }, index * 120);
                // each element waits a little longer than the previous one
                // creating a stagger effect (0ms, 120ms, 240ms, 360ms...)
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // run revealOnScroll every time the user scrolls

    revealOnScroll();
    // also run once immediately on page load for elements already visible


    /* =========================================
       3. PARALLAX BANNER
       — Image with class .parallax-img moves at half scroll speed
       — To change parallax strength: edit the 0.3 multiplier
       — To disable: delete this block
    ========================================= */

    const parallaxImg = document.querySelector('.parallax-img');
    // querySelector finds the first element matching a CSS selector

    function updateParallax() {
        if (!parallaxImg) return;
        // if no parallax image exists on this page, stop here

        const banner = parallaxImg.closest('.portfolio-banner');
        // .closest() finds the nearest parent element with that class

        if (!banner) return;

        const bannerTop = banner.getBoundingClientRect().top;
        // how far the banner is from the top of the visible screen

        const offset = bannerTop * 0.3;
        // 0.3 = parallax strength. lower = subtler movement

        parallaxImg.style.transform = `scale(1.08) translateY(${offset}px)`;
        // moves the image up/down slightly as you scroll, creating depth
    }

    window.addEventListener('scroll', updateParallax);
    updateParallax();


    /* =========================================
       4. HORIZONTAL SCROLL SHOWCASE — DRAG TO SCROLL
       — Click and drag left/right to scroll the card track
       — Works on all screen sizes
       — To change drag speed: edit the 1.5 multiplier in mousemove
    ========================================= */

    const horizontalTrack = document.getElementById('horizontalTrack');
    const wrapper = horizontalTrack?.parentElement;
    // ?. is "optional chaining" — if horizontalTrack is null, don't crash

    if (horizontalTrack && wrapper) {
        // only run if both elements exist on the page

        let isDown = false;
        // tracks whether the mouse button is currently held down

        let startX;
        // where the mouse was when the click started

        let scrollLeft;
        // how far the wrapper was already scrolled when click started

        // make the wrapper scrollable and show grab cursor
        wrapper.style.overflowX = 'auto';
        wrapper.style.cursor = 'grab';
        wrapper.style.scrollbarWidth = 'none'; // hide scrollbar on Firefox

        wrapper.addEventListener('mousedown', (e) => {
            // fires when mouse button is pressed down
            isDown = true;
            wrapper.style.cursor = 'grabbing'; // change cursor to grabbing hand
            startX = e.pageX - wrapper.offsetLeft; // record starting X position
            scrollLeft = wrapper.scrollLeft; // record current scroll position
        });

        wrapper.addEventListener('mouseleave', () => {
            // fires when mouse leaves the wrapper area
            isDown = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('mouseup', () => {
            // fires when mouse button is released
            isDown = false;
            wrapper.style.cursor = 'grab';
        });

        wrapper.addEventListener('mousemove', (e) => {
            // fires constantly as mouse moves over the wrapper
            if (!isDown) return;
            // only do anything if mouse button is held down

            e.preventDefault();
            // prevents text selection while dragging

            const x = e.pageX - wrapper.offsetLeft;
            // current mouse X position relative to wrapper

            const walk = (x - startX) * 1.5;
            // how far the mouse has moved * 1.5 (drag speed multiplier)
            // increase 1.5 for faster drag, decrease for slower

            wrapper.scrollLeft = scrollLeft - walk;
            // scroll the wrapper by that amount
        });
    }


    /* =========================================
       5. PROJECT MODAL — FULLSCREEN PREVIEW + NEXT/PREV
       — Opens when any .portfolio-card or .h-card is clicked
       — Supports multiple images via data-images attribute on the card
       — Navigate with prev/next buttons or left/right arrow keys
       — Close: X button, click outside image, or Escape key
    ========================================= */

    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    let currentImages = [];
    // array that holds all image paths for the currently open project

    let currentIndex = 0;
    // which image is currently showing (0 = first image)

    function openModal(images, index, category, title) {
        // called whenever a card is clicked
        currentImages = images; // store all images for this project
        currentIndex = index;   // store which image to show first
        modalImg.src = images[index]; // set the main image
        modalImg.alt = title;
        modalCategory.textContent = category; // set the category text
        modalTitle.textContent = title;       // set the title text
        modal.classList.add('modal-open');    // show the modal (CSS handles animation)
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        updateModalNav(); // update prev/next button states
    }

    function updateModalNav() {
        if (!modalPrev || !modalNext) return;

        // dim the prev button if we're on the first image
        modalPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';

        // dim the next button if we're on the last image
        modalNext.style.opacity = currentIndex === currentImages.length - 1 ? '0.3' : '1';

        // hide both buttons entirely if there's only one image
        const showNav = currentImages.length > 1;
        modalPrev.style.display = showNav ? 'flex' : 'none';
        modalNext.style.display = showNav ? 'flex' : 'none';
    }

    function closeModal() {
        modal.classList.remove('modal-open'); // hide the modal
        document.body.style.overflow = '';    // restore background scrolling
    }

    if (modalPrev) {
        modalPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            // stopPropagation prevents the click from also triggering
            // the modal background click (which would close it)

            if (currentIndex > 0) {
                currentIndex--;
                // go back one image
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
                // go forward one image
                modalImg.src = currentImages[currentIndex];
                updateModalNav();
            }
        });
    }

    // paste here ---------------
// open modal when any portfolio card or h-card is clicked
    document.querySelectorAll('.portfolio-card, .h-card').forEach(card => {
        card.addEventListener('click', (e) => {

            // read the data-images attribute from the card
            // JSON.parse converts the string '["img1","img2"]' into an actual array
            const images = JSON.parse(card.dataset.images || '[]');

            // if no data-images attribute, fall back to the card's main image
            const allImages = images.length > 0
                ? images
                : [card.querySelector('img').src];

            let startIndex = 0;
            // default: open at the first image

            // if the user clicked a thumbnail, open at that specific image
            if (e.target.closest('.card-thumbs img')) {
                const clickedSrc = e.target.src;
                const found = allImages.findIndex(i =>
                    clickedSrc.includes(i.split('/').pop())
                    // .split('/').pop() gets just the filename from the path
                    // e.g. './assets/img/2.webp' → '2.webp'
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
    // ----------------------------

    if (modalClose) modalClose.addEventListener('click', closeModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
            // only close if clicking the dark background itself
            // not the image or buttons inside
        });
    }

    // keyboard navigation inside the modal
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('modal-open')) return;
        // only do anything if modal is currently open

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


    /* =========================================
       6. FILTER BUTTONS
       — Clicking a filter button shows only cards matching that category
       — 'ALL' shows every card
       — Cards are matched by their data-category attribute
       — To add a new filter: add a button in HTML with a matching data-filter
         and make sure the card's data-category contains that word
    ========================================= */

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {

            // remove 'active' class from all filter buttons
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

            // add 'active' to the button that was just clicked
            btn.classList.add('active');

            // read which filter was clicked e.g. 'all', 'residential', 'commercial'
            const filter = btn.dataset.filter;

            document.querySelectorAll('.portfolio-card').forEach(card => {
                if (filter === 'all') {
                    // show every card
                    card.style.display = 'block';
                } else {
                    // get the card's category and convert to lowercase for comparison
                    const category = (card.dataset.category || '').toLowerCase();

                    // show the card if its category contains the filter word
                    // hide it if it doesn't match
                    card.style.display = category.includes(filter) ? 'block' : 'none';
                }
            });
        });
    });


}); // end DOMContentLoaded
// everything above runs after the page has fully loaded