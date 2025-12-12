import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import accountRoutes from "./routes/account.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // frontend
  credentials: true
}));

// routes
app.use("/auth", authRoutes);
app.use("/accounts", accountRoutes);
app.use("/profile", profileRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
