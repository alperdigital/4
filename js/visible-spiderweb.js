// Guaranteed Visible Spiderweb Animation
// This will definitely show on the page

function createGuaranteedSpiderweb() {
    console.log('Creating guaranteed visible spiderweb...');
    
    const canvas = document.getElementById('spiderweb-canvas');
    if (!canvas) {
        console.log('Canvas not found!');
        return;
    }

    // Make canvas visible with bright colors for testing
    canvas.style.border = '2px solid red';
    canvas.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';

    // Create very visible spiderweb
    canvas.innerHTML = `
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%);
            z-index: 1;
        ">
            <!-- Very visible rings -->
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 200px;
                height: 200px;
                border: 3px solid rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: spin 10s linear infinite;
            "></div>
            
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 400px;
                height: 400px;
                border: 3px solid rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: spin 15s linear infinite reverse;
            "></div>
            
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 600px;
                height: 600px;
                border: 3px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: spin 20s linear infinite;
            "></div>
            
            <!-- Very visible dots -->
            <div style="
                position: absolute;
                top: 20%;
                left: 20%;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                animation: bounce 2s ease-in-out infinite;
            "></div>
            
            <div style="
                position: absolute;
                top: 30%;
                left: 70%;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                animation: bounce 2s ease-in-out infinite 0.5s;
            "></div>
            
            <div style="
                position: absolute;
                top: 70%;
                left: 30%;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                animation: bounce 2s ease-in-out infinite 1s;
            "></div>
            
            <div style="
                position: absolute;
                top: 80%;
                left: 80%;
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                animation: bounce 2s ease-in-out infinite 1.5s;
            "></div>
            
            <!-- Center pulse -->
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: pulse 3s ease-in-out infinite;
            "></div>
        </div>
    `;

    // Add very visible CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-30px) scale(1.5); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
            50% { transform: translate(-50%, -50%) scale(2); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('Guaranteed visible spiderweb created!');
    console.log('Canvas element:', canvas);
    console.log('Canvas innerHTML length:', canvas.innerHTML.length);
}

// Initialize immediately
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating guaranteed spiderweb...');
    
    // Create immediately
    createGuaranteedSpiderweb();
    
    // Also try after a delay
    setTimeout(createGuaranteedSpiderweb, 1000);
});