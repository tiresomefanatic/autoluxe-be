"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_controller_1 = require("../controllers/car.controller");
const validateCarInput_1 = require("../middleware/validateCarInput");
const router = (0, express_1.Router)();
// Basic CRUD routes
router.post("/", validateCarInput_1.validateCarInput, car_controller_1.createCar);
router.get("/", car_controller_1.getCars);
router.get("/:id", car_controller_1.getCarById);
router.put("/:id", validateCarInput_1.validateCarInput, car_controller_1.updateCar);
router.delete("/:id", car_controller_1.deleteCar);
// Additional routes
router.patch("/:id/status", car_controller_1.updateCarStatus);
router.patch("/:id/maintenance", car_controller_1.updateCarMaintenance);
exports.default = router;
