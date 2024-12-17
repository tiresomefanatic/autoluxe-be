import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firebaseUid: string;
  email?: string;
  phoneNumber?: string;
  displayName?: string;
  photoURL?: string;
  provider: string[];
  metadata: {
    createdAt: string;
    lastLoginAt: string;
  };
  isActive: boolean;
}

export interface UserDocument extends Document, Omit<IUser, "_id"> {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, sparse: true },
    phoneNumber: { type: String, sparse: true },
    displayName: String,
    photoURL: String,
    provider: [String],
    metadata: {
      createdAt: String,
      lastLoginAt: String,
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);
