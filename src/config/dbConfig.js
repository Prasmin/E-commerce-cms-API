import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);

    const con = await mongoose.connect(process.env.MONGO_CLIENT);
    con?.connections
      ? console.log("db has succesfully connected")
      : console.log("Unable to connect DB");
  } catch (error) {
    console.log("error");
  }
};
