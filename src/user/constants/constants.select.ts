export const userInfoSelect = {
  generalInfo: {
    id: true,
    role: true,
    email: true,
    status: true,
    unansweredSessions: true,
    userInfo: {
      select: {
        firstName: true,
        lastName: true,
        hospital: true,
        department: true,
        grade: true,
        yearGroup: true,
        numOfStud: true,
        university: true,
        feedBacks: true,
        incomeFeedBacks: true,
      },
    },
  },
  userStatus: {
    id: true,
    role: true,
    email: true,
    status: true,
    userInfo: true,
  },
};
