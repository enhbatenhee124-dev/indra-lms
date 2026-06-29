import { z } from "zod";

export const createAssignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  courseId: z.string(),
});

export const submitAssignmentSchema = z.object({
  fileUrl: z.string().url(),
});
