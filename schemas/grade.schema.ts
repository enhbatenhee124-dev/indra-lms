import { z } from "zod";

export const createGradeSchema = z.object({
  score: z.number().min(0).max(100),
  comment: z.string().optional(),
  submissionId: z.string(),
});
