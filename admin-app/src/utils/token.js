export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

export const setToken = (token) => {
  return localStorage.setItem("TOKEN", token);
};

export const removeToken = () => {
  localStorage.removeItem("TOKEN");
};
