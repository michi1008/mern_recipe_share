const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({extended: true , limit: '100mb'}));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));