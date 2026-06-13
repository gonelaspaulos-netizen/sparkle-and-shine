/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FAQS } from "../data";
import { Phone, Mail, MapPin, Clock, ChevronDown, ChevronUp, Send, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      
      // Reset form variables
      setTimeout(() => {
        setSuccess(false);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }, 3000);
    }, 1200);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Frequently Asked Questions & Contact
          </h2>
          <p className="text-slate-600 text-base">
            Have questions about our supplies, background checks, or scheduling flexibility? Browse our answers below or message us directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* FAQ INTERACTIVE ACCORDION (COL 7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="text-xl font-extrabold text-slate-800 mb-2 font-sans">
              Common Questions answered
            </h3>
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    id={`faq-item-${index}`}
                    className="border border-slate-100 bg-slate-50/50 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      id={`faq-toggle-btn-${index}`}
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center bg-white cursor-pointer hover:bg-slate-50/20 active:outline-none"
                    >
                      <span className="text-sm font-extrabold text-slate-850 pr-4">
                        {faq.question}
                      </span>
                      <span className="bg-slate-100 p-1.5 rounded-lg text-slate-500">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 py-4 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-55">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QUICK DIRECT ENQUIRY FORM & INFO (COL 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Info Cards */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 md:p-6 border border-slate-800 shadow-md">
              <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-emerald-400">Direct Contacts</h4>
              
              <div className="flex flex-col gap-3.5 text-xs font-semibold">
                <a href="tel:+18005550199" className="flex items-center gap-3 text-slate-350 hover:text-white transition-colors group">
                  <span className="bg-slate-800 group-hover:bg-emerald-600 p-2.5 rounded-xl text-slate-300 group-hover:text-white transition-all">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">Call Toll Free</span>
                    <span>(800) 555-0199</span>
                  </div>
                </a>

                <a href="mailto:support@sparkleclean.com" className="flex items-center gap-3 text-slate-350 hover:text-white transition-colors group">
                  <span className="bg-slate-800 group-hover:bg-emerald-600 p-2.5 rounded-xl text-slate-300 group-hover:text-white transition-all">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">Inquiries Email</span>
                    <span>bookings@sparkleclean.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-350">
                  <span className="bg-slate-800 p-2.5 rounded-xl text-slate-300">
                    <Clock className="h-4.5 w-4.5 text-emerald-400" />
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">Operating Hours</span>
                    <span>Mon - Sat: 8:00 AM - 7:00 PM • Sun: Closed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-350">
                  <span className="bg-slate-800 p-2.5 rounded-xl text-slate-300">
                    <MapPin className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold">Servicing Coverage</span>
                    <span>Bay Area, California (25 mile radius limit)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* General Direct Messenger Accordion Form */}
            <div className="bg-slate-50 rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Send an Instant Message</h4>
              
              <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-slate-200 outline-none rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-medium focus:border-emerald-500"
                  />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 outline-none rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-medium focus:border-emerald-500"
                  />
                </div>

                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Subject (Optional)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-slate-200 outline-none rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-medium focus:border-emerald-500"
                />

                <textarea
                  id="contact-message"
                  required
                  placeholder="Ask us anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white border border-slate-200 outline-none rounded-xl py-2.5 px-3.5 text-xs text-slate-800 font-medium focus:border-emerald-500 min-h-[80px]"
                />

                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Check className="h-4 w-4 stroke-[3] text-emerald-600" />
                    <span>Your message has been sent successfully!</span>
                  </motion.div>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={sending || success}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{sending ? "Sending..." : "Submit Message"}</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
