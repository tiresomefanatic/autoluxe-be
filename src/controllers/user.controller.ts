import { Response } from "express";
import { UserModel } from "../models/user.model";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const createOrUpdateUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { firebaseUid, email, phoneNumber, displayName, photoURL, provider } =
      req.body;

    const user = await UserModel.findOneAndUpdate(
      { firebaseUid }, // search by firebaseUid
      {
        firebaseUid,
        email,
        phoneNumber,
        displayName,
        photoURL,
        $addToSet: { provider },
        "metadata.lastLoginAt": new Date().toISOString(),
        $setOnInsert: {
          "metadata.createdAt": new Date().toISOString(),
          isActive: true,
        },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      ...user.toObject(),
      id: user._id, // include MongoDB _id as id in response
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating/updating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.firebaseUid) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await UserModel.findOne({ firebaseUid: req.user.firebaseUid });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      ...user.toObject(),
      id: user._id, // include MongoDB _id as id in response
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Optional: Add method to get user by MongoDB _id
export const getUserById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      ...user.toObject(),
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
