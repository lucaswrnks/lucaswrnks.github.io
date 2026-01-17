
document.addEventListener('DOMContentLoaded', () => {
    // ================================
    // ÉLÉMENTS DU DOM
    // ================================
    const selectLang = document.getElementById('langue');
    const btnCV = document.getElementById('btn-cv');
    const navLinks = document.querySelectorAll('.nav-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // ================================
    // NAVIGATION ACTIVE
    // ================================
    // Gestion du lien actif au clic
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Gestion du lien actif au scroll (observer les sections visibles)
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.page-section').forEach(section => {
        observer.observe(section);
    });

    // ================================
    // GESTION MULTILINGUE
    // ================================
    const updateContent = (lang) => {
        // Mise à jour de tous les éléments avec attributs data-[lang]
        document.querySelectorAll(`[data-${lang}]`).forEach(el => {
            const translatedText = el.getAttribute(`data-${lang}`);
            if (translatedText) {
                // Préserver les balises SVG dans les boutons
                if (el.querySelector('svg')) {
                    const svg = el.querySelector('svg');
                    el.textContent = '';
                    el.appendChild(svg);
                    const span = document.createElement('span');
                    span.textContent = translatedText;
                    el.appendChild(span);
                } else {
                    el.textContent = translatedText;
                }
            }
        });

        // Mise à jour du CV
        const cvMapping = {
            'fr': 'CV_Lucas_WRANKOVICS_FR.pdf',
            'en': 'CV_Lucas_WRANKOVICS_EN.pdf',
            'jp': 'CV_Lucas_WRANKOVICS_JP.pdf'
        };
        if (btnCV) {
            btnCV.href = cvMapping[lang] || cvMapping['fr'];
        }

        // Sauvegarder la préférence de langue
        localStorage.setItem('preferredLanguage', lang);
    };

    // Écouteur de changement de langue
    if (selectLang) {
        selectLang.addEventListener('change', (e) => {
            updateContent(e.target.value);
        });
    }

    // Initialisation avec la langue préférée ou français par défaut
    const preferredLang = localStorage.getItem('preferredLanguage') || 'fr';
    if (selectLang) {
        selectLang.value = preferredLang;
    }
    updateContent(preferredLang);

    // ================================
    // FILTRAGE DES PROJETS
    // ================================
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Mise à jour des boutons actifs
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filtrage des cartes
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'block';
                        // Animation d'apparition
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ================================
    // ANIMATIONS AU SCROLL (AOS-like)
    // ================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            // Si l'élément est visible dans la fenêtre
            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                element.classList.add('aos-animate');
            }
        });
    };

    // Exécuter au chargement et au scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // ================================
    // SMOOTH SCROLL
    // ================================
   // ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Hauteur de la navigation + marge de sécurité
            const navHeight = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

    // ================================
    // ANIMATION DES BARRES DE COMPÉTENCES
    // ================================
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barTop < windowHeight * 0.8 && !bar.classList.contains('animated')) {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                bar.classList.add('animated');
                
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }
        });
    };

    animateSkillBars();
    window.addEventListener('scroll', animateSkillBars);

    // ================================
    // NAVIGATION STICKY
    // ================================
    const navigation = document.querySelector('.navigation');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navigation.style.boxShadow = '0 4px 30px rgba(59, 42, 26, 0.15)';
        } else {
            navigation.style.boxShadow = '0 2px 20px rgba(59, 42, 26, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // ================================
    // ANIMATION DE LA PHOTO DE PROFIL
    // ================================
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });

        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // ================================
    // COMPTEUR D'ANIMATION POUR LES CHIFFRES (optionnel)
    // ================================
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 secondes
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Démarrer l'animation quand visible
            const counterTop = counter.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (counterTop < windowHeight * 0.8) {
                updateCounter();
            }
        });
    };

    // Si vous ajoutez des compteurs avec class="counter" et data-target="valeur"
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ================================
    // EFFETS DE PARTICULES DANS LE HERO (optionnel avancé)
    // ================================
    const createParticles = () => {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(212, 175, 55, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            heroBackground.appendChild(particle);
        }
    };

    // Activer si désiré
    // createParticles();

    // ================================
    // GESTION DU MENU MOBILE (si ajouté)
    // ================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // ================================
    // EFFET DE TYPING POUR LE TITRE (optionnel)
    // ================================
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Exemple d'utilisation
    // const heroSubtitle = document.querySelector('.hero-subtitle');
    // if (heroSubtitle) {
    //     const originalText = heroSubtitle.textContent;
    //     typeWriter(heroSubtitle, originalText, 50);
    // }

    // ================================
    // INITIALISATION
    // ================================
    console.log('Portfolio chargé avec succès! 🎨');
    
    // Activer le premier lien par défaut si aucun n'est actif
    if (!document.querySelector('.nav-link.active') && navLinks[0]) {
        navLinks[0].classList.add('active');
    }

    // ================================
    // LAZY LOADING DES IMAGES (optionnel)
    // ================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ================================
    // EASTER EGG (optionnel - Konami Code)
    // ================================
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-konamiSequence.length);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg activé!
            document.body.style.animation = 'rainbow 5s infinite';
            console.log('🎮 Konami Code activé! Vous êtes un vrai gamer!');
            
            // Animation rainbow
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    });
});

