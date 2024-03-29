import CategorySchema from "./CategorySchema.js";

export const createNewCategory = (obj) => {
  return CategorySchema(obj).save();
};

export const readCategories = () => {
  return CategorySchema.find();
};

//@_id must be a string
export const getCategoryById = (_id) => {
  return CategorySchema.findById(_id);
};

export const updateCategory = (_id, obj) => {
  return CategorySchema.findByIdAndUpdate(_id, obj, { new: true });
};

export const deleteCat = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
