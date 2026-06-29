import prisma from "@/lib/prisma";

export const courseService = {
  async createCourse(title: string, description: string | undefined, teacherId: string) {
    return prisma.course.create({
      data: { title, description, teacherId },
    });
  },

  async getAllCourses() {
    return prisma.course.findMany({ include: { teacher: true } });
  },

  async getCourseById(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: { teacher: true, assignments: true, enrollments: true },
    });
  },

  async updateCourse(
    id: string,
    data: { title?: string; description?: string; isPublished?: boolean }
  ) {
    return prisma.course.update({ where: { id }, data });
  },

  async deleteCourse(id: string) {
    return prisma.course.delete({ where: { id } });
  },

  async enrollStudent(courseId: string, studentId: string) {
    return prisma.enrollment.create({
      data: { courseId, studentId },
    });
  },
};
