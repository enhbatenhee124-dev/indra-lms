import prisma from "../lib/prisma";

export const getAllAssignments = async () => {
  return await prisma.assignment.findMany();
};

export const getAssignmentsByCourse = async (courseId: string) => {
  return await prisma.assignment.findMany({
    where: { courseId },
  });
};

export const getAssignmentById = async (id: string) => {
  return await prisma.assignment.findUnique({
    where: { id },
    include: { submissions: true },
  });
};

export const createAssignment = async (data: any) => {
  return await prisma.assignment.create({
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
};

export const updateAssignment = async (id: string, data: any) => {
  return await prisma.assignment.update({
    where: { id },
    data: {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
};

export const deleteAssignment = async (id: string) => {
  return await prisma.assignment.delete({
    where: { id },
  });
};

export const submitAssignment = async (
  assignmentId: string,
  studentId: string,
  fileUrl: string
) => {
  return await prisma.submission.create({
    data: {
      assignmentId,
      studentId,
      fileUrl,
    },
  });
};

export const getSubmissionsByStudent = async (studentId: string) => {
  return await prisma.submission.findMany({
    where: { studentId },
  });
};

export const getSubmissionsByAssignment = async (assignmentId: string) => {
  return await prisma.submission.findMany({
    where: { assignmentId },
  });
};
