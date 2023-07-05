export const formatDate = (dateObj) => {
  const year = dateObj.year().toString();
  const month = (dateObj.month() + 1).toString();
  const date = dateObj.date().toString();

  return { year, month, date };
};
