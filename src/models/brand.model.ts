// models/brand.model.ts
import mongoose, { Document, Schema } from "mongoose";

export interface Brand {
  name: string;
}

export type BrandDocument = Document & Brand;

const BrandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const BrandModel = mongoose.model<BrandDocument>("Brand", BrandSchema);
