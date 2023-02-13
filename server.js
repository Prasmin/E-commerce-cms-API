import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();

const PORT = process.env.PORT || 8000;

//db connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//API routers
import adminRouter from "./src/routers/adminRouter.js";

app.use("/api/v1/admin", adminRouter);

//root URL request
app.use("/", (req, res, next) => {
  const error = {
    message: " you dont have permission here ",
  };
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.errorCode || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server running at http://localhost:${PORT}`);
});
