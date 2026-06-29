import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export const userService = {
  async createUser(
    name: string,
    email: string,
    password: string,
    role: Role = Role.STUDENT
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });
  },

  async getAllUsers() {
    return prisma.user.findMany();
  },

  async updateUserRole(id: string, role: Role) {
    return prisma.user.update({ where: { id }, data: { role } });
  },

  async approveTeacher(id: string) {
    return prisma.user.update({ where: { id }, data: { isApproved: true } });
  },

  async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  },

  async getStats() {
    const [users, courses, assignments, grades] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.assignment.count(),
      prisma.grade.count(),
    ]);
    return { users, courses, assignments, grades };
  },
};
