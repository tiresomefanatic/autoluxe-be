import { Router } from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  updateCarStatus,
  updateCarMaintenance,
  bulkInsertCars,
  bulkInsertBrands,
  getCarsByBrands,
} from "../controllers/car.controller";
import { validateCarInput } from "../middleware/validateCarInput";

const router = Router();

router.post("/seed", bulkInsertCars);
router.post("/seed/brands", bulkInsertBrands);
router.get("/brands", getCarsByBrands);

// Basic CRUD routes
router.post("/", validateCarInput, createCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", validateCarInput, updateCar);
router.delete("/:id", deleteCar);

// Additional routes
router.patch("/:id/status", updateCarStatus);
router.patch("/:id/maintenance", updateCarMaintenance);

export default router;
