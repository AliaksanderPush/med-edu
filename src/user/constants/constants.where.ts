import { Role } from '@prisma/client';

export const userInfoWhere = {
  findInRoles: {
    role: {
      in: [Role.DOCTOR, Role.MANAGER, Role.STUDENT],
    },
  },
  searchByFields: (search: string) => ({
    OR: [
      {
        userInfo: {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      {
        userInfo: {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      {
        email: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ],
  }),
};
