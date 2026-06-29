import express from "express";
import cors from "cors";
import helmet from "helmet";
import gradeRoutes from "./routes/gradeRoutes";

const app = express();
const PORT = process.env.PORT || 3004;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "grade-service" });
});

app.use("/api/grades", gradeRoutes);

app.listen(PORT, () => {
  console.log(`Grade Service running on port ${PORT}`);
});
