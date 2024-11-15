import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import bodyParser from "body-parser";
import authenticate from "./utils/authentication.js";
import categoryRouter from "./routers/categoryRouter.js";
import roomRouter from "./routers/roomRouter.js";
import eventRouter from "./routers/eventRouter.js";
import reviewRouter from "./routers/reviewRouter.js";

const app = express();

dotenv.config();
app.use(bodyParser.json())

// Database connection
mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Database connection success")).catch(() => console.log("Database connection fail"));

// Authentication
app.use(authenticate);

// Routers
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/room", roomRouter);
app.use("/event", eventRouter);
app.use("/review", reviewRouter);

app.listen(5000, (req, res) => {
    console.log("The program runs on port 5000");
})