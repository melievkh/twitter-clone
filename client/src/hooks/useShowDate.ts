const useShowDate = (date: string) => {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "long" });
  const year = d.getFullYear();
  const day = d.getDate();

  return { year, month, day };
};

export default useShowDate;
