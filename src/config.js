require('dotenv').config();
export const credentials = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  server: {
    port: 5000,
    bodyLimit: "100kb",
    corsHeaders: ["Link"]
  }
};
