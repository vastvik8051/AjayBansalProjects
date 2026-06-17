const startTime = Date.now();

const galleryImages = [
    ...document.querySelectorAll('img')
];

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const loader = document.getElementById('loader');

let loadedCount = 0;
const totalImages = galleryImages.length;

function updateProgress() {

    loadedCount++;

    const percent = Math.round(
        (loadedCount / totalImages) * 100
    );

    progressBar.style.width = percent + '%';
    progressText.textContent = percent + '%';

    if (loadedCount === totalImages) {

        const elapsed = Date.now() - startTime;

        const minimumTime = 1500;

        const remaining =
            Math.max(0, minimumTime - elapsed);

        setTimeout(() => {

            loader.classList.add('hide');

        }, remaining);
    }
}

galleryImages.forEach(img => {

    if (img.complete) {

        updateProgress();

    } else {

        img.addEventListener(
            'load',
            updateProgress
        );

        img.addEventListener(
            'error',
            updateProgress
        );
    }
});