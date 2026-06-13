/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CleaningService, ExtraServiceOption, CustomerReview, faqItem } from "./types";

export const SERVICES: CleaningService[] = [
  {
    id: "standard",
    name: "Standard Home Clean",
    description: "Our signature regular maintenance clean to keep your home healthy, refreshed, and comfortable.",
    basePrice: 90,
    pricePerBed: 25,
    pricePerBath: 15,
    pricePerSqFt: 0.04,
    iconName: "Home",
    features: [
      "Dusting all accessible furniture and surfaces",
      "Vacuuming carpets, rugs, and mopping hard floors",
      "Wiping kitchen countertops, sink, and exterior appliances",
      "Sanitizing bathrooms (toilet, shower, tub, counter, mirror)",
      "Emptying trash bins & replacing liners",
      "General tidy-up of items and making beds"
    ]
  },
  {
    id: "deep",
    name: "Deep Detail Clean",
    description: "An intensive top-to-bottom scrub designed for homes that haven't been professionally cleaned in 3+ months.",
    basePrice: 150,
    pricePerBed: 35,
    pricePerBath: 25,
    pricePerSqFt: 0.07,
    iconName: "Sparkles",
    features: [
      "All standard cleaning tasks included",
      "Scrubbing tile grout, shower walls, and faucets",
      "Detailed dusting of baseboards, door frames, and vents",
      "Wiping light switches, door handles, and outlet covers",
      "Dusting blinds, ceiling fans, and light fixtures",
      "Wiping cabinet doors and grease trap cleaning"
    ]
  },
  {
    id: "move",
    name: "Move-In / Move-Out Clean",
    description: "An exhaustive clean of empty homes to secure your security deposit return or prepare for modern living.",
    basePrice: 200,
    pricePerBed: 45,
    pricePerBath: 35,
    pricePerSqFt: 0.09,
    iconName: "Truck",
    features: [
      "All deep cleaning tasks included",
      "Inside cabinet and drawer scrubbing",
      "Deep cleaning of empty refrigerator and oven internals",
      "Thorough cleaning of closet interiors and shelving",
      "Inside window pane and track cleaning",
      "Removing adhesive residues, scuff marks, and minor paint spits"
    ]
  },
  {
    id: "office",
    name: "Office & Commercial Clean",
    description: "Maintain a pristine, hygienic, and highly productive workspace for your clients and valuable workforce.",
    basePrice: 120,
    pricePerBed: 20, // Used as "Conference Rooms" in UI
    pricePerBath: 20, // Restrooms
    pricePerSqFt: 0.05,
    iconName: "Briefcase",
    features: [
      "Sanitizing high-touch reception desks, tables, and door knobs",
      "Thorough dusting of workstations, electronics, and monitors",
      "Restroom disinfection, trash pickup, and paper restocking",
      "Kitchenette/breakroom cleanup and microwave sanitizing",
      "Vacuuming carpet tiles and intensive hard flooring mopping",
      "Emptying all individual desk bins & recycling sorting"
    ]
  }
];

export const EXTRAS: ExtraServiceOption[] = [
  {
    id: "oven",
    name: "Inside Oven",
    description: "Heavy degreasing, carbon removal, and glass polishing.",
    price: 35,
    iconName: "Flame"
  },
  {
    id: "fridge",
    name: "Inside Fridge",
    description: "Full scrub, shelving wash, and odor disinfection.",
    price: 25,
    iconName: "IceCream"
  },
  {
    id: "windows",
    name: "Interior Windows",
    description: "Squeegee pristine glass washing, sills, and tracks.",
    price: 40,
    iconName: "Grid"
  },
  {
    id: "cabinets",
    name: "Inside Cabinets",
    description: "Wiping food crumbs, cleaning grease, and organizing.",
    price: 30,
    iconName: "FolderOpen"
  },
  {
    id: "walls",
    name: "Wall Washing",
    description: "Removing fingerprints, scuffs, dirt, and stains.",
    price: 60,
    iconName: "Layers"
  },
  {
    id: "balcony",
    name: "Balcony / Patio Sweep",
    description: "Sweeping, cobweb removal, and glass barrier wiping.",
    price: 20,
    iconName: "Wind"
  }
];

export const FREQUENCY_DISCOUNTS = {
  "one-off": 0,
  "weekly": 0.20, // 20% off
  "bi-weekly": 0.15, // 15% off
  "monthly": 0.10 // 10% off
};

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    customerName: "Sarah Jenkins",
    location: "Oakwood Hills",
    serviceType: "Deep Detailed Clean",
    rating: 5,
    comment: "Absolutely outstanding! Sparkle & Shine did a top-to-bottom clean ahead of our family gathering of 20 people. They didn't miss a single corner, and my kitchen baseboards look brand new. Professional, diligent, and friendly! Will definitely set up weekly service.",
    date: "2026-06-10",
    avatarSeed: "sarah"
  },
  {
    id: "rev-2",
    customerName: "Michael Chang",
    location: "Downtown Heights",
    serviceType: "Move-In Clean",
    rating: 5,
    comment: "Super professional! Booked a Move-In clean because the previous owner left the house in a bit of a mess. When the team finished, the air smelled so crisp, and the oven and fridge looked like they were bought yesterday. Secured my peace of mind!",
    date: "2026-06-05",
    avatarSeed: "michael"
  },
  {
    id: "rev-3",
    customerName: "Elena Rostova",
    location: "Pine River District",
    serviceType: "Standard Home Clean (Bi-weekly)",
    rating: 5,
    comment: "I have been using Sparkle & Shine for over six months now. Their bi-weekly visits are a lifesaver for our busy household. Having the same crew and getting the exact same stunning level of detail every time is why I'll never switch.",
    date: "2026-05-28",
    avatarSeed: "elena"
  }
];

export const FAQS: faqItem[] = [
  {
    question: "Do you bring your own cleaning supplies and equipment?",
    answer: "Yes, 100%! Our cleaning specialists arrive equipped with eco-friendly and pet-safe detergents, commercial-grade vacuum cleaners with HEPA filters, microfibers, mopping equipment, and specialized tools. If you have specific cleaning solutions you prefer we use on unique surfaces, we are happy to follow your guidelines."
  },
  {
    question: "Are your cleaning professionals insured and bonded?",
    answer: "Absolutely. For your peace of mind and protection, all Sparkle & Shine cleaning professionals undergo exhaustive background checks, are rigorously trained to our luxury standards, and are fully insured and bonded against any accidental damage."
  },
  {
    question: "How do I pay for my cleaning slot?",
    answer: "Payment is quick and hassle-free. We accept major credit cards, apple pay, and secure bank links. You are only charged AFTER the cleaning session is fully completed to your 100% satisfaction. There are no contract sign-ups or hidden cancellation fees."
  },
  {
    question: "What is your 100% Sparkle Satisfaction Guarantee?",
    answer: "We strive for absolute perfection. If you are not thoroughly satisfied with any aspect of our service, notify us within 24 hours of your clean. We will send a supervisor back immediately to re-clean the specific areas to your liking—completely free of charge."
  },
  {
    question: "Can I cancel or reschedule my appointment?",
    answer: "Of course! We understand that plans change. You can easily reschedule or cancel any scheduled appointment up to 24 hours before your slot via our client billing dashboard, email, or a quick phone call, totally free of charge."
  }
];
