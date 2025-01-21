import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import orderRoute from "./routes/OrderRoute";
import RestaurantRoute from "./routes/RestaurantRoute";
if (process.env.NODE_ENV !== "production") {
dotenv.config({ path: "./.env" });}

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("error to connect database");
  });

cloudinary.config ({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRECT_KEY,
});

const app = express();

// app.use((req, res, next) => {
//   if (req.originalUrl === "/api/order/checkout/webhook") {
//     next();
//   } else {
//     express.json()(req, res, next);
//   }
// });
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use(cors());
app.use(express.json())

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/order", orderRoute);

app.use("/", (req:Request, res:Response, next:NextFunction) => {
  res.status(200).send("server running")
});
app.all("*", (req:Request, res:Response, next:NextFunction) => {
  return next(new Error("No Route"));
});

const server =app.listen(process.env.PORT, () => {
  console.log("runnig at 3000");
});
server.setTimeout(1000000);