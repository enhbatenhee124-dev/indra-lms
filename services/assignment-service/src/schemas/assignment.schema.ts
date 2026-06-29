import { z } from "zod";

export const createAssignmentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  courseId: z.string().min(1),
});

export const createSubmissionSchema = z.object({
  fileUrl: z.string().min(1),
  studentId: z.string().min(1),
});
