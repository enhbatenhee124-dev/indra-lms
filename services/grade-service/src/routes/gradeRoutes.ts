import express from "express";
import {
  getAllGrades,
  getGradeById,
  getGradesBySubmission,
  getGradesByStudent,
  createGrade,
  updateGrade,
  deleteGrade,
} from "../services/gradeService";
import { createGradeSchema } from "../schemas/grade.schema";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const grades = await getAllGrades();
    res.json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get grades" });
  }
});

router.get("/submission/:submissionId", async (req, res) => {
  try {
    const grade = await getGradesBySubmission(req.params.submissionId);
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get grade" });
  }
});

router.get("/student/:studentId", async (req, res) => {
  try {
    const grades = await getGradesByStudent(req.params.studentId);
    res.json(grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get grades" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const grade = await getGradeById(req.params.id);
    if (!grade) return res.status(404).json({ error: "Grade not found" });
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get grade" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = createGradeSchema.parse(req.body);
    const grade = await createGrade(data);
    res.status(201).json(grade);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const grade = await updateGrade(req.params.id, req.body);
    res.json(grade);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteGrade(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete grade" });
  }
});

export default router;
