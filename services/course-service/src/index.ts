import express from "express";
import cors from "cors";
import helmet from "helmet";
import courseRoutes from "./routes/courseRoutes";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "course-service" });
});

app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
  console.log(`Course Service running on port ${PORT}`);
});
