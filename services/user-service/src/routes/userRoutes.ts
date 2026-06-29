import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getStats,
} from "../services/userService";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const router = express.Router();

// Get stats (admin only)
router.get("/stats", async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get users" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user" });
  }
});

// Create user
router.post("/", async (req, res) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const user = await createUser(validatedData);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const user = await updateUser(req.params.id, validatedData);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid data" });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
