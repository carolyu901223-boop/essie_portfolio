// Mobile Navigation Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    function toggleMenu(forceOpen) {
        const isOpen = forceOpen !== undefined ? forceOpen : mobileMenu.classList.contains('hidden');
        if (isOpen) {
            mobileMenu.classList.remove('hidden');
            menuBtn.setAttribute('aria-expanded', 'true');
            if (menuIcon) {
                menuIcon.classList.remove('ph-list');
                menuIcon.classList.add('ph-x');
            }
        } else {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
            if (menuIcon) {
                menuIcon.classList.remove('ph-x');
                menuIcon.classList.add('ph-list');
            }
        }
    }

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking any nav link inside mobile menu
    const links = mobileMenu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close when clicking outside of mobile menu & button
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden') && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close automatically when viewport scales up to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
            toggleMenu(false);
        }
    });
});
