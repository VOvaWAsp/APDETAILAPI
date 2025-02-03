import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import telegramRouter from "./routes/TelegramRouter.js";

dotenv.config();

const app = express();

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connect successful");
})
.catch((error) => {
    console.log(error);
    process.exit(1);
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/api/telegrambooking', telegramRouter);

app.use((_, res) => {
    res.status(404).json({message: "Route not found"});
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json(message);
});

app.listen(3000, () => {
    console.log("Server is running. Use our API on port: 3000")
})