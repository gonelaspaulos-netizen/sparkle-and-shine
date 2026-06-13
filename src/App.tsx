/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServiceList from "./components/ServiceList";
import Estimator from "./components/Estimator";
import BeforeAfter from "./components/BeforeAfter";
import BookingDashboard from "./components/BookingDashboard";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { BookingRequest, CustomerReview } from "./types";
import { INITIAL_REVIEWS } from "./data";

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("standard");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);

  // 1. Initial LocalStorage Synchronization
  useEffect(() => {
    // Sync bookings
    const savedBookings = localStorage.getItem("sparkle_bookings");
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error("Failed to parse bookings from localStorage:", e);
      }
    }

    // Sync reviews
    const savedReviews = localStorage.getItem("sparkle_reviews");
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        console.error("Failed to parse reviews from localStorage:", e);
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem("sparkle_reviews", JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // 2. Scroll Intersection Observer for Header Highlights
  useEffect(() => {
    const sections = ["hero", "services", "calculator", "before-after", "bookings", "reviews", "faq"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -60% 0px", // Trigger when the section occupies a good center portion
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // 3. Navigation smooth scroll function
  const handleScrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // height of our glass sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // 4. Booking submits logic
  const handleAddBooking = (newBooking: BookingRequest) => {
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem("sparkle_bookings", JSON.stringify(updatedBookings));

    // Automatically highlight bookings section shortly after submission
    setTimeout(() => {
      handleScrollToSection("bookings");
    }, 500);
  };

  // 5. Booking cancels logic
  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("sparkle_bookings", JSON.stringify(updatedBookings));
  };

  // 6. Booking status simulation logic (highly satisfying!)
  const handleSimulateApprove = (bookingId: string) => {
    const updatedBookings = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "scheduled" as const } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("sparkle_bookings", JSON.stringify(updatedBookings));
  };

  // 7. Add Review submits logic
  const handleAddReview = (newReview: CustomerReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem("sparkle_reviews", JSON.stringify(updatedReviews));
  };

  // 8. Service list selection link logic
  const handleSelectServiceFromList = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleScrollToSection("calculator");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Absolute Navbar header */}
      <Header onNavigate={handleScrollToSection} activeSection={activeSection} />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero onNavigate={handleScrollToSection} />

        {/* Services Listings checklist */}
        <ServiceList onSelectService={handleSelectServiceFromList} />

        {/* Interactive Estimator / Multi-step booking Form */}
        <Estimator
          selectedServiceId={selectedServiceId}
          onServiceChange={setSelectedServiceId}
          onSubmitBooking={handleAddBooking}
        />

        {/* Interactive Before & After Photo-filter Slider */}
        <BeforeAfter />

        {/* Dynamic Booking Requests Dashboard */}
        <BookingDashboard
          bookings={bookings}
          onCancelBooking={handleCancelBooking}
          onSimulateApprove={handleSimulateApprove}
          onNavigateToEstimator={() => handleScrollToSection("calculator")}
        />

        {/* Testimonials and Interactive Reviews List */}
        <Reviews reviews={reviews} onAddReview={handleAddReview} />

        {/* Contact info and Accordion FAQ */}
        <Contact />
      </main>

      {/* Beautiful Footer with quick selections */}
      <Footer onNavigate={handleScrollToSection} />
    </div>
  );
}
