import PaymentSchema from "./PaymentSchema.js";

export const createNewPayment = (obj) => {
  return PaymentSchema(obj).save();
};

export const updatePayment = (filter, obj) => {
  return PaymentSchema.findOneAndUpdate(filter, obj, { new: true });
};

export const DeletePayment = (filter) => {
  return PaymentSchema.findOneAndDelete(filter);
};
