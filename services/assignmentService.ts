import prisma from "@/lib/prisma";

export const assignmentService = {
  async createAssignment(
    title: string,
    description: string | undefined,
    dueDate: Date | undefined,
    courseId: string
  ) {
    return prisma.assignment.create({
      data: { title, description, dueDate, courseId },
    });
  },

  async getAssignmentsByCourse(courseId: string) {
    return prisma.assignment.findMany({
      where: { courseId },
      include: { submissions: true },
    });
  },

  async submitAssignment(
    assignmentId: string,
    studentId: string,
    fileUrl: string
  ) {
    return prisma.submission.create({
      data: { assignmentId, studentId, fileUrl },
    });
  },
};
