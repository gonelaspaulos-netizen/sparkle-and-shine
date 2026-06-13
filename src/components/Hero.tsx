/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, Sparkles, Smile, Star, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import heroImg from "../assets/images/hero_living_room_1781257510216.jpg";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative pt-24 md:pt-32 pb-16 md:pb-24 lg:pb-32 bg-gradient-to-b from-blue-50/20 via-emerald-50/10 to-transparent overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/4 -left-16 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <div className="absolute top-1/3 -right-16 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Promo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 self-start bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-6 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-emerald-600 fill-emerald-500 animate-pulse" />
              <span>Premium Cleaning In Your Area</span>
            </motion.div>

            {/* Main Catchy Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.1] mb-6"
            >
              Breathe Fresh. <br />
              <span className="text-emerald-600 bg-clip-text">Live Clean.</span> <br />
              Done Professional.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed"
            >
              Tired of spending weekends scrubbing? Let our fully insured, background-checked specialists bring the sparkle back to your home using certified eco-friendly, family & pet safe supplies.
            </motion.p>

            {/* Interaction Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                id="hero-calculator-cta"
                onClick={() => onNavigate("calculator")}
                className="group flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-base font-bold shadow-lg shadow-emerald-200 hover:shadow-xl hover:translate-y-[-1px] transition-all cursor-pointer"
              >
                <span>Calculate My Instant Quote</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                id="hero-services-cta"
                onClick={() => onNavigate("services")}
                className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-4 rounded-full text-base font-bold transition-all cursor-pointer border border-slate-200"
              >
                <span>Explore Services</span>
              </button>
            </motion.div>

            {/* Guarantees / Badges Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-150 pt-8"
            >
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">Fully Bonded</h4>
                  <p className="text-xs text-slate-500">Insured Professionals</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-600">
                  <Smile className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">Eco-Clean Guarantee</h4>
                  <p className="text-xs text-slate-500">100% Kids & Pet Safe</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2.5 rounded-2xl text-emerald-600">
                  <Star className="h-5 w-5 fill-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">Happiness Rated</h4>
                  <p className="text-xs text-slate-500">200+ Five Star Reviews</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Graphical Representation Area */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer decorative ring */}
              <div className="absolute inset-4 border border-slate-200 rounded-3xl -z-10 translate-x-3 translate-y-3" />
              
              {/* Glass visual stats tag */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-50 z-20 flex items-center gap-3.5 max-w-[210px]">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">4.9 / 5.0 Rating</h3>
                  <p className="text-[11px] text-slate-500 font-medium">Over 1,200 local cleans</p>
                </div>
              </div>

              {/* Verified badge */}
              <div className="absolute -bottom-5 -right-5 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 z-20 hidden sm:flex items-center gap-3">
                <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold leading-none text-emerald-400">100% Sparkle Certified</h3>
                  <p className="text-[10px] text-slate-400 mt-1">Satisfaction Assured</p>
                </div>
              </div>

              {/* Main Image Mask and Overlay */}
              <div className="overflow-hidden rounded-3xl border shadow-2xl border-white/20 aspect-video lg:aspect-[4/5] object-cover">
                <img
                  src={heroImg}
                  alt="Sparkling clean premium living space"
                  className="w-full h-full object-cover select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
