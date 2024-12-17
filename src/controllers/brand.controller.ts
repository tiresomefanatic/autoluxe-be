// controllers/brand.controller.ts
import { Request, Response } from "express";
import { BrandModel } from "../models/brand.model";
import { RequestHandler } from "express";

// Create brand
export const createBrand: RequestHandler = async (req, res) => {
  try {
    const brand = new BrandModel(req.body);
    const savedBrand = await brand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json({
      message: "Error creating brand",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get all brands
export const getBrands: RequestHandler = async (req, res) => {
  try {
    const brands = await BrandModel.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching brands",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update brand
export const updateBrand: RequestHandler = async (req, res) => {
  try {
    const brand = await BrandModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!brand) {
      res.status(404).json({ message: "Brand not found" });
      return;
    }

    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({
      message: "Error updating brand",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete brand
export const deleteBrand: RequestHandler = async (req, res) => {
  try {
    const brand = await BrandModel.findByIdAndDelete(req.params.id);

    if (!brand) {
      res.status(404).json({ message: "Brand not found" });
      return;
    }

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting brand",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
