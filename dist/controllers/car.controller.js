"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCarMaintenance = exports.updateCarStatus = exports.deleteCar = exports.updateCar = exports.getCarById = exports.getCars = exports.createCar = void 0;
const car_model_1 = require("../models/car.model");
// Create a new car
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = new car_model_1.CarModel(req.body);
        const savedCar = yield car.save();
        res.status(201).json(savedCar);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating car",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.createCar = createCar;
// Get all cars with pagination and filters
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const page = parseInt(((_a = req.query.page) === null || _a === void 0 ? void 0 : _a.toString()) || "1");
        const limit = parseInt(((_b = req.query.limit) === null || _b === void 0 ? void 0 : _b.toString()) || "10");
        const search = ((_c = req.query.search) === null || _c === void 0 ? void 0 : _c.toString()) || "";
        const query = {};
        if (search) {
            query.$or = [
                { make: new RegExp(search, "i") },
                { model: new RegExp(search, "i") },
                { variant: new RegExp(search, "i") },
            ];
        }
        if (req.query.make)
            query.make = req.query.make;
        if (req.query.type)
            query.type = req.query.type;
        if (req.query.year)
            query.year = parseInt(req.query.year.toString());
        if (req.query.status)
            query["availability.status"] = req.query.status;
        const totalCars = yield car_model_1.CarModel.countDocuments(query);
        const cars = yield car_model_1.CarModel.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ "metadata.createdAt": -1 });
        res.status(200).json({
            cars,
            currentPage: page,
            totalPages: Math.ceil(totalCars / limit),
            totalCars,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching cars",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getCars = getCars;
// Get a single car by ID
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.CarModel.findById(req.params.id);
        if (!car) {
            res.status(404).json({ message: "Car not found" });
            return;
        }
        res.status(200).json(car);
    }
    catch (error) {
        res.status(500).json({
            message: "Error fetching car",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getCarById = getCarById;
// Update a car
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.CarModel.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { "metadata.updatedAt": new Date().toISOString() }), { new: true, runValidators: true });
        if (!car) {
            res.status(404).json({ message: "Car not found" });
            return;
        }
        res.status(200).json(car);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating car",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateCar = updateCar;
// Delete a car
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield car_model_1.CarModel.findByIdAndDelete(req.params.id);
        if (!car) {
            res.status(404).json({ message: "Car not found" });
            return;
        }
        res.status(200).json({ message: "Car deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error deleting car",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.deleteCar = deleteCar;
// Update car availability status
const updateCarStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const car = yield car_model_1.CarModel.findByIdAndUpdate(req.params.id, {
            "availability.status": status,
            "metadata.updatedAt": new Date().toISOString(),
        }, { new: true, runValidators: true });
        if (!car) {
            res.status(404).json({ message: "Car not found" });
            return;
        }
        res.status(200).json(car);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating car status",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateCarStatus = updateCarStatus;
// Update car maintenance records
const updateCarMaintenance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lastService, nextServiceDue, condition } = req.body;
        const car = yield car_model_1.CarModel.findByIdAndUpdate(req.params.id, {
            maintenance: { lastService, nextServiceDue, condition },
            "metadata.updatedAt": new Date().toISOString(),
        }, { new: true, runValidators: true });
        if (!car) {
            res.status(404).json({ message: "Car not found" });
            return;
        }
        res.status(200).json(car);
    }
    catch (error) {
        res.status(400).json({
            message: "Error updating car maintenance",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.updateCarMaintenance = updateCarMaintenance;
