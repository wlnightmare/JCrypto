export const validateEmail = (str: string): string => {
  const email = str.match(/\S+@\S+\.\S+/)?.join("") ?? "";
  return email;
};

export const validatePassword = (str: string): string => {
  const name =
    str.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)?.join("") ?? "";
  return name;
};
