export const setSession = (accessToken) => {
  if (accessToken) {
    // console.log('inside session fn');
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticated', 'true');
  }
};

export const removeAuth = () => {
  //   localStorage.removeItem('userData')
  // console.log(`removeAuth working `);
  window.localStorage.removeItem('isAuthenticated');
  window.localStorage.removeItem('accessToken');
  //   localStorage.removeItem('authkey');
};
