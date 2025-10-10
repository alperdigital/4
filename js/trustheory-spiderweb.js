// Trustheory Spiderweb Animation for Alperdigital Website
// Exact replica of the Trustheory splash screen design

// Global variables
let spiderwebApp;
let peeps = [];
let edges = [];

// Initialize spiderweb animation
function initTrustheorySpiderweb() {
    console.log('Initializing Trustheory spiderweb...');
    
    const canvas = document.getElementById('spiderweb-canvas');
    if (!canvas) {
        console.log('Canvas not found!');
        return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log('Canvas dimensions:', width, height);

    // Create PIXI application
    spiderwebApp = new PIXI.Application({
        width: width,
        height: height,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        antialias: true
    });

    // Clear canvas and append PIXI view
    canvas.innerHTML = '';
    canvas.appendChild(spiderwebApp.view);

    console.log('PIXI app created');

    // Create containers
    const edgesContainer = new PIXI.Container();
    const peepsContainer = new PIXI.Container();
    spiderwebApp.stage.addChild(edgesContainer);
    spiderwebApp.stage.addChild(peepsContainer);

    // Create peeps using Trustheory's exact method
    createTrustheoryPeeps(peepsContainer, width, height);
    
    // Create connections using Trustheory's exact method
    createTrustheoryConnections(edgesContainer, peeps);

    console.log('Created', peeps.length, 'peeps and', edges.length, 'edges');

    // Start animation
    spiderwebApp.ticker.add(animateTrustheory);
    
    console.log('Trustheory spiderweb animation started!');
}

// Create peeps exactly like Trustheory
function createTrustheoryPeeps(container, width, height) {
    // Create rings exactly like Trustheory
    createTrustheoryRing(container, width, height, 400, 20);
    createTrustheoryRing(container, width, height, 520, 25);
    createTrustheoryRing(container, width, height, 640, 30);
    createTrustheoryRing(container, width, height, 760, 35);
}

// Create a ring exactly like Trustheory
function createTrustheoryRing(container, width, height, xRadius, count) {
    const yRadius = xRadius * (350/400);
    const increment = (Math.PI * 2 / count) + 0.0001;
    
    for (let angle = 0; angle < Math.PI * 2; angle += increment) {
        const a = angle - (Math.PI * 2 / 4);
        const x = width/2 + Math.cos(a) * xRadius;
        const y = height/2 + Math.sin(a) * yRadius;
        
        const peep = createTrustheoryPeep(x, y);
        peeps.push(peep);
        container.addChild(peep.graphics);
    }
}

// Create a peep exactly like Trustheory
function createTrustheoryPeep(x, y) {
    const peep = {
        x: x,
        y: y,
        initX: x,
        initY: y,
        graphics: new PIXI.Graphics(),
        initRotation: (Math.random() - 0.5) * (Math.PI - 0.4),
        radius: 5 + Math.random() * 20,
        swing: 0.05 + Math.random() * 0.45,
        angle: Math.random() * Math.PI * 2,
        speed: (0.05 + Math.random() * 0.95) / 60
    };

    // Draw peep as a simple skeleton figure (white circle with dark outline)
    peep.graphics.beginFill(0xffffff, 0.9);
    peep.graphics.lineStyle(2, 0x333333, 0.8);
    peep.graphics.drawCircle(0, 0, 6);
    peep.graphics.endFill();
    
    // Add simple body
    peep.graphics.lineStyle(2, 0x333333, 0.8);
    peep.graphics.moveTo(0, 6);
    peep.graphics.lineTo(0, 12);
    peep.graphics.moveTo(-3, 8);
    peep.graphics.lineTo(3, 8);
    peep.graphics.moveTo(0, 12);
    peep.graphics.lineTo(-2, 16);
    peep.graphics.moveTo(0, 12);
    peep.graphics.lineTo(2, 16);
    
    peep.graphics.x = x;
    peep.graphics.y = y;

    return peep;
}

// Create connections exactly like Trustheory
function createTrustheoryConnections(container, peeps) {
    const radius = 250;
    const r2 = radius * radius;

    for (let i = 0; i < peeps.length; i++) {
        const peep1 = peeps[i];

        for (let j = i + 1; j < peeps.length; j++) {
            const peep2 = peeps[j];

            // Are they close enough?
            const dx = peep2.x - peep1.x;
            const dy = peep2.y - peep1.y;
            if (dx * dx + dy * dy < r2) {
                const edge = createTrustheoryConnection(peep1, peep2);
                edges.push(edge);
                container.addChild(edge.graphics);
            }
        }
    }
}

// Create connection exactly like Trustheory
function createTrustheoryConnection(peep1, peep2) {
    const edge = {
        from: peep1,
        to: peep2,
        graphics: new PIXI.Graphics()
    };
    
    return edge;
}

// Animation loop exactly like Trustheory
function animateTrustheory(delta) {
    // Update peeps exactly like Trustheory
    peeps.forEach(peep => {
        peep.angle += peep.speed * delta;
        
        const x = peep.initX + Math.cos(peep.angle) * peep.radius;
        const y = peep.initY + Math.sin(peep.angle) * peep.radius;
        const r = peep.initRotation + Math.cos(peep.angle) * peep.swing;

        // Mouse interaction exactly like Trustheory
        const Mouse = spiderwebApp.renderer.plugins.interaction.mouse.global;
        const dx = Mouse.x - x;
        const dy = Mouse.y - y;
        const rad = 200;
        let bulgeX = 0;
        let bulgeY = 0;
        const dist2 = dx * dx + dy * dy;
        
        if (dist2 < rad * rad) {
            const bulge = Math.sin(((rad - Math.sqrt(dist2)) / rad) * Math.PI / 4) * 50;
            const bulgeAngle = Math.atan2(-dy, -dx);
            bulgeX = Math.cos(bulgeAngle) * bulge;
            bulgeY = Math.sin(bulgeAngle) * bulge;
        }

        // Update graphics
        peep.graphics.x = x + bulgeX;
        peep.graphics.y = y + bulgeY;
        peep.graphics.rotation = r;
    });
    
    // Update edges exactly like Trustheory
    edges.forEach(edge => {
        const f = edge.from.graphics;
        const t = edge.to.graphics;
        const dx = t.x - f.x;
        const dy = t.y - f.y;
        const a = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);

        edge.graphics.clear();
        edge.graphics.lineStyle(1, 0xffffff, 0.3);
        edge.graphics.moveTo(0, 0);
        edge.graphics.lineTo(dist, 0);

        edge.graphics.x = f.x;
        edge.graphics.y = f.y;
        edge.graphics.rotation = a;
    });
}

// Handle window resize
function handleTrustheoryResize() {
    if (spiderwebApp) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        spiderwebApp.renderer.resize(width, height);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Trustheory spiderweb...');
    
    // Wait for PIXI to be available
    setTimeout(() => {
        if (typeof PIXI !== 'undefined') {
            initTrustheorySpiderweb();
        } else {
            console.log('PIXI not available, retrying...');
            setTimeout(initTrustheorySpiderweb, 1000);
        }
    }, 100);
    
    // Handle window resize
    window.addEventListener('resize', handleTrustheoryResize);
});

