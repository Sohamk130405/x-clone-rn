// package imports
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

// config imports
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

// routes imports
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});


app.get("/", (req, res) => res.send("Hello from server✌️"));

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log(`Server is up and running on PORT:${ENV.PORT}`)
    );
  } catch (error) {
    console.log("Failed to start a server", error.message);
    process.exit(1);
  }
};

startServer();
