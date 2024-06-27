const config = {
  // Services
  USERS_SERVICE: 'http://localhost:3000',
  // BACKEND_SERVICE: 'https://serene-intuition-production.up.railway.app',
  BACKEND_SERVICE: 'http://localhost:1000',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
