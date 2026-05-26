const menuBtn = document.querySelector('.nav-buttons .glass-btn');
const nav = document.querySelector('nav');

// Create a close button inside the nav
const closeBtn = document.createElement('button');
closeBtn.textContent = '✕';
closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    color: #C6A16E;
    border: 1px solid transparent;
    padding: 8px 16px;
    // border-radius: 50px;
    cursor: pointer;
    font-size: 12px;
    letter-spacing: 2px;
`;
nav.appendChild(closeBtn);

menuBtn.addEventListener('click', () => {
    nav.classList.add('active');
    menuBtn.textContent = 'Menu';
});

closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});