/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  
    env:{
      DATABASE_URL: process.env.DATABASE_URL,
      WEB_AUTH_CLIENT_ID: process.env.WEB_AUTH_CLIENT_ID,
    }
  },
};

export default config;
