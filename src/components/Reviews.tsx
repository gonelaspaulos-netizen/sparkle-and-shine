/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CustomerReview } from "../types";
import { INITIAL_REVIEWS } from "../data";
import { Star, MessageSquare, ChevronLeft, ChevronRight, User, Sparkles, Quote, Smile } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewsProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  // Add review form state
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("Standard Home Clean");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    setSubmitting(true);
    setTimeout(() => {
      const newReview: CustomerReview = {
        id: `rev-${Math.random().toString(36).substr(2, 9)}`,
        customerName: name,
        location: location || "Local Resident",
        serviceType: service,
        rating,
        comment,
        date: new Date().toISOString().split("T")[0],
        avatarSeed: name.toLowerCase().replace(/\s+/g, ""),
      };

      onAddReview(newReview);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset form variables
      setTimeout(() => {
        setSuccess(false);
        setShowForm(false);
        setName("");
        setLocation("");
        setRating(5);
        setComment("");
      }, 3000);
    }, 1200);
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Hear From Our Satisfied Clients
          </h2>
          <p className="text-slate-600 text-base">
            We hold ourselves to a standard of luxury execution. Read honest satisfaction stories from local homeowners and office managers.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* REVIEWS GRID LAYOUT COLUMN (COL 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                Recent Reviews ({reviews.length})
              </span>
              <button
                id="toggle-review-form-btn"
                onClick={() => setShowForm(!showForm)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white shadow-sm border border-slate-200 hover:border-emerald-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                {showForm ? "Cancel Review" : "Write a Review"}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="review-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl border border-slate-100 p-6 shadow-md"
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-emerald-500" />
                    <span>Share Your Honest Feedback</span>
                  </h3>

                  <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Your Name</label>
                        <input
                          id="review-input-name"
                          type="text"
                          required
                          placeholder="Sarah Jenkins"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 rounded-xl py-3 px-4 text-xs text-slate-800 font-medium focus:bg-white focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Your Neighborhood</label>
                        <input
                          id="review-input-location"
                          type="text"
                          placeholder="Pine Hills"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 rounded-xl py-3 px-4 text-xs text-slate-800 font-medium focus:bg-white focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Service Cleaned</label>
                        <select
                          id="review-select-service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-250 rounded-xl py-3 px-4 text-xs text-slate-850 font-bold focus:bg-white focus:border-emerald-500 outline-none"
                        >
                          <option value="Standard Home Clean">Standard Home Clean</option>
                          <option value="Deep Detailed Clean">Deep Detailed Clean</option>
                          <option value="Move-In / Move-Out Clean">Move-In Clean</option>
                          <option value="Office & Commercial Clean">Office Cleaning</option>
                        </select>
                      </div>

                      {/* Customizable Star ratings selection panel */}
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Rating Score</label>
                        <div className="flex items-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              id={`star-btn-${star}`}
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="p-1 hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-slate-200 fill-none"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Your Review Comment</label>
                      <textarea
                        id="review-textarea-comment"
                        required
                        placeholder="The crew was exceptional! They left the vents absolutely dustless..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl py-3 px-4 text-xs text-slate-800 font-medium min-h-[90px] focus:bg-white focus:border-emerald-500 outline-none"
                      />
                    </div>

                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl text-xs font-bold border border-emerald-100 flex items-center gap-1.5"
                      >
                        <Smile className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Thank you! Your feedback has been published onto the local live reviews list.</span>
                      </motion.div>
                    )}

                    <button
                      id="review-submit-btn"
                      type="submit"
                      disabled={submitting || success}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {submitting ? "Publishing Review..." : "Confirm & Send"}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="reviews-cards-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4.5"
                >
                  {reviews.map((rev) => (
                    <div
                      id={`testimonial-card-${rev.id}`}
                      key={rev.id}
                      className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-sm shadow-slate-100 relative group"
                    >
                      {/* Decorative quote mark */}
                      <Quote className="absolute top-5 right-5 h-8 w-8 text-emerald-50/70 select-none group-hover:text-emerald-100 transition-colors pointer-events-none" />

                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="h-11 w-11 rounded-full bg-slate-100/80 border border-slate-200/50 flex items-center justify-center text-emerald-600 font-black text-sm select-none uppercase shadow-inner">
                          {rev.customerName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-tight">
                            {rev.customerName}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-bold">
                            {rev.location} • {rev.serviceType}
                          </span>
                        </div>
                      </div>

                      {/* Stars count */}
                      <div className="flex items-center gap-0.5 mb-2.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rev.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-slate-100 fill-none"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold italic">
                        "{rev.comment}"
                      </p>

                      <span className="text-[10px] text-slate-400 block mt-3 font-semibold text-right">
                        Posted: {rev.date}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BRAND TRUST STATS SUMMARY (COL 5) */}
          <div className="lg:col-span-5 sticky top-28 bg-emerald-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-950 flex flex-col justify-between min-h-[350px]">
            <div>
              <div className="bg-emerald-800/80 p-3 rounded-2xl w-fit text-emerald-300 mb-5 border border-emerald-700/50">
                <Sparkles className="h-6 w-6 fill-emerald-300 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3">Our Quality Standard</h3>
              <p className="text-sm text-emerald-100/90 leading-relaxed mb-6 font-semibold">
                Sparkle & Shine is proud of compiling a certified premium reputation across the metropolitan area. We stand by the skills of our cleaners with our official satisfaction guarantees.
              </p>
            </div>

            {/* Metrics list */}
            <div className="grid grid-cols-2 gap-4 border-t border-emerald-800/60 pt-5 mt-4">
              <div>
                <span className="text-2xl font-black block tracking-tight">4.9 / 5</span>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest leading-none">
                  Average Rating
                </span>
              </div>
              <div>
                <span className="text-2xl font-black block tracking-tight">100%</span>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest leading-none">
                  Sparkle Assured
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
