"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Zap } from "lucide-react";
import { cn } from "../../lib/utils";

const FLOATING_ICONS = [
  { src: "/react.svg",      size: 44, x: "7%",   y: "16%",  delay: "0s",   duration: "7s",  drift: "float-a" },
  { src: "/nextjs.svg",     size: 36, x: "17%",  y: "74%",  delay: "1.2s", duration: "9s",  drift: "float-b" },
  { src: "/typescript.svg", size: 40, x: "77%",  y: "14%",  delay: "0.4s", duration: "8s",  drift: "float-c" },
  { src: "/python.svg",     size: 38, x: "87%",  y: "66%",  delay: "2s",   duration: "10s", drift: "float-a" },
  { src: "/nodejs.svg",     size: 34, x: "4%",   y: "50%",  delay: "0.8s", duration: "11s", drift: "float-b" },
  { src: "/aws.svg",        size: 42, x: "91%",  y: "36%",  delay: "1.6s", duration: "8s",  drift: "float-c" },
  { src: "/docker.svg",     size: 36, x: "71%",  y: "82%",  delay: "0.2s", duration: "9s",  drift: "float-a" },
  { src: "/openai.svg",     size: 40, x: "29%",  y: "84%",  delay: "2.4s", duration: "7s",  drift: "float-b" },
  { src: "/flutter.svg",    size: 32, x: "54%",  y: "90%",  delay: "1s",   duration: "12s", drift: "float-c" },
  { src: "/graphql.svg",    size: 36, x: "61%",  y: "8%",   delay: "3s",   duration: "8s",  drift: "float-a" },
  { src: "/mongodb.svg",    size: 34, x: "41%",  y: "5%",   delay: "0.6s", duration: "10s", drift: "float-b" },
  { src: "/postgresql.svg", size: 38, x: "21%",  y: "10%",  delay: "1.8s", duration: "9s",  drift: "float-c" },
  { src: "/tailwind.svg",   size: 32, x: "81%",  y: "90%",  delay: "2.8s", duration: "11s", drift: "float-a" },
  { src: "/kubernetes.svg", size: 36, x: "2%",   y: "84%",  delay: "1.4s", duration: "8s",  drift: "float-b" },
  { src: "/firebase.svg",   size: 34, x: "94%",  y: "80%",  delay: "0.9s", duration: "10s", drift: "float-c" },
  { src: "/redis.svg",      size: 30, x: "47%",  y: "93%",  delay: "2.2s", duration: "7s",  drift: "float-a" },
];

// Typewriter words service-based hooks
const TYPE_WORDS = [
  "AI Development",
  "Web Applications",
  "Mobile Apps",
  "SaaS Products",
  "Blockchain Systems",
  "Cloud Infrastructure",
  "API Platforms",
  "MVP Launches",
];

function Typewriter() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1440);
      return () => clearTimeout(t);
    }

    const word = TYPE_WORDS[wordIdx];

    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
      return () => clearTimeout(t);
    }

    if (!deleting && displayed.length === word.length) {
      setPaused(true);
      setDeleting(true);
      return;
    }

    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPE_WORDS.length);
    }
  }, [displayed, deleting, paused, wordIdx]);

  return (
    <span className={cn('inline-block', 'min-w-[2ch]', 'text-white')}>
      {displayed}
      <span className={cn('text-white/60', 'animate-pulse')}>|</span>
    </span>
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.2 + 0.4,
        alpha: Math.random() * 0.3 + 0.08,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className={cn('relative', 'flex', 'justify-center', 'items-center', 'bg-[#080808]', 'w-full', 'min-h-screen', 'overflow-hidden')}>

      {/* Canvas */}
      <canvas ref={canvasRef} className={cn('absolute', 'inset-0', 'w-full', 'h-full')} />

      {/* Grid */}
      <div className={cn('absolute', 'inset-0', 'opacity-[0.025]')}
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Orbs */}
      <div className={cn('top-[-15%]', 'left-[-8%]', 'absolute', 'opacity-[0.07]', 'blur-[130px]', 'rounded-full', 'w-[700px]', 'h-[700px]', 'animate-orb-1')}
        style={{ background: "radial-gradient(circle,#ffffff,transparent 70%)" }} />
      <div className={cn('right-[-8%]', 'bottom-[-20%]', 'absolute', 'opacity-[0.05]', 'blur-[110px]', 'rounded-full', 'w-[600px]', 'h-[600px]', 'animate-orb-2')}
        style={{ background: "radial-gradient(circle,#ffffff,transparent 70%)" }} />
      <div className={cn('top-[35%]', 'right-[15%]', 'absolute', 'opacity-[0.04]', 'blur-[90px]', 'rounded-full', 'w-[350px]', 'h-[350px]', 'animate-orb-3')}
        style={{ background: "radial-gradient(circle,#cccccc,transparent 70%)" }} />

      {/* Floating icons */}
      {FLOATING_ICONS.map((icon, i) => (
        <div key={i} className={`absolute hero-icon-${icon.drift}`}
          style={{ left: icon.x, top: icon.y, animationDelay: icon.delay, animationDuration: icon.duration }}>
          <div className={cn('relative', 'flex', 'justify-center', 'items-center', 'bg-white/5', 'hover:bg-white/10', 'backdrop-blur-sm', 'border', 'border-white/10', 'hover:border-white/20', 'rounded-2xl', 'transition-all', 'duration-500', 'cursor-default')}
            style={{ width: icon.size + 20, height: icon.size + 20 }}>
            <Image src={icon.src} alt="" width={icon.size} height={icon.size}
              className={cn('opacity-50', 'hover:opacity-80', 'object-contain', 'transition-opacity', 'duration-300')}
              style={{ filter: "brightness(0) invert(1)" }} />
          </div>
        </div>
      ))}

      {/* Vignette */}
      <div className={cn('absolute', 'inset-0', 'pointer-events-none')}
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 15%, rgba(8,8,8,0.82) 100%)" }} />

      {/* ── Content ── */}
      <div className={cn('z-10', 'relative', 'flex', 'flex-col', 'items-center', 'mx-auto', 'px-4', 'md:px-9', 'pt-28', 'pb-20', 'max-w-[1040px]', 'text-center')}>

        {/* Badge */}
        <div className={cn('inline-flex', 'items-center', 'gap-2', 'bg-white/5', 'backdrop-blur-md', 'mb-8', 'px-4', 'py-2', 'border', 'border-white/10', 'rounded-full', 'animate-fade-in-up')}>
          <Zap size={11} className={cn('opacity-60', 'fill-white', 'text-white')} />
          <span className={cn('font-inter', 'font-semibold', 'text-[11px]', 'text-white/50', 'uppercase', 'tracking-[0.2em]')}>
            Trusted by 50+ product teams worldwide
          </span>
        </div>

        {/* ── Big headline ── */}
        <h1 className={cn('mb-5', 'font-mont', 'font-bold', 'text-white', 'leading-none', 'tracking-tight', 'animate-fade-in-up')}
          style={{ fontSize: "clamp(42px, 8vw, 96px)", animationDelay: "60ms" }}>
          We Build
          <br />
          <Typewriter />
          <br />
          <span className="text-white/60">That Ships.</span>
        </h1>

        {/* ── Heavy paragraph ── */}
        <p className={cn('mb-4', 'max-w-[680px]', 'font-inter', 'text-white/50', 'leading-[1.8]', 'animate-fade-in-up')}
          style={{ fontSize: "clamp(15px, 1.8vw, 19px)", animationDelay: "140ms" }}>
          From a napkin sketch to a production-ready product we architect, design, and engineer
          software that <span className={cn('font-medium', 'text-white/80')}>drives real revenue</span>. No bloated teams,
          no missed deadlines, no excuses. Just clean code, sharp UX, and products your users
          actually love.
        </p>

        {/* CTAs */}
        <div className={cn('flex', 'sm:flex-row', 'flex-col', 'items-center', 'gap-3', 'mb-14', 'animate-fade-in-up')}
          style={{ animationDelay: "240ms" }}>
          <Link href="/contact"
            className={cn('flex', 'items-center', 'gap-2', 'bg-white', 'shadow-[0_0_50px_rgba(255,255,255,0.15)]', 'px-8', 'py-4', 'rounded-full', 'font-mont', 'font-semibold', 'text-[#111212]', 'text-[14px]', 'hover:scale-105', 'transition-all', 'duration-300')}>
            Book a Free Strategy Call
            <ArrowUpRight size={15} />
          </Link>
          <Link href="/project-cost-estimation"
            className={cn('flex', 'items-center', 'gap-2', 'bg-white/5', 'hover:bg-white/10', 'backdrop-blur-md', 'px-8', 'py-4', 'border', 'border-white/10', 'hover:border-white/20', 'rounded-full', 'font-mont', 'font-semibold', 'text-[14px]', 'text-white', 'transition-all', 'duration-300')}>
            Get a free estimate →
          </Link>
        </div>

        {/* Stats row */}
        <div className={cn('flex', 'flex-wrap', 'justify-center', 'gap-px', 'bg-white/5', 'border', 'border-white/5', 'rounded-2xl', 'overflow-hidden', 'animate-fade-in-up')}
          style={{ animationDelay: "320ms" }}>
          {[
            { number: "4.9★", label: "Clutch Rating" },
            { number: "50+",  label: "Products Shipped" },
            { number: "8+",   label: "Years in Market" },
            { number: "98%",  label: "Client Satisfaction" },
            { number: "<4wk", label: "Avg. MVP Timeline" },
          ].map((s) => (
            <div key={s.label} className={cn('flex', 'flex-col', 'items-center', 'gap-0.5', 'bg-white/3', 'hover:bg-white/7', 'px-6', 'py-4', 'transition-colors', 'duration-300')}>
              <span className={cn('font-mont', 'font-bold', 'text-[20px]', 'text-white', 'leading-none')}>{s.number}</span>
              <span className={cn('font-inter', 'text-[11px]', 'text-white/30', 'whitespace-nowrap')}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom fade */}
      <div className={cn('right-0', 'bottom-0', 'left-0', 'absolute', 'h-40', 'pointer-events-none')}
        style={{ background: "linear-gradient(to bottom,transparent,#080808)" }} />

    </section>
  );
}
