// =========================================
// GALLERY.JS — thumbnail strip + lightbox
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // THUMBNAIL STRIP — arrows + dots
    // =========================================

    const strip     = document.querySelector('.project-hero-thumbs');
    const prevBtn   = document.querySelector('.thumb-prev');
    const nextBtn   = document.querySelector('.thumb-next');
    const dotsWrap  = document.querySelector('.thumb-dots');
    const thumbImgs = strip.querySelectorAll('img');

    // --- Build one dot per thumbnail ---
    thumbImgs.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('thumb-dot');
        if (i === 0) dot.classList.add('active'); // first dot active on load
        dot.addEventListener('click', () => scrollToThumb(i));
        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('.thumb-dot');

    // --- Scroll one full thumb width on arrow click ---
    prevBtn.addEventListener('click', () => {
        const thumbWidth = thumbImgs[0].offsetWidth + 10; // 10 = gap
        strip.scrollBy({ left: -thumbWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        const thumbWidth = thumbImgs[0].offsetWidth + 10; // 10 = gap
        strip.scrollBy({ left: thumbWidth, behavior: 'smooth' });
    });

    // --- Scroll strip to a specific thumb by index ---
    function scrollToThumb(index) {
        const thumb = thumbImgs[index];
        strip.scrollTo({ left: thumb.offsetLeft, behavior: 'smooth' });
    }

    // --- Update active dot as strip scrolls ---
    strip.addEventListener('scroll', () => {
        let closest = 0;
        let minDist = Infinity;

        thumbImgs.forEach((img, i) => {
            const dist = Math.abs(img.offsetLeft - strip.scrollLeft);
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        });

        dots.forEach(d => d.classList.remove('active'));
        dots[closest].classList.add('active');
    });


    // =========================================
    // LIGHTBOX — opens on gallery img or thumb click
    // =========================================

    // Create lightbox and inject into page
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <button class="lightbox-close">✕</button>
        <button class="lightbox-prev">&#8249;</button>
        <img class="lightbox-img" src="" alt="">
        <button class="lightbox-next">&#8250;</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg   = lightbox.querySelector('.lightbox-img');
    const lightboxPrev  = lightbox.querySelector('.lightbox-prev');
    const lightboxNext  = lightbox.querySelector('.lightbox-next');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    let currentImages = []; // image srcs for current set
    let currentIndex  = 0;  // which image is showing

    // --- Open lightbox at a given index ---
    function openLightbox(images, index) {
        currentImages = images;
        currentIndex  = index;
        lightboxImg.src = currentImages[currentIndex];
        lightbox.classList.add('lightbox-open');
    }

    // --- Close lightbox ---
    function closeLightbox() {
        lightbox.classList.remove('lightbox-open');
        lightboxImg.src = '';
    }

    // --- Go to previous image (wraps around) ---
    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    }

    // --- Go to next image (wraps around) ---
    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImg.src = currentImages[currentIndex];
    }

    // --- Bind gallery grid images ---
    const galleryImgs = [...document.querySelectorAll('.gallery-grid img')];
    const gallerySrcs = galleryImgs.map(img => img.src);

    galleryImgs.forEach((img, i) => {
        img.addEventListener('click', () => openLightbox(gallerySrcs, i));
    });

    // --- Bind thumbnail strip images ---
    const thumbSrcs = [...thumbImgs].map(img => img.src);

    thumbImgs.forEach((img, i) => {
        img.addEventListener('click', () => openLightbox(thumbSrcs, i));
    });

    // --- Lightbox button events ---
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // --- Click dark background to close ---
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // --- Keyboard navigation ---
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lightbox-open')) return;
        if (e.key === 'ArrowLeft')  showPrev();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'Escape')     closeLightbox();
    });

}); // end DOMContentLoaded