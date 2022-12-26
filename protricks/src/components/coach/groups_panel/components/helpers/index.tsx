export const convertToPlDate = (d: string) =>
  new Date(d).toLocaleDateString("pl-pl");
  
export const getTimeWithoutMiliseconds = (t: string) => {
  return t.slice(0, -3);
};
