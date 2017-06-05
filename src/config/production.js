const production = () => {
  return {
    env: 'production',
    db: process.env.PROD_MONGO_URL,
    port: process.env.PORT || 8080
  };
};

export default production;
