/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CleaningService {
  id: string;
  name: string;
  description: string;
  basePrice: number; // Base rate per service
  pricePerBed: number;
  pricePerBath: number;
  pricePerSqFt: number; // multiplier
  iconName: string;
  features: string[];
}

export interface ExtraServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  iconName: string;
}

export interface BookingRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  frequency: "one-off" | "weekly" | "bi-weekly" | "monthly";
  extras: string[]; // List of extra option ids
  preferredDate: string;
  preferredTime: "morning" | "afternoon" | "evening";
  specialNotes?: string;
  estimatedPrice: number;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location: string;
  serviceType: string;
  rating: number;
  comment: string;
  date: string;
  avatarSeed?: string;
}

export interface faqItem {
  question: string;
  answer: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
