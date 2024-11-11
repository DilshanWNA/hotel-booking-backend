import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import bodyParser from "body-parser";

const app = express();

dotenv.config();
app.use(bodyParser.json())

// Database connection
mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Database connection success")).catch(() => console.log("Database connection fail"));

// Routers
app.use("/user", userRouter);

app.listen(5000, (req, res) => {
    console.log("The program runs on port 5000");
})