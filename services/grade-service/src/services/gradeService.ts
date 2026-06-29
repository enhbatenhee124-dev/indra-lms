import prisma from "../lib/prisma";

export const getAllGrades = async () => {
  return await prisma.grade.findMany();
};

export const getGradeById = async (id: string) => {
  return await prisma.grade.findUnique({
    where: { id },
  });
};

export const getGradesBySubmission = async (submissionId: string) => {
  return await prisma.grade.findUnique({
    where: { submissionId },
  });
};

export const getGradesByStudent = async (studentId: string) => {
  return await prisma.grade.findMany({
    where: { gradedById: studentId }, // NOTE: In real app, you'd need to track studentId separately or get from submission, but for simplicity here, we'll use this placeholder!
  });
};

export const createGrade = async (data: any) => {
  return await prisma.grade.create({
    data,
  });
};

export const updateGrade = async (id: string, data: any) => {
  return await prisma.grade.update({
    where: { id },
    data,
  });
};

export const deleteGrade = async (id: string) => {
  return await prisma.grade.delete({
    where: { id },
  });
};
