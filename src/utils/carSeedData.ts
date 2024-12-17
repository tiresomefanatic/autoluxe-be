import { Car, CarFeature, CarImage } from "../types";
import { v4 as uuidv4 } from "uuid";

const luxuryBrands = [
  {
    make: "Rolls-Royce",
    models: [
      {
        name: "Cullinan",
        variants: ["Black Badge", "Base"],
        engineTypes: ["6.75L V12 Twin-Turbo"],
        powerRange: [563, 600],
      },
      {
        name: "Phantom",
        variants: ["EWB", "Series II"],
        engineTypes: ["6.75L V12 Twin-Turbo"],
        powerRange: [563, 571],
      },
      {
        name: "Ghost",
        variants: ["Black Badge", "EWB"],
        engineTypes: ["6.75L V12 Twin-Turbo"],
        powerRange: [563, 592],
      },
    ],
  },
  {
    make: "Lamborghini",
    models: [
      {
        name: "Urus",
        variants: ["S", "Performante"],
        engineTypes: ["4.0L V8 Twin-Turbo"],
        powerRange: [641, 657],
      },
      {
        name: "Huracán",
        variants: ["STO", "EVO", "Tecnica"],
        engineTypes: ["5.2L V10"],
        powerRange: [631, 640],
      },
      {
        name: "Aventador",
        variants: ["SVJ", "Ultimae"],
        engineTypes: ["6.5L V12"],
        powerRange: [759, 769],
      },
    ],
  },
  {
    make: "Ferrari",
    models: [
      {
        name: "SF90",
        variants: ["Stradale", "Spider"],
        engineTypes: ["4.0L V8 Hybrid"],
        powerRange: [986, 986],
      },
      {
        name: "F8",
        variants: ["Tributo", "Spider"],
        engineTypes: ["3.9L V8 Twin-Turbo"],
        powerRange: [710, 710],
      },
      {
        name: "296",
        variants: ["GTB", "GTS"],
        engineTypes: ["3.0L V6 Hybrid"],
        powerRange: [818, 818],
      },
    ],
  },
  {
    make: "Mercedes-Benz",
    models: [
      {
        name: "G-Class",
        variants: ["G63 AMG", "G500"],
        engineTypes: ["4.0L V8 Biturbo"],
        powerRange: [416, 577],
      },
      {
        name: "Maybach S-Class",
        variants: ["S680", "S580"],
        engineTypes: ["6.0L V12", "4.0L V8"],
        powerRange: [496, 621],
      },
      {
        name: "AMG GT",
        variants: ["Black Series", "63 S"],
        engineTypes: ["4.0L V8 Biturbo"],
        powerRange: [630, 720],
      },
    ],
  },
  {
    make: "Bentley",
    models: [
      {
        name: "Continental GT",
        variants: ["Speed", "Mulliner"],
        engineTypes: ["6.0L W12 Twin-Turbo", "4.0L V8"],
        powerRange: [542, 650],
      },
      {
        name: "Bentayga",
        variants: ["EWB", "Speed"],
        engineTypes: ["6.0L W12 Twin-Turbo", "4.0L V8"],
        powerRange: [542, 626],
      },
      {
        name: "Flying Spur",
        variants: ["Mulliner", "Speed"],
        engineTypes: ["6.0L W12 Twin-Turbo", "4.0L V8"],
        powerRange: [542, 626],
      },
    ],
  },
];

const locations = [
  {
    name: "Downtown Dubai Branch",
    address: "Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    coordinates: { latitude: 25.2048, longitude: 55.2708 },
  },
  {
    name: "Palm Jumeirah Branch",
    address: "Crescent Road, Palm Jumeirah",
    coordinates: { latitude: 25.1124, longitude: 55.139 },
  },
  {
    name: "Dubai Marina Branch",
    address: "Marina Walk, Dubai Marina",
    coordinates: { latitude: 25.0777, longitude: 55.1304 },
  },
  {
    name: "DIFC Branch",
    address: "Gate Avenue, DIFC",
    coordinates: { latitude: 25.2147, longitude: 55.2796 },
  },
  {
    name: "City Walk Branch",
    address: "Al Safa Street, City Walk",
    coordinates: { latitude: 25.2067, longitude: 55.2633 },
  },
];

const defaultFeatures: Array<{
  name: string;
  category: CarFeature["category"];
  icon: string;
}> = [
  { name: "360-Degree Camera", category: "safety", icon: "camera360" },
  { name: "Blind Spot Monitor", category: "safety", icon: "blindspot" },
  { name: "Lane Departure Warning", category: "safety", icon: "lane" },
  { name: "Massage Seats", category: "comfort", icon: "massage" },
  { name: "Panoramic Sunroof", category: "comfort", icon: "sunroof" },
  { name: "Premium Sound System", category: "comfort", icon: "sound" },
  { name: "Sport Package", category: "performance", icon: "sport" },
  { name: "Carbon Ceramic Brakes", category: "performance", icon: "brakes" },
  { name: "Smart Key", category: "convenience", icon: "key" },
  { name: "Wireless Charging", category: "convenience", icon: "charging" },
];

const colors = {
  exterior: [
    "Diamond White",
    "Onyx Black",
    "Arabian Mocha",
    "Dubai Gold",
    "Rose Gold",
    "Midnight Sapphire",
    "Desert Bronze",
    "Arctic White",
    "Carbon Black",
    "Royal Silver",
  ],
  interior: [
    "Arabian Beige Leather",
    "Pearl White Leather",
    "Jet Black Leather",
    "Mahogany Brown Leather",
    "Cream Leather",
    "Desert Tan Leather",
    "Two-Tone Black/White",
    "Royal Red Leather",
    "Mocha Brown Leather",
    "Ivory White Leather",
  ],
};

const generateVIN = (): string => {
  const characters = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";
  const manufacturer = "SCZ";
  const year = String.fromCharCode(65 + Math.floor(Math.random() * 25));
  return (
    manufacturer +
    year +
    Array(13)
      .fill(null)
      .map(() =>
        characters.charAt(Math.floor(Math.random() * characters.length))
      )
      .join("")
  );
};

const generateDubaiLicensePlate = (): string => {
  const categories = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const numbers = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  const category = categories[Math.floor(Math.random() * categories.length)];
  return `DUBAI ${category} ${numbers}`;
};

const getRandomFeatures = (): CarFeature[] => {
  const shuffled = [...defaultFeatures]
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return shuffled.map((feature) => ({
    id: uuidv4(),
    name: feature.name,
    category: feature.category,
    icon: feature.icon,
  }));
};

export const generateMockCars = (count: number): Car[] => {
  const cars: Car[] = [];

  for (let i = 0; i < count; i++) {
    const brandData =
      luxuryBrands[Math.floor(Math.random() * luxuryBrands.length)];
    const modelData =
      brandData.models[Math.floor(Math.random() * brandData.models.length)];
    const variant =
      modelData.variants[Math.floor(Math.random() * modelData.variants.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const currentYear = new Date().getFullYear();
    const year = currentYear - Math.floor(Math.random() * 3);

    const power = Math.floor(
      modelData.powerRange[0] +
        Math.random() * (modelData.powerRange[1] - modelData.powerRange[0])
    );

    const car: Car = {
      make: brandData.make,
      model: modelData.name,
      variant,
      year,
      type: "luxury",
      color: {
        exterior:
          colors.exterior[Math.floor(Math.random() * colors.exterior.length)],
        interior:
          colors.interior[Math.floor(Math.random() * colors.interior.length)],
      },
      vin: generateVIN(),
      licensePlate: generateDubaiLicensePlate(),
      images: [
        {
          id: uuidv4(),
          url: "/placeholder-car-image.jpg",
          alt: `${year} ${brandData.make} ${modelData.name} ${variant}`,
          isMain: true,
        },
      ],
      features: getRandomFeatures(),
      specifications: {
        engine: {
          type: modelData.engineTypes[0],
          capacity: parseFloat(modelData.engineTypes[0].split("L")[0]),
          power,
          transmission: "Automatic",
          cylinders: parseInt(
            modelData.engineTypes[0].match(/V(\d+)|W(\d+)/)?.[1] || "8"
          ),
        },
        performance: {
          acceleration: 2.5 + Math.random() * 2,
          topSpeed: 280 + Math.random() * 70,
          fuelEfficiency: 8 + Math.random() * 6,
        },
        dimensions: {
          length: 4800 + Math.random() * 1000,
          width: 1900 + Math.random() * 300,
          height: 1400 + Math.random() * 400,
          wheelbase: 2850 + Math.random() * 500,
          seatingCapacity: Math.floor(Math.random() * 3) + 2,
        },
      },
      maintenance: {
        lastService: {
          date: new Date(
            Date.now() - Math.random() * 15552000000
          ).toISOString(),
          mileage: Math.floor(Math.random() * 5000),
          type: "regular",
        },
        nextServiceDue: {
          date: new Date(
            Date.now() + Math.random() * 15552000000
          ).toISOString(),
          mileage: Math.floor(Math.random() * 5000) + 10000,
        },
        condition: "excellent",
      },
      pricing: {
        basePrice: Math.floor((200000 + Math.random() * 800000) * 3.67),
        currency: "AED",
        deposit: Math.floor(25000 * 3.67),
        insurance: {
          basic: Math.floor((1000 + Math.random() * 2000) * 3.67),
          premium: Math.floor((2000 + Math.random() * 3000) * 3.67),
        },
        discounts: {
          weeklyRate: Math.floor(Math.random() * 15) + 5,
          monthlyRate: Math.floor(Math.random() * 25) + 10,
          specialOffer:
            Math.random() > 0.7
              ? Math.floor(Math.random() * 20) + 10
              : undefined,
        },
      },
      availability: {
        status:
          Math.random() > 0.3
            ? "available"
            : Math.random() > 0.5
            ? "booked"
            : Math.random() > 0.5
            ? "maintenance"
            : "unavailable",
        location: {
          name: location.name,
          address: location.address,
          coordinates: location.coordinates,
        },
        pickupOptions: ["location", "delivery"],
        availableFrom: new Date(
          Date.now() + Math.random() * 604800000
        ).toISOString(),
        availableTo:
          Math.random() > 0.5
            ? new Date(Date.now() + Math.random() * 2592000000).toISOString()
            : undefined,
      },
      rating: {
        average: 4.3 + Math.random() * 0.7,
        count: Math.floor(Math.random() * 100) + 20,
        isRare:
          brandData.make === "Ferrari" ||
          brandData.make === "Rolls-Royce" ||
          Math.random() > 0.8,
      },
      restrictions: {
        minAge: 25,
        minLicenseYears: 3,
        requiredDocuments: [
          "Valid UAE/International Driver's License",
          "Original Passport",
          "Tourist Visa or UAE ID",
          "Credit Card with Sufficient Limit",
          "Security Deposit Authorization",
        ],
      },
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        popularityScore: Math.floor(Math.random() * 100),
      },
    };

    cars.push(car);
  }

  return cars;
};
