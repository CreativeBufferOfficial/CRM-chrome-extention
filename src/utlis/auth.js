export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const removeAuth = () => {
  //   localStorage.removeItem('userData')
  //   localStorage.removeItem('isAuthenticated')
  window.localStorage.removeItem('accessToken');
  //   localStorage.removeItem('authkey');
};
