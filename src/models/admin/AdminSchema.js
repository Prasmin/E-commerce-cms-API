import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },

    address: {
      type: String,
      default: "",
    },

    emailVerificationCode: {
      type: String,
      default: "",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    confirmPassword: {
      type: String,
      default: "inactive",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },

    fName: {
      type: String,
      required: true,
      default: "inactive",
    },

    lName: {
      type: String,
      required: true,
      default: "inactive",
    },
    password: {
      type: String,
      required: true,
      default: "inactive",
    },

    phone: {
      type: String,
      default: "",
    },
    refershJWT: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin_user", adminSchema);
