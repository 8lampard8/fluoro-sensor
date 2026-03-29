document.addEventListener('DOMContentLoaded', function() {
    initializeComparisonSlider();
    initializeDemoTabs();
    initializeSmoothScroll();
    initializeAnimations();
    initializeNavbar();
    initializeAnalysisModal();
    initializeImageUpload();
    initializeToolSwitching();
    initializeColorPicker();
    initializeIntensityAnalysis();
    initializeContrastControls();
    initializeExportFunctionality();
});

function initializeComparisonSlider() {
    const wrapper = document.getElementById('comparison-wrapper');
    const slider = document.getElementById('comparison-slider');
    const afterImage = document.getElementById('after-image');
    
    if (!wrapper || !slider || !afterImage) return;
    
    let isDragging = false;
    let sliderPosition = 50;
    
    function updateSliderPosition(x) {
        const rect = wrapper.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        position = Math.max(0, Math.min(100, position));
        sliderPosition = position;
        
        slider.style.left = `${position}%`;
        afterImage.style.clipPath = `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)`;
    }
    
    slider.addEventListener('mousedown', function(e) {
        isDragging = true;
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        updateSliderPosition(e.clientX);
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    wrapper.addEventListener('touchstart', function(e) {
        isDragging = true;
    });
    
    wrapper.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        updateSliderPosition(touch.clientX);
    });
    
    wrapper.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    wrapper.addEventListener('click', function(e) {
        updateSliderPosition(e.clientX);
    });
}

function initializeDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    const demoInfo = document.querySelector('.demo-info');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const demoType = this.dataset.demo;
            updateDemoContent(demoType);
        });
    });
}

function updateDemoContent(type) {
    const afterImage = document.getElementById('after-image');
    const heatmapOverlay = afterImage.querySelector('.heatmap-overlay');
    
    const heatmapConfigs = {
        security: {
            gradient: 'radial-gradient(circle at 30% 40%, rgba(255, 0, 0, 0.8) 0%, transparent 30%), ' +
                     'radial-gradient(circle at 70% 60%, rgba(255, 107, 53, 0.6) 0%, transparent 25%)',
            info: [
                { label: '原始信噪比:', value: '2.8 dB' },
                { label: '处理后信噪比:', value: '32.5 dB' },
                { label: '信号增强:', value: '1060%' }
            ]
        },
        food: {
            gradient: 'radial-gradient(circle at 50% 50%, rgba(57, 255, 20, 0.7) 0%, transparent 40%), ' +
                     'radial-gradient(circle at 30% 30%, rgba(255, 255, 0, 0.5) 0%, transparent 20%)',
            info: [
                { label: '原始信噪比:', value: '3.5 dB' },
                { label: '处理后信噪比:', value: '28.7 dB' },
                { label: '信号增强:', value: '820%' }
            ]
        },
        medical: {
            gradient: 'radial-gradient(circle at 40% 30%, rgba(0, 255, 255, 0.6) 0%, transparent 25%), ' +
                     'radial-gradient(circle at 60% 70%, rgba(138, 43, 226, 0.5) 0%, transparent 30%)',
            info: [
                { label: '原始信噪比:', value: '4.2 dB' },
                { label: '处理后信噪比:', value: '35.8 dB' },
                { label: '信号增强:', value: '852%' }
            ]
        }
    };
    
    const config = heatmapConfigs[type];
    if (config) {
        heatmapOverlay.style.background = config.gradient;
        updateDemoInfo(config.info);
    }
}

function updateDemoInfo(info) {
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        if (info[index]) {
            const label = item.querySelector('.info-label');
            const value = item.querySelector('.info-value');
            label.textContent = info[index].label;
            value.textContent = info[index].value;
            
            value.style.animation = 'none';
            setTimeout(() => {
                value.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-card, .application-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    const navCta = document.querySelector('.nav-cta');
    const heroCta = document.querySelector('.hero-cta-group .btn-primary');
    
    if (navCta && heroCta) {
        navCta.addEventListener('click', () => {
            heroCta.click();
        });
    }
}

function initializeParallax() {
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-value');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, finalValue) {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        if (finalValue.includes('%')) {
            const numValue = parseFloat(finalValue);
            const currentValue = (numValue * easeProgress).toFixed(1);
            element.textContent = `${currentValue}%`;
        } else if (finalValue.includes('&lt;')) {
            element.textContent = finalValue;
        } else {
            const numValue = parseFloat(finalValue);
            const currentValue = (numValue * easeProgress).toFixed(1);
            element.textContent = currentValue;
        }
        
        if (currentStep >= steps) {
            clearInterval(timer);
            element.textContent = finalValue;
        }
    }, stepDuration);
}

function initializeHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .application-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeTypewriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    const speed = 50;
    
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500);
}

function initializeParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        hero.appendChild(particle);
        particles.push(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initializeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const container = navbar.querySelector('.container');
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const navMenu = document.querySelector('.nav-menu');
    
    function checkMobile() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            navMenu.style.display = 'none';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(26, 26, 46, 0.98)';
            navMenu.style.flexDirection = 'column';
            navMenu.style.padding = '1rem';
            navMenu.style.gap = '1rem';
        } else {
            menuButton.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.position = 'static';
            navMenu.style.flexDirection = 'row';
        }
    }
    
    menuButton.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
    });
    
    container.insertBefore(menuButton, navMenu);
    checkMobile();
    window.addEventListener('resize', checkMobile);
}

initializeParallax();
initializeCounterAnimation();
initializeHoverEffects();
initializeParticles();
initializeMobileMenu();

// Analysis Modal Functions
function initializeAnalysisModal() {
    const uploadButtons = document.querySelectorAll('.btn-primary');
    const modal = document.getElementById('analysis-modal');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-analysis');
    
    uploadButtons.forEach(button => {
        if (button.textContent.includes('上传')) {
            button.addEventListener('click', function() {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function initializeImageUpload() {
    const uploadInput = document.getElementById('image-upload');
    const uploadArea = document.getElementById('upload-area');
    const imageContainer = document.getElementById('image-container');
    
    uploadInput.addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            processImage(files[0]);
        }
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--neon-blue)';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        uploadArea.style.borderColor = 'rgba(0, 255, 255, 0.3)';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.borderColor = 'rgba(0, 255, 255, 0.3)';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processImage(files[0]);
        }
    });
    
    function processImage(file) {
        const reader = new FileReader();
        
        imageContainer.innerHTML = '<div class="loading-spinner"></div>';
        
        reader.onload = function(e) {
            setTimeout(() => {
                const img = document.createElement('img');
                img.id = 'analysis-image';
                img.src = e.target.result;
                img.onload = function() {
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(img);
                    
                    const overlay = document.createElement('div');
                    overlay.className = 'image-overlay';
                    imageContainer.appendChild(overlay);
                    
                    updateIntensityAnalysis(img);
                };
            }, 1000);
        };
        
        reader.readAsDataURL(file);
    }
}

function initializeToolSwitching() {
    const toolBtns = document.querySelectorAll('.tool-btn');
    const intensitySection = document.querySelector('.intensity-analysis');
    const colorPickerSection = document.querySelector('.color-picker-analysis');
    
    toolBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toolBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tool = this.dataset.tool;
            if (tool === 'intensity') {
                intensitySection.style.display = 'block';
                colorPickerSection.style.display = 'none';
            } else if (tool === 'color-picker') {
                intensitySection.style.display = 'none';
                colorPickerSection.style.display = 'block';
            }
        });
    });
}

function initializeColorPicker() {
    const imageContainer = document.getElementById('image-container');
    const colorPreview = document.getElementById('color-preview');
    const rValue = document.getElementById('r-value');
    const gValue = document.getElementById('g-value');
    const bValue = document.getElementById('b-value');
    const hexValue = document.getElementById('hex-value');
    
    let isTracking = false;
    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 16; // ~60fps for smooth tracking
    
    // Performance monitoring
    let frameCount = 0;
    let lastFpsTime = 0;
    let avgResponseTime = 0;
    let responseTimeSamples = [];
    
    // Pre-create canvas for better performance
    let analysisCanvas = null;
    let analysisCtx = null;
    
    function initAnalysisCanvas(img) {
        if (!analysisCanvas || analysisCanvas.width !== img.width || analysisCanvas.height !== img.height) {
            analysisCanvas = document.createElement('canvas');
            analysisCanvas.width = img.width;
            analysisCanvas.height = img.height;
            analysisCtx = analysisCanvas.getContext('2d', { willReadFrequently: true });
            analysisCtx.drawImage(img, 0, 0);
        }
    }
    
    // Performance measurement helper
    function measurePerformance(startTime) {
        const endTime = performance.now();
        const responseTime = endTime - startTime;
        responseTimeSamples.push(responseTime);
        
        // Keep only last 60 samples
        if (responseTimeSamples.length > 60) {
            responseTimeSamples.shift();
        }
        
        // Calculate average
        avgResponseTime = responseTimeSamples.reduce((a, b) => a + b, 0) / responseTimeSamples.length;
        
        // Log performance metrics every 60 frames
        frameCount++;
        if (frameCount % 60 === 0) {
            const currentTime = performance.now();
            const fps = 60000 / (currentTime - lastFpsTime);
            lastFpsTime = currentTime;
            
            console.log(`Performance Metrics:`);
            console.log(`  FPS: ${fps.toFixed(1)}`);
            console.log(`  Avg Response Time: ${avgResponseTime.toFixed(2)}ms`);
            console.log(`  Max Response Time: ${Math.max(...responseTimeSamples).toFixed(2)}ms`);
        }
    }
    
    // Use requestAnimationFrame for smooth cursor updates
    function updateCursorPosition(e) {
        const startTime = performance.now();
        const currentTime = startTime;
        
        if (currentTime - lastUpdateTime < UPDATE_INTERVAL) {
            requestAnimationFrame(() => updateCursorPosition(e));
            return;
        }
        lastUpdateTime = currentTime;
        
        const img = document.getElementById('analysis-image');
        if (!img) return;
        
        const rect = img.getBoundingClientRect();
        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;
        
        // Calculate position relative to image
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Clamp to image bounds
        x = Math.max(0, Math.min(x, rect.width));
        y = Math.max(0, Math.min(y, rect.height));
        
        // Measure performance after position calculation
        measurePerformance(startTime);
        
        // Update cursor position immediately for visual feedback
        updateVisualCursor(x, y);
        
        // Update color data
        initAnalysisCanvas(img);
        
        const canvasX = Math.floor(x * scaleX);
        const canvasY = Math.floor(y * scaleY);
        
        if (canvasX >= 0 && canvasX < img.naturalWidth && canvasY >= 0 && canvasY < img.naturalHeight) {
            const pixel = analysisCtx.getImageData(canvasX, canvasY, 1, 1).data;
            const r = pixel[0];
            const g = pixel[1];
            const b = pixel[2];
            
            const hex = rgbToHex(r, g, b);
            
            colorPreview.style.background = hex;
            rValue.textContent = r;
            gValue.textContent = g;
            bValue.textContent = b;
            hexValue.textContent = hex;
        }
    }
    
    // Mouse move tracking with throttling
    imageContainer.addEventListener('mousemove', function(e) {
        if (!isTracking) return;
        e.preventDefault();
        requestAnimationFrame(() => updateCursorPosition(e));
    });
    
    // Start tracking on mouse down
    imageContainer.addEventListener('mousedown', function(e) {
        const img = document.getElementById('analysis-image');
        if (!img) return;
        
        isTracking = true;
        e.preventDefault();
        
        // Create cursor elements if not exist
        createTrackingCursor();
        
        // Initial update
        updateCursorPosition(e);
    });
    
    // Stop tracking on mouse up
    document.addEventListener('mouseup', function() {
        isTracking = false;
    });
    
    // Also handle click for single point selection
    imageContainer.addEventListener('click', function(e) {
        const img = document.getElementById('analysis-image');
        if (!img) return;
        
        e.preventDefault();
        
        createTrackingCursor();
        updateCursorPosition(e);
    });
    
    // Touch support for mobile devices
    imageContainer.addEventListener('touchstart', function(e) {
        const img = document.getElementById('analysis-image');
        if (!img) return;
        
        isTracking = true;
        e.preventDefault();
        
        createTrackingCursor();
        
        const touch = e.touches[0];
        updateCursorPosition({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }, { passive: false });
    
    imageContainer.addEventListener('touchmove', function(e) {
        if (!isTracking) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        requestAnimationFrame(() => {
            updateCursorPosition({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        });
    }, { passive: false });
    
    imageContainer.addEventListener('touchend', function() {
        isTracking = false;
    });
    
    function createTrackingCursor() {
        const container = document.getElementById('image-container');
        
        // Remove existing cursor
        const existingCursor = document.querySelector('.tracking-cursor-container');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        // Create cursor container
        const cursorContainer = document.createElement('div');
        cursorContainer.className = 'tracking-cursor-container';
        
        // Create crosshair
        const crosshair = document.createElement('div');
        crosshair.className = 'color-crosshair';
        
        // Create circle marker
        const circle = document.createElement('div');
        circle.className = 'color-picker-cursor';
        
        cursorContainer.appendChild(crosshair);
        cursorContainer.appendChild(circle);
        container.appendChild(cursorContainer);
    }
    
    function updateVisualCursor(x, y) {
        const cursorContainer = document.querySelector('.tracking-cursor-container');
        if (!cursorContainer) return;
        
        const crosshair = cursorContainer.querySelector('.color-crosshair');
        const circle = cursorContainer.querySelector('.color-picker-cursor');
        
        // Use transform for better performance
        const transform = `translate(${x}px, ${y}px)`;
        
        crosshair.style.transform = transform;
        circle.style.transform = transform;
        
        // Also update left/top as fallback
        crosshair.style.left = x + 'px';
        crosshair.style.top = y + 'px';
        circle.style.left = x + 'px';
        circle.style.top = y + 'px';
    }
    
    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
}

function initializeIntensityAnalysis() {
    const intensityCanvas = document.getElementById('intensity-canvas');
    if (intensityCanvas) {
        intensityCanvas.width = 600;
        intensityCanvas.height = 200;
        drawIntensityChart(intensityCanvas);
    }
}

function drawIntensityChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = 'rgba(26, 26, 46, 0.8)';
    ctx.fillRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.8)';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    const points = [
        { x: 0, y: height },
        { x: 50, y: height * 0.8 },
        { x: 100, y: height * 0.9 },
        { x: 150, y: height * 0.6 },
        { x: 200, y: height * 0.3 },
        { x: 250, y: height * 0.5 },
        { x: 300, y: height * 0.2 },
        { x: 350, y: height * 0.4 },
        { x: 400, y: height * 0.1 },
        { x: 450, y: height * 0.3 },
        { x: 500, y: height * 0.6 },
        { x: 550, y: height * 0.8 },
        { x: 600, y: height * 0.5 }
    ];
    
    points.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(57, 255, 20, 0.2)';
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();
}

function updateIntensityAnalysis(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let totalIntensity = 0;
    let maxIntensity = 0;
    let minIntensity = 255;
    
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const intensity = (r + g + b) / 3;
        
        totalIntensity += intensity;
        maxIntensity = Math.max(maxIntensity, intensity);
        minIntensity = Math.min(minIntensity, intensity);
    }
    
    const avgIntensity = totalIntensity / (data.length / 4);
    
    document.getElementById('avg-intensity').textContent = avgIntensity.toFixed(2);
    document.getElementById('max-intensity').textContent = maxIntensity.toFixed(2);
    document.getElementById('min-intensity').textContent = minIntensity.toFixed(2);
    
    const intensityCanvas = document.getElementById('intensity-canvas');
    if (intensityCanvas) {
        drawIntensityChart(intensityCanvas);
    }
}

function initializeContrastControls() {
    const contrastSlider = document.getElementById('contrast-slider');
    const contrastValue = document.getElementById('contrast-value');
    const brightnessSlider = document.getElementById('brightness-slider');
    const brightnessValue = document.getElementById('brightness-value');
    
    if (contrastSlider) {
        contrastSlider.addEventListener('input', function() {
            const value = this.value;
            contrastValue.textContent = value + '%';
            applyImageFilters();
        });
    }
    
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', function() {
            const value = this.value;
            brightnessValue.textContent = value + '%';
            applyImageFilters();
        });
    }
    
    function applyImageFilters() {
        const img = document.getElementById('analysis-image');
        if (!img) return;
        
        const contrast = contrastSlider.value / 100;
        const brightness = brightnessSlider.value / 100;
        
        img.style.filter = `contrast(${contrast}) brightness(${brightness})`;
    }
}

function initializeExportFunctionality() {
    const exportBtn = document.getElementById('export-results');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showExportOptions();
        });
    }
}

function showExportOptions() {
    const existingOptions = document.querySelector('.export-options');
    if (existingOptions) {
        existingOptions.remove();
        return;
    }
    
    const options = document.createElement('div');
    options.className = 'export-options active';
    options.innerHTML = `
        <button id="export-image">导出图像</button>
        <button id="export-data">导出数据</button>
        <button id="export-chart">导出图表</button>
    `;
    
    document.body.appendChild(options);
    
    document.getElementById('export-image').addEventListener('click', function() {
        exportImage();
        options.remove();
    });
    
    document.getElementById('export-data').addEventListener('click', function() {
        exportData();
        options.remove();
    });
    
    document.getElementById('export-chart').addEventListener('click', function() {
        exportChart();
        options.remove();
    });
}

function exportImage() {
    const img = document.getElementById('analysis-image');
    if (img) {
        const link = document.createElement('a');
        link.download = 'fluoro-image.jpg';
        link.href = img.src;
        link.click();
    }
}

function exportData() {
    const avgIntensity = document.getElementById('avg-intensity').textContent;
    const maxIntensity = document.getElementById('max-intensity').textContent;
    const minIntensity = document.getElementById('min-intensity').textContent;
    
    const data = `FluoroSense Analysis Results\n` +
                `Average Intensity: ${avgIntensity}\n` +
                `Maximum Intensity: ${maxIntensity}\n` +
                `Minimum Intensity: ${minIntensity}\n` +
                `Date: ${new Date().toISOString()}`;
    
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'fluoro-data.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
}

function exportChart() {
    const canvas = document.getElementById('intensity-canvas');
    if (canvas) {
        const link = document.createElement('a');
        link.download = 'intensity-chart.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}