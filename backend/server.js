import express from "express";
import dotenv from "dotenv";
import { chats } from "./data/dummyData.js";
import connectDb from "./config/db.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/error.js";

dotenv.config();

connectDb();
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
