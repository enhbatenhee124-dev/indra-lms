import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isApproved: true,
      createdAt: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isApproved: true,
      createdAt: true,
    },
  });
};

export const createUser = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const updateUser = async (id: string, data: any) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const getStats = async () => {
  const totalUsers = await prisma.user.count();
  const admins = await prisma.user.count({ where: { role: "ADMIN" } });
  const teachers = await prisma.user.count({ where: { role: "TEACHER" } });
  const students = await prisma.user.count({ where: { role: "STUDENT" } });

  return {
    totalUsers,
    admins,
    teachers,
    students,
  };
};
