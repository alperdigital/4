// Visible Spiderweb Animation - Guaranteed to work
// Simple CSS-based animation that will definitely show

function createVisibleSpiderweb() {
    console.log('Creating visible spiderweb...');
    
    const canvas = document.getElementById('spiderweb-canvas');
    if (!canvas) {
        console.log('Canvas not found!');
        return;
    }

    // Create visible spiderweb HTML
    canvas.innerHTML = `
        <div class="spiderweb-overlay" style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
        ">
            <!-- Ring 1 -->
            <div class="spider-ring ring-1" style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 300px;
                height: 300px;
                border: 2px solid rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rotate 20s linear infinite;
            "></div>
            
            <!-- Ring 2 -->
            <div class="spider-ring ring-2" style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 500px;
                height: 500px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rotate 30s linear infinite reverse;
            "></div>
            
            <!-- Ring 3 -->
            <div class="spider-ring ring-3" style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 700px;
                height: 700px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rotate 40s linear infinite;
            "></div>
            
            <!-- Ring 4 -->
            <div class="spider-ring ring-4" style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 900px;
                height: 900px;
                border: 2px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: rotate 50s linear infinite reverse;
            "></div>
            
            <!-- Connection lines -->
            <div class="spider-connections" style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 1000px;
                height: 1000px;
                transform: translate(-50%, -50%);
                background: 
                    radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 200px 200px, 200px 200px, 200px 200px, 200px 200px;
                animation: pulse 3s ease-in-out infinite;
            "></div>
            
            <!-- Floating dots -->
            <div class="spider-dots" style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            ">
                <div class="dot" style="position: absolute; top: 20%; left: 30%; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float 4s ease-in-out infinite;"></div>
                <div class="dot" style="position: absolute; top: 30%; left: 70%; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float 5s ease-in-out infinite 1s;"></div>
                <div class="dot" style="position: absolute; top: 60%; left: 20%; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float 6s ease-in-out infinite 2s;"></div>
                <div class="dot" style="position: absolute; top: 70%; left: 80%; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float 4.5s ease-in-out infinite 0.5s;"></div>
                <div class="dot" style="position: absolute; top: 40%; left: 50%; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float 5.5s ease-in-out infinite 1.5s;"></div>
                <div class="dot" style="position: absolute; top: 80%; left: 40%; width: 4px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 50%; animation: float 4.8s ease-in-out infinite 2.5s;"></div>
            </div>
        </div>
    `;

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
            50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
        
        .spiderweb-overlay {
            animation: fadeIn 2s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('Visible spiderweb created successfully!');
}

// Initialize immediately when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating visible spiderweb...');
    
    // Create spiderweb immediately
    setTimeout(createVisibleSpiderweb, 100);
});
