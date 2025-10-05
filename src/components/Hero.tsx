"use client"

import { useEffect, useRef } from "react"
import { Play, TrendingUp } from "lucide-react"
import gsap from "gsap"

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        delay: 0.3,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          buttonsRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.5"
        )
        .from(
          statsRef.current?.children || [],
          {
            opacity: 0,
            y: 40,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        )

      gsap.to(".hero-glow", {
        backgroundPosition: "200% center",
        duration: 12,
        repeat: -1,
        ease: "linear",
      })

      gsap.to(".light-streak", {
        x: "100vw",
        repeat: -1,
        duration: 8,
        ease: "power1.inOut",
        stagger: { each: 1.5, repeat: -1 },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center bg-black text-white"
    >
      {/* 🎥 Cinematic background layers */}
      <div className="absolute inset-0 bg-[url('/movies-bg.jpg')] bg-cover bg-center opacity-30"></div>
      <div className="hero-glow absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 bg-[length:200%_100%] mix-blend-overlay"></div>

      {/* Animated light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="light-streak absolute top-1/3 left-[-200px] w-[200px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-sm opacity-60"></div>
        <div className="light-streak absolute bottom-1/3 left-[-300px] w-[300px] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-md opacity-50"></div>
      </div>

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-16">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          Stream the{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Best Movies
          </span>{" "}
          of All Time
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
        >
          Dive into a world of cinematic excellence. Discover blockbusters, hidden gems, and trending shows — all in one place.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href="#explore"
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:scale-105"
          >
            <Play className="w-6 h-6 group-hover:scale-125 transition-transform" />
            <span>Start Watching</span>
          </a>

          <a
            href="#trending"
            className="group flex items-center gap-3 px-8 py-4 border-2 border-white/30 hover:border-cyan-400 rounded-full font-semibold text-lg transition-all transform hover:scale-105 hover:text-cyan-400"
          >
            <TrendingUp className="w-6 h-6 group-hover:scale-125 transition-transform" />
            <span>View Trending</span>
          </a>
        </div>

        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Movies", value: "12K+" },
            { label: "TV Shows", value: "6K+" },
            { label: "Active Users", value: "250K+" },
            { label: "Reviews", value: "2M+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
