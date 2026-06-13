/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "services", label: "Services" },
    { id: "calculator", label: "Pricing Calculator" },
    { id: "before-after", label: "Results" },
    { id: "bookings", label: "My Bookings" },
    { id: "reviews", label: "Reviews" },
    { id: "faq", label: "FAQs" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="header-logo-btn"
            onClick={() => handleItemClick("hero")}
            className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
          >
            <div className="bg-emerald-500 text-white p-2 rounded-xl shadow-md group-hover:bg-emerald-600 transition-colors">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="block text-xl font-bold text-slate-800 tracking-tight leading-none">
                Sparkle & Shine
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider font-mono">
                Eco Cleaning
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "text-emerald-700"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-emerald-500 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div id="header-actions" className="hidden lg:flex items-center gap-4">
            <a
              id="header-phone-link"
              href="tel:+18005550199"
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors group"
            >
              <div className="bg-slate-100 p-1.5 rounded-full group-hover:bg-emerald-50 transition-colors">
                <Phone className="h-4 w-4 text-emerald-600" />
              </div>
              <span>(800) 555-0199</span>
            </a>

            <button
              id="header-booking-btn"
              onClick={() => handleItemClick("calculator")}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-emerald-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div id="mobile-menu-btn-container" className="flex items-center lg:hidden gap-3">
            <a
              id="mobile-phone-shortcut"
              href="tel:+18005550199"
              className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100 transition-colors"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navbar-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl px-4 py-6 md:px-8 flex flex-col gap-4 lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-item-${item.id}`}
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-500PL"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-slate-100 pt-5 mt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <a
                id="mobile-drawer-phone"
                href="tel:+18005550199"
                className="flex items-center gap-2 px-4 text-emerald-600 font-semibold group justify-center sm:justify-start"
              >
                <Phone className="h-5 w-5" />
                <span>Call Us: (800) 555-0199</span>
              </a>
              <button
                id="mobile-drawer-book-btn"
                onClick={() => handleItemClick("calculator")}
                className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-colors cursor-pointer"
              >
                Book Instantly
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
