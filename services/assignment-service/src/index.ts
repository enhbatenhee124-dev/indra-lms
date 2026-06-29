import express from "express";
import cors from "cors";
import helmet from "helmet";
import assignmentRoutes from "./routes/assignmentRoutes";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "assignment-service" });
});

app.use("/api/assignments", assignmentRoutes);

app.listen(PORT, () => {
  console.log(`Assignment Service running on port ${PORT}`);
});
