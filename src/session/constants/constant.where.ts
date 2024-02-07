export const sessionInfWhere = {
  searchParams: (search: string) => ({
    contains: search,
    mode: 'insensitive',
  }),
};
