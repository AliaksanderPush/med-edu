export const managerSlotSelect = {
  generalInfo: {
    id: true,
    limit: true,
    user: {
      select: {
        id: true,
        role: true,
        email: true,
        status: true,
      },
    },
    slotUsers: {
      select: {
        users: {
          select: {
            id: true,
            email: true,
            status: true,
            invaitedstatus: true,
          },
        },
      },
    },
  },
};
