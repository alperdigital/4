// Advanced Spiderweb Animation - Inspired by Trustheory
// Dynamic, interactive, and beautiful

class AdvancedSpiderweb {
    constructor() {
        this.canvas = document.getElementById('spiderweb-overlay');
        this.peeps = [];
        this.edges = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        if (!this.canvas) return;
        
        this.setupCanvas();
        this.createPeeps();
        this.createEdges();
        this.setupMouseTracking();
        this.startAnimation();
        
        console.log('Advanced Spiderweb initialized with', this.peeps.length, 'peeps and', this.edges.length, 'edges');
    }
    
    setupCanvas() {
        this.canvas.innerHTML = '';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '10';
    }
    
    createPeeps() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;
        
        // Create rings exactly like Trustheory
        this.createRing(centerX, centerY, 200, 15);
        this.createRing(centerX, centerY, 300, 20);
        this.createRing(centerX, centerY, 400, 25);
        this.createRing(centerX, centerY, 500, 30);
    }
    
    createRing(centerX, centerY, radius, count) {
        const increment = (Math.PI * 2 / count) + 0.0001;
        
        for (let angle = 0; angle < Math.PI * 2; angle += increment) {
            const a = angle - (Math.PI * 2 / 4);
            const x = centerX + Math.cos(a) * radius;
            const y = centerY + Math.sin(a) * radius;
            
            const peep = new SpiderPeep(x, y, this.canvas);
            this.peeps.push(peep);
        }
    }
    
    createEdges() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.peeps.length; i++) {
            for (let j = i + 1; j < this.peeps.length; j++) {
                const peep1 = this.peeps[i];
                const peep2 = this.peeps[j];
                
                const dx = peep2.x - peep1.x;
                const dy = peep2.y - peep1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const edge = new SpiderEdge(peep1, peep2, this.canvas);
                    this.edges.push(edge);
                }
            }
        }
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    startAnimation() {
        const animate = () => {
            this.update();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    update() {
        // Update all peeps
        this.peeps.forEach(peep => {
            peep.update(this.mouse);
        });
        
        // Update all edges
        this.edges.forEach(edge => {
            edge.update();
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.peeps.forEach(peep => peep.destroy());
        this.edges.forEach(edge => edge.destroy());
    }
}

class SpiderPeep {
    constructor(x, y, container) {
        this.x = x;
        this.y = y;
        this.initX = x;
        this.initY = y;
        this.container = container;
        
        // Animation properties
        this.radius = 5 + Math.random() * 15;
        this.swing = 0.05 + Math.random() * 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (0.02 + Math.random() * 0.08) / 60;
        this.initRotation = (Math.random() - 0.5) * (Math.PI - 0.4);
        
        this.createElement();
    }
    
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'spider-peep';
        this.element.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform-origin: center;
            pointer-events: none;
        `;
        
        // Add body lines
        this.element.innerHTML = `
            <div style="
                position: absolute;
                top: 12px;
                left: 50%;
                transform: translateX(-50%);
                width: 1px;
                height: 8px;
                background: rgba(255, 255, 255, 0.6);
            "></div>
            <div style="
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 1px;
                height: 6px;
                background: rgba(255, 255, 255, 0.6);
            "></div>
        `;
        
        this.container.appendChild(this.element);
        this.updatePosition();
    }
    
    update(mouse) {
        // Update position with swing animation
        this.angle += this.speed;
        const x = this.initX + Math.cos(this.angle) * this.radius;
        const y = this.initY + Math.sin(this.angle) * this.radius;
        const rotation = this.initRotation + Math.cos(this.angle) * this.swing;
        
        // Mouse interaction
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        let bulgeX = 0;
        let bulgeY = 0;
        
        if (distance < maxDistance) {
            const bulge = Math.sin(((maxDistance - distance) / maxDistance) * Math.PI / 4) * 40;
            const bulgeAngle = Math.atan2(-dy, -dx);
            bulgeX = Math.cos(bulgeAngle) * bulge;
            bulgeY = Math.sin(bulgeAngle) * bulge;
        }
        
        this.x = x + bulgeX;
        this.y = y + bulgeY;
        this.rotation = rotation;
        
        this.updatePosition();
    }
    
    updatePosition() {
        this.element.style.left = (this.x - 6) + 'px';
        this.element.style.top = (this.y - 6) + 'px';
        this.element.style.transform = `rotate(${this.rotation}rad)`;
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

class SpiderEdge {
    constructor(peep1, peep2, container) {
        this.peep1 = peep1;
        this.peep2 = peep2;
        this.container = container;
        
        this.createElement();
    }
    
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'spider-edge';
        this.element.style.cssText = `
            position: absolute;
            height: 1px;
            background: rgba(255, 255, 255, 0.3);
            transform-origin: left center;
            pointer-events: none;
        `;
        
        this.container.appendChild(this.element);
    }
    
    update() {
        const dx = this.peep2.x - this.peep1.x;
        const dy = this.peep2.y - this.peep1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        
        this.element.style.left = this.peep1.x + 'px';
        this.element.style.top = this.peep1.y + 'px';
        this.element.style.width = distance + 'px';
        this.element.style.transform = `rotate(${angle}rad)`;
        
        // Dynamic opacity based on distance
        const opacity = Math.max(0.1, 0.4 - (distance / 1000));
        this.element.style.opacity = opacity;
    }
    
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Advanced Spiderweb...');
    
    // Wait a bit for the page to load
    setTimeout(() => {
        window.spiderweb = new AdvancedSpiderweb();
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.spiderweb) {
        window.spiderweb.destroy();
        setTimeout(() => {
            window.spiderweb = new AdvancedSpiderweb();
        }, 100);
    }
});

