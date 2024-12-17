export interface CarImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
}

export interface CarFeature {
  id: string;
  name: string;
  category: "safety" | "comfort" | "performance" | "convenience";
  icon?: string;
}

export interface CarMaintenance {
  lastService: {
    date: string;
    mileage: number;
    type: "regular" | "major" | "repair";
  };
  nextServiceDue: {
    date: string;
    mileage: number;
  };
  condition: "excellent" | "good" | "fair";
}

export interface CarPricing {
  basePrice: number;
  currency: string;
  deposit: number;
  insurance: {
    basic: number;
    premium: number;
  };
  discounts?: {
    weeklyRate?: number;
    monthlyRate?: number;
    specialOffer?: number;
  };
}

export interface CarAvailability {
  status: "available" | "booked" | "maintenance" | "unavailable";
  location: {
    name: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  pickupOptions: ("location" | "delivery")[];
  availableFrom: string;
  availableTo?: string;
}

export interface CarSpecification {
  engine: {
    type: string;
    capacity: number;
    power: number;
    transmission: "Manual" | "Automatic";
    cylinders?: number;
  };
  performance: {
    acceleration: number;
    topSpeed: number;
    fuelEfficiency?: number;
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    seatingCapacity: number;
  };
}

export interface Car {
  make: string;
  model: string;
  variant: string;
  year: number;
  type: string;
  color: {
    exterior: string;
    interior: string;
  };
  vin: string;
  licensePlate: string;
  images: CarImage[];
  features: CarFeature[];
  specifications: CarSpecification;
  maintenance: CarMaintenance;
  pricing: CarPricing;
  availability: CarAvailability;
  rating: {
    average: number;
    count: number;
    isRare: boolean;
  };
  restrictions?: {
    minAge: number;
    minLicenseYears: number;
    requiredDocuments: string[];
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    popularityScore?: number;
  };
}
