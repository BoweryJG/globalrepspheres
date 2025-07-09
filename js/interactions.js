// Main interactions and UI behaviors

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeGapCounter();
    initializeEcosystemAnimation();
    initializeUrgencyTicker();
    initializeCTAButtons();
    initializeHoverEffects();
    
    // Initialize mobile optimizations
    if (isMobile()) {
        initializeMobileOptimizations();
    }
});

// Gap Counter Animation
function initializeGapCounter() {
    const counter = document.getElementById('gapCounter');
    if (!counter) return;
    
    let count = 3;
    
    setInterval(() => {
        count++;
        counter.textContent = count;
        counter.style.animation = 'none';
        
        // Trigger reflow
        void counter.offsetWidth;
        
        counter.style.animation = 'counter-pulse 0.5s ease-out';
    }, 5000);
}

// Ecosystem Neural Network Animation
function initializeEcosystemAnimation() {
    const ecosystem = document.querySelector('.ecosystem-visualization');
    if (!ecosystem) return;
    
    const nodes = ecosystem.querySelectorAll('.eco-node');
    const center = ecosystem.querySelector('.core-node');
    
    // Create connection lines
    nodes.forEach((node, index) => {
        const connection = document.createElement('div');
        connection.className = 'eco-connection';
        connection.style.position = 'absolute';
        connection.style.height = '1px';
        connection.style.background = 'linear-gradient(90deg, transparent, #D4AF37, transparent)';
        connection.style.opacity = '0';
        connection.style.transition = 'opacity 0.5s ease';
        
        ecosystem.appendChild(connection);
        
        // Position connection
        updateConnection(connection, center, node);
        
        // Animate on hover
        node.addEventListener('mouseenter', () => {
            connection.style.opacity = '0.6';
            node.style.transform = 'scale(1.1)';
            
            // Pulse effect to center
            center.style.animation = 'none';
            void center.offsetWidth;
            center.style.animation = 'core-pulse 0.5s ease-out';
        });
        
        node.addEventListener('mouseleave', () => {
            connection.style.opacity = '0';
            node.style.transform = 'scale(1)';
        });
    });
}

function updateConnection(line, elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    const container = line.parentElement.getBoundingClientRect();
    
    const x1 = rect1.left - container.left + rect1.width / 2;
    const y1 = rect1.top - container.top + rect1.height / 2;
    const x2 = rect2.left - container.left + rect2.width / 2;
    const y2 = rect2.top - container.top + rect2.height / 2;
    
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    line.style.width = `${distance}px`;
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 50%';
}

// Urgency Ticker
function initializeUrgencyTicker() {
    const ticker = document.querySelector('.urgency-ticker');
    if (!ticker) return;
    
    const messages = [
        "By 2026, manual prospecting will be as relevant as door-to-door encyclopedia sales.",
        "Every voicemail you leave is a deal your competitor just closed with RepSpheres.",
        "The gap isn't growing linearly. It's exponential. And it started yesterday.",
        "83% of AI-powered teams saw revenue growth. The other 17% are your future customers.",
        "In 2025, there are only two types of reps: Those with 40% productivity gains, and those wondering where their deals went."
    ];
    
    let currentIndex = 0;
    const tickerContent = ticker.querySelector('p');
    
    function rotateMessage() {
        currentIndex = (currentIndex + 1) % messages.length;
        tickerContent.style.opacity = '0';
        
        setTimeout(() => {
            tickerContent.textContent = messages[currentIndex];
            tickerContent.style.opacity = '1';
        }, 500);
    }
    
    setInterval(rotateMessage, 8000);
}

// CTA Button Interactions
function initializeCTAButtons() {
    // Main CTAs
    window.startRevolution = function() {
        // Scroll to pricing section
        const pricingSection = document.querySelector('.pricing-section');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    window.hearHarvey = function() {
        // Show Harvey demo modal or redirect
        alert('Harvey Whisper Demo - Coming Soon! Experience real-time AI coaching that only you can hear.');
    };
    
    // Pricing tier CTAs
    document.querySelectorAll('.tier-cta').forEach(button => {
        button.addEventListener('click', function() {
            const tierName = this.closest('.pricing-card').querySelector('.tier-name').textContent;
            const price = this.closest('.pricing-card').querySelector('.amount').textContent;
            
            // Track conversion intent
            console.log(`User clicked ${tierName} tier at $${price}/month`);
            
            // Redirect to signup with tier pre-selected
            window.location.href = `/signup?tier=${tierName.toLowerCase()}`;
        });
    });
}

// Hover Effects
function initializeHoverEffects() {
    // Whisper waves animation
    const whisperViz = document.querySelector('.whisper-visualization');
    if (whisperViz) {
        whisperViz.addEventListener('mouseenter', () => {
            const waves = whisperViz.querySelector('.whisper-waves');
            waves.style.animation = 'wave-expand 1s ease-out infinite';
        });
    }
    
    // Data streams animation
    const dataOwnership = document.querySelector('.data-ownership');
    if (dataOwnership) {
        dataOwnership.addEventListener('mousemove', (e) => {
            const rect = dataOwnership.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            dataOwnership.style.background = `
                radial-gradient(circle at ${x * 100}% ${y * 100}%, 
                    rgba(212, 175, 55, 0.1) 0%, 
                    transparent 50%),
                linear-gradient(135deg, #1a1a1a 0%, #0A0A0A 100%)
            `;
        });
    }
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    // Reduce particle count
    const papers = document.querySelectorAll('.paper');
    papers.forEach((paper, index) => {
        if (index > 10) paper.remove();
    });
    
    const nodes = document.querySelectorAll('.data-node');
    nodes.forEach((node, index) => {
        if (index > 15) node.remove();
    });
    
    // Simplify animations
    document.documentElement.style.setProperty('--animation-duration', '2s');
    
    // Add touch feedback
    document.querySelectorAll('button, .choice-btn, .tier-cta').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Utility Functions
function isMobile() {
    return window.innerWidth <= 768 || 
           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Performance monitoring
function monitorPerformance() {
    let lastTime = performance.now();
    let frames = 0;
    
    function checkFPS() {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round((frames * 1000) / (currentTime - lastTime));
            
            // Reduce quality if FPS drops below 30
            if (fps < 30) {
                document.body.classList.add('reduce-motion');
            } else if (fps > 50) {
                document.body.classList.remove('reduce-motion');
            }
            
            frames = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
}

// Start performance monitoring
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    monitorPerformance();
}

// Add smooth reveal for sections
const revealElements = document.querySelectorAll('.section-container');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 1s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));