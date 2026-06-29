import express from "express";
import {
  getAllCourses,
  getCourseById,
  getCoursesByTeacher,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollStudent,
  getEnrollmentsByStudent,
  getStats,
} from "../services/courseService";
import { createCourseSchema, updateCourseSchema } from "../schemas/course.schema";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

router.get("/", async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get courses" });
  }
});

router.get("/teacher/:teacherId", async (req, res) => {
  try {
    const courses = await getCoursesByTeacher(req.params.teacherId);
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get courses" });
  }
});

router.get("/student/:studentId/enrollments", async (req, res) => {
  try {
    const enrollments = await getEnrollmentsByStudent(req.params.studentId);
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get enrollments" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get course" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = createCourseSchema.parse(req.body);
    const course = await createCourse(data);
    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.post("/:id/enroll", async (req, res) => {
  try {
    const { studentId } = req.body;
    const enrollment = await enrollStudent(req.params.id, studentId);
    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to enroll" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = updateCourseSchema.parse(req.body);
    const course = await updateCourse(req.params.id, data);
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteCourse(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

export default router;
