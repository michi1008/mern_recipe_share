import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
const port = process.env.PORT || 4000;
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import forgetPasswordRoutes from "./routes/forgetPasswordRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";


// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api", forgetPasswordRoutes);


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  const __dirname = path.resolve();
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
