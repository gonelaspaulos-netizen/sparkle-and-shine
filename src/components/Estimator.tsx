/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { SERVICES, EXTRAS, FREQUENCY_DISCOUNTS } from "../data";
import { CleaningService, ExtraServiceOption, BookingRequest } from "../types";
import {
  Bed,
  Bath,
  Ruler,
  Check,
  Flame,
  IceCream,
  Grid,
  FolderOpen,
  Layers,
  Wind,
  Sparkles,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  BadgeCheck,
  CalendarCheck2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const EXTRA_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame,
  IceCream,
  Grid,
  FolderOpen,
  Layers,
  Wind,
};

interface EstimatorProps {
  selectedServiceId: string;
  onServiceChange: (serviceId: string) => void;
  onSubmitBooking: (booking: BookingRequest) => void;
}

export default function Estimator({
  selectedServiceId,
  onServiceChange,
  onSubmitBooking,
}: EstimatorProps) {
  // Calculator specs state
  const [beds, setBeds] = useState<number>(2);
  const [baths, setBaths] = useState<number>(1.5);
  const [sqFt, setSqFt] = useState<number>(1200);
  const [frequency, setFrequency] = useState<"one-off" | "weekly" | "bi-weekly" | "monthly">("one-off");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Step navigation (0 = Estimator Parameters, 1 = Service Booking Details)
  const [bookingStep, setBookingStep] = useState<0 | 1>(0);

  // Form details state
  const [custName, setCustName] = useState<string>("");
  const [custEmail, setCustEmail] = useState<string>("");
  const [custPhone, setCustPhone] = useState<string>("");
  const [prefDate, setPrefDate] = useState<string>("");
  const [prefTime, setPrefTime] = useState<"morning" | "afternoon" | "evening">("morning");
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Synchronize initial settings if service changes
  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  useEffect(() => {
    // Reset or calibrate sliders depending on typical office vs home cleans
    if (selectedServiceId === "office") {
      setBeds(1); // conference/meeting rooms
      setBaths(2); // restrooms
      setSqFt(2000);
    } else {
      setBeds(2);
      setBaths(1.5);
      setSqFt(1200);
    }
  }, [selectedServiceId]);

  // Pricing calculation
  const calculateEstimate = () => {
    let price = activeService.basePrice;
    
    // incremental sizes
    price += (beds * activeService.pricePerBed);
    price += (baths * activeService.pricePerBath);
    price += (sqFt * activeService.pricePerSqFt);

    // extras adding
    selectedExtras.forEach((extraId) => {
      const extraObj = EXTRAS.find((ex) => ex.id === extraId);
      if (extraObj) {
        price += extraObj.price;
      }
    });

    // frequency discount
    const discountRate = FREQUENCY_DISCOUNTS[frequency];
    const discountAmount = price * discountRate;
    const finalPrice = Math.max(activeService.basePrice, price - discountAmount);

    return {
      subtotal: price,
      discount: discountAmount,
      total: Math.round(finalPrice),
    };
  };

  const { subtotal, discount, total } = calculateEstimate();

  const handleExtraToggle = (id: string) => {
    if (selectedExtras.includes(id)) {
      setSelectedExtras(selectedExtras.filter((ext) => ext !== id));
    } else {
      setSelectedExtras([...selectedExtras, id]);
    }
  };

  const handleNextStep = () => {
    if (bookingStep === 0) {
      setBookingStep(1);
    }
  };

  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custEmail || !custPhone || !prefDate) {
      return;
    }

    setSubmitting(true);

    // Simulate small API delay network call
    setTimeout(() => {
      const newBooking: BookingRequest = {
        id: `book-${Math.random().toString(36).substr(2, 9)}`,
        customerName: custName,
        email: custEmail,
        phone: custPhone,
        serviceId: activeService.id,
        serviceName: activeService.name,
        bedrooms: beds,
        bathrooms: baths,
        sqFt,
        frequency,
        extras: [...selectedExtras],
        preferredDate: prefDate,
        preferredTime: prefTime,
        specialNotes: notes,
        estimatedPrice: total,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      onSubmitBooking(newBooking);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset forms
      setTimeout(() => {
        setSuccess(false);
        setBookingStep(0);
        setCustName("");
        setCustEmail("");
        setCustPhone("");
        setPrefDate("");
        setPrefTime("morning");
        setNotes("");
        setSelectedExtras([]);
      }, 4000);
    }, 1500);
  };

  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
            Instant Cleaning Estimate
          </h2>
          <p className="text-slate-600 text-base">
            Configure your space parameters, choice of deep cleaning extras, and frequency to lock in an accurate professional quote within seconds.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* STEP WIZARD PARAMETERS PANELS (COL 7) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-inner">
            
            <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200">
              <div className="flex gap-4">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${bookingStep === 0 ? "bg-emerald-600 text-white" : "bg-emerald-100 text-emerald-800"}`}>
                  1. Customize Space
                </span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${bookingStep === 1 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                  2. Confirm Booking
                </span>
              </div>
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                {bookingStep === 0 ? "Step 1 of 2" : "Final Step"}
              </span>
            </div>

            <AnimatePresence mode="wait">
              {bookingStep === 0 ? (
                <motion.div
                  key="calculator-params"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  {/* Service selection dropdown widget */}
                  <div>
                    <label id="calculator-select-label" className="block text-sm font-bold text-slate-700 mb-2">Select Service Type</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          id={`calc-service-btn-${s.id}`}
                          onClick={() => onServiceChange(s.id)}
                          type="button"
                          className={`px-3.5 py-3 rounded-xl text-left border text-xs font-bold transition-all ${
                            selectedServiceId === s.id
                              ? "bg-white border-emerald-500 text-slate-800 ring-2 ring-emerald-500/15"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <span className="block text-emerald-600 truncate">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizing Parameters Counters */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Beds */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Bed className="h-4.5 w-4.5 text-emerald-500" />
                          <span className="text-xs font-bold text-slate-700">
                            {selectedServiceId === "office" ? "Conference Rooms" : "Bedrooms"}
                          </span>
                        </div>
                        <span className="text-base font-extrabold text-slate-900">{beds}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          id="btn-beds-minus"
                          onClick={() => setBeds(Math.max(1, beds - 1))}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer select-none"
                        >
                          -
                        </button>
                        <input
                          id="slider-beds"
                          type="range"
                          min="1"
                          max="8"
                          value={beds}
                          onChange={(e) => setBeds(parseInt(e.target.value))}
                          className="flex-1 accent-emerald-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                        />
                        <button
                          id="btn-beds-plus"
                          onClick={() => setBeds(Math.min(8, beds + 1))}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Baths */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Bath className="h-4.5 w-4.5 text-emerald-500" />
                          <span className="text-xs font-bold text-slate-700">
                            {selectedServiceId === "office" ? "Restrooms" : "Bathrooms"}
                          </span>
                        </div>
                        <span className="text-base font-extrabold text-slate-900">{baths}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          id="btn-baths-minus"
                          onClick={() => setBaths(Math.max(1, baths - 0.5))}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer select-none"
                        >
                          -
                        </button>
                        <input
                          id="slider-baths"
                          type="range"
                          min="1"
                          max="6"
                          step="0.5"
                          value={baths}
                          onChange={(e) => setBaths(parseFloat(e.target.value))}
                          className="flex-1 accent-emerald-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                        />
                        <button
                          id="btn-baths-plus"
                          onClick={() => setBaths(Math.min(6, baths + 0.5))}
                          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center transition-colors cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sft Slider Area */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Ruler className="h-4.5 w-4.5 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700">Estimated Sizing (sq. ft.)</span>
                      </div>
                      <span className="text-base font-extrabold text-slate-900">{sqFt.toLocaleString()} sqft</span>
                    </div>
                    <input
                      id="slider-sqft"
                      type="range"
                      min="500"
                      max="5000"
                      step="50"
                      value={sqFt}
                      onChange={(e) => setSqFt(parseInt(e.target.value))}
                      className="w-full h-1.5 accent-emerald-500 bg-slate-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                      <span>500 sqft (Studio)</span>
                      <span>2,500 sqft (Midsized)</span>
                      <span>5,000 sqft (Estate)</span>
                    </div>
                  </div>

                  {/* Frequency discount configurations */}
                  <div>
                    <label id="calculator-frequency-label" className="block text-sm font-bold text-slate-700 mb-2.5">Schedule Frequency</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(["one-off", "weekly", "bi-weekly", "monthly"] as const).map((freq) => {
                        const discountRate = FREQUENCY_DISCOUNTS[freq];
                        const isSelected = frequency === freq;
                        return (
                          <button
                            key={freq}
                            id={`freq-btn-${freq}`}
                            onClick={() => setFrequency(freq)}
                            type="button"
                            className={`px-3.5 py-4 rounded-xl border flex flex-col justify-between items-center text-center transition-all cursor-pointer bg-white ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-50/20 ring-2 ring-emerald-500/10"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <span className={`text-[12px] font-bold select-none ${isSelected ? "text-emerald-700" : "text-slate-600"}`}>
                              {freq === "one-off" ? "One-Time" : freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </span>
                            {discountRate > 0 ? (
                              <span className="text-[10px] font-extrabold bg-emerald-500 text-white rounded-full px-2 py-0.5 mt-2 shadow-sm uppercase shrink-0">
                                Save {discountRate * 100}%
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 mt-2">Standard</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Extras Checklist */}
                  <div>
                    <label id="calculator-extras-label" className="block text-sm font-bold text-slate-700 mb-3.5">Select Add-On Extra Cleans</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {EXTRAS.map((ex) => {
                        const isChecked = selectedExtras.includes(ex.id);
                        const Icon = EXTRA_ICON_MAP[ex.iconName] || SparklingIconPlaceholder;
                        return (
                          <button
                            key={ex.id}
                            id={`extra-btn-${ex.id}`}
                            onClick={() => handleExtraToggle(ex.id)}
                            type="button"
                            className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between items-start cursor-pointer transition-all h-28 bg-white select-none ${
                              isChecked
                                ? "border-emerald-500 bg-emerald-50/10 shadow-md ring-2 ring-emerald-500/10"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={`p-1.5 rounded-xl transition-colors ${isChecked ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"}`}>
                                <Icon className="h-4.5 w-4.5" />
                              </span>
                              {isChecked && (
                                <div className="bg-emerald-500 text-white p-0.5 rounded-full shrink-0">
                                  <Check className="h-3 w-3 stroke-[3]" />
                                </div>
                              )}
                            </div>
                            <div className="mt-2.5">
                              <span className="block text-xs font-bold text-slate-800 leading-tight truncate max-w-full">{ex.name}</span>
                              <span className="text-xs text-slate-400 font-extrabold">+${ex.price}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Move to contact information step */}
                  <button
                    id="calc-proceed-btn"
                    onClick={handleNextStep}
                    className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-full font-bold cursor-pointer shadow-md mt-4 transition-all"
                  >
                    Proceed to Booking Details
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="calculator-booking"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleFormSubmission}
                  className="flex flex-col gap-5"
                >
                  {/* Customer Information Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id="input-name"
                          type="text"
                          required
                          placeholder="Jane Doe"
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          className="w-full bg-white border border-slate-200 active:border-emerald-500 focus:border-emerald-500 outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id="input-email"
                          type="email"
                          required
                          placeholder="jane@domain.com"
                          value={custEmail}
                          onChange={(e) => setCustEmail(e.target.value)}
                          className="w-full bg-white border border-slate-200 active:border-emerald-500 focus:border-emerald-500 outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          id="input-phone"
                          type="tel"
                          required
                          placeholder="(555) 000-0000"
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          className="w-full bg-white border border-slate-200 active:border-emerald-500 focus:border-emerald-500 outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600" />
                        <input
                          id="input-date"
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={prefDate}
                          onChange={(e) => setPrefDate(e.target.value)}
                          className="w-full bg-white border border-slate-200 active:border-emerald-500 focus:border-emerald-500 outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 font-medium cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time slots choice */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Preferred Window</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(["morning", "afternoon", "evening"] as const).map((time) => {
                        const labels = {
                          morning: { title: "Morning", slot: "8:00 AM - 12:00 PM" },
                          afternoon: { title: "Afternoon", slot: "12:00 PM - 4:00 PM" },
                          evening: { title: "Evening", slot: "4:00 PM - 8:00 PM" },
                        };
                        const active = prefTime === time;
                        return (
                          <button
                            key={time}
                            id={`time-slot-${time}`}
                            type="button"
                            onClick={() => setPrefTime(time)}
                            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer bg-white ${
                              active
                                ? "border-emerald-600 bg-emerald-50/10 ring-2 ring-emerald-500/10"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <Clock className={`h-4 w-4 mx-auto mb-1 ${active ? "text-emerald-600" : "text-slate-400"}`} />
                            <span className={`block text-xs font-bold ${active ? "text-emerald-700" : "text-slate-700"}`}>
                              {labels[time].title}
                            </span>
                            <span className="text-[9px] font-medium text-slate-400 block mt-0.5">{labels[time].slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Comments */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">Special Instructions / Gate Codes (Optional)</label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <textarea
                        id="textarea-notes"
                        placeholder="Please focus especially on the master shower glass. Dogs will be secured in the yard..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-white border border-slate-200 active:border-emerald-500 focus:border-emerald-500 outline-none rounded-xl py-3 pl-10 pr-4 text-sm text-slate-800 font-medium min-h-[90px]"
                      />
                    </div>
                  </div>

                  {/* Success indicator message inside form */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center gap-3"
                    >
                      <BadgeCheck className="h-6 w-6 text-emerald-600 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold">Booking Request Lodged Successfully!</h4>
                        <p className="text-xs text-emerald-700 mt-0.5">Please check down below in 'My Bookings' section to see your logged appointments status.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Booking Submission controls */}
                  <div className="flex gap-3 mt-2">
                    <button
                      id="calc-back-btn"
                      type="button"
                      disabled={submitting}
                      onClick={() => setBookingStep(0)}
                      className="flex-1 text-center bg-slate-200 hover:bg-slate-300 text-slate-700 py-4 rounded-xl font-bold transition-all disabled:opacity-50 cursor-pointer"
                    >
                      Back to Space Setup
                    </button>
                    <button
                      id="calc-submit-booking-btn"
                      type="submit"
                      disabled={submitting || success}
                      className="flex-[2] text-center bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-extrabold shadow-lg shadow-emerald-150 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Generating Reservation...</span>
                        </>
                      ) : (
                        <>
                          <CalendarCheck2 className="h-4 w-4" />
                          <span>Lock In Quote & Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>

          {/* ESTIMATOR DETAILS BILL CARD (COL 5) */}
          <div className="lg:col-span-5 sticky top-28 bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-850">
            <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <span>Quote Breakdown</span>
            </h3>

            {/* Config overview */}
            <div className="flex flex-col gap-3.5 mb-6 text-sm">
              <div className="flex justify-between items-center bg-slate-850/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-semibold">Clean Package</span>
                <span className="font-extrabold text-emerald-400">{activeService.name}</span>
              </div>

              <div className="flex justify-between items-center text-xs px-2">
                <span className="text-slate-400">Dimensions:</span>
                <span className="font-bold text-slate-300">
                  {beds} {selectedServiceId === 'office' ? 'Rooms' : 'Beds'} • {baths} Baths • {sqFt} sqft
                </span>
              </div>

              <div className="flex justify-between items-center text-xs px-2">
                <span className="text-slate-400">Schedule type:</span>
                <span className="font-bold text-emerald-400">
                  {frequency === 'one-off' ? 'One-time visit' : frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                </span>
              </div>

              {selectedExtras.length > 0 && (
                <div className="border-t border-slate-800 pt-3.5 mt-2.5">
                  <span className="text-xs text-slate-400 block font-semibold mb-2">Requested Add-ons:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedExtras.map((exId) => {
                      const exObj = EXTRAS.find((ex) => ex.id === exId);
                      return (
                        <span key={exId} className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 font-bold px-2 py-1 rounded-lg">
                          + {exObj?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Calculations metrics area */}
            <div className="border-t border-slate-800 pt-5 flex flex-col gap-2.5">
              <div className="flex justify-between text-xs font-semibold text-slate-400 px-1">
                <span>Subtotal Rate:</span>
                <span>${subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-xs font-bold text-emerald-400 px-1">
                  <span>Frequency Savings:</span>
                  <span>-${Math.round(discount)}</span>
                </div>
              )}

              <div className="border-t border-dashed border-slate-800 pt-4 mt-1.5 flex justify-between items-baseline px-1">
                <span className="text-sm font-bold text-slate-300">Total Estimate:</span>
                <div className="text-right">
                  <span className="text-4xl font-black text-white">${total}</span>
                  <span className="text-[10px] text-slate-400 block font-medium mt-0.5">/ session</span>
                </div>
              </div>
            </div>

            {/* Safety parameters note details */}
            <div className="mt-8 bg-slate-850 p-4 rounded-2xl border border-slate-800/80 text-[11px] text-slate-400 leading-normal flex items-start gap-2.5">
              <span className="bg-slate-800 p-1 rounded-lg text-emerald-400 inline-block">✓</span>
              <p>
                Estimation based on standard layout sizing. Rates secure you all necessary supplies, background checks, and our custom 100% Happiness Guarantees. No upfront contract fees.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Sparkle utility icon fallback
function SparklingIconPlaceholder(props: { className?: string }) {
  return <Sparkles className={props.className} />;
}
