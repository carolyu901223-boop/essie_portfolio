// Navigation, Back to Top, and Shared UI Helpers
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuIcon = document.getElementById('mobile-menu-icon');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
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

        // Close when clicking any nav link
        const links = mobileMenu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Close when window resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                toggleMenu(false);
            }
        });
    }

    // 2. Back to Top Button Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
                backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
            } else {
                backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
                backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 3. Robust Toast Notification Helper
    function showToast(message) {
        let toast = document.getElementById('global-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'global-toast';
            toast.style.cssText = 'position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);z-index:9999;display:flex;align-items:center;gap:10px;padding:12px 24px;border-radius:9999px;background-color:rgba(28,28,28,0.95);color:#fff;font-size:14px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.3);backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);white-space:nowrap;';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="ph-fill ph-check-circle" style="color:#8A84E2;font-size:18px;"></i> <span>${message}</span>`;
        // Trigger reflow
        void toast.offsetWidth;
        toast.style.opacity = '1';
        toast.style.pointerEvents = 'auto';
        toast.style.transform = 'translateX(-50%) translateY(0)';

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.pointerEvents = 'none';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
        }, 2800);
    }
    window.showToast = showToast;

    // 4. Copy Email Buttons
    const copyEmailBtns = document.querySelectorAll('.copy-email-action');
    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email') || 'carol.yu901223@gmail.com';
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                } else {
                    throw new Error('Clipboard API unavailable');
                }
            } catch (err) {
                // Fallback for older browsers or insecure origins
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            }
            showToast(`已複製 Email：${email}`);
        });
    });
});
