import AdminSchema from "./AdminSchema.js";

export const createNewAdmin = (obj) => {
  return AdminSchema(obj).save();
};

//filter and object must be an objects
//filter is the search criteria
//object is the content that will be updated in the db
export const updateAdmin = (filter, obj) => {
  return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
};

// find an user, filter must be an object
export const findAdmin = (filter) => {
  return AdminSchema.findOne(filter);
};
