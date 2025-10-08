// Simple CSS-based spiderweb animation
// Fallback if PIXI.js doesn't work

function createSimpleSpiderweb() {
    const canvas = document.getElementById('spiderweb-canvas');
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create spiderweb HTML structure
    canvas.innerHTML = `
        <div class="spiderweb-container" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        ">
            <div class="spiderweb-ring ring-1"></div>
            <div class="spiderweb-ring ring-2"></div>
            <div class="spiderweb-ring ring-3"></div>
            <div class="spiderweb-ring ring-4"></div>
            <div class="spiderweb-connections"></div>
        </div>
    `;

    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .spiderweb-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rotate 20s linear infinite;
        }
        
        .ring-1 {
            width: 300px;
            height: 300px;
            animation-duration: 15s;
        }
        
        .ring-2 {
            width: 500px;
            height: 500px;
            animation-duration: 25s;
            animation-direction: reverse;
        }
        
        .ring-3 {
            width: 700px;
            height: 700px;
            animation-duration: 35s;
        }
        
        .ring-4 {
            width: 900px;
            height: 900px;
            animation-duration: 45s;
            animation-direction: reverse;
        }
        
        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .spiderweb-connections {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1000px;
            height: 1000px;
            transform: translate(-50%, -50%);
            background: radial-gradient(circle, transparent 0%, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('Simple spiderweb created!');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating simple spiderweb...');
    
    // Try PIXI first, fallback to simple version
    setTimeout(() => {
        if (typeof PIXI !== 'undefined') {
            console.log('PIXI available, trying complex spiderweb...');
            // Let the complex version try first
            setTimeout(() => {
                if (!document.querySelector('.spiderweb-container')) {
                    console.log('Complex spiderweb failed, using simple version');
                    createSimpleSpiderweb();
                }
            }, 2000);
        } else {
            console.log('PIXI not available, using simple spiderweb');
            createSimpleSpiderweb();
        }
    }, 500);
});
