// Initialisation des animations au chargement du document
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des particules
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#3b82f6' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3b82f6',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Animation du réseau de neurones
    createNeuralNetwork();
    
    // Animation des compétences au défilement
    animateSkillsOnScroll();
    
    // Animation des cartes de projet
    initProjectCards();
    
    // Effet de frappe pour le titre
    initTypingEffect();
});

// Création d'un réseau de neurones animé
function createNeuralNetwork() {
    const container = document.querySelector('.neural-network');
    if (!container) return;
    
    const layers = 5;
    const neuronsPerLayer = 5;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Création des neurones
    for (let l = 0; l < layers; l++) {
        for (let n = 0; n < neuronsPerLayer; n++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron';
            
            // Position aléatoire dans la couche
            const x = (l + 1) * (containerWidth / (layers + 1));
            const y = (n + 1) * (containerHeight / (neuronsPerLayer + 1));
            
            // Ajout d'un délai aléatoire pour l'animation
            const delay = Math.random() * 2;
            neuron.style.animationDelay = `${delay}s`;
            
            neuron.style.left = `${x}px`;
            neuron.style.top = `${y}px`;
            
            // Ajout d'un effet de pulsation aléatoire
            neuron.style.animationDuration = `${2 + Math.random() * 3}s`;
            
            container.appendChild(neuron);
            
            // Création des connexions avec la couche précédente
            if (l > 0) {
                for (let pn = 0; pn < neuronsPerLayer; pn++) {
                    const prevX = l * (containerWidth / (layers + 1));
                    const prevY = (pn + 1) * (containerHeight / (neuronsPerLayer + 1));
                    
                    createConnection(prevX, prevY, x, y, container);
                }
            }
        }
    }
}

function createConnection(x1, y1, x2, y2, container) {
    const connection = document.createElement('div');
    connection.className = 'connection';
    
    // Calcul de la distance et de l'angle
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    // Positionnement et rotation de la connexion
    connection.style.width = `${length}px`;
    connection.style.left = `${x1}px`;
    connection.style.top = `${y1}px`;
    connection.style.transform = `rotate(${angle}deg)`;
    connection.style.opacity = 0.1 + Math.random() * 0.2;
    
    // Animation de la connexion
    connection.style.animation = `pulse ${2 + Math.random() * 3}s infinite`;
    
    container.appendChild(connection);
}

// Animation des compétences au défilement
function animateSkillsOnScroll() {
    const skills = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.skill-level');
                const level = skillLevel.getAttribute('data-level');
                skillLevel.style.width = level;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    skills.forEach(skill => {
        observer.observe(skill);
    });
}

// Initialisation des cartes de projet
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Effet de frappe pour le titre
function initTypingEffect() {
    const title = document.querySelector('.typing-text');
    if (!title) return;
    
    // Sauvegarder le texte original
    const text = title.textContent;
    title.textContent = '';
    title.style.display = 'inline-block';
    
    // Vitesse de frappe pour une durée totale de 1 seconde
    let i = 0;
    const totalDuration = 1000; // 1 seconde totale
    const speed = Math.max(30, Math.floor(totalDuration / text.length)); // Vitesse calculée pour durer 1s
    
    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Démarrer l'animation
    typeWriter();
}
