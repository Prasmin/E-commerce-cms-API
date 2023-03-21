import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "active",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sales: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", PaymentSchema);
