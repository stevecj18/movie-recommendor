import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  const { setActiveSection } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas projector particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      x: number = 0;
      y: number = 0;
      radius: number = 0;
      vx: number = 0;
      vy: number = 0;
      alpha: number = 0;
      decay: number = 0;

      constructor() {
        this.reset();
        this.y = Math.random() * height; // Start at random height initially
      }

      reset() {
        this.x = Math.random() * (width * 0.4); // Start near bottom left (projector source)
        this.y = height;
        this.radius = Math.random() * 3 + 1;
        this.vx = Math.random() * 1.5 + 0.5; // Drift right
        this.vy = -(Math.random() * 1.2 + 0.4); // Drift up
        this.alpha = Math.random() * 0.6 + 0.1;
        this.decay = Math.random() * 0.002 + 0.0005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;

        if (this.x > width || this.y < 0 || this.alpha <= 0) {
          this.reset();
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        // Create radial gradient for glowing dust particle
        const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
        grad.addColorStop(0, `rgba(0, 245, 212, ${this.alpha})`); // cyan
        grad.addColorStop(0.4, `rgba(123, 44, 191, ${this.alpha * 0.5})`); // purple
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        c.fillStyle = grad;
        c.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 45 }, () => new Particle());

    const animate = () => {
      // Clear with slight transparency to leave trace trail
      ctx.fillStyle = "rgba(3, 1, 7, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Draw projector beam shape (cone from bottom-left corner to top-right)
      ctx.save();
      const beamGrad = ctx.createRadialGradient(0, height, 0, width * 0.6, height * 0.2, width);
      beamGrad.addColorStop(0, "rgba(123, 44, 191, 0.12)");
      beamGrad.addColorStop(0.3, "rgba(0, 245, 212, 0.06)");
      beamGrad.addColorStop(0.7, "rgba(212, 175, 55, 0.01)");
      beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width * 0.8, 0);
      ctx.lineTo(width, height * 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden bg-cinema-void flex items-center justify-center">
      {/* Background Canvas Particle System */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] z-[1] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Cinematic Spotlight Backdrop Glow */}
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-cinema-purple/15 blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-cinema-blue/10 blur-[100px] pointer-events-none z-[1]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 rounded-full border border-cinema-purple/30 bg-cinema-purple/10 px-4 py-1.5 text-xs font-semibold text-cinema-purple-light shadow-inner shadow-cinema-purple/10"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Futuristic AI Movie Concierge</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Your Personal{" "}
            <span className="bg-gradient-to-r from-cinema-purple-light via-cinema-gold to-cinema-blue bg-clip-text text-transparent neon-text-purple">
              Cinematic Guru
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl text-lg text-slate-300 font-light leading-relaxed"
          >
            Skip the endless scroll. Conversational AI understands your mood, timeframe, and favorite films to curate bespoke, top-tier recommendations.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#search-anchor"
              className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cinema-purple to-cinema-blue p-[1px] shadow-lg shadow-cinema-purple/20 transition-all duration-300 hover:shadow-cinema-purple/40 hover:-translate-y-0.5 group"
            >
              <span className="flex items-center space-x-2 w-full bg-cinema-void hover:bg-transparent transition-colors rounded-[11px] px-6 py-3 font-semibold text-white">
                <Play className="h-4.5 w-4.5 text-cinema-blue fill-cinema-blue group-hover:scale-110 transition-transform" />
                <span>Begin Curated Search</span>
              </span>
            </a>

            <button
              onClick={() => setActiveSection("dashboard")}
              className="flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
            >
              <span>Explore Analytics</span>
            </button>
          </motion.div>
        </div>

        {/* Dynamic Display Side (Floating Posters) */}
        <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative h-[450px] w-full">
          
          {/* Main Floating Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute z-20 w-[240px] h-[340px]"
            style={{ left: "10%", top: "40px" }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/15 relative"
              style={{ transform: "rotate(-3deg)" }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80"
                alt="Interstellar poster"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                <span className="text-xs font-semibold text-cinema-blue bg-cinema-void/70 px-2 py-0.5 rounded border border-cinema-blue/20">Sci-Fi / Adventure</span>
                <h3 className="text-md font-bold text-white mt-1.5">Interstellar</h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Second Poster Card (Behind Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute z-10 w-[220px] h-[310px]"
            style={{ right: "10px", top: "50px" }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden shadow-xl shadow-black/60 border border-white/10 relative"
              style={{ transform: "rotate(5deg)" }}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80"
                alt="Inception poster"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 text-left">
                <span className="text-xs font-semibold text-cinema-purple-light bg-cinema-void/70 px-2 py-0.5 rounded border border-cinema-purple/20">Mind-Bending</span>
                <h3 className="text-sm font-bold text-white mt-1">Inception</h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Third Poster Card (Small, Behind Left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute z-0 w-[190px] h-[270px] opacity-60"
            style={{ left: "-40px", bottom: "30px" }}
          >
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden shadow-lg shadow-black/50 border border-white/5 relative"
              style={{ transform: "rotate(-12deg)" }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&auto=format&fit=crop&q=80"
                alt="Spirited Away poster"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
