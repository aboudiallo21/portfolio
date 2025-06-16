// Animation des compteurs de statistiques
document.addEventListener('DOMContentLoaded', function() {
    const stats = [
        { id: 'projectsCount', target: 87, duration: 2000 },
        { id: 'datasetsCount', target: 42, duration: 2000 },
        { id: 'modelsCount', target: 35, duration: 2000 },
        { id: 'healthProjects', target: 23, duration: 2000 }
    ];

    // Fonction pour animer un compteur
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        const elementNode = document.getElementById(element);
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                elementNode.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                elementNode.textContent = target;
                
                // Animation de la barre de progression
                const progressBar = elementNode.closest('.rounded-xl').querySelector('.progress-bar');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-target');
                    progressBar.style.width = targetWidth + '%';
                }
            }
        };
        
        updateCounter();
    }

    // Observer pour déclencher l'animation lorsque la section est visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stats.forEach(stat => {
                    animateCounter(stat.id, stat.target, stat.duration);
                });
                observer.disconnect(); // Arrêter d'observer après la première animation
            }
        });
    }, { threshold: 0.5 });

    // Commencer à observer la section des statistiques
    const statsSection = document.querySelector('#home');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
