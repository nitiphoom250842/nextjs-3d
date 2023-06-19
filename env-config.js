const dotenv = require("dotenv");
const ENV_BRANCH = "";

dotenv.config({ path: `.env.${ENV_BRANCH ? ENV_BRANCH : "dev"}` });

module.exports = {
  env: {
    TEST_ENV: process.env.TEST_ENV,
    ACCESS_TOKEN_NAME: process.env.ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME: process.env.REFRESH_TOKEN_NAME,
  },
};
