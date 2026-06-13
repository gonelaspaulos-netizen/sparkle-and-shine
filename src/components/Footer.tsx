/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, Heart, ShieldCheck, HelpCircle } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-800 pb-12">
          
          {/* Col 1: Branding */}
          <div className="md:col-span-1.5 flex flex-col gap-4">
            <button
              id="footer-logo-btn"
              onClick={() => onNavigate("hero")}
              className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            >
              <div className="bg-emerald-500 text-white p-2 rounded-xl shadow-md">
                <Sparkles className="h-5 w-5 fill-white" />
              </div>
              <div>
                <span className="block text-lg font-bold text-white tracking-tight leading-none">
                  Sparkle & Shine
                </span>
                <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                  Eco Cleaning
                </span>
              </div>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold max-w-sm">
              Providing luxury-tier, professional, and eco-friendly cleaning services. Family and pet safe materials combined with meticulously trained, background checked cleaners.
            </p>
          </div>

          {/* Col 2: Services shortcuts */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-350 uppercase tracking-widest mb-4">Our Services</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-bold text-slate-400">
              <li>
                <button
                  id="footer-standard-clean-btn"
                  onClick={() => onNavigate("services")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Standard Regular Cleaning
                </button>
              </li>
              <li>
                <button
                  id="footer-deep-clean-btn"
                  onClick={() => onNavigate("services")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Deep Detail Scrubbing
                </button>
              </li>
              <li>
                <button
                  id="footer-move-clean-btn"
                  onClick={() => onNavigate("services")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Move-In / Out Preparation
                </button>
              </li>
              <li>
                <button
                  id="footer-office-clean-btn"
                  onClick={() => onNavigate("services")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Commercial & Office Cleaning
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation shortcuts */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-350 uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-bold text-slate-400">
              <li>
                <button
                  id="footer-nav-calculator"
                  onClick={() => onNavigate("calculator")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Pricing Calculator
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-beforeafter"
                  onClick={() => onNavigate("before-after")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Results & Comparisons
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-bookings"
                  onClick={() => onNavigate("bookings")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Customer Portal Logs
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-faq"
                  onClick={() => onNavigate("faq")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  FAQ & Support Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust Certificates badges */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-extrabold text-slate-350 uppercase tracking-widest mb-2">Accreditations</h4>
            
            <div className="flex items-center gap-2.5 bg-slate-850 p-3 rounded-2xl border border-slate-800">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <span className="block text-[11px] font-bold text-slate-200">100% Bonded & Insured</span>
                <span className="text-[9px] text-slate-400">Comprehensive local protections</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-slate-850 p-3 rounded-2xl border border-slate-800">
              <span className="bg-emerald-950 p-1 rounded-lg text-emerald-400 text-xs font-black">ECO</span>
              <div>
                <span className="block text-[11px] font-bold text-slate-200">Eco-Friendly Cleaning Products</span>
                <span className="text-[9px] text-slate-400">Pet & child allergen-safe formula</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Row copyright and metadata info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-bold uppercase tracking-wider">
          <p>© {currentYear} Sparkle & Shine Eco Cleaning Services. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with Care for Your Environment</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
          </div>
        </div>

      </div>
    </footer>
  );
}
