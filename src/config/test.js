const test = () => {
  return {
    env: 'test',
    db: process.env.TEST_MONGO_URL,
    port: process.env.PORT || 5000
  };
};

export default test;
