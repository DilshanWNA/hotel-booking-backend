import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";

const app = express();

dotenv.config();

// Database connection
mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log("Database connection success")).catch(() => console.log("Database connection fail"))

app.listen(5000, (req, res) => {
    console.log("The program runs on port 5000");
})