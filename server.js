import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRouter from "./routes/ProductRouter.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import accountSettings from "./routes/accountSettingsRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import phoneNumberRoutes from "./routes/phoneNumberRoutes.js";

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API test route
app.get("/api/hello", (req, res) => {
  res.send("Hello World");
});

//connect to mongodb
dotenv.config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Authentication routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", accountSettings);
app.use("/api/address", addressRoutes);
app.use("/api/phonenumber", phoneNumberRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRouter);


app.use("/categories", categoryRoutes); 
app.use("/info", infoRoutes);

// Start app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
