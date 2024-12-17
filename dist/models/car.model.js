"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CarSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.CarModel = mongoose_1.default.model("Car", CarSchema);
exports.default = exports.CarModel;
