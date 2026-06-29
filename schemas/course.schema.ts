import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const updateCourseSchema = createCourseSchema.partial().extend({
  isPublished: z.boolean().optional(),
});
