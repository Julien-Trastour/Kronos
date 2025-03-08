import prisma from '../config/db.js';

export const findEmployeeByEmail = async (email) => {
  return prisma.employee.findUnique({
    where: { email },
    include: { role: true },
  });
};
