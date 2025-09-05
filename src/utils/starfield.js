// Lightweight starfield animation for Mars Research Hub hero
export class Starfield {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stars = [];
    this.numStars = options.numStars || 150;
    this.speed = options.speed || 0.5;
    this.twinkleSpeed = options.twinkleSpeed || 0.02;
    
    // Resize observer for responsiveness
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    
    // Animation control
    this.animationId = null;
    this.isRunning = false;
    
    this.init();
  }
  
  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    
    // Regenerate stars for new dimensions
    this.generateStars();
  }
  
  init() {
    this.resize();
    this.generateStars();
    this.start();
  }
  
  generateStars() {
    this.stars = [];
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;
    
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkle: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * this.speed * 0.1,
        vy: (Math.random() - 0.5) * this.speed * 0.1
      });
    }
  }
  
  update() {
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;
    
    this.stars.forEach(star => {
      // Gentle movement
      star.x += star.vx;
      star.y += star.vy;
      
      // Wrap around edges
      if (star.x < 0) star.x = width;
      if (star.x > width) star.x = 0;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;
      
      // Twinkling effect
      star.twinkle += this.twinkleSpeed;
      star.opacity = (Math.sin(star.twinkle) + 1) * 0.3 + 0.2;
    });
  }
  
  draw() {
    const width = this.canvas.width / window.devicePixelRatio;
    const height = this.canvas.height / window.devicePixelRatio;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw stars
    this.stars.forEach(star => {
      this.ctx.save();
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = '#D36427'; // Mars orange/red color
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  animate() {
    if (!this.isRunning) return;
    
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  destroy() {
    this.stop();
    this.resizeObserver.disconnect();
  }
}