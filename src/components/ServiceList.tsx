/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { SERVICES } from "../data";
import { CleaningService } from "../types";
import { Home, Sparkles, Truck, Briefcase, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Sparkles,
  Truck,
  Briefcase,
};

interface ServiceListProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServiceList({ onSelectService }: ServiceListProps) {
  const [selectedTab, setSelectedTab] = useState<string>("standard");

  const currentService = SERVICES.find((s) => s.id === selectedTab) || SERVICES[0];

  const CurrentIconComp = ICON_MAP[currentService.iconName] || Sparkles;

  return (
    <section id="services" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Professional Cleaning Services <br className="hidden sm:inline" />
            Designed For Your Convenience
          </h2>
          <p className="text-slate-600 text-base">
            Whether it's cozy studio upkeep, intensive deep cleaning, or sanitizing corporate offices, we deliver bespoke, luxurious results every single visit.
          </p>
        </div>

        {/* Tab Buttons Selection Menu */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-10 max-w-4xl mx-auto">
          {SERVICES.map((serv) => {
            const Icon = ICON_MAP[serv.iconName] || Sparkles;
            const isSelected = selectedTab === serv.id;
            return (
              <button
                id={`service-tab-${serv.id}`}
                key={serv.id}
                onClick={() => setSelectedTab(serv.id)}
                className={`flex items-center gap-2.5 px-6 py-4 rounded-2xl text-sm font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isSelected ? "text-emerald-400" : "text-emerald-600"}`} />
                <span>{serv.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Display Area */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-5xl mx-auto p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-10 items-start"
            >
              
              {/* Primary service description column */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
                    <CurrentIconComp className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{currentService.name}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{currentService.description}</p>
                  
                  {/* Summary card metrics */}
                  <div className="bg-emerald-50/40 rounded-2xl p-5 border border-emerald-50 mb-6 sm:mb-0">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">Pricing Model</span>
                    <p className="text-2xl font-black text-slate-800">
                      Starts at <span className="text-emerald-600">${currentService.basePrice}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Includes basic living spaces. Adjusted dynamically per additional bed/bath or customized sizing.
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block mt-8">
                  <button
                    id={`book-tab-${currentService.id}`}
                    onClick={() => onSelectService(currentService.id)}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>Instant Quote Estimator</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* What is included Checklist column */}
              <div className="lg:col-span-6 bg-slate-50/70 rounded-2xl p-6 md:p-8 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200/60 pb-3">
                  What's Included in This Package
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {currentService.features.map((feat, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-emerald-100 text-emerald-700 p-0.5 rounded-full mt-0.5 shrink-0">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm text-slate-600 leading-relaxed font-semibold">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Mobile action button layout */}
                <div className="block sm:hidden mt-8 w-full">
                  <button
                    id={`mobile-book-tab-${currentService.id}`}
                    onClick={() => onSelectService(currentService.id)}
                    className="w-full text-center flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
                  >
                    <span>Estimate Price</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
