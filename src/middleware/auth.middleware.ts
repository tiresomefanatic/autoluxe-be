import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";
import { UserModel, UserDocument } from "../models/user.model";

export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    firebaseUid: string;
    email?: string;
  };
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    // Find user in MongoDB
    const user = await UserModel.findOne({ firebaseUid: decodedToken.uid });

    if (!user) {
      res.status(401).json({ message: "User not found in database" });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      firebaseUid: user.firebaseUid,
      email: decodedToken.email || undefined,
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
