// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('nav');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-gray-900');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-gray-900');
        }
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in-up');
        }
    });
};

// Initialize animations on page load
window.addEventListener('load', () => {
    // Add animation class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const elements = section.querySelectorAll('h2, h3, p, .project-card, .skill-item, .timeline-item');
        elements.forEach((element, i) => {
            element.classList.add('opacity-0', 'animate-on-scroll');
            element.style.animationDelay = `${i * 0.1}s`;
        });
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
});

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

// Initialize particles.js if available
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#3B82F6'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3B82F6',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-green-500 text-white p-4 rounded-lg mt-4';
        successMessage.textContent = 'Merci pour votre message ! Je vous répondrai dès que possible.';
        contactForm.appendChild(successMessage);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Add animation to skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (isInViewport(bar)) {
            bar.style.width = width;
            bar.style.opacity = '1';
        }
    });
};

// Check if element is in viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Add scroll event for skill bars
window.addEventListener('scroll', animateSkillBars);

// Initialize skill bars on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation to skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        bar.style.opacity = '0';
        bar.style.transition = 'width 1.5s ease-in-out, opacity 1s ease-in-out';
    });
    
    // Trigger skill bar animation on page load if they're in viewport
    setTimeout(animateSkillBars, 500);
});
