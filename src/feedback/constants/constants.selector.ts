export const feedBackInfoSelect = {
  generalData: {
    session: {
      select: {
        title: true,
        departmen: true,
        doctorName: true,
        description: true,
        startDate: true,
        location: true,
      },
    },
    answer: {
      select: {
        answerBool: true,
        answerStr: true,
        answerNum: true,
        question: {
          select: {
            question: true,
          },
        },
      },
    },
  },
};
