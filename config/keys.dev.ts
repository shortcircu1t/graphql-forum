const devKeys = {
  database: {
    password: process.env.DB_LOCAL_PASSWORD,
    db_name: process.env.DB_LOCAL_NAME,
    username: process.env.DB_LOCAL_USERNAME,
    host: process.env.DB_LOCAL_HOST,
  },
};

export default devKeys;
