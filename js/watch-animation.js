// Watch Animation Controller

class WatchAnimation {
    constructor() {
        this.watch = document.getElementById('mainWatch');
        this.crack = document.querySelector('.watch-crack');
        this.leftHalf = document.querySelector('.watch-left');
        this.rightHalf = document.querySelector('.watch-right');
        this.secondHand = document.querySelector('.second-hand');
        
        this.scrollThreshold = 0.25;
        this.crackThreshold = 0.35;
        this.splitThreshold = 0.5;
        
        this.init();
    }
    
    init() {
        if (!this.watch) return;
        
        // Add mouse movement effect
        this.setupMouseTracking();
        
        // Add device orientation support for mobile
        if (window.DeviceOrientationEvent) {
            this.setupDeviceOrientation();
        }
        
        // Initialize watch hands animation
        this.animateWatchHands();
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            if (this.watch.classList.contains('splitting')) return;
            
            const rect = this.watch.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - centerY) / window.innerHeight * 10;
            const angleY = (e.clientX - centerX) / window.innerWidth * 10;
            
            this.watch.style.transform = `perspective(1000px) rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
        });
    }
    
    setupDeviceOrientation() {
        window.addEventListener('deviceorientation', (e) => {
            if (this.watch.classList.contains('splitting')) return;
            
            const tiltX = e.beta / 180 * 10; // -180 to 180
            const tiltY = e.gamma / 90 * 10; // -90 to 90
            
            this.watch.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
    }
    
    animateWatchHands() {
        // Get current time
        const now = new Date();
        const hours = now.getHours() % 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Calculate angles
        const hourAngle = (hours * 30) + (minutes * 0.5);
        const minuteAngle = minutes * 6;
        const secondAngle = seconds * 6;
        
        // Apply rotations
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        
        if (hourHand) hourHand.style.transform = `rotate(${hourAngle}deg)`;
        if (minuteHand) minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        
        // Second hand trembles at midnight position
        if (this.secondHand && !this.watch.classList.contains('splitting')) {
            this.secondHand.style.transform = `rotate(0deg)`;
        }
    }
    
    triggerCrack(progress) {
        if (!this.crack) return;
        
        this.crack.classList.remove('hidden');
        this.crack.classList.add('active');
        
        // Add crack sound effect (optional)
        this.playCrackSound();
    }
    
    triggerSplit(progress) {
        if (!this.leftHalf || !this.rightHalf) return;
        
        this.watch.classList.add('splitting');
        this.leftHalf.classList.remove('hidden');
        this.rightHalf.classList.remove('hidden');
        
        // Clone watch face content to both halves
        this.cloneWatchContent();
        
        // Apply split animation
        const splitAmount = Math.min((progress - this.splitThreshold) * 2, 1);
        this.animateSplit(splitAmount);
    }
    
    cloneWatchContent() {
        // Clone watch face elements to both halves
        const watchContent = this.watch.innerHTML;
        
        if (this.leftHalf.children.length === 0) {
            this.leftHalf.innerHTML = watchContent;
            this.rightHalf.innerHTML = watchContent;
        }
    }
    
    animateSplit(amount) {
        const maxTranslate = 30;
        const maxRotate = 10;
        
        // Left half decays
        this.leftHalf.style.transform = `
            translateX(${-amount * maxTranslate}%) 
            rotate(${-amount * maxRotate}deg)
            scale(${1 - amount * 0.1})
        `;
        this.leftHalf.style.filter = `
            grayscale(${amount * 100}%) 
            brightness(${1 - amount * 0.5})
            blur(${amount * 2}px)
        `;
        
        // Right half ascends
        this.rightHalf.style.transform = `
            translateX(${amount * maxTranslate}%) 
            rotate(${amount * maxRotate}deg)
            scale(${1 + amount * 0.1})
        `;
        this.rightHalf.style.filter = `
            brightness(${1 + amount * 0.3}) 
            contrast(${1 + amount * 0.2})
            saturate(${1 + amount * 0.5})
        `;
        
        // Add glow to right half
        this.rightHalf.style.boxShadow = `
            0 0 ${amount * 60}px rgba(212, 175, 55, ${amount * 0.5}),
            inset 0 0 ${amount * 40}px rgba(212, 175, 55, ${amount * 0.3})
        `;
    }
    
    playCrackSound() {
        // Optional: Add sound effect
        if ('AudioContext' in window) {
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    updateProgress(scrollProgress) {
        if (scrollProgress >= this.crackThreshold && !this.crack.classList.contains('active')) {
            this.triggerCrack(scrollProgress);
        }
        
        if (scrollProgress >= this.splitThreshold && !this.watch.classList.contains('splitting')) {
            this.triggerSplit(scrollProgress);
        } else if (scrollProgress >= this.splitThreshold) {
            const splitProgress = (scrollProgress - this.splitThreshold) / (1 - this.splitThreshold);
            this.animateSplit(splitProgress);
        }
    }
}

// Initialize watch animation
document.addEventListener('DOMContentLoaded', () => {
    window.watchAnimation = new WatchAnimation();
});

// Export for use in scroll animations
window.WatchAnimation = WatchAnimation;