export const userSlotSelect = {
  generalInfo: {
    id: true,

    users: {
      select: {
        id: true,
        email: true,
        userInfo: {
          select: {
            firstName: true,
            lastName: true,
            hospital: true,
            university: true,
          },
        },
        invaitedstatus: true,
        status: true,
      },
    },
  },
};
