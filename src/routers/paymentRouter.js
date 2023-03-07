import express from "express";
import {
  createNewPayment,
  readPayments,
  updatePayment,
  DeletePayment,
} from "../models/payment/PaymentModal.js";

import {
  newPMValidation,
  updatePMValidation,
} from "../middlewares/joiMiddleware.js";

const router = express.Router();

//admin payment post
router.post("/", newPMValidation, async (req, res, next) => {
  try {
    const { _id } = await createNewPayment(req.body);

    _id
      ? res.json({
          status: "success",
          message: "Payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error!, unable to add payment method, pleas try agin later",
        });
  } catch (error) {
    next(error);
  }
});

//Read Payment Methods

router.get("/", async (req, res, next) => {
  try {
    const result = await readPayments();
    res.json({
      status: "success",
      message: "Payment methods list",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/", updatePMValidation, async (req, res, next) => {
  try {
    const { _id } = await updatePayment(req.body);
    _id
      ? res.json({
          status: "success",
          message: "Payment method has been added",
        })
      : res.json({
          status: "error",
          message: "Error!, unable to add payment method, pleas try agin later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
