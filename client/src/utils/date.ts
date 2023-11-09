// November 4
export const getFormattedDateWithDay = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric" };
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString("en-US", options);
};

// 2021 November
export const getFormattedMonthAndYear = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const currentDate = new Date(date);
  return currentDate.toLocaleDateString("en-US", options);
};
