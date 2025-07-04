export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPrevious = page !== 1;

  return {
    page,
    perPage,
    totalItem: count,
    totalPages,
    hasNextPage,
    hasPrevious,
  };
};
