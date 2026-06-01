/* =========================================
   RESIDENTIAL.JS
   — Modal with next/prev image navigation
   — Scroll reveal on cards
   — Used by residential.html
========================================= */

window.addEventListener('DOMContentLoaded', () => {


    /* =========================================
       MODAL — NEXT/PREV IMAGE NAVIGATION
       — Click any card to open fullscreen modal
       — Click thumbnails to open at that image
       — Navigate with prev/next buttons or arrow keys
       — Close with X, click outside, or Escape
    ========================================= */

    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    let currentImages = [];
    // stores all image paths for the currently open project

    let currentIndex = 0;
    // which image is currently showing

    function openModal(images, index, category, title) {
        currentImages = images;
        currentIndex = index;
        modalImg.src = images[index];
        modalImg.alt = title;
        modalCategory.textContent = category;
        modalTitle.textContent = title;
        modal.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        updateNav();
    }

    function updateNav() {
        // dim prev button on first image
        modalPrev.style.opacity = currentIndex === 0 ? '0.3' : '1';
        // dim next button on last image
        modalNext.style.opacity = currentIndex === currentImages.length - 1 ? '0.3' : '1';
        // hide both buttons if only one image
        const show = currentImages.length > 1;
        modalPrev.style.display = show ? 'flex' : 'none';
        modalNext.style.display = show ? 'flex' : 'none';
    }

    function closeModal() {
        modal.classList.remove('modal-open');
        document.body.style.overflow = '';
    }

    // prev button
    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            currentIndex--;
            modalImg.src = currentImages[currentIndex];
            updateNav();
        }
    });

    // next button
    modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            modalImg.src = currentImages[currentIndex];
            updateNav();
        }
    });

    // open modal on card click
    document.querySelectorAll('.project-item').forEach(card => {
        card.addEventListener('click', (e) => {
            const images = JSON.parse(card.dataset.images || '[]');
            const allImages = images.length > 0 ? images : [card.querySelector('img').src];
            let startIndex = 0;

            // if thumbnail was clicked, start at that image
            if (e.target.closest('.project-item-thumbs img')) {
                const clickedSrc = e.target.src;
                const found = allImages.findIndex(i => clickedSrc.includes(i.split('/').pop()));
                startIndex = found >= 0 ? found : 0;
            }

            openModal(allImages, startIndex, card.dataset.category || '', card.dataset.title || '');
        });
    });

    // close on X button
    modalClose.addEventListener('click', closeModal);

    // close on clicking dark background
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('modal-open')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight' && currentIndex < currentImages.length - 1) {
            currentIndex++;
            modalImg.src = currentImages[currentIndex];
            updateNav();
        }
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            modalImg.src = currentImages[currentIndex];
            updateNav();
        }
    });


    /* =========================================
       SCROLL REVEAL
       — Cards fade and slide up as they enter view
       — Each card staggers by 100ms
    ========================================= */

    const cards = document.querySelectorAll('.project-item');

    // start all cards invisible and shifted down
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    function revealCards() {
        cards.forEach((card, i) => {
            const top = card.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 100); // stagger — each card delays by 100ms
            }
        });
    }

    window.addEventListener('scroll', revealCards);
    revealCards(); // run once on load for cards already visible


}); // end DOMContentLoaded