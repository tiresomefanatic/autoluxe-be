import { Request, Response } from "express";
import { CarModel, CarDocument } from "../models/car.model";
import { BrandModel } from "../models/brand.model";
import { RequestHandler } from "express";
import { generateMockCars } from "../utils/carSeedData";

// Create a new car
export const createCar: RequestHandler = async (req, res) => {
  try {
    const car = new CarModel(req.body);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({
      message: "Error creating car",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get cars with filtering and pagination
export const getCars: RequestHandler = async (req, res) => {
  try {
    const page = parseInt(req.query.page?.toString() || "1");
    const limit = parseInt(req.query.limit?.toString() || "10");
    const search = req.query.search?.toString() || "";
    const make = req.query.make?.toString();
    const priceRange = req.query.priceRange?.toString()?.split("-").map(Number);
    const type = req.query.type?.toString();
    const transmission = req.query.transmission?.toString();

    console.log("[Backend] Processing query params:", {
      page,
      limit,
      search,
      make,
      priceRange,
      type,
      transmission,
    });

    const query: any = {};

    // Search query
    if (search) {
      query.$or = [
        { make: new RegExp(search, "i") },
        { model: new RegExp(search, "i") },
        { variant: new RegExp(search, "i") },
      ];
    }

    // Make filter with brand validation
    if (make) {
      const brand = await BrandModel.findOne({
        name: new RegExp(`^${make}$`, "i"),
      });
      if (!brand) {
        res.status(400).json({ message: "Invalid brand specified" });
        return;
      }
      query.make = brand.name;
    }

    // Price range filter
    if (priceRange && priceRange.length === 2) {
      query["pricing.basePrice"] = {
        $gte: priceRange[0],
        $lte: priceRange[1],
      };
    }

    // Type filter
    if (type) {
      query.type = new RegExp(`^${type}$`, "i");
    }

    // Transmission filter
    if (transmission) {
      query["specifications.engine.transmission"] = new RegExp(
        `^${transmission}$`,
        "i"
      );
    }

    console.log("[Backend] Final query:", JSON.stringify(query, null, 2));

    const totalCars = await CarModel.countDocuments(query);
    const cars = await CarModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ "metadata.createdAt": -1 });

    // Get brands from brand model
    const brands = await BrandModel.find();

    console.log("[Backend] Query results:", {
      totalCars,
      carsReturned: cars.length,
      availableBrands: brands.length,
    });

    res.status(200).json({
      cars,
      currentPage: page,
      totalPages: Math.ceil(totalCars / limit),
      totalCars,
      filters: {
        brands: brands.map((b) => b.name),
        priceRange: {
          min: await CarModel.findOne()
            .sort({ "pricing.basePrice": 1 })
            .select("pricing.basePrice")
            .lean(),
          max: await CarModel.findOne()
            .sort({ "pricing.basePrice": -1 })
            .select("pricing.basePrice")
            .lean(),
        },
      },
    });
  } catch (error) {
    console.error("[Backend] Error in getCars:", error);
    res.status(500).json({
      message: "Error fetching cars",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get a single car by ID
export const getCarById: RequestHandler = async (req, res) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching car",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a car
export const updateCar: RequestHandler = async (req, res) => {
  try {
    const car = await CarModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        "metadata.updatedAt": new Date().toISOString(),
      },
      { new: true, runValidators: true }
    );

    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({
      message: "Error updating car",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a car
export const deleteCar: RequestHandler = async (req, res) => {
  try {
    const car = await CarModel.findByIdAndDelete(req.params.id);
    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting car",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update car availability status
export const updateCarStatus: RequestHandler = async (req, res) => {
  try {
    const { status } = req.body;
    const car = await CarModel.findByIdAndUpdate(
      req.params.id,
      {
        "availability.status": status,
        "metadata.updatedAt": new Date().toISOString(),
      },
      { new: true, runValidators: true }
    );

    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({
      message: "Error updating car status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update car maintenance records
export const updateCarMaintenance: RequestHandler = async (req, res) => {
  try {
    const { lastService, nextServiceDue, condition } = req.body;
    const car = await CarModel.findByIdAndUpdate(
      req.params.id,
      {
        maintenance: { lastService, nextServiceDue, condition },
        "metadata.updatedAt": new Date().toISOString(),
      },
      { new: true, runValidators: true }
    );

    if (!car) {
      res.status(404).json({ message: "Car not found" });
      return;
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({
      message: "Error updating car maintenance",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Bulk insert brands
export const bulkInsertBrands: RequestHandler = async (req, res) => {
  try {
    const brands = [
      "Rolls-Royce",
      "Bentley",
      "Ferrari",
      "Lamborghini",
      "Porsche",
      "Mercedes-Benz",
      "BMW",
      "Audi",
      "Lexus",
      "Maserati",
      "Aston Martin",
      "McLaren",
      "Bugatti",
      "Koenigsegg",
      "Pagani",
    ];

    const brandDocs = brands.map((name) => ({ name }));

    const insertedBrands = await Promise.all(
      brandDocs.map((brand) =>
        BrandModel.findOneAndUpdate({ name: brand.name }, brand, {
          upsert: true,
          new: true,
        })
      )
    );

    res.status(201).json({
      message: `Successfully inserted/updated ${insertedBrands.length} luxury brands`,
      count: insertedBrands.length,
      brands: insertedBrands,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error inserting brands",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Bulk insert cars with brand references
export const bulkInsertCars: RequestHandler = async (req, res) => {
  try {
    const count = parseInt(req.query.count?.toString() || "50");
    const seedRegion = req.query.region?.toString() || "dubai";

    if (count > 200) {
      res.status(400).json({
        message: "Maximum allowed cars for bulk insert is 200",
      });
      return;
    }

    const brands = await BrandModel.find();
    if (brands.length === 0) {
      res.status(400).json({
        message:
          "No brands available. Please insert brands first using /api/cars/seed/brands",
      });
      return;
    }

    const mockCars = generateMockCars(count).map((car) => ({
      ...car,
      make: brands[Math.floor(Math.random() * brands.length)].name,
    }));

    const insertedCars = await CarModel.insertMany(mockCars);

    res.status(201).json({
      message: `Successfully inserted ${insertedCars.length} luxury cars`,
      count: insertedCars.length,
      region: seedRegion,
      firstCarId: insertedCars[0]._id,
      lastCarId: insertedCars[insertedCars.length - 1]._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error inserting mock cars",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get cars grouped by brands with statistics
export const getCarsByBrands: RequestHandler = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    const brandStats = await Promise.all(
      brands.map(async (brand) => {
        const carCount = await CarModel.countDocuments({ make: brand.name });
        const featuredCar = await CarModel.findOne({
          make: brand.name,
          "rating.isRare": true,
        }).sort({ "rating.average": -1 });

        return {
          _id: brand._id,
          name: brand.name,
          carCount,
          featured: !!featuredCar,
          logo: featuredCar?.images.find((img) => img.isMain)?.url || null,
        };
      })
    );

    res.status(200).json(brandStats.filter((brand) => brand.carCount > 0));
  } catch (error) {
    console.error("[Backend] Error in getCarsByBrands:", error);
    res.status(500).json({
      message: "Error fetching brands",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
