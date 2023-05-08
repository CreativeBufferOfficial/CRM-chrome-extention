export const setSession = (accessToken, id, name) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
  }
};

export const removeAuth = () => {
  window.localStorage.removeItem('isAuthenticated');
  window.localStorage.removeItem('id');
  window.localStorage.removeItem('name');
  window.localStorage.removeItem('accessToken');
};
