// package imports
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

// config imports
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

// routes imports
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users", userRoutes);

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
