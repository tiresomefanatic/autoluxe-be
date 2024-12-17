"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCarInput = void 0;
const validateCarInput = (req, res, next) => {
    // Add return type annotation
    const { make, model, variant, year, type, color, vin, licensePlate } = req.body;
    // Basic validation
    if (!make ||
        !model ||
        !variant ||
        !year ||
        !type ||
        !color ||
        !vin ||
        !licensePlate) {
        res.status(400).json({
            message: "Missing required fields",
            requiredFields: [
                "make",
                "model",
                "variant",
                "year",
                "type",
                "color (exterior and interior)",
                "vin",
                "licensePlate",
            ],
        });
        return; // Add explicit return
    }
    // VIN validation
    if (typeof vin !== "string" || vin.length !== 17) {
        res.status(400).json({
            message: "Invalid VIN format. VIN must be 17 characters long",
        });
        return; // Add explicit return
    }
    // Year validation
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 1) {
        res.status(400).json({
            message: `Year must be between 1900 and ${currentYear + 1}`,
        });
        return; // Add explicit return
    }
    next();
};
exports.validateCarInput = validateCarInput;
