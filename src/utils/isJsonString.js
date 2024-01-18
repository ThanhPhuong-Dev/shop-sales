export const isJsonString = (string) => {
  try {
    JSON.parse(string);
  } catch (err) {
    return false;
  }
  return true;
};
