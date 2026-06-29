import prisma from "@/lib/prisma";

export const gradeService = {
  async createGrade(
    score: number,
    comment: string | undefined,
    submissionId: string,
    gradedById: string
  ) {
    return prisma.grade.create({
      data: { score, comment, submissionId, gradedById },
    });
  },

  async getGradesByStudent(studentId: string) {
    return prisma.grade.findMany({
      where: { submission: { studentId } },
      include: { submission: { include: { assignment: true } }, gradedBy: true },
    });
  },
};
