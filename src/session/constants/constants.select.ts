export const sessionInfoSelect = {
  sessionInfo: {
    id: true,
    title: true,
    departmen: true,
    doctorName: true,
    description: true,
    startDate: true,
    location: true,
    duration: true,
    status: true,
    feedBacs: true,
    autor: {
      select: {
        role: true,
        email: true,
        userInfo: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    },
    slot: {
      select: {
        id: true,
        limit: true,
        count: true,
        status: true,
        users: {
          select: {
            id: true,
            role: true,
            email: true,
            status: true,
          },
        },
      },
    },
  },
};
