import express from "express";
import {
  getAllAssignments,
  getAssignmentsByCourse,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getSubmissionsByStudent,
  getSubmissionsByAssignment,
} from "../services/assignmentService";
import { createAssignmentSchema, createSubmissionSchema } from "../schemas/assignment.schema";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const assignments = await getAllAssignments();
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get assignments" });
  }
});

router.get("/course/:courseId", async (req, res) => {
  try {
    const assignments = await getAssignmentsByCourse(req.params.courseId);
    res.json(assignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get assignments" });
  }
});

router.get("/student/:studentId/submissions", async (req, res) => {
  try {
    const submissions = await getSubmissionsByStudent(req.params.studentId);
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get submissions" });
  }
});

router.get("/:id/submissions", async (req, res) => {
  try {
    const submissions = await getSubmissionsByAssignment(req.params.id);
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get submissions" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const assignment = await getAssignmentById(req.params.id);
    if (!assignment) return res.status(404).json({ error: "Assignment not found" });
    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get assignment" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = createAssignmentSchema.parse(req.body);
    const assignment = await createAssignment(data);
    res.status(201).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.post("/:id/submit", async (req, res) => {
  try {
    const { fileUrl, studentId } = createSubmissionSchema.parse(req.body);
    const submission = await submitAssignment(req.params.id, studentId, fileUrl);
    res.status(201).json(submission);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const assignment = await updateAssignment(req.params.id, req.body);
    res.json(assignment);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteAssignment(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete assignment" });
  }
});

export default router;
