// routes/brand.routes.ts
import { Router } from "express";
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller";

const router = Router();

router.post("/", createBrand);
router.get("/", getBrands);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
