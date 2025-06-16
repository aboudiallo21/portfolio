// Gestion de la navigation active
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du bouton de retour en haut
    const backToTopButton = document.getElementById('backToTop');
    
    // Afficher/masquer le bouton lors du défilement
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    }
    
    // Défilement fluide vers le haut
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Écouter l'événement de défilement
        window.addEventListener('scroll', toggleBackToTopButton);
        
        // Initialiser l'état du bouton
        toggleBackToTopButton();
    }
    // Mettre à jour la navigation active
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }
    
    // Mettre à jour la navigation active au chargement de la page
    updateActiveNav();
    
    // Mettre à jour la navigation active au défilement
    window.addEventListener('scroll', function() {
        updateActiveNav();
        if (backToTopButton) {
            toggleBackToTopButton();
        }
    });
    
    // Animation fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Ajustement pour la hauteur de la navbar
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // Gestion du menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
            this.setAttribute('aria-expanded', isExpanded);
            
            // Empêcher le défilement du corps lorsque le menu est ouvert
            if (isExpanded === 'true') {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fermer le menu mobile lors du clic sur un lien
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Ne pas empêcher le comportement par défaut des liens
            // pour permettre la navigation
            
            // Fermer le menu
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
            
            // Si c'est un lien d'ancrage sur la même page
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Fermer le menu lors d'un clic en dehors
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && 
            mobileMenuButton && !mobileMenuButton.contains(e.target) && 
            !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
});
