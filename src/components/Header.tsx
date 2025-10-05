"use client"

import { useState, useEffect } from "react"
import { Film, Sun, Moon, Menu, X, LogOut } from "lucide-react"
import { useTheme } from "../contexts/ThemeContext"
import { useAuth } from "../contexts/AuthContext"
import gsap from "gsap"

interface HeaderProps {
  onShowLogin: () => void
  onShowSignup: () => void
}

export const Header = ({ onShowLogin, onShowSignup }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()
  const { currentUser, logout } = useAuth()

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Header entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure visible
      gsap.set([".header-logo", ".header-nav-item", ".header-actions"], {
        opacity: 1,
      })

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(".header-logo", {
        opacity: 0,
        y: -20,
        duration: 0.8,
      })
        .from(
          ".header-nav-item",
          {
            opacity: 0,
            y: -10,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.3"
        )
        .from(
          ".header-actions",
          {
            opacity: 0,
            y: -10,
            duration: 0.6,
          },
          "-=0.4"
        )
    })

    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo(
        ".mobile-menu",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      )
    }
  }, [isMobileMenuOpen])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-lg ${
        isScrolled
          ? "bg-black/80 shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* 🎬 Logo */}
          <div className="flex items-center space-x-3 header-logo select-none">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-[0_0_15px_rgba(0,150,255,0.6)]">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              MovieWeb
            </span>
          </div>

          {/* 🌐 Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 font-medium">
            {["Home", "Movies", "Trending"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="header-nav-item relative text-gray-200 hover:text-cyan-400 transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* 🌙 Right Section */}
          <div className="flex items-center gap-3 header-actions">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-cyan-400" />
              )}
            </button>

            {/* Authentication Buttons */}
            {currentUser ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-300">{currentUser.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={onShowLogin}
                  className="px-4 py-2 text-gray-100 font-semibold hover:text-cyan-400 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={onShowSignup}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-500 hover:to-blue-500 text-black font-semibold rounded-xl shadow-[0_0_12px_rgba(0,200,255,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,200,255,0.8)]"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* 📱 Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu md:hidden bg-black/95 border-t border-gray-800">
          <div className="p-4 space-y-4">
            {["Home", "Movies", "Trending"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-2 text-gray-300 hover:text-cyan-400 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            {currentUser ? (
              <>
                <div className="text-sm text-gray-400 px-4">{currentUser.email}</div>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg font-semibold shadow-md transition-all duration-300"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onShowLogin()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 text-gray-100 border border-gray-700 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onShowSignup()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-cyan-500 hover:to-blue-500 text-black font-semibold rounded-lg shadow-[0_0_10px_rgba(0,200,255,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,200,255,0.8)]"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
