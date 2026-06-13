/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { Sparkles, RefreshCw, Layout, Eye } from "lucide-react";
import { motion } from "motion/react";

interface Scene {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  beforeFilter: string;
}

const SCENES: Scene[] = [
  {
    id: "kitchen",
    name: "Luxury Kitchen Countertop",
    description: "Removing grease layers, food debris splatters, and restoring the natural stone polishing to marble countertops.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200",
    beforeFilter: "grayscale(30%) brightness(0.6) contrast(0.95) sepia(20%) blur(0.5px)",
  },
  {
    id: "living",
    name: "Airy Living Room Floor",
    description: "Clearing dust coatings, lint piles, carpet stains, and bringing a deep, reflective hardwood varnish gleam.",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    beforeFilter: "grayscale(20%) brightness(0.55) sepia(15%) contrast(0.95) blur(0.7px)",
  },
  {
    id: "bathroom",
    name: "Polished Guest Bathroom",
    description: "Dissolving heavy calcium lime deposits, tile mildew, water rings, and polishing gold faucet trims.",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    beforeFilter: "grayscale(40%) brightness(0.5) sepia(30%) contrast(0.95) blur(1px)",
  }
];

export default function BeforeAfter() {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0-100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const activeScene = SCENES[activeSceneIndex];

  // Manual drag handlers
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left mouse button clicked
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Interactive Quality Comparisons
          </h2>
          <p className="text-slate-600 text-base">
            Drag the sliding divider left and right on each scene below to see the dramatic contrast between dusty, neglected areas and our sanitized, sparkling results.
          </p>
        </div>

        {/* Scene Selection Tabs */}
        <div className="flex justify-center gap-2 mb-8 max-w-lg mx-auto bg-slate-200/55 p-1.5 rounded-2xl">
          {SCENES.map((sc, index) => (
            <button
              id={`before-after-tab-${sc.id}`}
              key={sc.id}
              onClick={() => {
                setActiveSceneIndex(index);
                setSliderPosition(50);
              }}
              className={`flex-1 text-center py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeSceneIndex === index
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {sc.id === "kitchen" ? "Kitchen" : sc.id === "living" ? "Living Room" : "Bathroom"}
            </button>
          ))}
        </div>

        {/* Comparison Slider Display */}
        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Slider Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              id="slider-container"
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={(e) => {
                isDragging.current = true;
                handleMove(e.clientX);
              }}
              className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-white cursor-ew-resize select-none bg-slate-200"
            >
              {/* After Layer (Base - full vibrance) */}
              <img
                src={activeScene.imageUrl}
                alt={`${activeScene.name} after cleaning`}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute right-4 bottom-4 bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider z-10 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 fill-white" />
                <span>SPARKLING Clean</span>
              </div>

              {/* Before Layer (Dynamic overlay with CSS filters) */}
              <div
                id="before-layer"
                className="absolute inset-0 w-full h-full overflow-hidden transition-[clip-path] ease-out duration-75"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activeScene.imageUrl}
                  alt={`${activeScene.name} before cleaning`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: activeScene.beforeFilter }}
                  referrerPolicy="no-referrer"
                />
                
                {/* Cobweb/dust ambient layer overlay effect to look real dirty: filter brightness and brown sepia tint */}
                <div className="absolute inset-0 bg-amber-900/10 pointer-events-none mix-blend-multiply" />
                
                <div className="absolute left-4 bottom-4 bg-slate-900/80 backdrop-blur-sm text-slate-300 font-bold text-xs px-2.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider z-10 flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>DULL & Dusty</span>
                </div>
              </div>

              {/* Drag Handle Bar */}
              <div
                id="slider-drag-handle"
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-between px-1.5 hover:scale-110 active:scale-95 transition-transform">
                  <span className="text-[10px] font-extrabold text-slate-400 select-none">◀</span>
                  <span className="text-[10px] font-extrabold text-slate-400 select-none">▶</span>
                </div>
              </div>

              {/* Drag prompt floating badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-slate-100 z-10 text-[11px] font-bold text-slate-700 animate-bounce pointer-events-none flex items-center gap-1">
                <span>◀ Slide to See Magic ▶</span>
              </div>
            </div>
            
            {/* Range slider accessibility backup helper under widget */}
            <div className="w-full mt-4 flex items-center gap-3 px-2">
              <span className="text-xs text-slate-400 font-bold">100% Before</span>
              <input
                id="accessible-before-after-slider"
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                className="flex-1 accent-emerald-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-xs text-slate-400 font-bold">100% After</span>
            </div>
          </div>

          {/* Description Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1.5 font-mono">Real Scene Analysis</span>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{activeScene.name}</h3>
            <p className="text-slate-600 leading-relaxed mb-6 font-medium">
              {activeScene.description}
            </p>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <p className="text-xs text-slate-600 font-semibold">
                  Advanced multi-surface conditioners applied on high-touch fixtures
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-50 pt-3">
                <div className="bg-emerald-50 p-2 rounded-xl text-emerald-600">
                  <RefreshCw className="h-4.5 w-4.5" />
                </div>
                <p className="text-xs text-slate-600 font-semibold">
                  HEPA vacuums ensure 99.9% particles captured compared to dry dusting
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
