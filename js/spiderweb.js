// Spiderweb Animation for Alperdigital Website
// Based on Trustheory's splash screen design

// Global variables
let spiderwebApp;
let peeps = [];
let edges = [];

// Initialize spiderweb animation
function initSpiderweb() {
    const canvas = document.getElementById('spiderweb-canvas');
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create PIXI application
    spiderwebApp = new PIXI.Application({
        width: width,
        height: height,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        antialias: true
    });

    canvas.appendChild(spiderwebApp.view);

    // Create containers
    const edgesContainer = new PIXI.Container();
    const peepsContainer = new PIXI.Container();
    spiderwebApp.stage.addChild(edgesContainer);
    spiderwebApp.stage.addChild(peepsContainer);

    // Create skeleton peeps (simple circles for now)
    createSkeletonPeeps(peepsContainer, width, height);
    
    // Create connections
    createConnections(edgesContainer, peeps);

    // Start animation
    spiderwebApp.ticker.add(animate);
}

// Create skeleton peeps in rings
function createSkeletonPeeps(container, width, height) {
    // Create rings of peeps
    createRing(container, width/2, height/2, 200, 15);
    createRing(container, width/2, height/2, 300, 20);
    createRing(container, width/2, height/2, 400, 25);
    createRing(container, width/2, height/2, 500, 30);
}

// Create a ring of peeps
function createRing(container, centerX, centerY, radius, count) {
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const peep = createSkeletonPeep(x, y);
        peeps.push(peep);
        container.addChild(peep.graphics);
    }
}

// Create a skeleton peep
function createSkeletonPeep(x, y) {
    const peep = {
        x: x,
        y: y,
        initX: x,
        initY: y,
        graphics: new PIXI.Graphics(),
        radius: 5 + Math.random() * 15,
        swing: 0.05 + Math.random() * 0.45,
        angle: Math.random() * Math.PI * 2,
        speed: (0.05 + Math.random() * 0.95) / 60,
        initRotation: (Math.random() - 0.5) * (Math.PI - 0.4)
    };

    // Draw skeleton peep (simple circle for now)
    peep.graphics.beginFill(0xffffff, 0.8);
    peep.graphics.drawCircle(0, 0, 3);
    peep.graphics.endFill();
    
    peep.graphics.x = x;
    peep.graphics.y = y;

    return peep;
}

// Create connections between nearby peeps
function createConnections(container, peeps) {
    const maxDistance = 150;
    
    for (let i = 0; i < peeps.length; i++) {
        for (let j = i + 1; j < peeps.length; j++) {
            const peep1 = peeps[i];
            const peep2 = peeps[j];
            
            const dx = peep2.x - peep1.x;
            const dy = peep2.y - peep1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const edge = createConnection(peep1, peep2);
                edges.push(edge);
                container.addChild(edge.graphics);
            }
        }
    }
}

// Create connection between two peeps
function createConnection(peep1, peep2) {
    const edge = {
        from: peep1,
        to: peep2,
        graphics: new PIXI.Graphics()
    };
    
    return edge;
}

// Animation loop
function animate(delta) {
    // Update peeps
    peeps.forEach(peep => {
        peep.angle += peep.speed * delta;
        
        const x = peep.initX + Math.cos(peep.angle) * peep.radius;
        const y = peep.initY + Math.sin(peep.angle) * peep.radius;
        const rotation = peep.initRotation + Math.cos(peep.angle) * peep.swing;
        
        // Mouse interaction
        const mouse = spiderwebApp.renderer.plugins.interaction.mouse.global;
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        
        let bulgeX = 0;
        let bulgeY = 0;
        
        if (distance < maxDistance) {
            const bulge = Math.sin(((maxDistance - distance) / maxDistance) * Math.PI / 4) * 50;
            const bulgeAngle = Math.atan2(-dy, -dx);
            bulgeX = Math.cos(bulgeAngle) * bulge;
            bulgeY = Math.sin(bulgeAngle) * bulge;
        }
        
        peep.graphics.x = x + bulgeX;
        peep.graphics.y = y + bulgeY;
        peep.graphics.rotation = rotation;
    });
    
    // Update edges
    edges.forEach(edge => {
        const from = edge.from.graphics;
        const to = edge.to.graphics;
        
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        edge.graphics.clear();
        edge.graphics.lineStyle(1, 0xffffff, 0.3);
        edge.graphics.moveTo(0, 0);
        edge.graphics.lineTo(distance, 0);
        
        edge.graphics.x = from.x;
        edge.graphics.y = from.y;
        edge.graphics.rotation = Math.atan2(dy, dx);
    });
}

// Handle window resize
function handleResize() {
    if (spiderwebApp) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        spiderwebApp.renderer.resize(width, height);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize spiderweb immediately (without loading external resources)
    initSpiderweb();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
});
