import prisma from "../lib/prisma";

export const getAllCourses = async () => {
  return await prisma.course.findMany();
};

export const getCourseById = async (id: string) => {
  return await prisma.course.findUnique({
    where: { id },
    include: { enrollments: true },
  });
};

export const getCoursesByTeacher = async (teacherId: string) => {
  return await prisma.course.findMany({
    where: { teacherId },
  });
};

export const createCourse = async (data: any) => {
  return await prisma.course.create({
    data,
  });
};

export const updateCourse = async (id: string, data: any) => {
  return await prisma.course.update({
    where: { id },
    data,
  });
};

export const deleteCourse = async (id: string) => {
  return await prisma.course.delete({
    where: { id },
  });
};

export const enrollStudent = async (courseId: string, studentId: string) => {
  return await prisma.enrollment.create({
    data: {
      courseId,
      studentId,
    },
  });
};

export const getEnrollmentsByStudent = async (studentId: string) => {
  return await prisma.enrollment.findMany({
    where: { studentId },
    include: { course: true },
  });
};

export const getStats = async () => {
  return {
    totalCourses: await prisma.course.count(),
    totalEnrollments: await prisma.enrollment.count(),
  };
};
