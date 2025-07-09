// Scroll-driven animations for AI Inversion homepage

document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        momentOfTruth: document.getElementById('moment-of-truth'),
        fracture: document.getElementById('the-fracture'),
        choice: document.getElementById('the-choice'),
        ascension: document.getElementById('ascension-path'),
        decay: document.getElementById('decay-path')
    };

    const watchElements = {
        face: document.getElementById('mainWatch'),
        crack: document.querySelector('.watch-crack'),
        left: document.querySelector('.watch-left'),
        right: document.querySelector('.watch-right'),
        secondHand: document.querySelector('.second-hand')
    };

    let lastScrollY = 0;
    let ticking = false;

    // Initialize
    initializeAnimations();

    function initializeAnimations() {
        // Set up intersection observers
        setupIntersectionObservers();
        
        // Set up scroll listeners
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Set up resize listener for responsive adjustments
        window.addEventListener('resize', debounce(onResize, 250));
        
        // Initialize paper vortex
        initializePaperVortex();
        
        // Initialize data constellation
        initializeDataConstellation();
    }

    function onScroll() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        const scrollProgress = calculateScrollProgress();
        
        // Update watch animation based on scroll
        updateWatchAnimation(scrollProgress);
        
        // Update section visibility
        updateSectionVisibility(scrollProgress);
        
        // Update parallax effects
        updateParallaxEffects(scrollProgress);
        
        ticking = false;
    }

    function calculateScrollProgress() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        return Math.min(scrolled / docHeight, 1);
    }

    function updateWatchAnimation(progress) {
        if (!watchElements.face) return;
        
        // Stage 1: 0-25% - Watch trembles more intensely
        if (progress < 0.25) {
            const trembleIntensity = progress * 4;
            watchElements.secondHand.style.animation = `tremble ${0.1 - trembleIntensity * 0.05}s ease-in-out infinite`;
        }
        
        // Stage 2: 25-50% - Crack appears and grows
        else if (progress >= 0.25 && progress < 0.5) {
            const crackProgress = (progress - 0.25) * 4;
            watchElements.crack.classList.remove('hidden');
            watchElements.crack.classList.add('active');
            
            // Start splitting the watch
            if (crackProgress > 0.5) {
                watchElements.left.classList.remove('hidden');
                watchElements.right.classList.remove('hidden');
                
                const splitAmount = (crackProgress - 0.5) * 2;
                watchElements.left.style.transform = `translateX(${-splitAmount * 20}%) rotate(${-splitAmount * 5}deg)`;
                watchElements.right.style.transform = `translateX(${splitAmount * 20}%) rotate(${splitAmount * 5}deg)`;
                
                // Apply filters
                watchElements.left.style.filter = `grayscale(${splitAmount * 100}%) brightness(${1 - splitAmount * 0.5})`;
                watchElements.right.style.filter = `brightness(${1 + splitAmount * 0.2}) contrast(${1 + splitAmount * 0.1})`;
            }
        }
        
        // Stage 3: 50%+ - Full split
        else if (progress >= 0.5) {
            watchElements.face.style.opacity = Math.max(0, 1 - (progress - 0.5) * 2);
        }
    }

    function updateSectionVisibility(progress) {
        // Show fracture section
        if (progress >= 0.3) {
            sections.fracture.classList.remove('hidden');
            sections.fracture.classList.add('visible');
        }
        
        // Show choice section
        if (progress >= 0.6) {
            sections.choice.classList.remove('hidden');
            sections.choice.classList.add('visible');
        }
    }

    function updateParallaxEffects(progress) {
        // Parallax for decay side papers
        const papers = document.querySelectorAll('.paper');
        papers.forEach((paper, index) => {
            const speed = 0.5 + (index * 0.1);
            paper.style.transform = `translateY(${progress * speed * 100}px) rotate(${progress * 360}deg)`;
        });
        
        // Parallax for data nodes
        const nodes = document.querySelectorAll('.data-node');
        nodes.forEach((node, index) => {
            const speed = 0.3 + (index * 0.05);
            node.style.transform = `translateY(${-progress * speed * 50}px)`;
        });
    }

    function setupIntersectionObservers() {
        const observerOptions = {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('whisper-item')) {
                        animateWhisperItem(entry.target);
                    } else if (entry.target.classList.contains('benefit-card')) {
                        animateBenefitCard(entry.target);
                    } else if (entry.target.classList.contains('pricing-card')) {
                        animatePricingCard(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.whisper-item, .benefit-card, .pricing-card, .sync-item').forEach(el => {
            observer.observe(el);
        });
    }

    function initializePaperVortex() {
        const vortex = document.getElementById('paperVortex');
        if (!vortex) return;
        
        // Create falling papers
        for (let i = 0; i < 20; i++) {
            const paper = document.createElement('div');
            paper.className = 'paper';
            paper.style.left = `${Math.random() * 100}%`;
            paper.style.animationDelay = `${Math.random() * 8}s`;
            paper.style.animationDuration = `${8 + Math.random() * 4}s`;
            paper.style.setProperty('--random', Math.random());
            vortex.appendChild(paper);
        }
    }

    function initializeDataConstellation() {
        const constellation = document.getElementById('dataConstellation');
        if (!constellation) return;
        
        // Create data nodes
        for (let i = 0; i < 30; i++) {
            const node = document.createElement('div');
            node.className = 'data-node';
            
            // Random positioning
            const angle = (i / 30) * Math.PI * 2;
            const radius = 50 + Math.random() * 150;
            const x = 50 + Math.cos(angle) * radius / 3;
            const y = 50 + Math.sin(angle) * radius / 3;
            
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.setProperty('--orbit-duration', `${10 + Math.random() * 20}s`);
            node.style.setProperty('--orbit-radius', `${radius}px`);
            node.style.animationDelay = `${Math.random() * 2}s`;
            
            constellation.appendChild(node);
        }
        
        // Create neural connections
        createNeuralConnections(constellation);
    }

    function createNeuralConnections(container) {
        const nodes = container.querySelectorAll('.data-node');
        const connections = [];
        
        // Create connections between nearby nodes
        nodes.forEach((node, i) => {
            const nodeRect = node.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            // Connect to 2-3 nearby nodes
            const connectCount = 2 + Math.floor(Math.random() * 2);
            for (let j = 0; j < connectCount; j++) {
                const targetIndex = (i + 1 + j * 3) % nodes.length;
                const target = nodes[targetIndex];
                
                if (target && !connections.find(c => 
                    (c.from === i && c.to === targetIndex) || 
                    (c.from === targetIndex && c.to === i)
                )) {
                    const link = createNeuralLink(node, target, container);
                    connections.push({ from: i, to: targetIndex });
                }
            }
        });
    }

    function createNeuralLink(node1, node2, container) {
        const link = document.createElement('div');
        link.className = 'neural-link';
        
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const x1 = rect1.left - containerRect.left + rect1.width / 2;
        const y1 = rect1.top - containerRect.top + rect1.height / 2;
        const x2 = rect2.left - containerRect.left + rect2.width / 2;
        const y2 = rect2.top - containerRect.top + rect2.height / 2;
        
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        link.style.width = `${distance}px`;
        link.style.left = `${x1}px`;
        link.style.top = `${y1}px`;
        link.style.transform = `rotate(${angle}deg)`;
        link.style.transformOrigin = '0 50%';
        
        container.appendChild(link);
        return link;
    }

    // Animation functions
    function animateWhisperItem(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100);
    }

    function animateBenefitCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    function animatePricingCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 100);
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function onResize() {
        // Recalculate neural connections on resize
        const constellation = document.getElementById('dataConstellation');
        if (constellation) {
            constellation.querySelectorAll('.neural-link').forEach(link => link.remove());
            createNeuralConnections(constellation);
        }
    }
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}