document.addEventListener('DOMContentLoaded', () => {
    
    // Bestehende Parallax und Scroll Animation Logik
    const parallaxBg = document.querySelector('.parallax-bg');
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                const animatedItems = entry.target.querySelectorAll('.flip-card, .parallax-image');
                animatedItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                });
                // observer.unobserve(entry.target); // Deaktivieren, wenn der Effekt bei jedem Scroll sichtbar sein soll
            } else {
                 // Fügt Animationen beim Verlassen hinzu, optional
                 // entry.target.classList.remove('is-visible'); 
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.4}px) scale(1.1)`;
        }
        fluidColorShift(scrollPosition);
    });

    // Fluid Color Shift (bleibt gleich)
    function fluidColorShift(scrollPos) {
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const ratio = scrollPos / maxScroll;
        const hue = 200 + (ratio * 40); 
        const saturation = 10 + (ratio * 10); 
        document.body.style.background = `linear-gradient(135deg, hsl(${hue}deg, ${saturation}%, 95%), hsl(${hue + 20}deg, ${saturation + 5}%, 94%))`;
    }
    fluidColorShift(0);

    // NEU: Akkordeon Funktionalität (Ausklappen)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const isActive = item.classList.contains('active');

            // Schließe alle anderen (iOS-Stil: Nur eines ist offen)
            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });

            // Toggle das aktuelle Element
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // NEU: 3D-Karten-Flip auf Mobile (da Hover schlecht funktioniert)
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
             // Wenn es ein Mobilgerät ist (oder wir so tun)
            if (window.innerWidth <= 768) {
                // Verhindert das Scrollen, wenn man auf die Karte tippt
                e.preventDefault(); 
                card.classList.toggle('flipped');
            }
        });
    });
});