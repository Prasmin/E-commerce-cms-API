import express from "express";
import { createNewPayment } from "../models/payment/PaymentModal.js";

const router = express.Router();

//admin payment name
router.post("/", async (req, res, next) => {
  try {
    const { name, description } = req.body;

    console.log(req.body);
    const result = await createNewPayment({ name, description });

    if (result?._id) {
      res.json({
        status: "success",
        message: " addedd successfully",
      });
      return;
    }

    res.json({
      status: "error",
      message: "error adding new project name",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
