export const slotsInfoSelect = {
  fullResponce: {
    id: true,
    limit: true,
    count: true,
    users: {
      select: {
        id: true,
        role: true,
        email: true,
        status: true,
      },
    },
    status: true,
    sessionId: true,
  },
  shortResponce: {
    id: true,
    limit: true,
    count: true,
    status: true,
    users: true,
  },
};
