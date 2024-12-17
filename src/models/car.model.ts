import mongoose, { Document, Schema } from "mongoose";
import { Car } from "../types";

export type CarDocument = Document & Car;

const CarSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    variant: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
    color: {
      exterior: { type: String, required: true },
      interior: { type: String, required: true },
    },
    vin: { type: String, required: true, unique: true },
    licensePlate: { type: String, required: true, unique: true },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        isMain: { type: Boolean, required: true },
      },
    ],
    features: [
      {
        name: { type: String, required: true },
        category: {
          type: String,
          enum: ["safety", "comfort", "performance", "convenience"],
          required: true,
        },
        icon: String,
      },
    ],
    specifications: {
      engine: {
        type: { type: String, required: true },
        capacity: { type: Number, required: true },
        power: { type: Number, required: true },
        transmission: {
          type: String,
          enum: ["Manual", "Automatic"],
          required: true,
        },
        cylinders: Number,
      },
      performance: {
        acceleration: { type: Number, required: true },
        topSpeed: { type: Number, required: true },
        fuelEfficiency: Number,
      },
      dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        wheelbase: { type: Number, required: true },
        seatingCapacity: { type: Number, required: true },
      },
    },
    maintenance: {
      lastService: {
        date: { type: String, required: true },
        mileage: { type: Number, required: true },
        type: {
          type: String,
          enum: ["regular", "major", "repair"],
          required: true,
        },
      },
      nextServiceDue: {
        date: { type: String, required: true },
        mileage: { type: Number, required: true },
      },
      condition: {
        type: String,
        enum: ["excellent", "good", "fair"],
        required: true,
      },
    },
    pricing: {
      basePrice: { type: Number, required: true },
      currency: { type: String, required: true },
      deposit: { type: Number, required: true },
      insurance: {
        basic: { type: Number, required: true },
        premium: { type: Number, required: true },
      },
      discounts: {
        weeklyRate: Number,
        monthlyRate: Number,
        specialOffer: Number,
      },
    },
    availability: {
      status: {
        type: String,
        enum: ["available", "booked", "maintenance", "unavailable"],
        required: true,
      },
      location: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        coordinates: {
          latitude: { type: Number, required: true },
          longitude: { type: Number, required: true },
        },
      },
      pickupOptions: [
        {
          type: String,
          enum: ["location", "delivery"],
        },
      ],
      availableFrom: { type: String, required: true },
      availableTo: String,
    },
    rating: {
      average: { type: Number, required: true },
      count: { type: Number, required: true },
      isRare: { type: Boolean, required: true },
    },
    restrictions: {
      minAge: Number,
      minLicenseYears: Number,
      requiredDocuments: [String],
    },
    metadata: {
      createdAt: { type: String, required: true },
      updatedAt: { type: String, required: true },
      isActive: { type: Boolean, required: true },
      popularityScore: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const CarModel = mongoose.model<CarDocument>("Car", CarSchema);
export default CarModel;
