/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookingRequest } from "../types";
import { SERVICES } from "../data";
import { Calendar, Clock, DollarSign, Trash2, ClipboardList, RefreshCcw, Smile, CheckSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BookingDashboardProps {
  bookings: BookingRequest[];
  onCancelBooking: (bookingId: string) => void;
  onSimulateApprove: (bookingId: string) => void;
  onNavigateToEstimator: () => void;
}

export default function BookingDashboard({
  bookings,
  onCancelBooking,
  onSimulateApprove,
  onNavigateToEstimator,
}: BookingDashboardProps) {

  const getStatusStyle = (status: BookingRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200/50";
      case "scheduled":
        return "bg-emerald-100 text-emerald-800 border-emerald-200/50";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200/50";
      case "cancelled":
        return "bg-slate-100 text-slate-500 border-slate-200/50";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200/50";
    }
  };

  const getStatusLabel = (status: BookingRequest["status"]) => {
    switch (status) {
      case "pending":
        return "Awaiting Representative";
      case "scheduled":
        return "Scheduled & Dispatch Ready";
      case "completed":
        return "Completed & Certified";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <section id="bookings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Live Client Portal
          </h2>
          <p className="text-slate-600 text-base">
            Review, adjust, or simulate administrative approvals for your cleaning bookings. Updates are saved continuously using local session persistence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {bookings.length === 0 ? (
              <motion.div
                key="empty-portal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-10 select-none text-center flex flex-col items-center shadow-inner"
              >
                <div className="bg-emerald-50 text-emerald-600 p-5 rounded-2xl mb-5 shadow-sm">
                  <ClipboardList className="h-10 w-10 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">No Booking Requests Found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
                  You haven't submitted a query estimation yet. Head over to our Instant Estimator, configure your rooms, and submit a draft booking to watch it appear here live!
                </p>
                <button
                  id="dashboard-empty-cta"
                  onClick={onNavigateToEstimator}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md transition-all cursor-pointer"
                >
                  Configure Custom Estimate Now
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="bookings-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                {/* Header indicators */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest px-2 pb-1 border-b border-slate-100 mb-2">
                  <span>List of Enquiries ({bookings.length})</span>
                  <span>Session Storage Active</span>
                </div>

                {bookings.map((book) => {
                  const createdDate = new Date(book.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <motion.div
                      id={`booking-card-${book.id}`}
                      key={book.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-3xl border border-slate-100 p-5 md:p-6 shadow-md shadow-slate-100 hover:shadow-lg transition-shadow flex flex-col md:flex-row items-stretch justify-between gap-6"
                    >
                      {/* Left: General Specs */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Top Row: Title/ID & Status badge */}
                          <div className="flex flex-wrap items-center gap-2.5 mb-3">
                            <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100/70 px-2 py-0.5 rounded-md">
                              #{book.id.toUpperCase()}
                            </span>
                            <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusStyle(book.status)}`}>
                              {getStatusLabel(book.status)}
                            </span>
                          </div>

                          <h4 className="text-lg font-bold text-slate-800 mb-1">{book.serviceName}</h4>
                          <p className="text-xs text-slate-500 font-bold mb-3">
                            Dimensions: {book.bedrooms} rooms • {book.bathrooms} baths • {book.sqFt} sqft ({book.frequency === 'one-off' ? 'One-time' : book.frequency})
                          </p>
                        </div>

                        {/* Customer contact details panel block */}
                        <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100/50 mt-1 flex flex-wrap gap-x-4 gap-y-1.5 justify-start text-[11px] text-slate-500 font-bold">
                          <span>Name: <b className="text-slate-700 font-bold">{book.customerName}</b></span>
                          <span>Phone: <b className="text-slate-700 font-bold">{book.phone}</b></span>
                          <span>Email: <b className="text-slate-700 font-bold font-mono">{book.email}</b></span>
                          {book.specialNotes && (
                            <span className="w-full text-[10px] text-slate-400 font-normal italic border-t border-slate-100 pt-1.5 mt-1.5">
                              Notes: "{book.specialNotes}"
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Date, Pricing and Action Triggers */}
                      <div className="flex flex-row md:flex-col justify-between items-end md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-6 shrink-0 gap-4">
                        
                        {/* Dates info */}
                        <div className="text-left md:text-right w-full">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                            Requested Slot
                          </span>
                          <div className="flex items-center md:justify-end gap-1.5 text-xs text-slate-700 font-bold mb-1">
                            <Calendar className="h-4 w-4 text-emerald-500 shrink-0" />
                            <span>{book.preferredDate}</span>
                          </div>
                          <div className="flex items-center md:justify-end gap-1.5 text-[11px] text-slate-500 font-medium">
                            <Clock className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span className="capitalize">{book.preferredTime} Slot</span>
                          </div>
                        </div>

                        {/* Cost & action buttons */}
                        <div className="text-right flex flex-col items-end gap-3.5 w-full">
                          <div className="leading-none mt-2">
                            <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Est. Total</span>
                            <span className="text-2xl font-black text-slate-900">${book.estimatedPrice}</span>
                          </div>

                          {/* Interactive Administrative simulation tools */}
                          <div className="flex gap-2.5 items-center w-full md:justify-end">
                            {book.status === "pending" && (
                              <>
                                <button
                                  id={`simulate-approve-btn-${book.id}`}
                                  onClick={() => onSimulateApprove(book.id)}
                                  title="Simulate administrative validation"
                                  className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-700 border border-emerald-200/50 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                                >
                                  <RefreshCcw className="h-3 w-3 animate-spin [animation-duration:4s]" />
                                  <span>Simulate Dispatch</span>
                                </button>

                                <button
                                  id={`cancel-booking-btn-${book.id}`}
                                  onClick={() => onCancelBooking(book.id)}
                                  className="p-2 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-100 rounded-xl text-slate-400 transition-all cursor-pointer"
                                  title="Cancel Request"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}

                            {book.status === "scheduled" && (
                              <div className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1">
                                <Smile className="h-3 w-3" />
                                <span>Dispatcher assigned!</span>
                              </div>
                            )}

                            {book.status === "cancelled" && (
                              <span className="text-[10px] font-bold text-slate-400 italic">No actions available</span>
                            )}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
