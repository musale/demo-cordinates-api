const dev = () => {
  return {
    env: 'dev',
    db: process.env.DEV_MONGO_URL,
    port: process.env.PORT || 5000,
  };
};

export default dev;
